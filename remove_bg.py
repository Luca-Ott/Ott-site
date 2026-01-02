from rembg import remove
from PIL import Image
import io

# Load the original image
input_path = "/app/frontend/assets/nomorefakenews-logo.png"
output_path = "/app/frontend/assets/nomorefakenews-logo-transparent.png"

# Read image
with open(input_path, "rb") as f:
    input_data = f.read()

# Remove background
output_data = remove(input_data)

# Save as PNG with transparency
with open(output_path, "wb") as f:
    f.write(output_data)

print(f"Done! Transparent logo saved to {output_path}")
