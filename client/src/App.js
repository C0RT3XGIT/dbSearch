import './App.css';
import {useState, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import React from "react"



  
function App() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [parseStatus, setParseStatus] = useState(true)
  const Par = styled.p`
    color: blue;
  `;
  const arrayOfNames = useRef([]) //Should be an array
  
  
  useEffect(() => {
    const parseAPI = async () => {
    
      const response = await fetch('/api');
      const data = await response.json();
      try {
        data.map((data)=> arrayOfNames.current.push(data.Name))
        setParseStatus(false);
      } catch (error) {
        console.log(error)
      }
    }
    
    parseAPI()
  }, [])


  if (parseStatus) {
    return <p>Getting data from API...</p>
  } 

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>
      {arrayOfNames.current.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((val, key) => {
        return (
          <div className="user" key={key}>
            <Par>{val}</Par>
          </div>
        );
      })}
    </div>
  );
}
export default App;
