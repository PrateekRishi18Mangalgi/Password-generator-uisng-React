import { useState, useCallback, useEffect, useRef, use} from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    
    if (numberAllowed) {
      str += "1234567890";
    }
    
    if (charAllowed) {
      str += "!@#$%^&*()_+";
    }
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }
  , [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-gray-800'> 
        <h1 className='text-2xl text-center font-bold text-white py-2'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 p-4'>
          <input 
            type='text' 
            value={password} 
            className='outline-none w-full py-1 px-3 text-black bg-white'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordtoClipboard}
          className='bg-blue-500 px-3 py-1'>Copy</button>
        </div>

        <div className='flex flex-col gap-y-3'>
          {/* Length Slider */}
          <div className='flex items-center gap-x-5'>
            <input 
              type="range" 
              min={6} 
              max={16} 
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer'
            />
            <label className="text-white">Length: {length}</label>
          </div>

          {/* Checkbox Options */}
          <div className="flex items-center gap-x-5">
            {/* Number Checkbox */}
            <div className="flex items-center gap-x-2">
              <input 
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label className="text-white mb-0 py-4">Include Numbers</label>
            </div>

            {/* Character Checkbox */}
            <div className="flex items-center gap-x-2">
              <input 
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="text-white mb-0 py-4">Include Characters</label>
            </div>
          </div>

   
          {/* <button 
            onClick={generatePassword} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4  hover:bg-green-600"
          >
            Generate Password
          </button> */}
        </div>
      </div>
    </>
  );
}

export default App;
