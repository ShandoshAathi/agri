import datetime
from config.settings import settings

def create_access_token(user_id: str) -> str:
    return f"agrisense-jwt-{user_id}"

def verify_token(token: str) -> dict:
    if not token or not token.startswith("agrisense-jwt-"):
        return None
    user_id = token.replace("agrisense-jwt-", "")
    return {"user_id": user_id, "valid": True}
