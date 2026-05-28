import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import passport from './config/passport.js';
import { cache } from './config/redis.js';

import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

import eventRoutes from './routes/events.js';
import authRoutes from './routes/auth.js';
import weatherRoutes from './routes/weather.js';
import bookmarkRoutes from './routes/bookmarks.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Session and Store setup
let sessionStore;
if (cache.type === 'local-redis' && cache.rawClient) {
  sessionStore = new RedisStore({ client: cache.rawClient });
  console.log('📦 Sessions stored in local Redis');
} else {
  console.log('📦 Sessions stored in memory (development fallback)');
}

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'pulse-dev-secret-key-at-least-32-chars-long',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
app.use('/api', generalLimiter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n⚡ PULSE API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Events: http://localhost:${PORT}/api/events\n`);
});

export default app;
