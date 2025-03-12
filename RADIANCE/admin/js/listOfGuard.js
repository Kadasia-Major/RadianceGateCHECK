// Data.local-Storage
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