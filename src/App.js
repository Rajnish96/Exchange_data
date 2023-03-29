import { useEffect, useState } from 'react';
import { Table, } from 'react-bootstrap';


import './App.css';
import axios from 'axios';

const BASE_URL = "http://192.168.1.8:5000"

function App() {
  const [data, setData] = useState()
  const [dataIcons, setDataIcons] = useState()

  useEffect(() => {
    axios.get(`${BASE_URL}/fetch-exchanges`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`${BASE_URL}/fetch-exchanges-icon`)
      .then(response => {
        setDataIcons(response.data);
      })
      .catch(error => {
        console.log(error);
      });


  }, []);


  return (
    <div className="App">
      <div> Exchange Data </div>
      <Table size='sm' striped bordered hover responsive style={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>

        <tbody>
          {data.map((data, index) => (
            <tr key={`${index}`}>
              <td>{index + 1}</td>
              <td>{data.exchange_id}</td>
              <td>{data.website}</td>
              <td>{data.name}</td>
              <td>{data.data_symbols_count}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default App;
