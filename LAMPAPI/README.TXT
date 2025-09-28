Contact Manager API
REST API endpoints for contact management using LAMP stack.
Endpoints

Login.php - User authentication
Register.php - User registration
AddContacts.php - Create contact
SearchContacts.php - Search contacts (partial matching)
DeleteContact.php - Remove contact
GetContacts.php - List all contacts (in progress)
UpdateContact.php - Modify contact (in progress)

Frontend Integration Guide
All endpoints use POST method with Content-Type: application/json

General Pattern:

const response = await fetch('/LAMPAPI/[endpoint].php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...data})
});
const result = await response.json();

Common Requirements:

-All contact operations require userId parameter
-Update/Delete operations require contactId parameter
-Check result.error - empty string means success
-Contact lists returned in result.results array
-Single contacts returned directly in result object

Error Handling:
    
if (result.error === "") {
    // Success - use result data
} else {
    // Error - display result.error message
}

Deployment
Upload to: /var/www/html/LAMPAPI/