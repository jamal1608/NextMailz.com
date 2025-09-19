# NextMailz - Temporary Email Service

## Overview

NextMailz is a modern, privacy-focused temporary email service that allows users to generate disposable email addresses for anonymous communications and privacy protection. The application provides instant email generation, real-time inbox functionality, and a clean, responsive user interface. Built with a focus on user privacy, the service requires no registration and automatically manages email lifecycle without storing personal information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: TailwindCSS utility-first framework with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Icons**: Lucide React for consistent iconography

The frontend follows a component-based architecture with reusable UI components, custom hooks for shared logic, and a clean separation between pages and components. The application supports responsive design and includes comprehensive navigation with mobile-friendly interfaces.

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express Session with PostgreSQL session store
- **Development**: Hot module replacement via Vite integration in development mode

The backend implements a RESTful API structure with middleware for logging, error handling, and request processing. The server includes development-specific features like runtime error overlays and hot reloading.

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon cloud service
- **ORM Configuration**: Drizzle with PostgreSQL dialect
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple

The database schema includes user management with secure password storage and UUID-based primary keys. Database migrations are managed through Drizzle Kit with schema definitions in TypeScript.

### Authentication and Authorization
- **Session-based Authentication**: Express Session middleware for user session management
- **User Management**: Basic user creation and retrieval functionality
- **Security**: Password-based authentication with secure session storage

The current implementation includes foundational user management with plans for temporary email address generation and management.

### Email Management System
- **Temporary Email Generation**: Instant generation of disposable email addresses
- **Real-time Inbox**: Live email reception and display functionality  
- **Email Lifecycle**: Automatic cleanup and management of temporary emails
- **Privacy Protection**: No permanent storage of personal information

The email interface provides a Gmail-like experience with sidebar navigation, email list views, and real-time updates for incoming messages.

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity via Neon
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Frontend Libraries
- **@radix-ui/***: Complete set of accessible UI primitives for components
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for single-page application navigation
- **tailwindcss**: Utility-first CSS framework for styling
- **lucide-react**: SVG icon library with React components

### Development and Build Tools
- **vite**: Fast build tool and development server with HMR
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development environment integration
- **typescript**: Type checking and enhanced development experience

### Validation and Form Handling
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Resolver integration for form validation

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx** and **tailwind-merge**: Utility functions for conditional CSS classes
- **class-variance-authority**: Type-safe variant styling system