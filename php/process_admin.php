<?php
include '../config.php';
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role_id'] != 1) {
    header("Location: ../html/login.html");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    if ($action == "addDoctor") {
        $username = $_POST['username'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $role_id = 2; // Role ID for doctors

        $sql = "INSERT INTO users (username, password, role_id) VALUES ('$username', '$password', $role_id)";
        if ($conn->query($sql) === TRUE) {
            echo "New doctor created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } elseif ($action == "deleteDoctor") {
        $doctor_id = intval($_POST['doctor_id']);

        $sql = "DELETE FROM users WHERE id = $doctor_id AND role_id = 2";
        if ($conn->query($sql) === TRUE) {
            echo "Doctor deleted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}
?>
