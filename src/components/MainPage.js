import MessageDisplay from "./MessageDisplay";
import { useState } from "react";
import "./Mainpage.css"

export default function Mainpage() {
  const [value, setValue] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Query = async () => {
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
      }),
    };
    try {
      const response = await fetch("http://localhost:8000/generate", options);
      const data = await response.json();

      setChat([data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const latestCode = chat.filter((chat) => chat.role === "assistant").pop();

  return (
    <div className="page">
      <div className="heading">
        <img
          className="heading--img"
          src="https://cdn-icons-png.flaticon.com/512/5815/5815809.png"
          alt="database logo"
        />
        <h1>
          Generate SQL

        </h1>
      </div>
      <div className="generate-query">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="input--query"
          type="text"
          placeholder="Describe your query"
        />
        <button id="button--query" onClick={Query}>
          {isLoading ? "Generating..." : "Generate Query"}
        </button> <span className="tooltip">
            <span className="tooltiptext">
              This tool generates SQL queries based on your description.
            </span>
            what's this?
          </span>
        {isLoading && (
          <div className="loader">
            {/* Add your loading animation (e.g., spinner) here */}
            
          </div>
        )}
                 
        <MessageDisplay text={latestCode?.content || ""}></MessageDisplay>
      </div>
    </div>
  );
}
