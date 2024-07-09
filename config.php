<?php
$servername = "localhost";
$username = "root";
$password = "passer2024";
$dbname = "EcgMonitoring";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
