# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a React + TypeScript + Vite project with the React Compiler enabled. The main application is located in the `point-web/` directory.

### Key Architecture Points

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (using rolldown-vite override for performance)
- **React Compiler**: Enabled via babel-plugin-react-compiler for automatic optimization
- **Package Manager**: Uses pnpm with specific overrides

## Common Development Commands

All commands should be run from the `point-web/` directory:

```bash
cd point-web

# Development server with HMR
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Lint the codebase
npm run lint

# Preview production build locally
npm run preview
```

## Development Setup

1. Navigate to the `point-web` directory
2. Install dependencies with `npm install` (or `pnpm install`)
3. Run `npm run dev` to start development server
4. The app uses Vite's HMR for fast refresh during development

## Code Quality

- **ESLint Configuration**: Uses modern flat config with TypeScript, React hooks, and React refresh rules
- **TypeScript**: Project uses TypeScript with separate configs for app and node environments
- **React Compiler**: Automatically optimizes React components for performance (may impact dev/build performance)

## Important Notes

- The project uses `rolldown-vite` instead of standard Vite for improved performance
- React Compiler is enabled, which may impact development and build times but provides automatic React optimizations
- ESLint is configured for TypeScript and React with recommended rules for hooks and refresh