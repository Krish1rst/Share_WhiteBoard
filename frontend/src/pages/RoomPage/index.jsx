import React from 'react'
import "./index.css";
import { useState ,useRef } from 'react';
import WhiteBoard from '../../components/Whiteboard';

function RoomPage() {
const canvasRef=useRef(null);
const ctxRef = useRef(null);

    const [tool,setTool]=useState('pencil');
    const [color,setColor]=useState('black');
    const [elements,setElements]=useState([]);
    const[history, setHistory]=useState([]);

    const handleClearCanvas=()=>{
        const canvas =canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillRect='white';
        ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
        setElements([]);
    }

    const undo = () => {
        if (elements.length > 0) {
          setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1],
          ]);
          setElements((prevElements) =>
            prevElements.slice(0, prevElements.length - 1)
          );
        }
      };
    const redo = ()=>{
        if (history.length > 0) {
    setElements((prevElements)=>[
        ...prevElements,
        history[history.length-1],
    ]);
    setHistory((prevHistory)=>prevHistory.slice(0,prevHistory.length-1));}
    }
  return (
    <div className="row">
        <h1 className="text-center py-4">White Board Sharing app<span className='text-primary'>[Users Online : 0]</span></h1>
        <div className="col-md-10 mx-auto 
         px-5  mb-5 d-flex align-items-center jusitify-content-center">
            <div className="d-flex col-md-2 justify-content-center gap-1">
                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="pencil">pencil</label>
                    <input type="radio" name='tool' id='pencil' checked={tool==='pencil'} value='pencil'className='mt-1' onChange={(e)=>setTool(e.target.value)} />
                </div>
                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="line">line</label>
                    <input type="radio" name='tool' id='line'checked={tool==='line'}  value='line'className='mt-1' onChange={(e)=>setTool(e.target.value)} />
                </div>
                <div className="d-flex gap-1 align-items-center">
                    <label htmlFor="rectangle">rectangle</label>
                    <input type="radio" name='tool' id='rectangle' checked={tool==='rectangle'} value='rectangle'className='mt-1' onChange={(e)=>setTool(e.target.value)} />
                </div>
            </div>
            <div className="col-md-3 mx-auto">
                <div className="d-flex align-items-center justify-content-center ">
                    <label htmlFor="color">Select Color:</label>
                    <input type="color" id='color' className='mt-1 ms-2' value={color} onChange={(e)=>setColor(e.target.value)} />
                </div>
            </div>
            <div className="col-md-3 d-flex gap-2">
                <button className='btn btn-primary mt-1' disabled={elements.length===0}
                onClick={()=>undo()}>Undo</button>
                <button className='btn btn-outline-primary mt-1'disabled={elements.length<1}
                onClick={()=>redo()}>ReDo</button>
            </div>
            <div className="col-md-2">
                <button className="btn btn-danger" onClick={handleClearCanvas}>
                    Clear Canvas
                </button>
            </div>
        </div>
        <div className="col-md-10 mx-auto mt-1 canvas-box">
            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef}tool={tool} elements={elements} setElements={setElements} color={color}/>
        </div>
    </div>
  )
}

export default RoomPage