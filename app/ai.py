import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

# Loading the environment variables
load_dotenv()
API_KEY = os.getenv("HF_API_KEY")

# Creating the client
client = InferenceClient(token=API_KEY)

def analyze_mood(text: str):
    """
    Sends text to Hugging Face API and returns the mood.
    """
    if not text or not text.strip():
        return "neutral"

    try:
        # running the model
        response = client.text_classification(
            text,
            model="j-hartmann/emotion-english-distilroberta-base"
        )

        # the client returns a list of objects not raw json
        if response:
            # take the first one which is the highest score
            return response[0].label
        return "unknown"
    
    except Exception as e:
        print(f"AI API Error: {e}")
        return "error"
    
def generate_tags(text: str):
    keywords = ["work", "study", "family", "food", "sleep", "code", "python", "bug", "feature"]
    found_tags = [word for word in keywords if word in text.lower()]
    return ",".join(found_tags) if found_tags else "uncategorized"
