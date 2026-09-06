from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_farmers():
    return [
        {"id": "fm-101", "name": "John Doe", "assigned_farms": ["farm-01", "farm-02"], "phone": "+1-555-0192"},
        {"id": "fm-102", "name": "Maria Garcia", "assigned_farms": ["farm-03"], "phone": "+1-555-0144"}
    ]

@router.get("/{farmer_id}")
def get_farmer(farmer_id: str):
    return {"id": farmer_id, "name": "John Doe", "assigned_farms": ["farm-01", "farm-02"], "phone": "+1-555-0192"}
