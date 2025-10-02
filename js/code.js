// urlBase is 
const urlBase = 'http://cop4331-azurebase-contact-manager.com/LAMPAPI'; // waiting on domain name from Ryan
const extension = 'php';

// Sets the starting data of these values across all functions
let userId = 0;
let firstName = "";
let lastName = "";

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
	let tmp = {login: login, password: password};

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
				window.location.href = "color.html";
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
	let tmp = {firstName: firstN, lastName: lastN, register: register, password: password};

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
				// Adds the user into the database
				// I (Bryant) believe there should be another check before this goes through to make sure there isn't overlapping users
				// but I am uncertain of how to check this currently; I shall return to this at a later point
				document.getElementById("registerResult").innerHTML = "User added, redirecting...";
				
				// Retrives the first and last name of user if successful
				firstName = firstN;
				lastName = lastN;

				// Calls saveCookie() function to store user in a browser cookie
				saveCookie();

				// Sends user to next page
				window.location.href = "color.html";
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

//Should theoretically send people to the register page
function gotoRegister()
{
	window.location.href = "register.html";
}

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

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color: newColor, userId, userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search: srch, userId: userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
