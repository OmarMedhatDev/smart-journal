import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import json

# Loading the environment variables
load_dotenv()
API_KEY = os.getenv("HF_API_KEY")

# Creating the client
client = InferenceClient(token=API_KEY)

def analyze_mood(text: str):
    """
    Uses AI to extract mood keywords and emotional context from the text.
    Returns detected mood keywords as a comma-separated string.
    """
    if not text or not text.strip():
        return "neutral"

    try:
        # Use text generation to extract mood keywords
        prompt = f"""Analyze the following text and extract the main mood/emotional keywords in 1-3 words. Return ONLY the mood keywords separated by commas, nothing else. Examples: "happy, excited", "sad, anxious", "frustrated, stressed", "calm, peaceful".

Text: {text}

Mood keywords:"""
        
        response = client.text_generation(
            prompt,
            max_new_tokens=50,
            temperature=0.7
        )
        
        if response and response.strip():
            # Clean up the response - remove any extra text
            mood = response.strip().lower()
            # Remove common prefixes if present
            mood = mood.replace("mood:", "").replace("keywords:", "").strip()
            # Keep only the mood part (first sentence)
            mood = mood.split('\n')[0].strip()
            return mood if mood else "neutral"
        return "neutral"
    
    except Exception as e:
        print(f"AI API Error: {e}")
        # Fallback: use emotion classification
        try:
            response = client.text_classification(
                text,
                model="j-hartmann/emotion-english-distilroberta-base"
            )
            if response:
                return response[0].label
            return "neutral"
        except:
            return "neutral"
    
def generate_tags(text: str):
    keywords = ["work", "study", "family", "food", "sleep", "code", "python", "bug", "feature"]
    found_tags = [word for word in keywords if word in text.lower()]
    return ",".join(found_tags) if found_tags else "uncategorized"
