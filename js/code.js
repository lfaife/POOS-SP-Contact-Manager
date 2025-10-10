// urlBase configuration
const urlBase = 'https://cop4331-azurebase-contact-manager.com/LAMPAPI';
const extension = 'php';

// Sets the starting data of these values across all functions
let userId = 0;
let firstName = "";
let lastName = "";

// Array to hold contact IDs for easy reference
const cids = [];

// Global variable to track which contact is being edited
let currentEditingContactId = null;

function doLogin(event)
{
    if (event)
    {
        event.preventDefault();
    }
       

        // Reassigns variables for this function scrope
        userId = 0;
        firstName = "";
        lastName = "";

        // Grabs the values for username / password
        let login = document.getElementById("loginName").value;
        let password = document.getElementById("loginPassword").value;
//      var hash = md5( password );

        // Resets the value in loginResult do display ""
        // Clears any prev errors messages before starting login
        document.getElementById("loginResult").innerHTML = "";

        // Stores login / password as object key-value pairs for parsing
        let tmp = {
                login: login,
                password: password
        };

        // This was already commented out
//      var tmp = {login:login,password:hash};

	// Parses tmp into a JSON 
	let jsonPayload = JSON.stringify( tmp );
	// ----
	// Here we grab urlBase + php file + file extension
	let url = urlBase + '/Login.' + extension;

        // Creates a new request manager (older version of Fetch)
        let xhr = new XMLHttpRequest();

        // Sets the parameters for the request. (Method, URL, is it async or not)
        xhr.open("POST", url, true);

        // Tells server to expect json data and its the type of char encoding
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        //----
        try
        {
                // Sets an event handler anytime the state of XMLHttpRequest's state changes
                xhr.onreadystatechange = function()
                {
                        // onreadstatechange has 5 states (0-4): unsent, opened, headers_received, loading, done. There are multiple statuses: 200, 404, 405 which are HTTP errors etc
                        // # 4 means request is complete and status of 200 means response was successful
                        if (this.readyState == 4 && this.status == 200)
                        {
                                // converts the JSON response from our given form data back into a JS object
                                let jsonObject = JSON.parse( xhr.responseText );

                                // Gets the userId from the server response
                                userId = jsonObject.id;

                                // Sets an error msg for loginResult for a failed login attempt & sets why
                                if( userId < 1 )
                                {
                                        document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                                        return; // exits from event handler funciton
                                }

                                // Retrives the first and last name of user if successful
                                firstName = jsonObject.firstName;
                                lastName = jsonObject.lastName;

                                // Calls saveCookie() function to store user in a browser cookie
                                saveCookie();

                                // Sends user to next page
                                window.location.href = "contacts.html";
                        }
                };
                // What sends request with JSON data container username / password
                xhr.send(jsonPayload);
        }

        // This catches js errors like with JSON parsing so if error found, it gives an err msg
        catch(err)
        {
                document.getElementById("loginResult").innerHTML = err.message;
        }

}

//This function is very similar to doLogin(), with some key differences
function doRegister(event)
{
    if (event)
    {
        event.preventDefault();
    }
	
	// Reassigns variables for this function's scope
	userId = 0;
	firstName = "";
	lastName = "";
	
	// Grabs the values for first name, last name, username, and password
	let firstN = document.getElementById("firstName").value;
	let lastN = document.getElementById("lastName").value;
	let register = document.getElementById("registerName").value;
	let password = document.getElementById("registerPassword").value;
//	var hash = md5( password );
	
	// Resets the value in registerResult do display ""
	// Clears any prev errors messages before starting register
	document.getElementById("registerResult").innerHTML = "";

        // Stores information as an object key-value pair for parsing
        let tmp =
        {
                firstName: firstN,
                lastName: lastN,
                login: register,
                password: password
        };

        // This was already commented out
//      var tmp = {login:login,password:hash};

        // Parses tmp into a JSON
        let jsonPayload = JSON.stringify( tmp );
        // ----
        // Here we grab urlBase + php file + file extension
        let url = urlBase + '/Register.' + extension;

        // Creates a new request manager (older version of Fetch)
        let xhr = new XMLHttpRequest();

        // Sets the parameters for the request. (Method, URL, is it async or not)
        xhr.open("POST", url, true);

        // Tells server to expect json data and its the type of char encoding
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        //----
        try
        {
                // Sets an event handler anytime the state of XMLHttpRequest's state changes
                xhr.onreadystatechange = function()
                {
                        // onreadstatechange has 5 states (0-4): unsent, opened, headers_received, loading, done. There are multiple statuses: 200, 404, 405 which are HTTP errors etc
                        // # 4 means request is complete and status of 200 means response was successful
                        if (this.readyState == 4 && this.status == 200)
                        {
                            // converts the JSON response from our given form data back into a JS object
                            let jsonObject = JSON.parse( xhr.responseText );

                            // Gets the userId from the server response
                            userId = jsonObject.id;

                            // Handle registration errors (e.g., user already exists)
                            if (userId < 1 || (jsonObject.error && jsonObject.error.length > 0))
                            {
                                document.getElementById("registerResult").innerHTML = jsonObject.error || "Registration failed";
                                return;
                            }
                            
                            // Adds the user into the database
                            document.getElementById("registerResult").innerHTML = "User added, redirecting...";

                            // Retrives the first and last name of user if successful
                            firstName = jsonObject.firstName;
                            lastName = jsonObject.lastName;

                            // Calls saveCookie() function to store user in a browser cookie
                            saveCookie();

                            // Sends user to next page
                            window.location.href = "contacts.html";
                        }
                    };
                            // What sends request with JSON data container username / password
                     xhr.send(jsonPayload);
                }

                // This catches js errors like with JSON parsing so if error found, it gives an err msg
                catch(err)
                {
                    document.getElementById("registerResult").innerHTML = err.message;
                }
    }
    

