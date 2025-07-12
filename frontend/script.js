const employees = [
  {
    name: "Alice Smith",
    email: "alice@example.com",
    department: "HR",
    role: "Manager"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "IT",
    role: "Developer"
  },
  {
    name: "Charlie Lee",
    email: "charlie@example.com",
    department: "Finance",
    role: "Analyst"
  }

];

let editIndex = null;
const modal = document.getElementById("addEmployeeModal");
const form = document.getElementById("employeeForm");

// Render employee cards
function renderEmployees(data) {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  data.forEach((emp, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${emp.name}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div>
        <button onclick="openEditForm(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    renderEmployees(employees);
  }
}

function openEditForm(index) {
  editIndex = index;
  const emp = employees[index];
  const [first, last] = emp.name.split(" ");
  document.getElementById("firstName").value = first;
  document.getElementById("lastName").value = last || "";
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;

  modal.classList.remove("hidden");
}

// Handle form submit (Add or Edit)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const dept = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  const newEmp = {
    name: `${first} ${last}`,
    email,
    department: dept,
    role
  };

  if (editIndex !== null) {
    employees[editIndex] = newEmp;
    editIndex = null;
  } else {
    employees.push(newEmp);
  }

  modal.classList.add("hidden");
  form.reset();
  renderEmployees(employees);
});

// Open modal on "Add Employee"
document.getElementById("openModalBtn").addEventListener("click", () => {
  editIndex = null;
  form.reset();
  modal.classList.remove("hidden");
});

// Cancel button
document.querySelector(".cancel-btn").addEventListener("click", () => {
  modal.classList.add("hidden");
  form.reset();
});

// Search filter
function filterEmployees() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const result = employees.filter(emp =>
    emp.name.toLowerCase().includes(query) || emp.email.toLowerCase().includes(query)
  );
  renderEmployees(result);
}

// Form filter
function applyFilter() {
  const name = document.getElementById("filterName").value.toLowerCase();
  const dept = document.getElementById("filterDept").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(name) &&
    emp.department.toLowerCase().includes(dept) &&
    emp.role.toLowerCase().includes(role)
  );

  renderEmployees(filtered);
}

function resetFilter() {
  document.getElementById("filterName").value = "";
  document.getElementById("filterDept").value = "";
  document.getElementById("filterRole").value = "";
  renderEmployees(employees);
}

// Initial render
window.onload = () => renderEmployees(employees);

document.getElementById("sortSelect").addEventListener("change", function () {
  const sortBy = this.value;

  if (sortBy === "name") {
    employees.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "department") {
    employees.sort((a, b) => a.department.localeCompare(b.department));
  }

  renderEmployees(employees);
});
