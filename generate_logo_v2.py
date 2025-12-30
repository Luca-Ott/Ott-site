from google import genai
from google.genai import types
import base64
import httpx

# Create client with Emergent endpoint
client = genai.Client(
    api_key="sk-emergent-fB8F44110068d1f797",
    http_options={"base_url": "https://emergent-api.vercel.app/api/google/v1beta"}
)

# Generate image using Imagen
response = client.models.generate_images(
    model="imagen-3.0-generate-002",
    prompt="Professional minimalist logo for 'NoMoreFakeNews' - a project fighting fake news. Orange and green colors. Modern clean design with checkmark verification icon. White background. Suitable for web app.",
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio="1:1"
    )
)

# Save the image
for i, image in enumerate(response.generated_images):
    image_bytes = image.image.image_bytes
    with open(f"/app/frontend/assets/nomorefakenews-logo.png", "wb") as f:
        f.write(image_bytes)
    print(f"Logo saved successfully!")
