from fastapi import APIRouter, File, UploadFile
from controllers.ai_controller import ai_controller

router = APIRouter()

@router.post("/diagnosis")
@router.post("/disease-diagnosis")
async def diagnose_disease(file: UploadFile = File(...)):
    contents = await file.read()
    return ai_controller.diagnose(contents, file.filename)

