import google.generativeai as genai
from google.generativeai import types
import base64

# Configure Gemini with Emergent key
genai.configure(
    api_key="sk-emergent-fB8F44110068d1f797",
    transport="rest",
    client_options={"api_endpoint": "https://emergent-api.vercel.app/api/google"}
)

# Use Nano Banana model for image generation
model = genai.ImageGenerationModel("nano-banana")

result = model.generate_images(
    prompt="Professional minimalist logo for 'NoMoreFakeNews' - a project fighting against fake news. Use orange and green colors. Modern clean design with newspaper or checkmark icon. White background.",
    number_of_images=1,
    aspect_ratio="1:1"
)

# Save the image
for i, image in enumerate(result.images):
    with open(f"/app/frontend/assets/nomorefakenews-logo.png", "wb") as f:
        f.write(image._pil_image.tobytes() if hasattr(image, '_pil_image') else base64.b64decode(image.data))
    print(f"Logo saved to /app/frontend/assets/nomorefakenews-logo.png")
