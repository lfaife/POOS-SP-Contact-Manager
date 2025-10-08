<?php
   // Get incoming JSON data from request
    $inData = getRequestInfo();

    // Connect to database
    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    // $conn = new mysqli("localhost", "root", "", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        // Update contact fields for specified contact and user 
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ID=? AND UserID=?");
        $stmt->bind_param("ssssii", $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"], $inData["contactId"], $inData["userId"]);
        $stmt->execute();
        // Check if update was successful
        if($stmt->affected_rows > 0)
        {
            returnWithInfo($inData["contactId"], $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"]);
        }
        else
        {
            returnWithError("Contact not found or no changes made");
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
    // Return success response with updated contact data
    function returnWithInfo( $id, $firstName, $lastName, $email, $phone )
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '","phone":"' . $phone . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>