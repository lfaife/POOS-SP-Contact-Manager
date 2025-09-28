<?php
    // Update existing contact for login user.
    $inData = getRequestInfo();

    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=?, Company=? WHERE ID=? AND UserID=?");
        $stmt->bind_param("sssssii", $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"], $inData["company"], $inData["contactId"], $inData["userId"]);
        $stmt->execute();
        
        if($stmt->affected_rows > 0)
        {
            returnWithInfo($inData["contactId"], $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"], $inData["company"]);
        }
        else
        {
            returnWithError("Contact not found or no changes made");
        }
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError( $err )
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $id, $firstName, $lastName, $email, $phone, $company )
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '","phone":"' . $phone . '","company":"' . $company . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>