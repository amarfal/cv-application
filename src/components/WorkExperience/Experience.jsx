import { useState } from "react";
import "../../styles/Experience.css";

export default function Experience() {
  const [isEditing, setIsEditing] = useState(true);
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    companyName: "",
    positionTitle: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
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
      companyName: "",
      positionTitle: "",
      responsibilities: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setCurrentEntry({
      companyName: entryToEdit.companyName,
      positionTitle: entryToEdit.positionTitle,
      responsibilities: entryToEdit.responsibilities,
      startDate: entryToEdit.startDate,
      endDate: entryToEdit.endDate,
    });
    setEditingId(id);
  };

  const handleDeleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (editingId === id) {
      setCurrentEntry({
        companyName: "",
        positionTitle: "",
        responsibilities: "",
        startDate: "",
        endDate: "",
      });
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setCurrentEntry({
      companyName: "",
      positionTitle: "",
      responsibilities: "",
      startDate: "",
      endDate: "",
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
    <div className="experience">
      <h2>Experience</h2>

      {isEditing ? (
        <div className="experience-edit-mode">
          <form onSubmit={handleAddEntry} className="experience-form">
            <div className="form-group">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={currentEntry.companyName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="positionTitle">Position Title:</label>
              <input
                type="text"
                id="positionTitle"
                name="positionTitle"
                value={currentEntry.positionTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="responsibilities">Responsibilities:</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={currentEntry.responsibilities}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe your key responsibilities..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="text"
                  id="startDate"
                  name="startDate"
                  value={currentEntry.startDate}
                  onChange={handleInputChange}
                  placeholder="e.g., Jan 2020"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="text"
                  id="endDate"
                  name="endDate"
                  value={currentEntry.endDate}
                  onChange={handleInputChange}
                  placeholder="e.g., Present or Dec 2022"
                  required
                />
              </div>
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
            <div className="experience-entries">
              <h3>Experience Entries:</h3>
              {entries.map((entry) => (
                <div key={entry.id} className="experience-entry-edit">
                  <div className="entry-content">
                    <p>
                      <strong>Company:</strong> {entry.companyName}
                    </p>
                    <p>
                      <strong>Position:</strong> {entry.positionTitle}
                    </p>
                    <p>
                      <strong>Responsibilities:</strong>{" "}
                      {entry.responsibilities}
                    </p>
                    <p>
                      <strong>Duration:</strong> {entry.startDate} -{" "}
                      {entry.endDate}
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
        <div className="experience-display">
          {entries.map((entry) => (
            <div key={entry.id} className="experience-entry-display">
              <h3>{entry.positionTitle}</h3>
              <p className="company-name">{entry.companyName}</p>
              <p className="date-range">
                {entry.startDate} - {entry.endDate}
              </p>
              <p className="responsibilities">{entry.responsibilities}</p>
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
