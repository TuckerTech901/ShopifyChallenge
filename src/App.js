import './App.css';
import React, { useState} from 'react'

function App() {

  const [responses, setResponses] = useState([])
  const [prompt, setPrompt] = useState("What is the diameter of the sun?");
  const data = {
    prompt: prompt
  };
  const fetchResponses = () =>{
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        var results = result.choices.map(choice=>{
          return {
            prompt: prompt,
            text: choice.text
          }
        })
        setResponses([...results, ...responses])
      })
    };
  return (
    <div className="App">
      <input value={prompt} onChange={(e)=>setPrompt(e.target.value)}/>
      <button onClick={() => fetchResponses()}>
        Click me
      </button>
      <ListResponses responses={responses} />
    </div>
  );
}
function ListResponses(props) {

  return (
    <div>
      {
        props.responses.map(
          (choice, index) => {
            return (
              <div key={index}>
                <p> Prompt: {choice.prompt} </p>
                <p> Response: {choice.text}</p>

              </div>
            )
          }
        )
      }
    </div>
  );
}
export default App;