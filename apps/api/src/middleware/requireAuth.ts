import type { Request, Response, NextFunction } from 'express';

// Middleware to ensure a user is logged in
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
    return;
  }
  next();
}
