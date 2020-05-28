# CRM-Rivo

Install the project:

1. Clone project from REPO (https://github.com/developerscompany/react-crm.git)
2. Install laravel packages - `composer install`
3. Install node packages - `npm install`
4. Copy file .ENV.EXAMPLE to file .ENV
5. Set key for project - `php artisan key:generate`
6. Create DB and write credentials for DB in .ENV file
7. Filling DB - `php artisan migrate:refresh --seed`
8. Create the encryption keys needed to generate secure access tokens - `php artisan passport:install`
9. Run `php artisan storage:link` to creating symbol link to storage folder
10. Generate ide helper file `php artisan ide-helper:generate` and `php artisan ide-helper:meta` for eloquent methods (PhpStrorm see filleble, methods)  
