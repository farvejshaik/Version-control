# Backend API - GitHub Explorer

Node.js/Express backend API for the GitHub Explorer application with MongoDB integration and GitHub OAuth authentication.

## Overview

This backend provides RESTful APIs for user authentication, profile management, and GitHub repository exploration. It integrates with GitHub's API to fetch user data and repositories while maintaining its own user database for social features.

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.1** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **GitHub OAuth** - Social authentication
- **CORS** - Cross-origin resource sharing
- **Express Session** - Session management

## Directory Structure

```
backend/
├── controllers/           # Business logic controllers
│   ├── explore.controller.js    # Repository exploration logic
│   └── user.controller.js       # User management logic
├── db/                   # Database configuration
│   └── connectMongoDB.js       # MongoDB connection setup
├── middleware/           # Custom middleware
│   └── ensureAuthenticated.js  # Authentication middleware
├── models/              # Database models
│   └── user.model.js           # User schema definition
├── passport/            # Authentication configuration
│   └── github.auth.js          # GitHub OAuth strategy
├── routes/             # API route definitions
│   ├── auth.route.js          # Authentication routes
│   ├── explore.route.js       # Repository exploration routes
│   └── user.route.js          # User management routes
├── server.js           # Application entry point
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## API Routes

### Authentication Routes (`/api/auth`)

#### `GET /api/auth/github`
Initiates GitHub OAuth authentication flow.
- **Description**: Redirects user to GitHub OAuth authorization page
- **Authentication**: None required
- **Response**: Redirect to GitHub

#### `GET /api/auth/github/callback`
Handles GitHub OAuth callback.
- **Description**: Processes GitHub OAuth response and creates/updates user
- **Authentication**: GitHub OAuth
- **Success**: Redirect to frontend home page
- **Failure**: Redirect to frontend login page

#### `GET /api/auth/check`
Checks current authentication status.
- **Description**: Returns current user information if authenticated
- **Authentication**: Session-based
- **Response**:
  ```json
  {
    "user": {
      "username": "string",
      "name": "string",
      "profileUrl": "string",
      "avatarUrl": "string"
    }
  }
  ```

#### `GET /api/auth/logout`
Logs out the current user.
- **Description**: Destroys user session
- **Authentication**: Session-based
- **Response**:
  ```json
  {
    "message": "Logged Out"
  }
  ```

### User Routes (`/api/users`)

#### `GET /api/users/profile/:username`
Fetches GitHub user profile and repositories.
- **Description**: Retrieves user data from GitHub API
- **Parameters**: 
  - `username` (string): GitHub username
- **Authentication**: None required
- **Response**:
  ```json
  {
    "userProfile": {
      "login": "string",
      "name": "string",
      "bio": "string",
      "location": "string",
      "email": "string",
      "html_url": "string",
      "avatar_url": "string",
      "followers": "number",
      "following": "number",
      "public_repos": "number",
      "public_gists": "number",
      "created_at": "string"
    },
    "repos": [
      {
        "name": "string",
        "description": "string",
        "html_url": "string",
        "language": "string",
        "stargazers_count": "number",
        "forks_count": "number",
        "created_at": "string",
        "updated_at": "string"
      }
    ]
  }
  ```

#### `POST /api/users/like/:username`
Likes a user's profile.
- **Description**: Adds like relationship between authenticated user and target user
- **Parameters**: 
  - `username` (string): Username to like
- **Authentication**: Required (ensureAuthenticated middleware)
- **Response**:
  ```json
  {
    "message": "User liked"
  }
  ```
- **Error Responses**:
  - `404`: User is not a member
  - `400`: User already liked

#### `GET /api/users/likes`
Gets users who liked current user's profile.
- **Description**: Returns list of users who liked the authenticated user
- **Authentication**: Required (ensureAuthenticated middleware)
- **Response**:
  ```json
  {
    "likedBy": [
      {
        "username": "string",
        "avatarUrl": "string",
        "likedDate": "string"
      }
    ]
  }
  ```

### Explore Routes (`/api/explore`)

#### `GET /api/explore/repos/:language`
Explores popular repositories by programming language.
- **Description**: Fetches top 10 repositories for specified language from GitHub
- **Parameters**: 
  - `language` (string): Programming language (e.g., javascript, python, java)
- **Authentication**: Required (ensureAuthenticated middleware)
- **Response**:
  ```json
  {
    "repos": [
      {
        "name": "string",
        "full_name": "string",
        "description": "string",
        "html_url": "string",
        "language": "string",
        "stargazers_count": "number",
        "forks_count": "number",
        "owner": {
          "login": "string",
          "avatar_url": "string"
        }
      }
    ]
  }
  ```

## Database Models

### User Model (`models/user.model.js`)

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ""
  },
  profileUrl: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  },
  likedProfiles: {
    type: [String],
    default: []
  },
  likedBy: [{
    username: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String
    },
    likedDate: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });
```

