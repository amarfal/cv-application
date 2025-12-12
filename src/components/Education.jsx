import { useState } from "react";
import "../styles/Education.css";

export default function Education() {
  const [isEditing, setIsEditing] = useState(true);
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    schoolName: "",
    titleOfStudy: "",
    dateOfStudy: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingId ? { ...currentEntry, id: editingId } : entry
        )
      );
      setEditingId(null);
    } else {
      const newEntry = {
        ...currentEntry,
        id: Date.now(),
      };
      setEntries((prev) => [...prev, newEntry]);
    }
    setCurrentEntry({
      schoolName: "",
      titleOfStudy: "",
      dateOfStudy: "",
    });
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setCurrentEntry({
      schoolName: entryToEdit.schoolName,
      titleOfStudy: entryToEdit.titleOfStudy,
      dateOfStudy: entryToEdit.dateOfStudy,
    });
    setEditingId(id);
  };

  const handleDeleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (editingId === id) {
      setCurrentEntry({
        schoolName: "",
        titleOfStudy: "",
        dateOfStudy: "",
      });
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setCurrentEntry({
      schoolName: "",
      titleOfStudy: "",
      dateOfStudy: "",
    });
    setEditingId(null);
  };

  const handleSectionSubmit = () => {
    setIsEditing(false);
  };

  const handleSectionEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="education">
      <h2>Education</h2>

      {isEditing ? (
        <div className="education-edit-mode">
          <form onSubmit={handleAddEntry} className="education-form">
            <div className="form-group">
              <label htmlFor="schoolName">School Name:</label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={currentEntry.schoolName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="titleOfStudy">Title of Study:</label>
              <input
                type="text"
                id="titleOfStudy"
                name="titleOfStudy"
                value={currentEntry.titleOfStudy}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfStudy">Date of Study:</label>
              <input
                type="text"
                id="dateOfStudy"
                name="dateOfStudy"
                value={currentEntry.dateOfStudy}
                onChange={handleInputChange}
                placeholder="e.g., 2015-2019"
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="add-btn">
                {editingId !== null ? "Update Entry" : "Add Entry"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {entries.length > 0 && (
            <div className="education-entries">
              <h3>Education Entries:</h3>
              {entries.map((entry) => (
                <div key={entry.id} className="education-entry-edit">
                  <div className="entry-content">
                    <p>
                      <strong>School:</strong> {entry.schoolName}
                    </p>
                    <p>
                      <strong>Title:</strong> {entry.titleOfStudy}
                    </p>
                    <p>
                      <strong>Date:</strong> {entry.dateOfStudy}
                    </p>
                  </div>
                  <div className="entry-actions">
                    <button
                      onClick={() => handleEditEntry(entry.id)}
                      className="edit-entry-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSectionSubmit}
            className="submit-section-btn"
            disabled={entries.length === 0}
          >
            Submit Section
          </button>
        </div>
      ) : (
        <div className="education-display">
          {entries.map((entry) => (
            <div key={entry.id} className="education-entry-display">
              <h3>{entry.schoolName}</h3>
              <p className="study-title">{entry.titleOfStudy}</p>
              <p className="study-date">{entry.dateOfStudy}</p>
            </div>
          ))}
          <button onClick={handleSectionEdit} className="edit-section-btn">
            Edit Section
          </button>
        </div>
      )}
    </div>
  );
}
