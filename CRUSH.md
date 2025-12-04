# Soapbox

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

### Core Aesthetic
The application follows a "Deep Ocean Glassmorphism" aesthetic, characterized by semi-transparent UI elements floating over a rich, deep blue radial gradient background. This creates a sense of depth and immersion.

### Visual Decisions

#### 1. Background
- **Gradient**: `radial-gradient(circle at top center, #1e40af, #0f172a)`
- **Effect**: Simulates light penetrating deep water from the top, fading into the abyss at the bottom.
- **Behavior**: Fixed attachment to ensure the gradient stays consistent while scrolling.

#### 2. Glassmorphism (The `.glass` utility)
- **Background**: `rgba(255, 255, 255, 0.1)` (10% opacity white)
- **Blur**: `backdrop-filter: blur(12px)` to frost the background content.
- **Border**: `1px solid rgba(255, 255, 255, 0.2)` for a subtle, icy edge definition.
- **Shadow**: Soft drop shadow to lift elements off the background.
- **Usage**: Applied to all primary containers (Thought Cards, Navbar, Profile Panels, Reply Cards).

#### 3. Color Palette
- **Primary**: Cyan/Blue tones to match the aquatic theme.
- **Text**: Predominantly White (`#ffffff` or highly luminous gray) for contrast against the dark background.
- **Accents**: Cyan (`var(--primary)`) used for highlights and active states.
- **Destructive**: Muted red to fit the darker theme without vibrating too much against the blue.

#### 4. Component Styling
- **Cards**: Rounded corners (`rounded-2xl` or `rounded-xl`) to mimic bubbles or smooth sea glass.
- **Buttons**:
  - Primary actions: Glass style or ghost style with hover effects (`bg-white/10` -> `bg-white/20`).
  - Shapes: Pill-shaped (`rounded-full`) for "Like" and action buttons to feel organic.
- **Navbar**: High transparency glass (`rgba(15, 23, 42, 0.6)`) to anchor the top of the viewport without obscuring the gradient.
- **Inputs**: Transparent backgrounds with white placeholders and focus rings, removing default browser borders.

### CSS Architecture
- **Tailwind CSS**: Used for utility classes and layout.
- **CSS Variables**: `globals.css` defines the HSL values for the theme to integrate with Shadcn/UI components.
- **Overrides**: Specific overrides applied in `@layer base` to force glass styles on Shadcn components where utility classes weren't sufficient.

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
