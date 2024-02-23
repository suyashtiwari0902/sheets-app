import { useState } from "react";
import './Homepage.css'; 
import AddRowForm from "../AddRowForm/AddRowForm";
const Homepage = () => {
    const [data, setData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchDataFromSheet = async () => {
      try {
        const response = await fetch(
          `https://sheetdb.io/api/v1/94rbjtqoxmgj0`
        );
        const data = await response.json();
        // console.log(data[0]);
        setData(data || []);
        setShowTable(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const addRow = async (newRowData) => {
        try {
          const response = await fetch(`https://sheetdb.io/api/v1/94rbjtqoxmgj0`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRowData),
          });
          fetchDataFromSheet();
          setShowTable(true);
          setShowForm(false);
        } catch (error) {
          console.error('Error adding row:', error);
        }
      };

      const toggleForm = () => {
        setShowForm(!showForm);
        setShowTable(false);
      };

    const columns = ["ID", "Avatar Name", "Performance Score"];
  
    return (
      <div className="Homepage">
        <header className="app-header">
        <h1>SheetsApp</h1>
        </header>
        <div className="buttons-container">
        <button className="sync-button" onClick={fetchDataFromSheet}>
          Sync Data
        </button>
        <button className="add-record-button" onClick={toggleForm}>
          Add Record
        </button>
      </div>
        {showForm && <AddRowForm onAddRow={addRow}/> }
        {showTable && (
            <table className="data-table">
            <thead>
            <tr>
            {columns.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
            </tr>
          </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((columnName, columnIndex) => (
            <td key={columnIndex}>{row[columnName]}</td>
          ))}
          </tr>
        ))}
      </tbody>
    </table>
        )}
      </div>
    );
  };
  
  export default Homepage;