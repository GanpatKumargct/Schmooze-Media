import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Instantiate the client using Groq's compatible endpoint
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

PROMPT_TEMPLATE = """
You are an expert startup consultant. Analyze the given startup idea
and return a structured JSON object with the fields: problem,
customer, market, competitor, tech_stack, risk_level,
profitability_score, justification. 

Rules: 
- Keep answers concise and realistic. 
- 'competitor' should contain exactly 3 competitors with one-line differentiation each. 
- 'tech_stack' should be 4–6 practical technologies for MVP. 
- 'profitability_score' must be an integer between 0–100. 

Return ONLY JSON. 
"""

def generate_idea_report(title: str, description: str) -> dict:
    prompt = PROMPT_TEMPLATE + f'\nInput:\n{{ "title": "{title}", "description": "{description}" }}'
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": "You output JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        report_text = response.choices[0].message.content
        return json.loads(report_text)
    except Exception as e:
        print(f"Error calling AI: {e}")
        return {
            "error": "Failed to generate AI report",
            "details": str(e)
        }
