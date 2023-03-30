import { useEffect, useState } from 'react';
import { Button, Table, } from 'react-bootstrap';
import Loader from './Loder'


import './App.css';
import axios from 'axios';

const BASE_URL = "http://localhost:500"

function App() {
  const [data, setData] = useState([])
  const [dataIcons, setDataIcons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [load, setload] = useState(true)

  console.log('data', data);
  useEffect(() => {
    axios.get('https://rest.coinapi.io/v1/exchanges', {
      headers: { 'X-CoinAPI-Key': '60A8E894-BCDC-4A69-9BB7-4F5B5582E2EE' },
    })
      .then(response => {
        console.log('res', response.data);
        setData(response.data);
        setload(false)
      })
      .catch(error => {
        console.log(error);
        setload(false)
      });

    axios.get(`${BASE_URL}/fetch-exchanges-icon`)
      .then(response => {
        setDataIcons(response.data);
      })
      .catch(error => {
        console.log(error);
      });


  }, []);
  const saveDataDB = () => {

  }

  const totalPages = Math.ceil(data.length / 10);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(load);
  return (
    <div className="App">
      <div className='container-fluid'>
        <div>Coin </div>

        {data.length > 0 ?
          <div className='my-2'>
            <Button size='sm' >get Data</Button>
          </div> : <div className='my-3'>
            <Button size='sm' variant="success" onClick={saveDataDB} >Save Coin in Local Storage</Button>
          </div>}
        {data.length > 0 ? <>
          <Table size='sm' striped bordered hover responsive style={{ fontSize: "clamp(10px, 1.5vw, 16px)" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>exchange_id</th>
                <th>website</th>
                <th>name</th>
                <th>data_symbols_count</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((data, index) => (
                <tr key={`${index}`}>
                  <td>{startIndex + index + 1}</td>
                  <td>{data.exchange_id}</td>
                  <td>{data.website}</td>
                  <td>{data.name}</td>
                  <td>{data.data_symbols_count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination justify-content-center">
            {currentPage > 1 && (
              <Button size="sm" variant="secondary" onClick={() => handlePageChange(currentPage - 1)}>{"<"}</Button>
            )}

            {Array.from({ length: totalPages }).map((_, i) => {
              if (
                i === 0 ||
                i === totalPages - 1 ||
                (i >= currentPage - 2 && i <= currentPage)
              ) {
                return (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "primary" : "secondary"}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                );
              } else if (
                (i === currentPage - 3 && currentPage > 3) ||
                (i === currentPage + 1 && currentPage < totalPages - 2)
              ) {
                return <span key={i}>...</span>;
              } else {
                return null;
              }
            })}
            {currentPage < totalPages && (
              <Button size="sm" variant="secondary" onClick={() => handlePageChange(currentPage + 1)}>{">"}</Button>
            )}
          </div></> : <div>we have no data</div>}
        <Loader loading={load} />

      </div>
    </div>
  );
}

export default App;
