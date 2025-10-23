# SAGIP Frontend - Disaster Advisory System

A Progressive Web App (PWA) for real-time disaster advisory and emergency response system.

## Features

- **Real-time Advisory Display**: Shows current disaster advisories with affected areas
- **Progressive Web App**: Installable on mobile devices with offline capabilities
- **Responsive Design**: Optimized for mobile devices with dark theme
- **Navigation**: Bottom navigation with Info, Home, and Alerts tabs
- **API Integration**: Connected to FastAPI backend for real data

## Design

The app matches the provided design with:
- Dark theme (#1C1C1E background)
- Status bar with time and system indicators
- Update status bar with last updated timestamp
- Advisory cards with appropriate icons and colors
- Bottom navigation bar with three tabs

## Components

- `AdvisoryCard`: Displays individual advisory information
- `AdvisorySection`: Groups advisories by date
- `StatusBar`: Shows last update information
- `NavigationBar`: Bottom navigation with tabs

## Pages

- `/` - Main advisory page (Home)
- `/info` - System information (Barangays and Shelters)
- `/alerts` - Emergency alerts page

## API Integration

The frontend integrates with the FastAPI backend:
- Users API (`/api/users`)
- Barangays API (`/api/barangays`)
- Shelters API (`/api/shelters`)
- Health check (`/api/health`)

## PWA Features

- Service Worker for offline functionality
- Web App Manifest for installation
- Apple Touch Icon support
- Standalone display mode

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Backend Integration

Make sure your FastAPI backend is running on `http://localhost:8000` or update the `API_BASE_URL` in `lib/api.ts`.