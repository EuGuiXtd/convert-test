import { useState } from "react";
import Swal from "sweetalert2";

function Conversor() {

  const [inputRomano, setinputRomano] = useState("");
  const [inputDecimal, setinputDecimal] = useState("");
  const [conversor, setconversor] = useState("romano");

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
      ["", "I","II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
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
      setinputDecimal("");
      setinputRomano("");
    } else {
      setconversor("romano");
      setinputDecimal("");
      setinputRomano("");
    }
  };

  const converter = () => {
    if (conversor === "decimal" && (inputDecimal < 1 || inputDecimal > 3999)) {errorDecimal()
    } else if (conversor === "romano" && (converterRomano(inputRomano) < 1 || converterRomano(inputRomano) > 3999)) {
      errorRomano()
    } else if (conversor === "romano") {
      setinputDecimal(converterRomano(inputRomano))
    } else if (conversor === "decimal") {
      setinputRomano(converterDecimal(inputDecimal))
    } 
  }

  const alertVazio = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Digite um numero para converter!',
    })
  };

  const errorDecimal = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Digite um numero de 1 até 3999!',
    })
  };

  const errorRomano = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Digite um numero de I até MMMCMXCIX!',
    })
  };

const handleKeyDown = (event) => {
    if (event.keyCode === 13 && conversor === "romano" && inputRomano === ""){
       alertVazio()
    } else if (event.keyCode === 13 && conversor === "decimal" && inputDecimal === ""){
       alertVazio()
    } else if (event.keyCode === 13){
      converter();
    }
  };


  return (
    <>
      <h1 style={{textAlign: "center", paddingBottom: "5px"}}>
        Conversor de numeros
      </h1>
      { conversor === "romano" ? 
        <div class="input-group">
         <input
           type='text'
           name='inputRomano'
           class="form-control"
           style={ { textAlign: "center" } }
           aria-describedby="button-addon4"
           value={inputRomano}
           onChange={handleInput}
           onKeyUp={handleKeyDown}
           placeholder={conversor === "romano" ? "Digite um numero romano" : "Veja aqui o valor romano"} 
          />
          <input
            type='number'
            name='inputDecimal'
            class="form-control"
            style={ { textAlign: "center" } }
            aria-describedby="button-addon4"
            value={inputDecimal}
            onChange={handleInput}
            placeholder={conversor === "decimal" ? "Digite um numero decimal" : "Veja aqui o valor decimal"} 
          />
          <div class="input-group-append" id="button-addon4">
                <button
        type='button'
        onClick={ () => converter()}
        class="btn btn-outline-secondary"
      >
        Converter
      </button>
      <button
        type='button'
        onClick={ trocar }
        class="btn btn-outline-secondary"
      >
        Trocar
      </button>
      </div>
        </div>
         :
        <div class="input-group">
         <input
           type='number'
           name='inputDecimal'
           class="form-control"
           style={ { textAlign: "center" } }
           aria-describedby="button-addon4"
           value={inputDecimal}
           onChange={handleInput}
           onKeyUp={handleKeyDown}
           placeholder={conversor === "decimal" ? "Digite um numero decimal" : "Veja aqui o valor decimal"} 
          />
          <input
            type='text'
            name='inputRomano'
            class="form-control"
            style={ { textAlign: "center" } }
            aria-describedby="button-addon4"
            value={inputRomano}
            onChange={handleInput}
            placeholder={conversor === "romano" ? "Digite um numero romano" : "Veja aqui o valor romano"}
          />
          <div class="input-group-append" id="button-addon4">
                <button
        type='button'
        onClick={ () => converter()}
        class="btn btn-outline-secondary"
      >
        Converter
      </button>
      <button
        type='button'
        onClick={ trocar }
        class="btn btn-outline-secondary"
      >
        Trocar
      </button>
      </div>
         </div> 
      }
    </>
  );
}

export default Conversor;
