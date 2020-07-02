import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {

  const [ inside, setInside ] = useState(0);
  const [ waiting, setWaiting ] = useState(0);
  const [ total, setTotal ] = useState(0);

  const randomInt = (min, max) => {
    if(max == null) {
      max = (min == null ? Number.MAX_SAFE_INTEGER : min);
        min = 0;
    }
  
    min = Math.ceil(min);  // inclusive min
    max = Math.floor(max); // exclusive max
  
    if(min > max - 1) {
      throw new Error("Incorrect arguments.");
    }
  
    return min + Math.floor((max - min) * Math.random());
  }
  
  const arrive = n => {
    setWaiting(t => t + n);
  };

  const leave = n => {
    setInside(t => t - n);
    if(waiting > 0) {
      enter(1);
    }
  };

  const enter = n => {
    setInside(i => i + n);
    setTotal(t => t + n);
    setWaiting(t => t - n);
  };

  useEffect(() => {
    const initInside = randomInt(345, 360);
    const initWaiting = randomInt(5, 15);

    enter(initInside);
    setWaiting(initWaiting);

    setInterval(() => {
      if(Math.random() < 0.5) {
        enter(1)
      }

      if(Math.random() < 0.5) {
        arrive(1)
      }

      if(Math.random() < 0.5) {
        leave(1)
      }
    }, 1000);
  }, []);

  return (
    <div className="App">
      <header className="header">
        <img src="https://ventaspop-images.staticgnt.com/Reho3AyIpcvex92MwvjqJhjxbxs=/filters:quality(100)/files/shops/242/242/logo.png" alt="Salitre Mágico" />
      </header>
      <main className="counters">
        <Counter title="Personas en el parque" className="inside" number={inside}></Counter>
        <Counter title="Ya ingresaron" className="total" number={total}></Counter>
        <Counter title="Pendientes de entrar" className="waiting" number={waiting}></Counter>
      </main>
    </div>
  );
}

const Counter = ({ title, className, number }) => {
  return <div className={`counter ${className}`}>
    <h2>{title}</h2>
    <div className="number">
      <p>{number}</p>
    </div>
  </div>;
}

export default App;
