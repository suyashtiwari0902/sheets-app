import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

const AddRowForm = ({ onAddRow }) => {
  const theme = useTheme();
  const initialFormData = {
    ID: '',
    'Avatar Name': '',
    'Performance Score': '',
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
    setFormData(initialFormData); 
  };
  const formStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
    borderRadius: '8px',
  };
  const inputStyle = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '10px',
  };
  
  const buttonStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };
  

  return (
      <form style={formStyle} onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='ID'> ID: </label>
          <input
            type="text"
            id="ID"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='avatarName'>
            Avatar Name:
          </label>
          <input
            type="text"
            id="avatarName"
            name="Avatar Name"
            value={formData['Avatar Name']}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='performanceScore'>
            Performance Score:
          </label>
          <input
            type="text"
            id="performanceScore"
            name="Performance Score"
            value={formData['Performance Score']}
            onChange={handleChange}
            style={inputStyle} 
          />
        </div>
        <button type="submit" style={buttonStyle}>Add Row</button> 
      </form>
    );
};

export default AddRowForm;
