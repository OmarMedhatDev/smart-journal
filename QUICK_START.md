# 🚀 QUICK DEPLOYMENT GUIDE - MoodNotes

Get your app live in 15 minutes with Render!

## Step 1: Prepare Your Code ✅

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin feature/frontend  # or your branch name
```

## Step 2: Create Render Account 🔐

1. Go to **https://render.com**
2. Click "Sign up with GitHub"
3. Authorize Render to access your GitHub
4. Grant access to your repository

## Step 3: Get Your API Keys 🔑

Before deployment, you'll need:

### Hugging Face API Key (for AI mood detection)
1. Go to **https://huggingface.co/settings/tokens**
2. Create a new token (read-only is fine)
3. Copy the token - you'll need this in Step 5

### Secret Key (for JWT authentication)
Generate a random string:
- Visit **https://www.uuidgenerator.net/**
- Copy the generated UUID
- This will be your SECRET_KEY

## Step 4: Deploy Backend 🔧

### On Render Dashboard:

1. Click **"New" → "Web Service"**
2. Select your GitHub repository
3. Fill in the form:
   - **Name:** `moodjournal-backend`
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free (changes nothing, same performance)

4. Click **"Create Web Service"**
5. Wait for it to build and deploy

### Set Environment Variables:

While it's building, scroll down to **"Environment"**:

| Key | Value |
|-----|-------|
| `PYTHON_VERSION` | `3.11` |
| `SECRET_KEY` | Your generated UUID from Step 3 |
| `HF_API_KEY` | Your Hugging Face token from Step 3 |
| `ENVIRONMENT` | `production` |
| `DATABASE_URL` | *Will add after creating database* |

## Step 5: Create PostgreSQL Database 🗄️

1. From Render Dashboard, click **"New" → "PostgreSQL"**
2. Fill in:
   - **Name:** `moodjournal-db`
   - **Plan:** Free
   - **Region:** Same as backend (usually Oregon)

3. Click **"Create Database"**
4. Wait for database to be ready
5. Copy the **"Internal Database URL"** from connection details
6. Add to backend environment variables as `DATABASE_URL`

## Step 6: Update Backend CORS

After backend URL is ready:

1. In your code, update `app/main.py`:
```python
origins = [
    "https://your-frontend-url.onrender.com",  # Add your frontend URL here
    "http://localhost:5173",
    "http://localhost:3000",
]
```

2. Commit and push:
```bash
git add app/main.py
git commit -m "Update CORS for production"
git push origin feature/frontend
```

3. Render will auto-redeploy

## Step 7: Deploy Frontend 🎨

1. From Render Dashboard, click **"New" → "Static Site"**
2. Select your GitHub repository
3. Fill in:
   - **Name:** `moodjournal-frontend`
   - **Build Command:** `cd frontend-react && npm install && npm run build`
   - **Publish Directory:** `frontend-react/dist`
   - **Plan:** Free

4. Click **"Create Static Site"**

### Set Frontend Environment Variables:

- **Key:** `VITE_API_URL`
- **Value:** Your backend URL (from backend service details page, e.g., `https://moodjournal-backend.onrender.com`)

## Step 8: Verify Deployment ✨

Your app should now be live! Check:

1. **Frontend:** `https://your-frontend-url.onrender.com`
2. **Backend API:** `https://your-backend-url.onrender.com/docs`

### Test the app:
- [ ] Can you access the login page?
- [ ] Can you register a new account?
- [ ] Can you log in?
- [ ] Can you create a note?
- [ ] Does mood detection work?

## Troubleshooting 🔧

### Backend not starting?
- Check logs in Render dashboard
- Verify Python version is 3.11+
- Ensure all environment variables are set

### Can't connect to backend?
- Check `VITE_API_URL` in frontend environment
- Verify CORS origins in backend code
- Check browser console for error messages

### Database connection error?
- Verify `DATABASE_URL` is correct
- Check PostgreSQL service is ready
- Wait 1-2 minutes for database to fully initialize

### Mood detection not working?
- Verify `HF_API_KEY` is set
- Check API key is valid at huggingface.co
- Check quota on Hugging Face

## Performance Tips ⚡

- **Free tier performance:** Should handle 100+ concurrent users
- **Database:** Free PostgreSQL has 256MB limit - enough for thousands of notes
- **Auto-sleep:** Services sleep after 15 min of inactivity (restart in <30 sec)

## What's Next? 🎯

### Add Custom Domain (Optional)
1. In Render service settings
2. Add your custom domain
3. Follow DNS setup instructions

### Enable HTTPS
- Already enabled by default on Render

### Monitor Performance
- Use Render dashboard metrics
- Check error logs regularly
- Scale up if needed

### Backup Database
- Use Render's automated backups
- Or export manually via PostgreSQL tools

## Accessing Your App

After successful deployment:

| Service | URL |
|---------|-----|
| **Web App** | `https://moodjournal-frontend.onrender.com` |
| **API Docs** | `https://moodjournal-backend.onrender.com/docs` |
| **API Base** | `https://moodjournal-backend.onrender.com` |

## Cost Breakdown

- **Frontend Static Site:** FREE ✅
- **Backend Web Service:** FREE ✅ (limited hours/month)
- **PostgreSQL Database:** FREE ✅ (256MB)
- **Custom Domain:** $0 - $10/month (optional)

**Total Cost for Basic Deployment: $0** 🎉

---

## Need More Help?

- Detailed guide: See `DEPLOYMENT.md`
- Full documentation: See `README.md`
- Render documentation: https://render.com/docs

---

**Congratulations! Your MoodNotes app is now live! 🎊**

Share the link with your friends and let them start tracking their moods!
