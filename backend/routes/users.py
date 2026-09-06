from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
def get_current_user():
    return {
        "id": "usr-001",
        "name": "Alex Morgan",
        "email": "alex@agrisense.io",
        "role": "Farm Manager"
    }

@router.get("/")
def get_all_users():
    return [
        {"id": "usr-001", "name": "Alex Morgan", "email": "alex@agrisense.io", "role": "Farm Manager"},
        {"id": "usr-002", "name": "John Doe", "email": "john@agrisense.io", "role": "Farmer"}
    ]
