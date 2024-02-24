import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Container,
  CssBaseline,
  FormControlLabel,
  createTheme,
  ThemeProvider,
 
} from '@mui/material';
import './Homepage.css'; 
import AddRowForm from "../AddRowForm/AddRowForm";

const themes = {
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196f3', 
      },
      secondary: {
        main: '#4caf50', 
      },
    },
    typography: {
          fontFamily: 'monospace, sans-serif',
          fontWeight: 'bold' 
        },
  }),
  light: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3498db',
      },
      secondary: {
        main: '#2ecc71',
      },
    },
    typography: {
          fontFamily: 'monospace, sans-serif',
          fontWeight: 'bold' 
        },
  }),
};
const Homepage = () => {
    const [data, setData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [autoSync, setAutoSync] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const fetchDataFromSheet = async () => {
      try {
        const response = await fetch(
          `https://sheetdb.io/api/v1/c9f4husm6jqdd`
        );
        const data = await response.json();
        // console.log(data[0]);
        setData(data || []);
        setShowForm(false);
        setShowTable(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const addRow = async (newRowData) => {
        try {
          const response = await fetch(`https://sheetdb.io/api/v1/c9f4husm6jqdd`, {
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

      const toggleAutoSync = () => {
        setAutoSync(!autoSync);
      };

      useEffect(() => {
        if (autoSync) {
          const intervalId = setInterval(fetchDataFromSheet, 500); 
          return () => clearInterval(intervalId); 
        }
      }, [autoSync]);

    const columns = ["ID", "Avatar Name", "Performance Score"];

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    return (
      <ThemeProvider theme={darkMode ? themes.dark : themes.light}>
      <CssBaseline />
      <div className="Homepage">
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h3" fontFamily={"monospace"} fontWeight='bold'>SHEETSAPP</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <div className="button-group">
            <FormControlLabel
            control={

            <Switch
              className={`auto-sync-button ${autoSync ? 'active' : ''}`}
              onChange={toggleAutoSync}
              color="primary"
              size="large"
            />
            }
            label = {
            <div className="switch-label">
            <Typography className="switch-label-text" variant="body1">
              Auto Sync is {autoSync ? 'ON' : 'OFF'}
            </Typography>
            </div>
            }
          
            />
            <FormControlLabel
              control={
                <Switch
                  className={`auto-sync-button ${darkMode ? 'active' : ''}`}
                  onChange={toggleDarkMode}
                  color="primary"
                  size="large"
                />
              }
              label={
                <div className="switch-label">
                  <Typography className="switch-label-text" variant="body1">
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                  </Typography>
                </div>
              }
            />
            <ButtonGroup variant="contained">
            <Button className="sync-button" onClick={fetchDataFromSheet}>
              Sync Data
            </Button>
            <Button className="add-record-button" onClick={toggleForm}>
              Add Record
            </Button>
            </ButtonGroup>
          </div>
          {showForm && 
            <AddRowForm onAddRow={addRow} />
}
          {showTable && (
            <TableContainer component={Paper} elevation={10} className="data-table-container">
              <Table className="data-table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map((columnName, index) => (
                      <TableCell key={index}>{columnName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((columnName, columnIndex) => (
                        <TableCell key={columnIndex}>{row[columnName]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </div>
    </ThemeProvider>
    );
  };
  
  export default Homepage;