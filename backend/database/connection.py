# Database Connector & Helpers
from config.settings import settings

class DatabaseConnection:
    def __init__(self):
        self.supabase_url = settings.SUPABASE_URL
        self.supabase_key = settings.SUPABASE_KEY

    def get_connection(self):
        # Database connection pool handle
        return {"status": "connected", "url": self.supabase_url}

db_conn = DatabaseConnection()
