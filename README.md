# GitHub Explorer - Full Stack Application

A modern full-stack web application that allows users to explore GitHub profiles, repositories, and interact with other users through a social-like interface. Built with React.js frontend and Node.js/Express backend with MongoDB database.

[Live Demo](https://version-control-yaam.onrender.com/) 

## Features

- **GitHub Authentication**: Secure OAuth login using GitHub accounts
- **Profile Exploration**: Search and view GitHub user profiles and repositories
- **Repository Management**: Sort repositories by stars, forks, or creation date
- **Social Features**: Like other users' profiles and view who liked yours
- **Language Explorer**: Discover popular repositories by programming language
- **Responsive Design**: Mobile-friendly interface with modern UI/UX

## Tech Stack

### Frontend
- **React.js 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **GitHub OAuth** - OAuth 2.0 authentication

## Project Structure

```
GitHub/
├── backend/                 # Backend API server
│   ├── controllers/         # Route controllers
│   ├── db/                  # Database connection
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── passport/            # Authentication configuration
│   ├── routes/               # API routes
│   └── server.js         # Entry point
├── frontend/              # React frontend application
│   ├── public/           # Static assets
│   ├── src/             # Source code
│   │   ├── components/  # Reusable components
│   │   ├── context/    # React context
│   │   ├── pages/     # Page components
│   │   └── utils/    # Utility functions
│   └── package.json
├── package.json          # Root dependencies
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- GitHub OAuth App credentials

### Environment Variables

Create a `.env` file in the backend directory:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_API_KEY=your_github_personal_access_token
MONGO_URI=your_mongodb_connection_string
CLIENT_BASE_URL=http://localhost:3000
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GitHub
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `GET /github` - Initiate GitHub OAuth
- `GET /github/callback` - GitHub OAuth callback
- `GET /check` - Check authentication status
- `GET /logout` - Logout user

### User Routes (`/api/users`)
- `GET /profile/:username` - Get user profile and repositories
- `GET /likes` - Get users who liked your profile (requires auth)
- `POST /like/:username` - Like a user's profile (requires auth)

### Explore Routes (`/api/explore`)
- `GET /repos/:language` - Get popular repositories by language (requires auth)

## Key Features

### 1. GitHub Profile Search
- Search for any GitHub user by username
- View comprehensive profile information
- Display user's repositories with sorting options

### 2. Repository Sorting
- Sort by creation date (recent)
- Sort by star count
- Sort by fork count

### 3. Social Features
- Like other users' profiles
- View who liked your profile
- Track like timestamps

### 4. Language Explorer
- Explore popular repositories by programming language
- Support for JavaScript, TypeScript, Python, Java, C++
- Display top 10 repositories per language

## Authentication Flow

1. User clicks login on frontend
2. Redirected to GitHub OAuth
3. User authorizes the application
4. GitHub redirects back with authorization code
5. Backend exchanges code for access token
6. User profile is created/updated in database
7. Session is established

## Pages

- **Home** (`/`) - Main dashboard with profile search
- **Login** (`/login`) - GitHub OAuth login page
- **Signup** (`/signup`) - User registration (redirects to GitHub)
- **Explore** (`/explore`) - Discover popular repositories by language
- **Likes** (`/likes`) - View users who liked your profile

## UI Components

- **Sidebar** - Navigation menu
- **Search** - User search functionality
- **ProfileInfo** - User profile display
- **Repos** - Repository list with pagination
- **SortRepos** - Repository sorting controls
- **LikeProfile** - Profile like button
- **Spinner** - Loading indicator

## State Management

The application uses React Context for global state management:
- **AuthContext** - Manages user authentication state
- Local component state for UI-specific data

## Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  name: String,
  profileUrl: String (required),
  avatarUrl: String,
  likedProfiles: [String],
  likedBy: [{
    username: String,
    avatarUrl: String,
    likedDate: Date
  }],
  timestamps: true
}
```

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or similar
2. Configure environment variables
3. Deploy to platforms like Heroku, Vercel, or Railway

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update backend CORS settings for production URL

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Known Issues

- Rate limiting from GitHub API (5000 requests/hour for authenticated requests)
- Session management could be improved with Redis
- Error handling could be more comprehensive

## Future Enhancements

- Add repository search functionality
- Implement real-time notifications
- Add user activity timeline
- Enhanced profile customization
- Repository comparison features
- Mobile app version

