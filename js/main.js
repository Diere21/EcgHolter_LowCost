async function updateDashboard(patientId) {
    const patientData = await fetchPatientData(patientId);
    const patient = patientData.patient;
    const heartRateData = patientData.heart_rate_data;
    updatePatientInfo(patient);
    updateHeartRateInfo(heartRateData);
    drawECGChart(heartRateData);
}

async function fetchPatientData(patientId) {
    const response = await fetch(`../php/get_patient_data.php?patient_id=${patientId}`);
    const patientData = await response.json();
    return patientData;
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

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');
    if (patientId) {
        await updateDashboard(patientId);
    } else {
        alert('Patient ID not found');
    }
});
