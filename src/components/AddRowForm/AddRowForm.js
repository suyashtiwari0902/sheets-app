// src/AddRowForm.js
import React, { useState } from 'react';
import './AddRowForm.css';
const AddRowForm = ({ onAddRow }) => {
  const initialFormData = {
    ID: '',
    'Avatar Name': '',
    'Performance Score': '',
    // Add more fields as needed
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRow(formData);
    setFormData(initialFormData); // Reset form fields after submission
  };

  return (
    <form className="add-row-form" onSubmit={handleSubmit}>
        <div className='form-group'>
      <label htmlFor='ID'> ID: </label>
        <input type="text" id="ID" name="ID" value={formData.ID} onChange={handleChange} />
        </div>
        <div className='form-group'>

        </div>
        <div className='form-group'>
      <label htmlFor='avatarName'>
        Avatar Name:
      </label>
        <input type="text" id="avatarName" name="Avatar Name" value={formData['Avatar Name']} onChange={handleChange} />
        </div>
        <div className='form-group'>
      <label htmlFor='performanceScore'>
        Performance Score:
      </label>
        <input type="text" id="performanceScore" name="Performance Score" value={formData['Performance Score']} onChange={handleChange} />
      </div>
      {/* Add more input fields for additional columns */}

      <button type="submit">Add Row</button>
    </form>
  );
};

export default AddRowForm;
