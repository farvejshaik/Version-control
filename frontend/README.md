# Frontend - GitHub Explorer

The frontend is a modern, responsive web application built with React.js and styled with Tailwind CSS. It interfaces with the backend API to provide features like user authentication, profile viewing, repository exploration, and social features.

## Features

- User search and profile view
- Repository sort and filter
- Social "like" feature
- Language-based repository exploration
- Authentication via GitHub OAuth
- Responsive and interactive UI

## Tech Stack

- **React.js** - JavaScript library for building UI
- **Vite** - Next-generation build tool
- **Tailwind CSS** - CSS framework for styling
- **React Router DOM** - For routing and navigation
- **React Hot Toast** - Toast notification library
- **React Icons** - Icons library

## Directory Structure

```
frontend/
├── public/             # Static assets
│   └── ...
├── src/                # Source code
│   ├── assets/         # Image and other static resources
│   ├── components/     # Reusable components
│   ├── context/        # React context for state management
│   ├── hooks/          # Custom hooks (if any)
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── package.json        # Package configuration
└── README.md           # This file
```

## UI Components

### Core Components (`src/components/`)

#### `Sidebar.jsx`
- **Purpose**: Fixed navigation sidebar
- **Features**: 
  - Home, Explore, Likes, Login/Logout navigation
  - Conditional rendering based on authentication state
  - Responsive design with icons
- **Props**: None (uses AuthContext)

#### `Search.jsx`
- **Purpose**: User search functionality
- **Features**:
  - GitHub username search
  - Form validation and submission
  - Integration with HomePage search handler
- **Props**: `onSearch` function

#### `ProfileInfo.jsx`
- **Purpose**: Display GitHub user profile information
- **Features**:
  - User avatar, bio, location, social links
  - Follower/following counts
  - Repository and gist counts
  - Member since date
  - Integration with LikeProfile component
- **Props**: `userProfile` object

#### `Repos.jsx`
- **Purpose**: Repository list container
- **Features**:
  - Grid layout for repository cards
  - Responsive design
  - Empty state handling
- **Props**: `repos` array, `alwaysFullWidth` boolean

#### `Repo.jsx`
- **Purpose**: Individual repository card
- **Features**:
  - Repository name, description, language
  - Star and fork counts
  - Language-specific styling
  - External GitHub link
- **Props**: `repo` object

#### `SortRepos.jsx`
- **Purpose**: Repository sorting controls
- **Features**:
  - Sort by: Recent, Most Stars, Most Forks
  - Active state indication
  - Button group interface
- **Props**: `onSort` function, `sortType` string

#### `LikeProfile.jsx`
- **Purpose**: Profile like functionality
- **Features**:
  - Like/unlike user profiles
  - Authentication checks
  - Prevent self-liking
  - Toast notifications
- **Props**: `userProfile` object

#### `Logout.jsx`
- **Purpose**: Logout functionality
- **Features**:
  - Logout API call
  - Session cleanup
  - Redirect handling
- **Props**: None

#### `Spinner.jsx`
- **Purpose**: Loading indicator
- **Features**:
  - Animated loading spinner
  - Centered layout
- **Props**: None

## Environment Configuration

### Prerequisites

- Node.js (v18 or higher)
- NPM (v7 or higher)
- Backend API server running

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

   The application should be running on `http://localhost:3000`

### Environment Variables

Make sure to configure the backend server URL in your environment if necessary.

## Routing

This application uses **React Router DOM** for client-side routing:

- **Home** (`/`): Displays the main dashboard where users can search and view profiles
- **Login** (`/login`): Redirects to GitHub authentication
- **Explore** (`/explore`): Page for exploring repositories by programming language
- **Likes** (`/likes`): Lists profiles that have liked the authenticated user's profile

## Development Scripts

- **`npm run dev`**: Starts the development server
- **`npm run build`**: Builds the app for production
- **`npm run lint`**: Lints the codebase using ESLint

## Styling

The application uses Tailwind CSS for styling:

- Responsive layout components
- Utility-first classes for theming
- Modern design components

## State Management

The app uses React's Context API:

- **AuthContext**: Manages authentication state globally
- Local state is used within components for UI management

## API Integration

- Interfaces with the backend API for authentication, user data, and repositories
- Fetch requests are used to interact with API endpoints
- Proper error handling for API failures and responses

## Deployment

1. **Build**:

   ```bash
   npm run build
   ```

2. **Deploy**:

   Upload the contents of the `dist` directory to your hosting provider

## Debugging

- Console logging for state and error debugging
- Ensure backend server is running and accessible

## Contributing

1. Fork the repository
2. Create a branch for your feature: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request