//Saves the information of a user for easy access later
function saveCookie()
{
        let minutes = 20;
        let date = new Date();
        date.setTime(date.getTime()+(minutes * 60* 1000));
        document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

        // Reads cookie to get user session
        function readCookie() {
            let data = document.cookie;
            let splits = data.split(",");
            for(var i = 0; i < splits.length; i++) {
                let thisOne = splits[i].trim();
                let tokens = thisOne.split("=");
                if(tokens[0] == "firstName"){
                        firstName = tokens[1];
                }
                else if(tokens[0] == "lastName"){
                        lastName = tokens[1];
                }
                else if(tokens[0] == "userId") {
                    userId = parseInt(tokens[1].trim());
                }
        }

            if(userId < 1) {
                window.location.href = "index.html";
        }
}

        // Adds a Contact to a user's list of contacts
        function addContact(event) {
        if (event)
        {
            event.preventDefault();
        }

        let addFirstN = document.getElementById("addFirstName").value;
        let addLastN = document.getElementById("addLastName").value;
        let addEmail = document.getElementById("addEmail").value;
        let addPhoneN = document.getElementById("addPhoneNumber").value;

        document.getElementById("contactAddResult").innerHTML = "";

            const contactData = {
                userId: userId,
                firstName: addFirstN,
                lastName: addLastN,
                email: addEmail,
                phone: addPhoneN
        };

        let jsonPayload = JSON.stringify(contactData);
        let url = urlBase + '/AddContacts.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        
        try {
                xhr.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                                let response = JSON.parse(xhr.responseText);
                                
                                if(response.error && response.error !== "") {
                                        document.getElementById("contactAddResult").innerHTML = response.error;
                                        document.getElementById("contactAddResult").className = "result-message error";
                                } else {
                                        document.getElementById("contactAddResult").innerHTML = "Contact has been added";
                                        document.getElementById("contactAddResult").className = "result-message success";
                                        
                                        // Close modal and reset form
                                        setTimeout(function() {
                                                var modalEl = document.getElementById('addContactModal');
                                                var modal = bootstrap.Modal.getInstance(modalEl);
                                                if(modal) {
                                                        modal.hide();
                                                }
                                                document.getElementById("addContactForm").reset();
                                                document.getElementById("contactAddResult").innerHTML = "";
                                                document.getElementById("contactAddResult").className = ""
                                                
                                                // Reload contacts
                                                searchContacts();
                                        }, 1000);
                                }
                        }
                };
                xhr.send(jsonPayload);
        }
        catch(err) {
                document.getElementById("contactAddResult").innerHTML = err.message;
                document.getElementById("contactAddResult").className = "result-message error";
        }
}

// Grabs the contacts of a user, displaying them in the grid
function searchContacts() {
        let srch = document.getElementById("searchText").value.toUpperCase();

        let tmp = {
            search: srch,     
            userId: userId
        };

        let jsonPayload = JSON.stringify(tmp);
        let url = urlBase + '/SearchContacts.' + extension;
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try {
        xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                        let jsonObject = JSON.parse(xhr.responseText);
                        
                        if(!jsonObject.results || jsonObject.results.length === 0) {
                                document.getElementById("azure-index").innerHTML = 
                                        "<div class='empty-state'><div class='empty-state-icon'> <img src='../submarine.png' alt='Submarine icon'></div><p>No contacts!</p></div>";
                                return;
                        }

                        // console.log(jsonObject.results[0].id);

                        // Build the grid
                        let text = "<div class='azure-grid' role='list'>";
                        
                        // Header row
                        text += "<div class='grid-header'>" +
                                "<div class='grid-cell grid-head'>First</div>" +
                                "<div class='grid-cell grid-head'>Last</div>" +
                                "<div class='grid-cell grid-head'>Email</div>" +
                                "<div class='grid-cell grid-head'>Phone</div>" +
                                "<div class='grid-cell grid-head'>Actions</div>" +
                                "</div>";

                        // Contact rows
                        for (let i = 0; i < jsonObject.results.length; i++) {
                                cids[i] = jsonObject.results[i].id;
                                text += "<div class='grid-row' id='row" + i + "' role='listitem'>";
                                text += "<div class='grid-cell' id='first_Name" + i + "' data-label='First:'><span>" + jsonObject.results[i].firstName + "</span></div>";
                                text += "<div class='grid-cell' id='last_Name" + i + "' data-label='Last:'><span>" + jsonObject.results[i].lastName + "</span></div>";
                                text += "<div class='grid-cell' id='email" + i + "' data-label='Email:'><span>" + jsonObject.results[i].email + "</span></div>";
                                text += "<div class='grid-cell' id='phone" + i + "' data-label='Phone:'><span>" + jsonObject.results[i].phone + "</span></div>";
                                text += "<div class='grid-cell grid-actions' data-label='Actions:'>";
                                text += "<button type='button' id='edit_button" + i + "' class='w3-button w3-circle w3-lime' onclick='editContact(" + i + ")' aria-label='Edit contact'>&#9998;</button>";
                                text += "<button type='button' onclick='deleteContact(" + i + ")' class='w3-button w3-circle w3-amber' aria-label='Delete contact'>&#128465;</button>";
                                text += "</div>";
                                text += "</div>";
                        }
                        
                        text += "</div>";
                        document.getElementById("azure-index").innerHTML = text;
                }
        };
                xhr.send(jsonPayload);
        }
        catch (err) {
                document.getElementById("contactSearchResult").innerHTML = err.message;
        }
}


