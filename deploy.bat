@echo off
REM Quick deployment setup script for Render (Windows)

echo.
echo 🚀 MoodNotes Render Deployment Setup
echo ======================================
echo.

if not exist "render.yaml" (
    echo ❌ render.yaml not found!
    exit /b 1
)

echo ✅ Configuration files ready
echo.
echo Next steps:
echo 1. Push code to GitHub:
echo    git push origin feature/frontend
echo.
echo 2. Go to https://render.com and sign up/login
echo.
echo 3. Click 'New' and select 'Blueprint' ^(Infrastructure as Code^)
echo.
echo 4. Connect your GitHub repository
echo.
echo 5. Render will automatically detect render.yaml
echo.
echo 6. Set environment variables:
echo    - SECRET_KEY ^(generate at https://www.uuidgenerator.net/^)
echo    - HF_API_KEY ^(from https://huggingface.co/settings/tokens^)
echo.
echo 7. Deploy!
echo.
echo Need detailed instructions? See DEPLOYMENT.md
echo.
