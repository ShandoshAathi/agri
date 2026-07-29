from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
import datetime

router = APIRouter()

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    role: str  # 'manager' or 'farmer'

# Mock user database for development
MOCK_USERS = {
    "manager@agrisense.io": {
        "id": "u-101",
        "name": "Dr. Sarah Jenkins",
        "email": "manager@agrisense.io",
        "role": "manager",
        "phone": "+1 (555) 019-2834",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },
    "farmer@agrisense.io": {
        "id": "u-102",
        "name": "Elena Rostova",
        "email": "farmer@agrisense.io",
        "role": "farmer",
        "phone": "+1 (555) 014-9921",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
}

@router.post("/login")
def login(payload: UserLogin):
    user = MOCK_USERS.get(payload.email)
    if not user:
        # Allow instant mock login for any valid email during demo
        user = {
            "id": f"u-{hash(payload.email) % 10000}",
            "name": payload.email.split("@")[0].replace(".", " ").title(),
            "email": payload.email,
            "role": "manager" if "manager" in payload.email else "farmer",
            "phone": "+1 (555) 123-4567",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        }
    
    return {
        "access_token": f"mock-jwt-token-{user['id']}",
        "token_type": "bearer",
        "user": user
    }

@router.post("/register")
def register(payload: UserRegister):
    new_user = {
        "id": f"u-{datetime.datetime.now().microsecond}",
        "name": payload.name,
        "email": payload.email,
        "role": payload.role if payload.role in ["manager", "farmer"] else "farmer",
        "phone": "+1 (555) 000-0000",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
    MOCK_USERS[payload.email] = new_user
    return {
        "access_token": f"mock-jwt-token-{new_user['id']}",
        "token_type": "bearer",
        "user": new_user
    }

@router.get("/me")
def get_current_user():
    return list(MOCK_USERS.values())[0]
