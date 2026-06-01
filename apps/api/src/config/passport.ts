import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

// Serialize user ID to the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from ID on subsequent requests
passport.deserializeUser(async (id: string, done) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const apiUrl = process.env.API_URL || 'http://localhost:3001';

// Google OAuth Strategy
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: `${apiUrl}/api/auth/google/callback`,
      },
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.id}@google.placeholder`;
          const name = profile.displayName || profile.name?.givenName || 'Google User';
          const avatarUrl = profile.photos?.[0]?.value;
          const providerId = `google-${profile.id}`;

          // Upsert logic
          const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.provider_id, providerId));

          if (existingUser) {
            const [updated] = await db
              .update(users)
              .set({
                name,
                avatar_url: avatarUrl,
                updated_at: new Date(),
              })
              .where(eq(users.id, existingUser.id))
              .returning();
            return done(null, updated);
          }

          const [newUser] = await db
            .insert(users)
            .values({
              email,
              name,
              avatar_url: avatarUrl,
              provider: 'google',
              provider_id: providerId,
            })
            .returning();

          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );
} else {
  console.log('⚠️ Google OAuth credentials missing. Google strategy disabled.');
}

// GitHub OAuth Strategy
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (githubClientId && githubClientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL: `${apiUrl}/api/auth/github/callback`,
        scope: ['user:email'],
      },
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.username}@github.placeholder`;
          const name = profile.displayName || profile.username || 'GitHub User';
          const avatarUrl = profile.photos?.[0]?.value;
          const providerId = `github-${profile.id}`;

          // Upsert logic
          const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.provider_id, providerId));

          if (existingUser) {
            const [updated] = await db
              .update(users)
              .set({
                name,
                avatar_url: avatarUrl,
                updated_at: new Date(),
              })
              .where(eq(users.id, existingUser.id))
              .returning();
            return done(null, updated);
          }

          const [newUser] = await db
            .insert(users)
            .values({
              email,
              name,
              avatar_url: avatarUrl,
              provider: 'github',
              provider_id: providerId,
            })
            .returning();

          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );
} else {
  console.log('⚠️ GitHub OAuth credentials missing. GitHub strategy disabled.');
}

export default passport;
