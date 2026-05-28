import { Router } from 'express';
import passport from 'passport';

const router = Router();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

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

// Get current user profile
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ data: req.user });
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
