<?php

function pageHeadings() {
    echo "<head>";
    echo "<link rel='stylesheet' type='text/css' href='style.css'>\n";
    echo "</head>";
}

function phpErrors(){
    ini_set('html_errors', true);
    ini_set('php_errors', true);
    error_reporting(E_ALL);
}

?>