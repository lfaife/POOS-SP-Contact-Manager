<?php
    $inData = getRequestInfo();

    $conn = new mysqli("[HOST]", "[USERNAME]", "[PASSWORD]", "[DATABASE]");    
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("INSERT INTO Contacts (UserID, FirstName, LastName, Email, Phone, Company) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssss", $inData["userId"], $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"], $inData["company"]);
        $stmt->execute();
        
        $contactId = $conn->insert_id;
        returnWithInfo($contactId, $inData["firstName"], $inData["lastName"], $inData["email"], $inData["phone"], $inData["company"]);
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
        $retValue = '{"id":0,"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $id, $firstName, $lastName, $email, $phone, $company )
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '","phone":"' . $phone . '","company":"' . $company . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>