#### Field Descriptions:
- **username**: Unique GitHub username
- **name**: User's display name from GitHub
- **profileUrl**: GitHub profile URL
- **avatarUrl**: Profile picture URL
- **likedProfiles**: Array of usernames this user has liked
- **likedBy**: Array of users who liked this profile
- **timestamps**: Automatic createdAt and updatedAt fields

## Authentication System

### GitHub OAuth Integration
The application uses Passport.js with GitHub OAuth strategy for authentication:

1. **Strategy Configuration** (`passport/github.auth.js`):
   - Configures GitHub OAuth client credentials
   - Handles user creation/login logic
   - Manages user sessions

2. **Session Management**:
   - Express sessions store user authentication state
   - Session secret configured via environment variables
   - Automatic session serialization/deserialization

3. **Authentication Middleware** (`middleware/ensureAuthenticated.js`):
   - Protects routes requiring authentication
   - Validates user session before accessing protected resources

### Authentication Flow:
1. User initiates login via `/api/auth/github`
2. Redirected to GitHub OAuth authorization
3. User grants permission to application
4. GitHub redirects to `/api/auth/github/callback`
5. Server validates authorization code
6. User profile created/updated in database
7. Session established for future requests

## External API Integration

### GitHub API Integration
The backend integrates with GitHub's REST API:

- **Base URL**: `https://api.github.com`
- **Authentication**: Personal Access Token
- **Rate Limits**: 5000 requests/hour for authenticated requests
- **Endpoints Used**:
  - `/users/{username}` - User profile data
  - `/users/{username}/repos` - User repositories
  - `/search/repositories` - Repository search

### API Key Management:
- GitHub Personal Access Token stored in environment variables
- Token included in request headers for authentication
- Proper error handling for rate limiting and API failures

## Environment Configuration

Required environment variables (`.env` file):

```env
# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret

# GitHub API Access
GITHUB_API_KEY=your_github_personal_access_token

# Database Configuration
MONGO_URI=mongodb://localhost:27017/github-explorer
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# Frontend Configuration
CLIENT_BASE_URL=http://localhost:3000

# Session Configuration (optional, defaults provided)
SESSION_SECRET=your_secure_session_secret
```

### GitHub OAuth App Setup:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:5001/api/auth/github/callback`
4. Copy Client ID and Client Secret to environment variables

### GitHub Personal Access Token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token with appropriate scopes
3. Copy token to GITHUB_API_KEY environment variable

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Server will run on**: `http://localhost:5001`

## Error Handling

The API implements comprehensive error handling:

### Common Error Responses:
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

### Error Response Format:
```json
{
  "error": "Error message description"
}
```

### GitHub API Error Handling:
- Rate limiting detection and response
- Invalid username handling
- API unavailability handling
- Token expiration management

## Middleware

### `ensureAuthenticated.js`
Middleware to protect routes requiring authentication:
```javascript
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};
```

Used on routes:
- `/api/users/likes`
- `/api/users/like/:username`
- `/api/explore/repos/:language`

## Performance Considerations

- **Database Indexing**: Username field indexed for faster queries
- **Connection Pooling**: MongoDB connection pooling enabled
- **Error Caching**: Implement caching for frequently accessed data
- **Rate Limiting**: GitHub API rate limiting handled gracefully

## Development Scripts

```json
{
  "scripts": {
    "dev": "nodemon backend/server.js",
    "start": "node server.js"
  }
}
```

- **`npm run dev`**: Start development server with auto-reload
- **`npm start`**: Start production server

## Database Connection

MongoDB connection configured in `db/connectMongoDB.js`:
- Automatic reconnection handling
- Connection error logging
- Graceful shutdown procedures

## Logging

The application includes basic logging for:
- Server startup confirmation
- Database connection status
- Authentication events
- API request errors

## Testing

Recommended testing approach:
- Unit tests for controllers and middleware
- Integration tests for API endpoints
- Authentication flow testing
- Database operation testing

## Deployment

### Production Considerations:
1. **Environment Variables**: Set all required environment variables
2. **Database**: Use MongoDB Atlas or production MongoDB instance
3. **Session Store**: Consider Redis for session storage in production
4. **CORS**: Configure CORS for production frontend URL
5. **Security**: Implement additional security headers and rate limiting

### Deployment Platforms:
- **Heroku**: Easy deployment with MongoDB Atlas
- **Vercel**: Serverless deployment option
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment

---

For frontend integration, see the [Frontend README](../frontend/README.md)
