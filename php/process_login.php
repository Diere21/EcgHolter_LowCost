<?php
include '../config.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT id, password, role_id FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['userid'] = $row['id'];
            $_SESSION['role'] = $row['role_id'];
            if ($_SESSION['role'] == 1) {
                header("Location: ../html/admin_dashboard.html");
            } elseif ($_SESSION['role'] == 2) {
                header("Location: ../html/doctor_dashboard.html");
            }
        } else {
            echo "Invalid password";
        }
    } else {
        echo "No user found";
    }
}
?>
