28 Auto Tracker — Supabase Cloud version

This version:
- uses Supabase Auth for login
- stores cars and expenses in Supabase
- stores photos in private bucket `car-photos`
- syncs Mac and iPhone
- keeps desktop layout from v26 and mobile.css for iPhone

Upload all files to the ROOT of the same GitHub repository, replacing existing files.

Login with the Supabase user you created.

Security:
- only the publishable key is in frontend code
- RLS policies must be enabled on cars/expenses/storage
- never put service_role or database password in GitHub
