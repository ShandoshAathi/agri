# Database Backup & Recovery Guide

## 1. Automated PostgreSQL Dump (`pg_dump`)
Run the following command to export schema and data:
```bash
pg_dump -h localhost -U postgres -d agrisense_db -F c -b -v -f database/backup/agrisense_backup_$(date +%Y%m%d).dump
```

## 2. Restore Database
To restore from a binary `.dump` file:
```bash
pg_restore -h localhost -U postgres -d agrisense_db -v database/backup/agrisense_backup_YYYYMMDD.dump
```

## 3. Supabase CLI Migration Export
```bash
supabase db dump --data-only > database/backup/supabase_data_backup.sql
```
