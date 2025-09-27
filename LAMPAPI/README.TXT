Contact Manager API

REST API endpoints for contact management using LAMP stack.
Endpoints:
    -Login.php - User authentication
    -Register.php - User registration
    -AddContacts.php - Create contact
    -SearchContacts.php - Search contacts (partial matching)
    -DeleteContact.php - Remove contact
    -GetContacts.php - List all contacts (in progress)
    -UpdateContact.php - Modify contact (in progress)

Usage
Method: POST
Content-Type: application/json

Examples:

    Login:
        POST /LAMPAPI/Login.php
        {"login": "username", "password": "password"}
    
    Add Contact:
        POST /LAMPAPI/AddContacts.php
        {"userId": 123, "firstName": "John", "lastName": "Doe", "email": "john@email.com", "phone": "555-1234", "company": "Tech Corp"}

    Search:
        POST /LAMPAPI/SearchContacts.php
        {"userId": 123, "search": "john"}

Deployment:
        Update database credentials in all .php files before uploading:
            php$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

Change to actual server credentials.
    Upload to: /var/www/html/LAMPAPI/