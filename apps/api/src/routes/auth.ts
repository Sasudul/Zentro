import { Router } from 'express';
import passport from 'passport';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import crypto from 'crypto';

const router = Router();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password: string, storedPassword: string): boolean {
  const [algorithm, salt, storedHash] = storedPassword.split(':');

  if (algorithm !== 'scrypt' || !salt || !storedHash) {
    return false;
  }

  const hash = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHash, 'hex');
  return stored.length === hash.length && crypto.timingSafeEqual(stored, hash);
}

function toPublicUser(user: any) {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

const hasGoogle = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
const hasGithub = !!process.env.GITHUB_CLIENT_ID && !!process.env.GITHUB_CLIENT_SECRET;

// Google OAuth
router.get(
  '/google',
  (req, res, next) => {
    if (!hasGoogle) {
      return res.status(501).json({ error: 'Google OAuth strategy is not configured' });
    }
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  (req, res, next) => {
    if (!hasGoogle) {
      return res.redirect(`${frontendUrl}/login?error=not_configured`);
    }
    next();
  },
  passport.authenticate('google', {
    failureRedirect: `${frontendUrl}/login?error=auth_failed`,
  }),
  (_req, res) => {
    res.redirect(`${frontendUrl}/`);
  }
);

// GitHub OAuth
router.get(
  '/github',
  (req, res, next) => {
    if (!hasGithub) {
      return res.status(501).json({ error: 'GitHub OAuth strategy is not configured' });
    }
    next();
  },
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  (req, res, next) => {
    if (!hasGithub) {
      return res.redirect(`${frontendUrl}/login?error=not_configured`);
    }
    next();
  },
  passport.authenticate('github', {
    failureRedirect: `${frontendUrl}/login?error=auth_failed`,
  }),
  (_req, res) => {
    res.redirect(`${frontendUrl}/`);
  }
);

// Credentials Registration
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, cleanEmail));

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const providerId = `local-${cleanEmail}`;
    const [newUser] = await db
      .insert(users)
      .values({
        email: cleanEmail,
        name: name.trim(),
        provider: 'local',
        provider_id: providerId,
        password: hashPassword(password),
      })
      .returning();

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(201).json({ success: true, data: toPublicUser(newUser) });
    });
  } catch (error) {
    next(error);
  }
});

// Credentials Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, cleanEmail));

    if (!user || user.provider !== 'local' || !user.password || !verifyPassword(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      res.json({ success: true, data: toPublicUser(user) });
    });
  } catch (error) {
    next(error);
  }
});

// Get current user profile
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ data: toPublicUser(req.user) });
  }
  res.status(401).json({ error: 'Not authenticated' });
});

// Logout
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((destroyErr) => {
      if (destroyErr) return next(destroyErr);
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });
});

export default router;
