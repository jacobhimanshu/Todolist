import { useEffect, useState } from "react"

function App() {
  //     const[text,settext] = useState("");
  // const[Des,setDes]= useState("");
  const [alltodo, setalltodo] = useState([]);
  const [singletodo, setsingletodo] = useState({ text: "", Des: "" });

  function handleaddtodo() {
    if (!singletodo.text || !singletodo.Des) {
      return;
    }
    setalltodo(prevValue => [...alltodo, singletodo]);
    savetodoLocalstore([...alltodo, singletodo]);
  }


  function deletetodo(i) {
    console.log(i)
    let newArr = [...alltodo];
    newArr.splice(i, 1);
    savetodoLocalstore(newArr);
    setalltodo(newArr);


  }



  function savetodoLocalstore(todo) {
    localStorage.setItem("todos", JSON.stringify(todo))
  }

  function gettodofromlocalstorage() {
    let data = JSON.parse(localStorage.getItem("alltodo")) || [];
    setalltodo(data)
  }

  useEffect(() => {
    gettodofromlocalstorage()
  }, [])

  return (
    <div className="bg-blue-400  w-screen  min-h-screen  text-center " >
      <h1 className="text-5xl pt-12">TODOAPP</h1>
      <div className="mt-10">
        <input className="text-2xl px-2 py-1 focus:outline-none capitalize rounded-md"
          type="text" placeholder="text" onChange={(e) => {
            return setsingletodo(prevValue => ({
              ...prevValue,
              text: e.target.value
            }))
          }}

        />
        <br />
        <br />
        <input className="text-2xl px-2 py-1 focus:outline-none capitalize rounded-md"
          type="text" placeholder="Des" onChange={(e) => setsingletodo(prevValue => ({ ...prevValue, Des: e.target.value }))}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleaddtodo();
            }
          }} />
        <br />
        <br />
        <button className="text-4xl bg-green-700 text-white rounded-md px-20 py-2" onClick={() => handleaddtodo()}>ADD</button>
      </div>
      <div className="w-[40%] sm:w-[70%] mx-auto">
        {
          alltodo.map((data, i) => (
            <div className="bg-cyan-300 pt-3 mt-2 m-4 p-3 flex justify-around" key={i}>
              <div className="flex w-[70%] overflow-hidden">
                <p className="bg-yellow-50  p-2 rounded-3xl mr-6 ">{i + 1}.</p>

                <div className="flex flex-col justify-start gap-1">

                  <h1 className=" capitalize text-2xl">{data.text}</h1>
                  <p className=" capitalize text-1xl">{data.Des}</p>
                </div>
              </div>

              <button className="bg-red-500 p-2 text-white rounded-md px-3 py-2 " onClick={() => deletetodo(i)}>DELETE</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App




