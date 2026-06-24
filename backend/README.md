# Backend

This is the Laravel backend for RecordTech.

Quick setup:

- Copy `.env.example` to `.env` and set DB and MAIL values.
- Run `composer install` then `php artisan key:generate`.
- Run migrations and seed the admin:

	```powershell
	Set-Location "C:\Path\To\backend";
	composer install;
	php artisan key:generate;
	php artisan migrate --seed;
	```

- Start the dev server:

	```powershell
	Set-Location "C:\Path\To\backend"; php artisan serve
	```

Sanctum / SPA auth notes:

- This project uses Laravel Sanctum for SPA cookie-based authentication. The frontend should:
	1. GET `/sanctum/csrf-cookie` (credentials included) to set the CSRF cookie.
	2. POST `/api/login` with credentials (credentials included) to establish session cookie.
	3. Subsequent protected requests must send cookies (fetch with `credentials: 'include'`).

API endpoints:
- POST `/api/login` (stateful, cookie-based)
- POST `/api/logout` (requires auth cookie)
- GET `/api/services` (public)
- GET `/api/services/{id}` (public)
- POST/PUT/DELETE `/api/services` (protected, require auth)
- POST `/api/contact`
