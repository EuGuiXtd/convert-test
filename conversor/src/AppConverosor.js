import { useState } from "react";

function Conversor() {

  const [inputRomano, setinputRomano] = useState("");
  const [inputDecimal, setinputDecimal] = useState("");
  const [conversor, setconversor] = useState("romano");
  const [resultado, setresultado] = useState("decimal");

  const handleInput = (event) => {
    const { name,value } = event.target;
    if (name === "inputDecimal") {
      setinputDecimal(value);
    } else {
      setinputRomano(value);
    }
  };

  const converterRomano = (romano) => {
    const romanos = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
      i: 1,
      v: 5,
      x: 10,
      l: 50,
      c: 100,
      d: 500,
      m: 1000,
    };

    let decimal = 0;

    for (let index = 0; index < romano.length; index += 1) {
      const atual = romanos[romano[index]];
      const proximo = romanos[romano[index + 1]];
      if (atual < proximo) {
        decimal -= atual;
      } else {
        decimal += atual;
      }
    }
    return decimal;
  };

  const converterDecimal = (decimal) => {
    const romanos = [
      ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
      ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
      ["", "M", "MM", "MMM", "MMMM"],
    ];

    let romano = "";
    let casa = 0;

    while (decimal > 0) {
      const resto = decimal % 10;
      decimal = Math.floor(decimal / 10);
      romano = romanos[casa][resto] + romano;
      casa += 1;
    }
    return romano;
  };

  const trocar = () => {
    if (conversor === "romano") {
      setconversor("decimal");
      setresultado("romano");
      setinputDecimal("");
      setinputRomano("");
    } else {
      setconversor("romano");
      setresultado("decimal");
      setinputDecimal("");
      setinputRomano("");
    }
  };


  return (
    <>
      <h1>
        Conversor de numeros
      </h1>
      { conversor === "romano" ? 
        <>
         <input
           type='text'
           name='inputRomano'
           value={inputRomano}
           onChange={handleInput}
           placeholder={resultado === "romano" ? "Veja aqui o valor romano" : "Digite um numero romano"} 
          />
          <input
            type='number'
            name='inputDecimal'
            value={inputDecimal}
            onChange={handleInput}
            placeholder={resultado === "decimal" ? "Veja aqui o valor decimal" : "Digite um numero decimal"} 
          />
        </>
         :
        <>
         <input
           type='number'
           name='inputDecimal'
           value={inputDecimal}
           onChange={handleInput}
           placeholder={resultado === "decimal" ? "Veja aqui o valor decimal" : "Digite um numero decimal"} 
          />
          <input
            type='text'
            name='inputRomano'
            value={inputRomano}
            onChange={handleInput}
            placeholder={resultado === "romano" ? "Veja aqui o valor romano" : "Digite um numero romano"}
          />
         </> 
      }
      <button
        type='button'
        onClick={conversor === "romano" ? () => setinputDecimal(converterRomano(inputRomano)) : () => setinputRomano(converterDecimal(inputDecimal)) }
      >
        Converter
      </button>
      <button
        type='button'
        onClick={ trocar }
      >
        Trocar
      </button>
    </>
  );
}

export default Conversor;
