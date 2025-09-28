<?php
    // Retrieve entire contact list for login user.
    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("143.110.151.237", "POOS_db", "Small_2025_Project", "poos_app");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("SELECT ID, FirstName, LastName, Email, Phone, Company FROM Contacts WHERE UserID=? ORDER BY LastName, FirstName");
        $stmt->bind_param("i", $inData["userId"]);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        while($row = $result->fetch_assoc())
        {
            if( $searchCount > 0 )
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"id":' . $row["ID"] . ',"firstName":"' . $row["FirstName"] . '","lastName":"' . $row["LastName"] . '","email":"' . $row["Email"] . '","phone":"' . $row["Phone"] . ',"company":"' . $row["Company"] . '"}';
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
        $retValue = '{"results":[],"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $searchResults )
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>