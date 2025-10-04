// urlBase is 
const urlBase = 'http://cop4331-azurebase-contact-manager.com/LAMPAPI';
const extension = 'php';

// Sets the starting data of these values across all functions
let userId = 0;
let firstName = "";
let lastName = "";
const contactList = [];

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
	let tmp = {
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
				firstName = firstN;
				lastName = lastN;

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

//Adds a Contact to a user's list of contacts
//This is both in the database and visually represented on the website
//Should theoretically accept First Name, Last Name, Phone Number, and Email as valid inputs
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
	let tmp = {
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
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

//Searches for a Contact in a user's list of contacts
//Should theoretically accept First Name, Last Name, Phone Number, and Email as valid inputs
function searchContact()
{
	//Obtains the data needed for a new contact
	/*
	let seaFirstN = document.getElementById("seaFirstName").value;
	let seaLastN = document.getElementById("seaLastName").value;
	let seaPhoneN = document.getElementById("seaPhoneNum").value;
	let seaEmail = document.getElementById("seaE-mail").value;
	*/
	let srch = document.getElementById("searchvalue").value;
	
	//Resets the value in contactSearchResult to display ""
	//In essence, removes any error codes if any are present
	document.getElementById("contactSearchResult").innerHTML = "";
	
	//Empties the contactList to prepare for the adjustment to the search
	contactList = "";

	//Stores information as an object key-value pair for parsing into a JSON
	/*let tmp = {
		userId: userId,
		firstName: seaFirstN,
		lastName: seaLastN,
		email: seaEmail,
		phone: seaPhoneN
	};*/
	let tmp = {
		search: srch,
		userId: userId
	};
	let jsonPayload = JSON.stringify( tmp );

	//Obtain url by combining the base, php, and file extension
	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

//Edits a Contact to a user's list of contacts
//This is both in the database and visually represented on the website
function editContact()
{
	//Obtains the data needed for a new contact
	let editFirstN = document.getElementById("editFirstName").value;
	let editLastN = document.getElementById("editLastName").value;
	let editPhoneN = document.getElementById("editPhoneNum").value;
	let editEmail = document.getElementById("editE-mail").value;
	
	//Resets the value in contactEditResult to display ""
	//In essence, removes any error codes if any are present
	document.getElementById("contactEditResult").innerHTML = "";

	//Stores information as an object key-value pair for parsing into a JSON
	let tmp = {userId: userId, firstName: editFirstN, lastName: editLastN, email: editEmail, phone: editPhoneN};
	let jsonPayload = JSON.stringify( tmp );

	//Obtain url by combining the base, php, and file extension
	let url = urlBase + '/UpdateContact.' + extension;
	
	//Sends the request to edit the Contact to the database
	//If successful, contact is properly edited for the user
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
				document.getElementById("contactEditResult").innerHTML = "Contact has been edited";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}
	
}