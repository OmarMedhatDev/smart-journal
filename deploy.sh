#!/bin/bash
# Quick deployment setup script for Render

echo "🚀 MoodNotes Render Deployment Setup"
echo "======================================"
echo ""

# Check if required files exist
if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml not found!"
    exit 1
fi

echo "✅ Configuration files ready"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub:"
echo "   git push origin feature/frontend"
echo ""
echo "2. Go to https://render.com and sign up/login"
echo ""
echo "3. Click 'New' and select 'Blueprint' (Infrastructure as Code)"
echo ""
echo "4. Connect your GitHub repository"
echo ""
echo "5. Render will automatically detect render.yaml"
echo ""
echo "6. Set environment variables:"
echo "   - SECRET_KEY (generate with: python -c 'import secrets; print(secrets.token_urlsafe(32))')"
echo "   - HF_API_KEY (from https://huggingface.co/settings/tokens)"
echo ""
echo "7. Deploy!"
echo ""
echo "Need detailed instructions? See DEPLOYMENT.md"
