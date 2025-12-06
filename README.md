# Elite Fitness App

A modern, responsive fitness application built with React and Vite. Features a landing page, dashboard, and smooth animations with Tailwind CSS.

## Features

- **Fast Build:** Vite for rapid development and optimized production builds
- **Modern UI:** React components with Tailwind CSS styling
- **Smooth Animations:** Framer Motion for fluid UI transitions
- **Icons:** Lucide React for consistent, scalable icons
- **SPA Routing:** Single-page application with client-side routing
- **Production Ready:** Deployed on DigitalOcean App Platform

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Server:** Express (for production hosting)
- **Node.js:** 18+

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dusharakalubowila/Gym-Application-.git
   cd Gym-Application-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This generates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Start Production Server

```bash
npm start
```

The server will run on port 8080 (or `PORT` environment variable).

## Deployment

### DigitalOcean App Platform

The app is configured for deployment on DigitalOcean App Platform via `app.yaml`:

1. **Build:** `npm install && npm run build`
2. **Run:** `npm start` (Express server serving static files from `dist/`)
3. **Port:** 8080

GitHub integration enables automatic deployments on pushes to the `main` branch.

## Project Structure

```
src/
├── App.jsx              # Main App component
├── main.jsx             # Entry point
├── index.css            # Global styles
└── components/
    ├── Dashboards.jsx   # Dashboard components
    └── LandingSections.jsx # Landing page sections
dist/                   # Production build (generated)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm start` - Start production server

## Performance

- **Build Size:** ~100KB gzipped (JS)
- **CSS:** ~5.4KB gzipped
- **Optimized:** Static asset serving with Express

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, visit the [GitHub repository](https://github.com/dusharakalubowila/Gym-Application-).

---

**Deployed at:** [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/)