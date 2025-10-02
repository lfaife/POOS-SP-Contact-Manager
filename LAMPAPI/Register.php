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
        // Check if username already exists
        $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login = ?");
        $stmt->bind_param("s", $inData["login"]);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if($row = $result->fetch_assoc()) {
            // User already exists respond with error
            returnWithError("User Already Exists");
        }
        else {
            // Insert new user into the user table
            $stmt = $conn->prepare("INSERT INTO Users (firstName, lastName, Login, Password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $inData["firstName"], $inData["lastName"], $inData["login"], $inData["password"]);
            $stmt->execute();
            
            // Get new user ID and return user info
            $userId = $conn->insert_id;
            returnWithInfo($inData["firstName"], $inData["lastName"], $userId);
        }
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
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    // Return successful response with user info
    function returnWithInfo( $firstName, $lastName, $id )
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>
