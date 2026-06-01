# Zentro - Smart Event Management Platform

## Project Overview
Zentro is a full-stack web application designed for discovering, filtering, bookmarking, creating, and managing tech events. The application allows users to browse a catalog of events, view detailed event pages, and save favorites. Authenticated users can publish their own events, upload event banners, and see event-related context such as weather forecasts and map locations.

## Tech Stack
### Frontend Technologies
- Next.js 14
- React 18
- TypeScript
- vanilla CSS
- Zustand (State Management)
- React Query (Data Fetching & Server State)

### Backend Technologies
- Node.js
- Express
- TypeScript
- Passport (Authentication)
- Express Session

### Database
- PostgreSQL with Drizzle ORM and SQL migrations

### External APIs Used
- **OpenWeatherMap**: Enriches event pages with weather and forecast data.
- **Google Maps & Geocoding**: Renders the event map panel and converts event locations into coordinates.
- **Cloudinary**: Stores uploaded event banner images.

## Setup Instructions

### Prerequisites
- Node.js 18 or later
- pnpm 11 or later (if not available, run `corepack enable` and `corepack prepare pnpm@11.4.0 --activate`)
- PostgreSQL database, local or hosted
- API keys for OpenWeatherMap, Google Maps, Google OAuth, GitHub OAuth, Cloudinary

### Installation
```bash
pnpm install
```

### Environment Variables
Copy the example file:
```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
```

**Backend variables (`apps/api/.env`):**
```env
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@host:5432/zentro
SESSION_SECRET=replace-with-a-secure-32-character-secret
SESSION_MAX_AGE_MS=2592000000
OPENWEATHERMAP_API_KEY=
GOOGLE_GEOCODING_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Frontend variables (`apps/web/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_ID=
```

### Run Commands

**Database setup:**
```bash
pnpm --filter @zentro/api db:migrate
pnpm --filter @zentro/api db:seed
```

**Run local development server:**
```bash
pnpm dev
```
- Web: `http://localhost:3000`
- API: `http://localhost:3001`

**Build for production:**
```bash
pnpm build
```

## API Documentation

All endpoints are prefixed by `/api`.

### Available Endpoints & Sample Requests/Responses

**Health Check**
`GET /api/health`
```json
{
  "status": "ok",
  "timestamp": "2026-06-01T00:00:00.000Z",
  "version": "0.1.0"
}
```

**Authentication**
`POST /api/auth/register`
Request:
```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "secure-password"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "ada@example.com",
    "name": "Ada Lovelace",
    "provider": "local"
  }
}
```
Other auth endpoints:
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

**Events**
`GET /api/events?q=ai&category=meetup&city=Colombo`
Response:
```json
{
  "data": [
    {
      "id": "event-uuid",
      "title": "Colombo AI & Data Science Meetup",
      "category": "meetup",
      "format": "in-person",
      "start_time": "2026-06-10T09:00:00.000Z",
      "location_city": "Colombo",
      "tags": ["Tech", "AI"],
      "is_bookmarked": false
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1, "total_pages": 1 }
}
```
`POST /api/events` (Requires Login)
Request:
```json
{
  "title": "React Workshop Colombo",
  "description": "Hands-on workshop for modern React patterns.",
  "category": "workshop",
  "format": "in-person",
  "start_time": "2026-06-15T09:00:00.000Z",
  "end_time": "2026-06-15T13:00:00.000Z",
  "location_name": "Hatch Coworking Space",
  "location_city": "Colombo",
  "location_country": "Sri Lanka",
  "url": "https://example.com/react-workshop",
  "tags": ["React", "JavaScript"]
}
```

**Bookmarks (Requires Login)**
- `GET /api/bookmarks`
- `POST /api/bookmarks/:eventId`
- `DELETE /api/bookmarks/:eventId`

**Weather**
`GET /api/weather/current?city=Colombo`
Response:
```json
{
  "data": {
    "temp": 28,
    "condition": "Clouds",
    "icon": "03d",
    "humidity": 75,
    "windSpeed": 3.8
  }
}
```

**Uploads (Requires Login)**
`POST /api/upload`
Request:
```json
{
  "image": "data:image/png;base64,..."
}
```
Response:
```json
{
  "url": "https://res.cloudinary.com/example/image/upload/example.png"
}
```

## Architecture Decisions

### Why specific technologies were chosen
- **Next.js**: Chosen for a polished frontend, file-based routing, SEO/metadata support, image optimization, and straightforward deployment.
- **Express**: Chosen for a lightweight, readable REST API with simple middleware composition.
- **PostgreSQL and Drizzle ORM**: Provide reliable relational data modeling for users, events, tags, and bookmarks while keeping SQL migrations explicit.
- **React Query**: Handles server state, caching, and mutation invalidation robustly.

### Folder structure decisions
```text
apps/
  api/        Express REST API, database schema, migrations, controllers, services
  web/        Next.js application, pages, components, hooks, client API helpers
packages/
  shared/     Zod schemas and shared TypeScript types used by both apps
```
The repository is structured as a pnpm monorepo using Turborepo. This allows frontend, backend, and shared validation schemas to evolve together natively without duplicating contracts.

### State management decisions
- **Zustand** is utilized to store lightweight, transient UI state (such as active filters), avoiding global state complexity and boilerplate.
- **React Query** is used for server state management to automatically handle caching, background fetching, and loading states.

### Authentication approach
- Authentication is built around Express sessions paired with Passport.
- Local email/password works out of the box (passwords salted and hashed with `scrypt`).
- Google and GitHub OAuth providers are implemented to offer frictionless social logins.

### Tradeoffs / Assumptions
- **Sessions**: Session storage falls back to memory if a persistent store like Redis is not configured. This is adequate for local development but necessitates a persistent session store in production.
- **Image Uploads**: Uploads are processed through the Express API as base64 strings. This is simpler to implement but direct signed client-to-Cloudinary uploads would offer better performance at scale.
- **APIs**: Weather gracefully falls back to deterministic mock data if OpenWeatherMap is unavailable. The project assumes it operates as a core event discovery platform, opting out of complex ticket processing and checkout flows.

## Future Improvements

### Features you would add with more time
- Event drafts and a formal publishing workflow.
- Attendee registration, ticketing, and check-in QR codes.
- Calendar export (ICS integration) and organizer dashboards.

### Scalability improvements
- Implement a dedicated Redis-backed session persistence layer to allow for horizontally scaled API instances.
- Introduce map marker clustering and a search engine index (like Elasticsearch or Algolia) to efficiently handle a large catalog of events.
- Direct-to-provider image uploads (e.g. AWS S3 or Cloudinary pre-signed URLs) to reduce server load.

### Security enhancements
- Implement CSRF protection and strict CORS allowlists.
- Transition password hashing to Argon2 or Bcrypt with calibrated work factors.
- Expand OAuth account linking capabilities and implement role-based permissions (admin, organizer, attendee).
- Introduce comprehensive automated tests (unit and e2e) and continuous integration pipelines.
