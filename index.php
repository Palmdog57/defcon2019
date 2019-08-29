<head>
    <title>VERB Communications Status Page</title>
</head>

<?php
require("autoload.php");
pageHeadings();
phpErrors();
echo<<<HTML
    <center>
    <img src="img/logo.png" alt="verbLogo" height="180" width="390">
    <br><br><br><br><br><br><br><br><br><br>
HTML;
$state = file_get_contents("currentStatus.json");
if ($state == "G") {
    echo<<<HTML
    <div id='statusButton' class='circleBase type2'></div>
    <h1 id="statusText">All systems are currently operational<h1>
    HTML;
}elseif ($state == "Y") {
    echo<<<HTML
    <div id='statusButton' class='circleBase type3'></div>
    <h1 id="statusText">Some of our services are currently affected by an outage/maintanence<h1>
    HTML;
}elseif ($state == "R") {
    echo<<<HTML
    <div id='statusButton' class='circleBase type4'></div>
    <h1 id="statusText">Everything is down completely and world war III will begin shortly.<h1>
    HTML;
}else {
    echo<<<HTML
    <img src="img/nyan.png" height="160" width="408">
    <h1 id="statusText">404 NO IDEA<h1>
    HTML;
}
echo "<script>
setTimeout(function(){
   console.log('RELOADING');
   window.location.reload(1);
}, 5000);
</script>";
?>
