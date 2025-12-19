# Turbo Cricket League - Next.js Application

This is a Next.js 14 application with TypeScript and Tailwind CSS, migrated from Vite + React Router.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page route
│   ├── journey/           # Player Journey page route
│   └── ...
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/                 # Page components (to be migrated)
├── contexts/              # React contexts
├── lib/                   # Utility functions
└── hooks/                 # Custom hooks
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Migration Status

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details on the migration from Vite to Next.js.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Database**: Supabase
- **3D Graphics**: Three.js, React Three Fiber

## License

Private - Turbo Cricket League

