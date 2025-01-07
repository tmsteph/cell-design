import Cell from "./cell.js";
import CellStorage from "./cellStorage.js";

const storage = new CellStorage();

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
    const newCell = new Cell(null, noteInput, "note");
    storage.save(newCell);
    renderNotes();
  });

  // Delete Note
  document.querySelectorAll(".delete-note").forEach(button => {
    button.addEventListener("click", () => {
      const cellId = button.parentElement.id;
      storage.delete(cellId);
      renderNotes();
    });
  });
};

document.getElementById("notes-tab").addEventListener("click", renderNotes);
window.onload = renderNotes;
