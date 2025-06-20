import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [sch, setSch] = useState(false)
  const ref = useRef(null)
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (sch) str += "!@#$%^&*()_+"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, sch, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, number, sch, generatePassword])

  const copypass = () => {
    ref.current.select()
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="w-full h-screen duration-300">
      <div className="flex flex-col items-center justify-center mt-20 gap-8">


        <div className="bg-blue-500 flex items-center p-5 rounded-full">

          <input type="text" className="bg-white rounded-full p-2.5" placeholder='password' value={password} readOnly ref={ref} />
          <button className="bg-black text-white px-4 py-2 ml-4 rounded-full" onClick={copypass}>copy</button>
        </div>


        <div className="flex items-center gap-4 bg-white p-5 rounded-full">
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
          <label htmlFor="range">{length}</label>

          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber((prev) => !prev)}
          />
          <label>Number</label>

          <input
            type="checkbox"
            checked={sch}
            onChange={() => setSch((prev) => !prev)}
          />
          <label>Special Character</label>
        </div>

      </div>
    </div>

  );
}

export default App;
