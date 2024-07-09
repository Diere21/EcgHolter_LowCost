<?php
include '../config.php';

function getPatients($conn) {
    $sql = "SELECT id, name FROM patients";
    $result = $conn->query($sql);

    $patients = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }
    }
    return $patients;
}

$patients = getPatients($conn);
echo json_encode($patients);
?>
