<?php
$inData = getRequestInfo();

    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app"); 
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND UserID=?");
        $stmt->bind_param("ii", $inData["contactId"], $inData["userId"]);
        $stmt->execute();
        
        if($stmt->affected_rows > 0)
        {
            returnWithInfo("Contact deleted successfully");
        }
        else
        {
            returnWithError("Contact not found");
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
    
    function returnWithInfo( $message )
    {
        $retValue = '{"message":"' . $message . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
	
?>