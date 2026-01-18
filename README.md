# MoodNotes 📝

A modern mood journaling application that uses AI to detect your emotional state from your written entries.

## Features ✨

- **AI-Powered Mood Detection** 🤖 - Automatically detects mood keywords from your journal entries
- **User Authentication** 🔐 - Secure login and registration with JWT tokens
- **Create & View Notes** 📖 - Write and manage your mood journal entries
- **Mood Analysis** 📊 - Visual analytics of your mood patterns over time
- **Settings & Preferences** ⚙️ - Customize your account and preferences
- **Responsive Design** 📱 - Works on desktop, tablet, and mobile devices
- **Dark Mode** 🌙 - Eye-friendly dark purple and green themed UI

## Tech Stack 🛠️

### Frontend
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- Recharts for mood analytics

### Backend
- FastAPI with Python
- SQLAlchemy ORM
- PostgreSQL/SQLite database
- JWT for authentication
- Hugging Face AI for mood detection

## Getting Started 🚀

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- PostgreSQL (optional, SQLite works for development)

### Installation

#### Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Update .env with your values
# - SECRET_KEY: Generate with: python -c "import secrets; print(secrets.token_urlsafe(32))"
# - HF_API_KEY: Get from https://huggingface.co/settings/tokens

# Run backend server
uvicorn app.main:app --reload
```

Backend will be available at `http://localhost:8000`

#### Frontend Setup
```bash
cd frontend-react

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Project Structure 📁

```
smart-journal/
├── app/                          # Backend (FastAPI)
│   ├── main.py                  # Application entry point
│   ├── models.py                # SQLAlchemy models
│   ├── schemas.py               # Pydantic schemas
│   ├── crud.py                  # Database operations
│   ├── ai.py                    # AI mood detection
│   ├── utils.py                 # Utilities (JWT, password hashing)
│   ├── database.py              # Database connection
│   └── config.py                # Configuration
│
├── frontend-react/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── CreateNote.jsx
│   │   │   ├── ViewNotes.jsx
│   │   │   ├── MoodAnalysis.jsx
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   └── Settings.jsx
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── requirements.txt             # Python dependencies
├── Procfile                     # For Heroku/Railway deployment
├── render.yaml                  # For Render deployment
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md                   # This file
```

## API Endpoints 🔌

### Authentication
- `POST /token` - Login and get JWT token
- `POST /users/` - Register new user
- `GET /users/me` - Get current user

### Notes
- `POST /notes/` - Create a new note
- `GET /notes/` - Get all notes for current user
- `DELETE /notes/{note_id}` - Delete a note

### Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)

## Features Details 🎯

### AI Mood Detection
- Analyzes the text content of your notes
- Detects emotional keywords (e.g., "happy, excited", "frustrated, stressed")
- Uses Hugging Face AI models for accurate emotion recognition
- Unlimited mood combinations (not restricted to predefined moods)

### Security
- Passwords are hashed with bcrypt
- JWT tokens for secure authentication
- User data is isolated (users can only see their own notes)
- CORS protection for cross-origin requests

### Mood Analysis
- Visualize mood patterns over time
- Pie charts showing mood distribution
- Track emotional trends

## Environment Variables 📋

Create a `.env` file in the root directory:

```env
# Backend
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
DATABASE_URL=sqlite:///./sql_app.db

# AI/ML
HF_API_KEY=your-huggingface-api-key

# Environment
ENVIRONMENT=development

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Deployment 🌐

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Render (Free):**

1. Push code to GitHub
2. Connect Render to GitHub
3. Deploy backend and frontend as separate services
4. Set environment variables in Render dashboard
5. Your app is live!

## Usage 💡

### Creating a Mood Note
1. Log in with your credentials
2. Click "Create Note"
3. Write a title and your thoughts
4. Submit - AI automatically detects your mood
5. View your note with detected mood keywords

### Analyzing Moods
1. Go to "Mood Analysis"
2. View charts showing your mood distribution
3. See emotional patterns over time

### Managing Notes
1. Go to "View Notes"
2. See all your journal entries
3. Delete notes you no longer want
4. All notes are encrypted and secure

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting 🔧

### Backend won't start
- Ensure Python 3.11+ is installed
- Verify virtual environment is activated
- Check all dependencies: `pip install -r requirements.txt`

### Frontend won't run
- Ensure Node.js 18+ is installed
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 5173 is available

### Can't log in
- Verify backend is running
- Check email/password are correct
- Clear browser localStorage and try again

### Mood detection not working
- Verify HF_API_KEY is set in .env
- Check Hugging Face API is accessible
- Verify API quota isn't exceeded

## Performance Tips ⚡

- **Frontend**: Uses Vite for fast build times
- **Backend**: FastAPI is highly performant
- **Database**: SQLite for development, PostgreSQL recommended for production
- **AI**: Uses efficient transformer models from Hugging Face

## License 📄

This project is open source and available under the MIT License.

## Support 💬

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

## Roadmap 🗺️

- [ ] Export notes to PDF
- [ ] Share mood insights with friends
- [ ] Mobile app version
- [ ] Voice-to-text note creation
- [ ] Multi-language support
- [ ] Social features
- [ ] Advanced analytics and predictions

---

Made with ❤️ for better mood tracking and emotional awareness.
