import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [len,setLen] = useState(8);
  const [numAll,setNumAll] = useState(false);
  const [charAll,setCharAll] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    if(numAll) str+='1234567890';
    if(charAll) str+='!@#$%^&*~_+[]{}`=';

    for(let i = 1 ; i<= len ;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char);
    }
    setPassword(pass);

  },[len,numAll,charAll,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[len,numAll,charAll,passwordGenerator])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className='bg-zinc-900 w-full uppercase flex flex-col gap-5 items-center py-20 h-screen text-white'>
      <div className="text-5xl uppercase font-bold">password Generator</div>
      <div className="flex items-center gap-0">
        <input type="text" className='w-[20vw] text-black py-4 rounded-l-xl px-4 text-3xl' ref={passwordRef} value={password} readOnly placeholder='password' />
        <div className='text-3xl bg-slate-600 py-[17.2px] px-4 rounded-r-2xl cursor-pointer' onClick={copyPasswordToClipBoard}>copy</div>
      </div>
      <div className="flex items-center gap-10 mt-5">

        <div className="flex gap-3 text-xl items-center">
          <input type="range" min={6} max={50} value={len} className=' cursor-pointer' onChange={(e)=>{setLen(e.target.value)}}/>
          <label>length : {len}</label>
        </div>

        <div className="flex gap-3 text-xl items-center">
          <input type="checkbox" defaultChecked={numAll} id='numberInput' onChange={()=>{setNumAll((prev)=>!prev)}} />
          <label>number</label>
        </div>

        <div className="flex gap-3 text-xl items-center">
          <input type="checkbox" defaultChecked={charAll} id='charInput' onChange={()=>{setCharAll((prev)=>!prev)}} />
          <label>character</label>
        </div>

      </div>
    </div>
  )
}

export default App
