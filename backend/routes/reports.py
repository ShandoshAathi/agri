from fastapi import APIRouter

router = APIRouter()

@router.get("/available")
def get_available_reports():
    return [
        {"id": "rep-01", "title": "Weekly Moisture & Weather Summary", "date": "2026-08-01", "format": "PDF"},
        {"id": "rep-02", "title": "Monthly Water Conservation Report", "date": "2026-07-31", "format": "XLSX"}
    ]

@router.get("/download/{report_id}")
def download_report(report_id: str):
    return {"status": "ready", "report_id": report_id, "download_url": f"/static/reports/{report_id}.pdf"}
