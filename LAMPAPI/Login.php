<?php
    // Get incoming Json 
	$inData = getRequestInfo();  

    // Connect to database
    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        // Users table for matching login credentials
		$stmt = $conn->prepare("SELECT ID, firstName, lastName FROM Users WHERE Login=? AND Password=?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]); // casesensitive
        $stmt->execute();
        $result = $stmt->get_result();

        if( $row = $result->fetch_assoc()  )
        {
            // Match found
            returnWithInfo( $row["firstName"], $row["lastName"], $row["ID"] );
        }
        else
        {
            // No match
            returnWithError( "No Records Found" );
        }
	}

    // Decode Json 
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }
    // Send Json response
	function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }
    // Return error response
	function returnWithError( $err )
	{
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    // Return successful response with user info
    function returnWithInfo( $firstName, $lastName, $id)
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>