import Cell from "./cell.js";
import CellStorage from "./cellStorage.js";

const storage = new CellStorage();

// Function to render notes
const renderNotes = () => {
    const content = document.getElementById("content");
    const cells = Object.values(storage.loadAll())
        .map(Cell.deserialize)
        .filter(cell => cell.type === "note");

    content.innerHTML = `
        <h2>Notes</h2>
        <textarea id="note-input" placeholder="Write a new note..."></textarea>
        <button id="add-note">Add Note</button>
        <ul>
            ${cells.map(cell => `
                <li id="${cell.id}">
                    ${cell.content}
                    <button class="delete-note">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    // Add Note
    document.getElementById("add-note").addEventListener("click", () => {
        const noteInput = document.getElementById("note-input").value;
        if (noteInput.trim() !== "") {
            const newCell = new Cell(null, noteInput, "note");
            storage.save(newCell);
            renderNotes(); // Re-render after adding
        }
    });

    // Delete Note
    document.querySelectorAll(".delete-note").forEach(button => {
        button.addEventListener("click", () => {
            const cellId = button.parentElement.id;
            storage.delete(cellId);
            renderNotes(); // Re-render after deletion
        });
    });
};

// Function to render tasks
const renderTasks = () => {
    const content = document.getElementById("content");
    const cells = Object.values(storage.loadAll())
        .map(Cell.deserialize)
        .filter(cell => cell.type === "task");

    content.innerHTML = `
        <h2>Tasks</h2>
        <input type="text" id="task-input" placeholder="Enter a new task" />
        <button id="add-task">Add Task</button>
        <ul>
            ${cells.map(cell => `
                <li id="${cell.id}">
                    <input type="checkbox" ${cell.completed ? "checked" : ""} />
                    ${cell.content}
                    <button class="delete-task">Delete</button>
                </li>
            `).join("")}
        </ul>
    `;

    // Add Task
    document.getElementById("add-task").addEventListener("click", () => {
        const taskInput = document.getElementById("task-input").value;
        if (taskInput.trim() !== "") {
            const newCell = new Cell(null, taskInput, "task");
            storage.save(newCell);
            renderTasks(); // Re-render after adding
        }
    });

    // Toggle Task Completion
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const cellId = checkbox.parentElement.id;
            const cell = storage.load(cellId);
            cell.toggleCompleted();
            storage.save(cell);
            renderTasks(); // Re-render after toggling
        });
    });

    // Delete Task
    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", () => {
            const cellId = button.parentElement.id;
            storage.delete(cellId);
            renderTasks(); // Re-render after deletion
        });
    });
};

// Set up navigation
document.getElementById("notes-tab").addEventListener("click", () => {
    renderNotes();
    console.log("Switched to Notes view");
});

document.getElementById("tasks-tab").addEventListener("click", () => {
    renderTasks();
    console.log("Switched to Tasks view");
});

// Load Notes by default
window.onload = renderNotes;
