<?php
    $inData = getRequestInfo();
    // Get incoming JSON data from request
    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        // Delete contact for specified contact ID and user ID
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND UserID=?");
        $stmt->bind_param("ii", $inData["contactId"], $inData["userId"]);
        $stmt->execute();
        // Check if deletion was successful
        if($stmt->affected_rows > 0)
        {
            returnWithInfo("Contact deleted successfully");
        }
        else
        {
            returnWithError("Contact not found");
        }
    }
    // Decode JSON from request body
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }
    // Send JSON response
    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }
    // Return error response
    function returnWithError( $err )
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    // Return success response
    function returnWithInfo( $message )
    {
        $retValue = '{"message":"' . $message . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
	
?>