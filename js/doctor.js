document.addEventListener('DOMContentLoaded', populatePatientSelect);

async function fetchPatientList() {
    const response = await fetch('../php/get_patients.php');
    const patients = await response.json();
    return patients;
}

async function populatePatientSelect() {
    const patients = await fetchPatientList();
    const patientSelect = document.getElementById('patient-select');
    patientSelect.innerHTML = '';
    patients.forEach(patient => {
        const option = document.createElement('option');
        option.value = patient.id;
        option.textContent = patient.name;
        patientSelect.appendChild(option);
    });
}

async function fetchPatientData(patientId) {
    const response = await fetch(`../php/get_patient_data.php?patient_id=${patientId}`);
    const data = await response.json();
    if (data.error) {
        console.error(data.error);
        return;
    }
    return data;
}

function updatePatientInfo(patient) {
    document.getElementById('patient-name').textContent = patient.name;
    document.getElementById('patient-age').textContent = patient.age;
    document.getElementById('patient-gender').textContent = patient.gender;
}

function updateHeartRateInfo(heartRateData) {
    const heartRates = heartRateData.map(data => data.heart_rate);
    document.getElementById('current-heart-rate').textContent = heartRates[heartRates.length - 1];
    document.getElementById('average-heart-rate').textContent = (heartRates.reduce((a, b) => a + b, 0) / heartRates.length).toFixed(2);
    document.getElementById('max-heart-rate').textContent = Math.max(...heartRates);
    document.getElementById('min-heart-rate').textContent = Math.min(...heartRates);
}

function drawECGChart(heartRateData) {
    const ecgData = heartRateData.map(data => data.heart_rate);
    const timestamps = heartRateData.map(data => new Date(data.time).toLocaleTimeString());

    const ecgChartCanvas = document.getElementById('ecg-chart').getContext('2d');

    if (window.ecgChart) {
        window.ecgChart.destroy();
    }

    window.ecgChart = new Chart(ecgChartCanvas, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: ecgData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Heart Rate (bpm)'
                    },
                    suggestedMin: 50,
                    suggestedMax: 150
                }
            }
        }
    });
}

document.getElementById('start-monitoring-button').addEventListener('click', async () => {
    const selectedPatient = document.getElementById('patient-select').value;
    const patientData = await fetchPatientData(selectedPatient);
    if (patientData) {
        const patient = patientData.patient;
        const heartRateData = patientData.heart_rate_data;
        updatePatientInfo(patient);
        updateHeartRateInfo(heartRateData);
        drawECGChart(heartRateData);
    }
});
