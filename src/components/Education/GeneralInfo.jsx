import { useState } from "react";
import "../../styles/GeneralInfo.css";

export default function GeneralInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isEditing: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      isEditing: false,
    }));
  };

  const handleEdit = () => {
    setFormData((prev) => ({
      ...prev,
      isEditing: true,
    }));
  };

  return (
    <div className="general-info">
      <h2>General Information</h2>

      {formData.isEditing ? (
        <form onSubmit={handleSubmit} className="general-info-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      ) : (
        <div className="general-info-display">
          <div className="info-item">
            <strong>Name:</strong> <span>{formData.name}</span>
          </div>
          <div className="info-item">
            <strong>Email:</strong> <span>{formData.email}</span>
          </div>
          <div className="info-item">
            <strong>Phone:</strong> <span>{formData.phone}</span>
          </div>
          <button onClick={handleEdit} className="edit-btn">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
