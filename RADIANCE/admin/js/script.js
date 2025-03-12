function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
}

function closeMenu() {
    const nav = document.querySelector('nav');
    nav.classList.remove('open');
}

document.addEventListener('click', function (event) {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
        closeMenu();
    }
});

// add-guard-section-visibility
function openAddGuard() {
    document.getElementById('add_Guard').removeAttribute('hidden');
    const nav = document.querySelector('nav');
    nav.classList.remove('open');
}

function closeAddGuard() {
    document.getElementById('add_Guard').setAttribute('hidden', 'hidden');
}

//  entry-activities-display
function displayEntryActivities() {
    const activities = JSON.parse(localStorage.getItem('entryActivities')) || [];
    const tableBody = document.querySelector('#activities-table tbody');
    const noDataMessage = document.getElementById('no-data-message');
    tableBody.innerHTML = '';
    if (activities.length === 0) {
        noDataMessage.style.display = 'block';
        return;
    }

    noDataMessage.style.display = 'none';

    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.type}</td>
            <td>${activity.name}</td>
            <td>${activity.phone || '-'}</td>
            <td>${activity.id || '-'}</td>
            <td>${activity.reason || activity.designation || '-'}</td>
            <td>${activity.items || '-'}</td>
            <td>${activity.guard}</td>
            <td>${activity.code}</td>
            <td>${formatDateTime(activity.dateTime)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function formatDateTime(dateTime) {
    if (!dateTime) return '-';
    const date = new Date(dateTime);
    return date.toLocaleString();
}

function clearLocalStorage() {
    if (confirm('Are you sure you want to clear all entry activities?')) {
        localStorage.removeItem('entryActivities');
        displayEntryActivities();
    }
}

displayEntryActivities();


// Data.local-Storage > list of guard
let guards = [];
let editIndex = null;

function openAddGuardForm() {
    document.getElementById('addGuardForm').style.display = 'block';
}

function closeAddGuardForm() {
    document.getElementById('addGuardForm').style.display = 'none';
    document.getElementById('guardName').value = '';
    document.getElementById('guardPhone').value = '';
    editIndex = null;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('guardName').value;
    const phone = document.getElementById('guardPhone').value;

    if (editIndex !== null) {
        guards[editIndex] = { name, phone };
    } else {
        guards.push({ name, phone });
    }

    renderGuards();
    closeAddGuardForm();
}

// Render Guards List
function renderGuards() {
    const guardList = document.getElementById('guardList');
    guardList.innerHTML = '';

    guards.forEach((guard, index) => {
        const guardItem = document.createElement('div');
        guardItem.className = 'guard-item';
        guardItem.innerHTML = `
            <span>${guard.name} - ${guard.phone}</span>
            <div>
                <button class="edit" onclick="editGuard(${index})">Edit</button>
                <button class="delete" onclick="deleteGuard(${index})">Delete</button>
            </div>
        `;
        guardList.appendChild(guardItem);
    });
}

// Edit Guard   ----    delete

function editGuard(index) {
    const guard = guards[index];
    document.getElementById('guardName').value = guard.name;
    document.getElementById('guardPhone').value = guard.phone;
    editIndex = index;
    openAddGuardForm();
}

function deleteGuard(index) {
    guards.splice(index, 1);
    renderGuards();
}

renderGuards();
