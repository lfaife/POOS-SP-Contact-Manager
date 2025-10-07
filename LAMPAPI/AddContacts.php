<?php
    // Get incoming Json data from request
    $inData = getRequestInfo();
    // Connect to database
    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        // Insert new contact into contacts table
        $stmt = $conn->prepare("INSERT INTO Contacts (UserID, FirstName, LastName, Email, Phone) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issss", $inData["userId"], $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"]);
        $stmt->execute();
        
        // Get new contact ID and return contact info
        $contactId = $conn->insert_id;
        returnWithInfo($contactId, $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"]);
    }
    
    // Decode Json from request body
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
        $retValue = '{"id":0,"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    // Return success response with contact data
    function returnWithInfo( $id, $firstName, $lastName, $email, $phone)
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '","phone":"' . $phone . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>
