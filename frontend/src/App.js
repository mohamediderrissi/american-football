import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Loading from './components/Loading';
import Table from './components/Table';

const App = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const handleSubmit = (data) => {
    setLoading(true);
    fetch('http://localhost:4000/scores', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setResult(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.error(error);
      });
  };

  const render = () => {
    if (result) {
      return <Table data={result} />;
    } else if (isLoading) {
      return <Loading />;
    } else if (isError) {
      return <div>{alert('Some Error happend !')}</div>;
    } else {
      return <Form submit={handleSubmit} />;
    }
  };

  // cleaning
  useEffect(() => {
    return () => {
      setError(false);
    };
  }, []);

  return (
    <div className="App">
      <h1>American football</h1>
      {render()}
    </div>
  );
};

export default App;
