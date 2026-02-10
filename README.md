# Witcher Contracts Management Application

## 📋 Overview

The Witcher Contracts Management Application is a full-stack web application designed to help witchers (professional monster hunters) manage their hunting contracts. Users can browse available contracts, assign themselves to jobs, track progress, and mark contracts as completed.

## 🎯 Features

- **Authentication System**: Login as a witcher from available characters
- **Contract Management**: 
  - View all available contracts with filtering
  - Create new contracts
  - Edit existing contracts
  - View detailed contract information
  - Assign contracts to witchers
  - Mark contracts as completed
- **Real-time Filtering**: Search contracts by title and status
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Support**: Light and dark mode with smooth transitions

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI library with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Vite 7**: Fast build tool with Hot Module Replacement (HMR)
- **React Router 7**: Client-side routing for SPA navigation
- **CSS Modules**: Scoped styling for component isolation
- **Lucide React**: Beautiful, consistent icon library
- **Sonner**: Elegant toast notifications

### Backend
- **Express.js**: Fast, minimalist web framework for Node.js
- **TypeScript**: Type-safe backend development
- **Zod**: Schema validation for API requests
- **Swagger UI**: Interactive API documentation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ClementBobin/DI1-P3-temp.git
cd DI1-P3-temp
```

2. Install frontend dependencies:
```bash
cd Frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../Backend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd Backend
npm run dev
```
The API server will run on `http://localhost:3000`

2. In a new terminal, start the frontend development server:
```bash
cd Frontend
npm run dev
```
The application will open at `http://localhost:5173`

### Building for Production

To create an optimized production build:

```bash
cd Frontend
npm run build
```

The build output will be in the `dist` directory.

## 📁 Project Structure

```
Frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   └── ui/          # UI primitives (Button, Input, etc.)
│   ├── contexts/        # React contexts (Auth)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   │   ├── api/         # API client functions
│   │   └── utils.ts     # Helper functions
│   ├── pages/           # Page components (routes)
│   │   ├── contracts/   # Contract-related pages
│   │   └── login/       # Authentication page
│   ├── types/           # TypeScript type definitions
│   ├── app.tsx          # Main app component with routing
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration

Backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── schemas/         # Validation schemas
│   └── server.ts        # Express server setup
└── package.json         # Dependencies and scripts
```

## 🎨 Design Choices

### Architecture

**Component-Based Architecture**: The application uses a modular component structure where each UI element is self-contained with its own logic, styles, and tests.

**CSS Modules**: Each component has its own scoped CSS file (e.g., `button.css` for `button.tsx`). This prevents style conflicts and makes the codebase more maintainable.

**Context API for State**: Authentication state is managed using React Context, providing a clean way to share state across components without prop drilling.

**API Layer Separation**: All API calls are abstracted into dedicated API client modules (`contracts.ts`, `witchers.ts`), making it easy to modify endpoints or add error handling.

### Styling System

**CSS Custom Properties**: The application uses CSS variables for theming, allowing for:
- Consistent color palette across the application
- Easy theme switching (light/dark mode)
- Better maintainability of design tokens

**Responsive Design**: Mobile-first approach with media queries for larger screens.

**Accessibility**: Focus states, ARIA labels, and semantic HTML for screen readers.

### Type Safety

**TypeScript Throughout**: Both frontend and backend use TypeScript for:
- Compile-time error detection
- Better IDE autocomplete
- Self-documenting code
- Reduced runtime errors

**Shared Type Definitions**: Common types are defined in `/types` directory and shared across components.

### Performance

**Code Splitting**: React Router handles automatic code splitting by route.

**Debounced Search**: Search input uses debouncing to reduce API calls.

**Optimized Builds**: Vite provides fast HMR in development and optimized bundles for production.

## 🔒 Authentication

The application uses a simple authentication system:
- Users select a witcher from the available list
- No password is required (simplified for demo purposes)
- The selected witcher ID is stored in localStorage
- Protected routes check for authentication before rendering

## 📡 API Endpoints

### Witchers
- `GET /api/witchers` - Get all witchers
- `GET /api/witchers/:id` - Get witcher by ID
- `POST /api/witchers` - Create new witcher
- `PUT /api/witchers/:id` - Update witcher
- `DELETE /api/witchers/:id` - Delete witcher

### Contracts
- `GET /api/contracts` - Get all contracts (supports filtering)
- `GET /api/contracts/:id` - Get contract by ID
- `POST /api/contracts` - Create new contract
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build to check for TypeScript errors
npm run build
```

## 📝 License

This project is for educational purposes.

## 👥 Authors

- Clément Bobin
