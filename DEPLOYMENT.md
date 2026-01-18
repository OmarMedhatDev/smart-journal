# MoodNotes - Deployment Guide

This guide will help you deploy MoodNotes to production so people can access it.

## Prerequisites

- GitHub account with your repository
- Render account (free tier available) - https://render.com
- Hugging Face API key - https://huggingface.co/settings/tokens

## Deployment Options

### Option 1: Render (Recommended - Free tier available)

Render supports both Python (FastAPI backend) and Node.js (React frontend) on free tier.

#### Step 1: Prepare Your Repository

```bash
# Make sure everything is committed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Create Render Account

1. Go to https://render.com and sign up
2. Connect your GitHub account
3. Grant access to your repository

#### Step 3: Deploy Backend (FastAPI)

1. Click "New" → "Web Service"
2. Select your GitHub repository
3. Configure:
   - **Name**: `moodjournal-backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free (or paid if needed)

4. Set Environment Variables:
   - `PYTHON_VERSION`: 3.11
   - `SECRET_KEY`: Generate a strong random string (use Python: `import secrets; secrets.token_urlsafe(32)`)
   - `HF_API_KEY`: Your Hugging Face API key
   - `DATABASE_URL`: PostgreSQL URL from Render (see next step)
   - `ENVIRONMENT`: production
   - `CORS_ORIGINS`: `https://your-frontend-url.onrender.com,https://yourdomain.com`

#### Step 4: Setup PostgreSQL Database (Free Tier)

1. Go to Render Dashboard
2. Click "New" → "PostgreSQL"
3. Configure:
   - **Name**: `moodjournal-db`
   - **Plan**: Free
4. Copy the `Internal Database URL` from the database connection details
5. Set this as `DATABASE_URL` in backend environment variables

#### Step 5: Deploy Frontend (React)

1. Click "New" → "Static Site"
2. Select your GitHub repository
3. Configure:
   - **Name**: `moodjournal-frontend`
   - **Build Command**: `cd frontend-react && npm install && npm run build`
   - **Publish Directory**: `frontend-react/dist`
   - **Plan**: Free

4. Set Environment Variables:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com` (the URL from your backend service)

#### Step 6: Update Backend CORS

After deploying the frontend, update your backend's CORS origins:

```python
# In app/main.py
origins = [
    "https://your-frontend-url.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
]
```

Then commit and push. Render will auto-redeploy.

---

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Set build settings and deploy

#### Backend on Railway:
1. Go to https://railway.app
2. Create new project
3. Add GitHub repository
4. Configure start command

---

### Option 3: Heroku (Legacy - Free tier ended)

Heroku's free tier has ended. Not recommended for new deployments.

---

## Environment Variables

Create these in your deployment platform's dashboard:

### Backend Required:
- `SECRET_KEY` - Strong random string
- `HF_API_KEY` - Your Hugging Face API key
- `DATABASE_URL` - PostgreSQL connection string (production)
- `ENVIRONMENT` - Set to "production"
- `CORS_ORIGINS` - Your frontend URL

### Frontend Optional:
- `VITE_API_URL` - Backend URL (defaults to localhost:8000)

---

## Step-by-Step: Render Deployment

### 1. Update Backend for Production

```python
# app/database.py - Already handles both SQLite and PostgreSQL
# Update app/main.py CORS:

origins = [
    "https://your-frontend-url.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000",
]
```

### 2. Create .env.example Files

Already created for reference:
- `.env.example` - Backend configuration template
- `frontend-react/.env.example` - Frontend configuration template

### 3. Commit and Push

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 4. Deploy on Render

Follow the steps above.

---

## Post-Deployment Checklist

- [ ] Backend is running (test `/` endpoint)
- [ ] Frontend is deployed and accessible
- [ ] CORS is properly configured
- [ ] Login works
- [ ] Can create notes
- [ ] Mood detection works (requires HF API key)
- [ ] Database connection works

---

## Troubleshooting

### Backend won't start
- Check Python version is 3.11 or higher
- Verify all dependencies in requirements.txt are available
- Check environment variables are set correctly

### Frontend can't connect to backend
- Verify backend URL in frontend environment variables
- Check CORS origins in backend include frontend URL
- Use browser DevTools to check API calls

### Database connection fails
- Verify DATABASE_URL format
- Ensure PostgreSQL service is running
- Check credentials are correct

### Mood detection not working
- Verify HF_API_KEY is set in environment
- Check Hugging Face API key is valid
- Verify API quota isn't exceeded

---

## Accessing Your App

After successful deployment:

- **Frontend**: Visit your Render frontend URL
- **Backend API**: https://your-backend-url.onrender.com/
- **Documentation**: https://your-backend-url.onrender.com/docs

---

## Monitoring & Maintenance

- Check Render dashboard for logs
- Monitor database usage
- Keep dependencies updated
- Backup database periodically

---

## Next Steps

1. Set up custom domain (optional)
2. Enable HTTPS/SSL
3. Set up automated backups
4. Monitor performance and costs

