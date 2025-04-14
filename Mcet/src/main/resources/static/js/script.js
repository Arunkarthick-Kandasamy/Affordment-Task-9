document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('studentForm')) {
        loadStudents();
        document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
    } else if (document.getElementById('viewTable')) {
        loadStudentsForView();
    }
});

// Handle form submission for Add/Update
async function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const rollnum = document.getElementById('rollnum').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const submitBtn = document.getElementById('submitBtn');
    const isUpdate = submitBtn.textContent === 'Update Student';

    try {
        const params = `name=${encodeURIComponent(name)}&rollnum=${encodeURIComponent(rollnum)}&email=${encodeURIComponent(email)}&mobile=${encodeURIComponent(mobile)}`;
        if (isUpdate) {
            // Update student
            const response = await fetch(`/update?${params}`, {
                method: 'PUT'
            });
            if (!response.ok) throw new Error('Update failed');
        } else {
            // Add student
            const response = await fetch(`/add?${params}`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Add failed');
        }
        resetForm();
        loadStudents();
    } catch (error) {
        console.error('Error:', error);
        alert('Operation failed: ' + error.message);
    }
}

// Load students for management page
async function loadStudents() {
    try {
        const response = await fetch('/students');
        if (!response.ok) throw new Error('Failed to fetch students');
        const students = await response.json();
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.rollnum}</td>
                <td>${student.email}</td>
                <td>${student.mobile}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent('${student.name}', '${student.rollnum}', '${student.email}', '${student.mobile}')">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent('${student.name}', '${student.rollnum}', '${student.email}', '${student.mobile}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load students');
    }
}

// Load students for view page
async function loadStudentsForView() {
    try {
        const response = await fetch('/students');
        if (!response.ok) throw new Error('Failed to fetch students');
        const students = await response.json();
        const tbody = document.querySelector('#viewTable tbody');
        tbody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.rollnum}</td>
                <td>${student.email}</td>
                <td>${student.mobile}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load students');
    }
}

// Edit student
function editStudent(name, rollnum, email, mobile) {
    document.getElementById('name').value = name;
    document.getElementById('rollnum').value = rollnum;
    document.getElementById('email').value = email;
    document.getElementById('mobile').value = mobile;
    document.getElementById('submitBtn').textContent = 'Update Student';
}

// Delete student
async function deleteStudent(name, rollnum, email, mobile) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const params = `name=${encodeURIComponent(name)}&rollnum=${encodeURIComponent(rollnum)}&email=${encodeURIComponent(email)}&mobile=${encodeURIComponent(mobile)}`;
            const response = await fetch(`/delete?${params}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Delete failed');
            loadStudents();
        } catch (error) {
            console.error('Error:', error);
            alert('Delete failed: ' + error.message);
        }
    }
}

// Reset form
function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('submitBtn').textContent = 'Add Student';
}