// Opens the edit modal and populates it with the selected contact's data
function editContact(id) {
    // Store the contact ID being edited
    currentEditingContactId = id;
    
    // Get the current values from the displayed contact
    var firstName = document.getElementById("first_Name" + id).querySelector('span').innerText;
    var lastName = document.getElementById("last_Name" + id).querySelector('span').innerText;
    var email = document.getElementById("email" + id).querySelector('span').innerText;
    var phone = document.getElementById("phone" + id).querySelector('span').innerText;
    
    // Populate the modal form fields
    document.getElementById("editFirstName").value = firstName;
    document.getElementById("editLastName").value = lastName;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPhoneNumber").value = phone;
    
    // Clear any previous result messages
    document.getElementById("contacteditResult").innerHTML = "";
    
    // Open the modal
    var modalEl = document.getElementById('editContactModal');
    var modal = new bootstrap.Modal(modalEl);
    modal.show();
}

// Saves the changes made in the edit modal
function saveChangedContact(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Get the values from the modal form
    var fname_val = document.getElementById("editFirstName").value;
    var lname_val = document.getElementById("editLastName").value;
    var email_val = document.getElementById("editEmail").value;
    var phone_val = document.getElementById("editPhoneNumber").value;
    
    // Get the contact ID from the global variable
    var conid_val = cids[currentEditingContactId];
    
    // Clear previous messages
    document.getElementById("contacteditResult").innerHTML = "";
    
    let tmp = {
        firstName: fname_val,
        lastName: lname_val,
        phone: phone_val,
        email: email_val,
        contactId: conid_val,
        userId: userId
    };

    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(xhr.responseText);
                
                if(response.error && response.error !== "") {
                    document.getElementById("contacteditResult").innerHTML = response.error;
                    document.getElementById("contacteditResult").className = "result-message error";
                } else {
                    document.getElementById("contacteditResult").innerHTML = "Contact updated successfully";
                    document.getElementById("contacteditResult").className = "result-message success";
                    
                    // Close modal and reload contacts
                    setTimeout(function() {
                        var modalEl = document.getElementById('editContactModal');
                        var modal = bootstrap.Modal.getInstance(modalEl);
                        if(modal) {
                            modal.hide();
                        }
                        document.getElementById("editContactForm").reset();
                        document.getElementById("contacteditResult").innerHTML = "";
                        document.getElementById("contacteditResult").className = ""
                        
                        // Reload contacts to show updated data
                        searchContacts();
                        
                        // Reset the editing ID
                        currentEditingContactId = null;
                    }, 1000);
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contacteditResult").innerHTML = err.message;
        document.getElementById("contacteditResult").className = "result-message error";
    }
}

// Deletes a Contact from the user's list of contacts
function deleteContact(rowNum) {
        var fname_val = document.getElementById("first_Name" + rowNum).innerText;
        var lname_val = document.getElementById("last_Name" + rowNum).innerText;
        
        // Get text content only (strip any child elements)
        var bFname = fname_val.trim();
        var bLname = lname_val.trim();

        var conId = cids[rowNum];
// console.log(rowNum);
// console.log(conId);
        let check = confirm(bFname + ' ' + bLname + ' will be removed from the crew. Is this ok?');
        
        if (check === true) {
                let tmp = {
                    contactId: conId,
                    userId: userId
                };

                let jsonPayload = JSON.stringify(tmp);
                let url = urlBase + '/DeleteContact.' + extension;

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                
                try {
                        xhr.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                        // Reload contacts after deletion
                                        searchContacts();
                                }
                        };
                        xhr.send(jsonPayload);
                }
                catch (err) {
                        document.getElementById("contactDeleteResult").innerHTML = err.message;
                }
        }
}


// Logout function (if needed)
function doLogout() {
        userId = 0;
        firstName = "";
        lastName = "";
        currentEditingContactId = null;
        document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "index.html";
}

