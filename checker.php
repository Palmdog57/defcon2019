<?php

$loopTimeout = 0.5;
while(1) {
    $conn = mysqli_connect('localhost', 'tom', 'reverse', 'verb');
    $sql = "SELECT statusCode FROM status ORDER BY id DESC LIMIT 1;";
    $result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($result)) {
        file_put_contents('./currentStatus.js', $row["statusCode"]);
    }

    usleep($loopTimeout * 1000000);
}

?>
