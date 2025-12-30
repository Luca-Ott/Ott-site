import os
from openai import OpenAI

client = OpenAI(
    api_key="sk-emergent-fB8F44110068d1f797",
    base_url="https://emergent-api.vercel.app/api/openai/v1"
)

response = client.images.generate(
    model="gpt-image-1",
    prompt="Professional minimalist logo for 'NoMoreFakeNews' - a project fighting against fake news and misinformation. Use orange and green colors. Modern, clean design with a newspaper or checkmark/verification icon. The logo should convey trust, truth and verification. White background, suitable for web and mobile apps.",
    n=1,
    size="1024x1024"
)

# Get the image URL or base64
print(response.data[0])
