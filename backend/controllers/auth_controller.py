from authentication.jwt_auth import create_access_token
from schemas.payload import UserLoginPayload, UserRegisterPayload

class AuthController:
    def login(self, payload: UserLoginPayload):
        token = create_access_token(payload.email)
        user = {
            "id": f"u-{hash(payload.email) % 10000}",
            "name": payload.email.split("@")[0].title(),
            "email": payload.email,
            "role": payload.role if hasattr(payload, 'role') else "manager"
        }
        return {"access_token": token, "token_type": "bearer", "user": user}

    def register(self, payload: UserRegisterPayload):
        token = create_access_token(payload.email)
        user = {
            "id": f"u-reg-101",
            "name": payload.name,
            "email": payload.email,
            "role": payload.role
        }
        return {"access_token": token, "token_type": "bearer", "user": user}

auth_controller = AuthController()
