# CRUSH.md

## Project Overview
This is a Next.js + Supabase full-stack application called "soapbox" using the App Router. It's built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Development Commands
All commands should be run from the `soapbox/` directory:

```bash
cd soapbox/
npm run dev          # Start development server with Turbopack
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure
- `soapbox/` - Main Next.js application directory
  - `app/` - Next.js App Router pages and layouts
    - `auth/` - Authentication pages (login, sign-up, etc.)
    - `protected/` - Protected routes requiring authentication
  - `components/` - React components
    - `ui/` - shadcn/ui base components
  - `lib/` - Utility functions and Supabase client configuration
    - `supabase/` - Client, server, and middleware Supabase configurations
- `supabase/` - Supabase configuration and migrations

## Environment Setup
Copy `soapbox/.env.example` to `soapbox/.env.local` and configure:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Your Supabase publishable/anon key

## Key Patterns

### Supabase Integration
- Uses `@supabase/ssr` for server-side rendering support
- Three client configurations in `lib/supabase/`:
  - `client.ts` - Browser client
  - `server.ts` - Server-side client  
  - `middleware.ts` - Middleware for auth handling

### Styling
- Tailwind CSS with CSS variables
- shadcn/ui components configured with "new-york" style
- Lucide React for icons
- Theme switching support via `next-themes`

### Import Aliases
```typescript
@/*              # Root directory (soapbox/)
@/components/*  # Components folder
@/lib/*         # Lib folder  
@/hooks/*       # Hooks folder
```

### Component Patterns
- Uses Radix UI primitives (via shadcn/ui)
- Class variance authority (CVA) for component variants
- `cn()` utility function for className merging

## Testing & CI
- Woodpecker CI/CD pipeline in `.woodpecker.yaml`
- Uses pnpm for package management in CI
- Runs lint step on push/PR
- Docker build step for deployment

## Database
- Supabase PostgreSQL with local development support
- Configuration in `supabase/config.toml`
- Local development ports:
  - API: 54321
  - Database: 54322  
  - Studio: 54323
  - Email testing: 54324

## Important Notes
- Environment variables should be in `soapbox/` directory
- Use `pnpm` for package management (configured in CI)
- All development work happens in the `soapbox/` subdirectory
- The project uses strict TypeScript configuration
- ESLint with Next.js configuration for code quality