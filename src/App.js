import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

// display doesn't need to be state as we can compute it
function Screen({ firstNum, secondNum, operator }){
  let display = 0;
  switch(operator){
    case "+":
      display = firstNum + secondNum;
      break;
    case "-":
      display = firstNum - secondNum;
      break;
    case "*":
      display = firstNum * secondNum;
      break; 
    case "/":
      display = firstNum / secondNum;
      break;
  }

  return (
  <div className="screen">
    
      <p><span className="screenItem">{firstNum}</span> 
      <span className="screenItem">{(operator !== 0 && operator !== "=") ? operator : " "}</span>  
      <span className="screenItem">{secondNum !== 0 ? secondNum : ""}</span> 
      </p>

      <strong>{display}</strong>
    
    
  </div>
    
  )
  
}

function NumKeypad({ key, index, numKey, numPress }) {

  return (
    <button className="numKey keys" onClick={() => numPress(index)}>{numKey}</button>

  )
}

function OpKeypad({ index, op, opPress }) {
  const key = (op === "=" ? "equalsKey" : op === "CE" ? "ceKey" : "opKeys") ;


  return (
    <button className={`keys ${key}`} onClick={() => opPress(index)}>{op}</button>
  );
}

function App() {
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [operator, setOperator] = useState(0);


  const numKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const opKeys = ["=",  "+", "-", "*", "/", "CE"];


  
  const numPress = index => {
    let newNum = 0;
    let x = 0;
    

    // If no op has been pressed, set firstNum, else set secondNum
    {operator === 0 ?
      newNum = firstNum : newNum = secondNum;
    }
    // Allow for multiple digits
      newNum = newNum * 10;
      newNum = newNum + numKeys[index];

    // Update states
    {operator === 0 ?
      setFirstNum(newNum) : 
      setSecondNum(newNum);
    }

    // Set answer
      console.log(firstNum);
  };

  const opPress = index => {
    let prevOp = operator;
    setOperator(opKeys[index]);

    if (opKeys[index] === "CE"){
      setFirstNum(0);
      setSecondNum(0);
      setOperator(0);
      
      return;
    }

    if (opKeys[index] === "="){

      let newNum = 0;

      switch(prevOp){
        case "+":
          newNum = firstNum + secondNum;
          break;
        case "-":
          newNum = firstNum - secondNum;
          break;
        case "*":
          newNum = firstNum * secondNum;
          break; 
        case "/":
          newNum = firstNum / secondNum;
          break;
      }

      setFirstNum(newNum);
      setSecondNum(0);
    }

   // console.log({operator});
/*
    
    if (operator === "="){
      console.log("= pressed");
      let newNum = firstNum + secondNum;
      setDisplay(newNum);
      setFirstNum(newNum);
    
    }

    if (operator === "+"){
      console.log("+");
      let newNum = firstNum;
      setFirstNum(newNum);
      setSecondNum(0);

      setDisplay("+");
    }*/
  };

  return (
    <div className="App">
      <div>
        <Screen 
        firstNum={firstNum}
        secondNum={secondNum}
        operator={operator}
      />
      </div>

      <div className="keyboard">

        <div className="numPad">
          {numKeys.map((numKey, index) => (
          <NumKeypad 
          key={index}
          index={index}
          numKey={numKey}
          numPress={numPress}
          />
          ))}
        </div>

        <div className="opPad">
           {opKeys.map((opKey, index) => (
          <OpKeypad
            index={index} 
            op={opKey}
            opPress={opPress}
          />
        ))}
        </div>
      </div>
      
      

      
    </div>
  );
}

export default App;
