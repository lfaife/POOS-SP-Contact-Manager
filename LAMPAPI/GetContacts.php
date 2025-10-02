<?php
   // Get incoming JSON data from request
    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;
    // Connect to database
    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        // Retrieve all contacts for the user, ordered by name
        $stmt = $conn->prepare("SELECT ID, FirstName, LastName, Email, Phone FROM Contacts WHERE UserID=? ORDER BY LastName, FirstName");
        $stmt->bind_param("i", $inData["userId"]);
        $stmt->execute();
        
        $result = $stmt->get_result();
        // Build array of contact objects
        while($row = $result->fetch_assoc())
        {
            if( $searchCount > 0 )
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"id":' . $row["ID"] . ',"firstName":"' . $row["FirstName"] . '","lastName":"' . $row["LastName"] . '","email":"' . $row["Email"] . '","phone":"' . $row["Phone"] . '"}';
        }
        
        if( $searchCount == 0 )
        {
            returnWithError( "No Contacts Found" );
        }
        else
        {
            returnWithInfo( $searchResults );
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
    // Return error message with empty results array
    function returnWithError( $err )
    {
        $retValue = '{"results":[],"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    // Return success response with array of contact objects
    function returnWithInfo( $searchResults )
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>