document.addEventListener('DOMContentLoaded', () => {
    fetchDoctors();

    document.getElementById('add-doctor-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('doctor-username').value;
        const password = document.getElementById('doctor-password').value;

        const response = await fetch('../php/process_admin.php?action=addDoctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            fetchDoctors();
            document.getElementById('add-doctor-form').reset();
        } else {
            alert('Failed to add doctor');
        }
    });
});

async function fetchDoctors() {
    const response = await fetch('../php/process_admin.php?action=getDoctors');
    const doctors = await response.json();
    const tableBody = document.querySelector('#doctor-table tbody');
    tableBody.innerHTML = '';
    
    doctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.username}</td>
            <td><button onclick="deleteDoctor(${doctor.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteDoctor(doctorId) {
    const response = await fetch(`../php/process_admin.php?action=deleteDoctor&id=${doctorId}`, {
        method: 'POST'
    });

    if (response.ok) {
        fetchDoctors();
    } else {
        alert('Failed to delete doctor');
    }
}
