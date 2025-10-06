// urlBase is 
const urlBase = 'http://cop4331-azurebase-contact-manager.com/LAMPAPI';
const extension = 'php';

// Sets the starting data of these values across all functions
let userId = 0;
let firstName = "";
let lastName = "";
const cids = [];

function doLogin()
{
	// Reassigns variables for this function scrope
	userId = 0;
	firstName = "";
	lastName = "";
	
	// Grabs the values for username / password
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	// Resets the value in loginResult do display ""
	// Clears any prev errors messages before starting login
	document.getElementById("loginResult").innerHTML = "";

	// Stores login / password as object key-value pairs for parsing
	let tmp = {
		login: login,
		password: password
	};

	// This was already commented out
//	var tmp = {login:login,password:hash}; 

	// Parses tmp into a JSON 
	let jsonPayload = JSON.stringify( tmp );0
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

				// Gets the USERID from the server response
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
function doRegister()
{
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
//	var tmp = {login:login,password:hash}; 

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

				// Gets the USERID from the server response
				userId = jsonObject.id;
				
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

//Sends the user to the register page
function gotoRegister()
{
	window.location.href = "register.html";
}

//Saves the information of a user for easy access later
function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

//Logs the user out of the website
function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// Adds a Contact to a user's list of contacts
// This is both in the database and visually represented on the website
// Should theoretically accept First Name, Last Name, Phone Number, and Email as valid inputs
function addContact()
{
	//Obtains the data needed for a new contact
	let addFirstN = document.getElementById("addFirstName").value;
	let addLastN = document.getElementById("addLastName").value;
	let addPhoneN = document.getElementById("addPhoneNum").value;
	let addEmail = document.getElementById("addE-mail").value;
	
	//Resets the value in contactAddResult to display ""
	//In essence, removes any error codes if any are present
	document.getElementById("contactAddResult").innerHTML = "";

	//Stores information as an object key-value pair for parsing into a JSON
	let tmp =
	{
		userId: userId,
		firstName: addFirstN,
		lastName: addLastN,
		email: addEmail,
		phone: addPhoneN
	};
	let jsonPayload = JSON.stringify( tmp );

	//Obtain url by combining the base, php, and file extension
	let url = urlBase + '/AddContacts.' + extension;
	
	//Sends the request to add the Contact to the database
	//If successful, contact is properly added for the user
	//If not, returns an error
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				loadContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

//Grabs the contacts of a user, displaying them on the table
function loadContacts()
{
    //Send an empty search to grab all contacts
	let tmp =
	{
        search: "",
        userId: userId
    };

    //Parse it into a JSON
	let jsonPayload = JSON.stringify(tmp);

    //Obtains url, sends a request to recieve user's contacts, and returns successfully or with an error
	let url = urlBase + '/GetContacts.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    //Returns the user's contacts, filling in the table
	try
	{
        xhr.onreadystatechange = function ()
		{
            if (this.readyState == 4 && this.status == 200)
			{
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error)
				{
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>"
                for (let i = 0; i < jsonObject.results.length; i++)
				{
                    cids[i] = jsonObject.results[i].ID
                    text += "<tr id='row" + i + "'>"
                    text += "<td id='first_Name" + i + "'><span>" + jsonObject.results[i].FirstName + "</span></td>";
                    text += "<td id='last_Name" + i + "'><span>" + jsonObject.results[i].LastName + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + jsonObject.results[i].Email + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + jsonObject.results[i].Phone + "</span></td>";
                    text += "<td>" +
                        "<button type='button' id='edit_button" + i + "' class='w3-button w3-circle w3-lime' onclick='editContact(" + i + ")'>" + "<span class='glyphicon glyphicon-edit'></span>" + "</button>" +
                        "<button type='button' onclick='deleteContact(" + i + ")' class='w3-button w3-circle w3-amber'>" + "<span class='glyphicon glyphicon-trash'></span> " + "</button>" + "</td>";
                    text += "<tr/>"
                }
                text += "</table>"
                document.getElementById("ContactsTable").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    }
	catch (err)
	{
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}

//Brings up the edit modal to edit the selected contact
function editContact(id)
{
    var consFirstName = document.getElementById("first_Name" + id);
    var consLastName = document.getElementById("last_Name" + id);
    var consEmail = document.getElementById("email" + id);
    var consPhone = document.getElementById("phone" + id);

    var mod_fname = consFirstName.innerText;
    var mod_lname = consLastName.innerText;
    var mod_email = consEmail.innerText;
    var mod_phone = consPhone.innerText;

	consFirstName.innerHTML = "<input type='text' id='fname_text" + id + "' value='" + mod_fname + "'>";
    consLastName.innerHTML = "<input type='text' id='lname_text" + id + "' value='" + mod_lname + "'>";
    consEmail.innerHTML = "<input type='text' id='email_text" + id + "' value='" + mod_email + "'>";
    consPhone.innerHTML = "<input type='text' id='phone_text" + id + "' value='" + mod_phone + "'>"
}

//Saves the changes made in the edit modal and sends them back to the database
function saveChangedContact(rownum)
{
    var fname_val = document.getElementById("fname_text" + rownum).value;
    var lname_val = document.getElementById("lname_text" + rownum).value;
    var email_val = document.getElementById("email_text" + rownum).value;
    var phone_val = document.getElementById("phone_text" + rownum).value;
    var conid_val = cids[rownum]

    document.getElementById("first_Name" + rownum).innerHTML = fname_val;
    document.getElementById("last_Name" + rownum).innerHTML = lname_val;
    document.getElementById("email" + rownum).innerHTML = email_val;
    document.getElementById("phone" + rownum).innerHTML = phone_val;

    let tmp =
	{
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
    try
	{
        xhr.onreadystatechange = function ()
		{
            if (this.readyState == 4 && this.status == 200)
				{
                document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated.";
                loadContacts();
            }
        };
        xhr.send(jsonPayload);
    }
	catch (err)
	{
        document.getElementById("contactUpdateResult").innerHTML = err.message;
    }
}

//Deletes a Contact from the user's list of contacts
function deleteContact(rowNum)
{
    // Attains the first and last name of the contact as well as their id on the selected row
	// bFname and bLname are created to avoid any trash data

	var fname_val = document.getElementById("first_Name" + rowNum).innerText;
    var lname_val = document.getElementById("last_Name" + rowNum).innerText;
    bFname = fname_val.substring(0, fname_val.length);
    bLname = lname_val.substring(0, lname_val.length);
	var conId = cids[rowNum]
    
	//Asks the user for confirmation that the selected contact will be deleted
	let check = confirm(bFname + ' ' + bLname + ' will be removed from the crew. Is this ok?');
    if (check === true)
	{
        //The following is the usual procedure for requests to the server
		document.getElementById("row" + rowNum + "").outerHTML = "";
        let tmp =
		{
            contactId: conId,
            userId: userId
        };

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/DeleteContacts.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try
		{
            xhr.onreadystatechange = function ()
			{
                if (this.readyState == 4 && this.status == 200)
				{
                    document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted.";
                    loadContacts();
                }
            };
            xhr.send(jsonPayload);
        }
		catch (err)
		{
            document.getElementById("contactDeleteResult").innerHTML = err.message;
        }
    };
}

// Searches for a Contact in a user's list of contacts
// Should theoretically accept one input that'll work for all fields: First Name, Last Name, Phone Number, and Email
// Will be constantly running as long as the user types in the search field
// Code currently taken from 4331paradise.com project, will be adjusted to work for our purposes
function searchContacts()
{
    //Takes the text that is inputted into the search field and strengthens it 
	const content = document.getElementById("searchText");
    const selections = content.value.toUpperCase().split(' ');
    
	//Takes the table that is showing the contacts and prepares to grab its elements
	const table = document.getElementById("contacts");
    const tr = table.getElementsByTagName("tr");// Table Row

    //What this section does is check if what is inputted into the search field matches with a first or last name of every row in the table
	//Will be changed to also allow for searching with phone numbers and emails
	for (let i = 0; i < tr.length; i++)
	{
        const td_fn = tr[i].getElementsByTagName("td")[0]; // Table Data: First Name
        const td_ln = tr[i].getElementsByTagName("td")[1]; // Table Data: Last Name

        //According to CoPilot, this if statement says that the code will continue if both first and last name fields are filled for that row
		if (td_fn && td_ln)
		{
            //After checking that the two names exist, it'll display the row if either name is a hit with the search input
			//It starts by hiding the row; if a match is found, then it will unhide it
			const txtValue_fn = td_fn.textContent || td_fn.innerText;
            const txtValue_ln = td_ln.textContent || td_ln.innerText;
            tr[i].style.display = "none";

            for (selection of selections)
			{
                if (txtValue_fn.toUpperCase().indexOf(selection) > -1)
				{
					tr[i].style.display = "";
                }
                if (txtValue_ln.toUpperCase().indexOf(selection) > -1)
				{
                    tr[i].style.display = "";
                }
            }
        }
    }
}