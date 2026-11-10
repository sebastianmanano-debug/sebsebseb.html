       // Load saved students from localStorage
        let students = JSON.parse(
            localStorage.getItem("students") || "[]"
        );

        let editingId = null;

        const form = document.getElementById("studentForm");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const programInput = document.getElementById("program");
        const studentTable = document.getElementById("studentTable");
        const submitBtn = document.getElementById("submitBtn");
        const cancelBtn = document.getElementById("cancelBtn");
        const statusText = document.getElementById("status");

        // Save student data to localStorage
        function saveStudents() {
            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );
        }

        // Display all students
        function displayStudents() {
            studentTable.replaceChildren();

            if (students.length === 0) {
                const row = document.createElement("tr");
                const cell = document.createElement("td");

                cell.colSpan = 4;
                cell.className = "empty";
                cell.textContent = "No students found.";

                row.appendChild(cell);
                studentTable.appendChild(row);
                return;
            }

            students.forEach(function(student) {
                const row = document.createElement("tr");

                // Student name
                const nameCell = document.createElement("td");
                nameCell.textContent = student.name;

                // Student email
                const emailCell = document.createElement("td");
                emailCell.textContent = student.email;

                // Student program
                const programCell = document.createElement("td");
                programCell.textContent = student.program;

                // Action buttons
                const actionCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.className = "edit-btn";
                editButton.type = "button";
                editButton.addEventListener("click", function() {
                    editStudent(student.id);
                });

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.className = "delete-btn";
                deleteButton.type = "button";
                deleteButton.addEventListener("click", function() {
                    deleteStudent(student.id);
                });

                actionCell.append(editButton, deleteButton);
                row.append(
                    nameCell,
                    emailCell,
                    programCell,
                    actionCell
                );

                studentTable.appendChild(row);
            });
        }

        // Add or update a student
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const program = programInput.value;

            if (!name || !email || !program) {
                statusText.textContent = "Please fill in all fields.";
                return;
            }

            if (editingId !== null) {
                const student = students.find(
                    item => item.id === editingId
                );

                if (student) {
                    student.name = name;
                    student.email = email;
                    student.program = program;
                }

                statusText.textContent = "Student updated successfully.";
            } else {
                students.push({
                    id: Date.now().toString() +
                        Math.random().toString(16).slice(2),
                    name: name,
                    email: email,
                    program: program
                });

                statusText.textContent = "Student added successfully.";
            }

            saveStudents();
            displayStudents();
            resetForm();
        });

        // Edit student details
        function editStudent(id) {
            const student = students.find(
                item => item.id === id
            );

            if (!student) return;

            editingId = id;

            nameInput.value = student.name;
            emailInput.value = student.email;
            programInput.value = student.program;

            submitBtn.textContent = "Update Student";
            cancelBtn.hidden = false;

            statusText.textContent = "Editing student details.";

            nameInput.focus();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Delete a student
        function deleteStudent(id) {
            const student = students.find(
                item => item.id === id
            );

            if (!student) return;

            if (!confirm("Are you sure you want to delete " +
                student.name + "?")) {
                return;
            }

            students = students.filter(
                item => item.id !== id
            );

            if (editingId === id) {
                resetForm();
            }

            saveStudents();
            displayStudents();

            statusText.textContent = "Student deleted successfully.";
        }

        // Cancel editing and clear the form
        function resetForm() {
            editingId = null;
            form.reset();

            submitBtn.textContent = "Add Student";
            cancelBtn.hidden = true;
        }

        cancelBtn.addEventListener("click", function() {
            resetForm();
            statusText.textContent = "Edit cancelled.";
        });

        // Initial display
        displayStudents();
