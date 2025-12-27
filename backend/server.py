from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import Optional
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

app = FastAPI(title="ON TIME TECHNOLOGY API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client.ott_database

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str
    form_type: str = "general"  # general or investor
    company_name: Optional[str] = None
    phone: Optional[str] = None
    created_at: Optional[datetime] = None

class InvestorInquiry(BaseModel):
    company_name: str
    name: str
    surname: str
    email: EmailStr
    phone: str
    message: str
    created_at: Optional[datetime] = None

@app.get("/")
async def root():
    return {"message": "On Time Technology API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@app.post("/api/contact")
async def submit_contact_form(form: ContactForm):
    try:
        form.created_at = datetime.utcnow()
        result = await db.contacts.insert_one(form.dict())
        return {
            "message": "Contact form submitted successfully",
            "id": str(result.inserted_id),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting form: {str(e)}")

@app.post("/api/investor-inquiry")
async def submit_investor_inquiry(inquiry: InvestorInquiry):
    try:
        inquiry.created_at = datetime.utcnow()
        result = await db.investor_inquiries.insert_one(inquiry.dict())
        return {
            "message": "Investor inquiry submitted successfully",
            "id": str(result.inserted_id),
            "status": "success",
            "note": "Our team will contact you shortly at luca@ott4fututre.com"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting inquiry: {str(e)}")

@app.get("/api/company-info")
async def get_company_info():
    return {
        "name": "On Time Technology Ltd",
        "tagline": "Information Technology Company - SW Engineering - SW Development",
        "address": "The Black Church - St Mary's Place, Dublin, D07 P4AX, Ireland",
        "email": "Info@ott4future.com",
        "phone": "+447775682831",
        "logo_url": "https://assets.mywebsite-editor.com/user/e54dca75-a95e-43bb-ac7f-e04a22ca9584/402f4cab-f3db-457d-9e4f-21ffd3914a68",
        "services": [
            {
                "title": "Software Design",
                "description": "Innovative software design solutions tailored to your business needs"
            },
            {
                "title": "Software Development",
                "description": "Custom software development with cutting-edge technologies"
            },
            {
                "title": "R&D",
                "description": "Research and development for next-generation solutions"
            },
            {
                "title": "Special Projects",
                "description": "Unique and innovative projects tackling real-world challenges"
            }
        ],
        "special_projects": [
            {
                "name": "NoMoreFakeNews",
                "description": "An innovative project in development designed to combat fake news and misinformation. Our solution aims to identify, flag, and eventually eliminate fake news through advanced AI and verification technologies.",
                "status": "In Development",
                "investor_contact": True
            },
            {
                "name": "Custodiy",
                "description": "A modular platform designed to empower individuals and businesses. Whether you're an entrepreneur establishing a marketplace, a seller expanding reach, or an organization facilitating OTC transactions and fundraising, Custodiy provides the tools and support needed.",
                "features": [
                    "OTC Service for token trading",
                    "Escrow Service via smart contracts",
                    "Marketplace for products and services",
                    "Secure document storage and management"
                ],
                "website": "https://custodiy.com",
                "logo": "https://custodiy.com/static/media/custodiy.cf5be9dd4c6daac32193.png"
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)