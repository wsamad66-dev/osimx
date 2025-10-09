# Uploads Directory

This directory stores uploaded student documents.

## Security Notes
- Add this directory to `.gitignore` to prevent committing uploaded files
- Ensure proper file permissions on production server
- Implement virus scanning for production use
- Set up regular backups

## Structure
```
/public/uploads/students/
  └── [timestamp]_[filename].[ext]
```

## File Naming Convention
Files are automatically renamed on upload:
- Format: `{timestamp}_{sanitized_filename}`
- Example: `1704809123456_passport.pdf`

This prevents:
- File name conflicts
- Path traversal attacks
- Special character issues
