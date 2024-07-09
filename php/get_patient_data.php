<?php
include '../config.php';

function getPatientData($conn, $patientId) {
    $sql = "SELECT * FROM heart_rate_data WHERE patient_id = $patientId AND time >= DATE_SUB(NOW(), INTERVAL 48 HOUR) ORDER BY time DESC";
    $result = $conn->query($sql);

    $data = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

$patientId = intval($_GET['patient_id']);
$patientData = [];

if ($patientId) {
    $patient = $conn->query("SELECT name, age, gender FROM patients WHERE id = $patientId")->fetch_assoc();
    $heartRateData = getPatientData($conn, $patientId);

    if ($patient && $heartRateData) {
        $patientData = [
            "patient" => $patient,
            "heart_rate_data" => $heartRateData
        ];
    } else {
        echo json_encode(["error" => "No data found"]);
        exit;
    }
}

echo json_encode($patientData);
?>
