import React, { useState, useEffect, useRef } from 'react';
const NO_INPOUT_BOX = 6;

export default function OtpInput() {
  const [inputAry, setInputAry] = useState(new Array(NO_INPOUT_BOX).fill(''));
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    const newVal = value.trim();
    const newAry = [...inputAry];
    newAry[index] = newVal.slice(-1);
    setInputAry(newAry);
    newVal && inputRef.current[index + 1]?.focus();
  };

  const handleBackSpace = (e, index) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      inputRef.current[index + 1]?.focus();
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      inputRef.current[index - 1]?.focus();
      return;
    }

    if (e.key === 'Backspace' && !e.target.value) {
      inputRef.current[index - 1]?.focus();
    }

    // if (e.key === "Backspace" && !inputAry[index] && index > 0) {
    //   const nextOtp = [...inputAry];
    //   nextOtp[index - 1] = "";
    //   setInputAry(nextOtp);
    //   inputRef.current[index - 1]?.focus();
    // }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>OTP Input</h1>

      <div>
        {inputAry.map((item, index) => {
          return (
            <input
              key={index}
              type="text"
              style={{
                height: '50px',
                width: '50px',
                margin: '5px',
                fontSize: '40px',
                textAlign: 'center',
              }}
              value={item}
              onChange={e => handleOnChange(e.target.value, index)}
              ref={input => (inputRef.current[index] = input)}
              onKeyDown={e => handleBackSpace(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
}
