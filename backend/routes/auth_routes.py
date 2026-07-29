from fastapi import APIRouter
from schemas.payload import UserLoginPayload, UserRegisterPayload
from controllers.auth_controller import auth_controller

router = APIRouter()

@router.post("/login")
def login(payload: UserLoginPayload):
    return auth_controller.login(payload)

@router.post("/register")
def register(payload: UserRegisterPayload):
    return auth_controller.register(payload)
