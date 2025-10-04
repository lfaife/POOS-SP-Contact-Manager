<?php
    // Get incoming JSON data from request
    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;

    // Connect to database
    //$conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    // Add local connection for testing
    $conn = new mysqli("localhost", "root", "", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        // Search contact usiong partial matching across muiltple fields
        $stmt = $conn->prepare("SELECT ID, FirstName, LastName, Email, Phone FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ?) AND UserID=?");
        $searchTerm = "%" . $inData["search"] . "%";
        $stmt->bind_param("ssssi", $searchTerm, $searchTerm, $searchTerm, $searchTerm, $inData["userId"]);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        // Build array of matching objects (not strings)
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
            returnWithError( "No Records Found" );
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
    // Return error response with empty result array
    function returnWithError( $err )
    {
        $retValue = '{"results":[],"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    // Return succsess response with arrays of contact objects
    function returnWithInfo( $searchResults )
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>