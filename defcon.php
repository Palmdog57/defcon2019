<?php

$servername = "localhost";
$username = "tom";
$password = "reverse";
$db = "verb";

if (!$argv[1]){
  die("You did not specify a status.\n");
}else{
  $currentStatus = ucfirst($argv[1]);
}

$conn = mysqli_connect($servername, $username, $password, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error() . "\n\n");
}

$today = date("Y-m-d H:i:s"); 
$argument_list = array("R", "Y", "G");

if (!in_array($currentStatus, $argument_list)) {
  die("INVALID ARGUMENT\n");
}else{
  $sql = "INSERT INTO status (statusCode, lastUpdated) VALUES ('$currentStatus', NOW());";

  if (mysqli_query($conn, $sql)) {
    echo "Status updated with code: " . $currentStatus;
    file_put_contents("./statusChange.log", $today . " | " . $sql . "\n", FILE_APPEND);
} else {
    file_put_contents("./statusChange.log", "Error: " . $sql . "\n" . mysqli_error($conn) . "\n\n", FILE_APPEND);
}

mysqli_close($conn);
}

?>