<?php
include '../config.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role_id'] != 2) {
    header("Location: ../html/login.html");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    if ($action == "addPatient") {
        $name = $_POST['name'];
        $age = intval($_POST['age']);
        $gender = $_POST['gender'];

        $sql = "INSERT INTO patients (name, age, gender) VALUES ('$name', $age, '$gender')";
        if ($conn->query($sql) === TRUE) {
            echo "New patient created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}
?>
