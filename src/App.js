import { useState, useRef, useEffect } from "react";
import useJsonCall from "./useJsonCall";
import "./App.css";

function App() {
  const [value, setvalue] = useState("");
  const [page, setpage] = useState(1);
  const [valueApi, isLoading] = useJsonCall(value, page);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    setvalue(e.target.value);
  };

  const handleBtn = () => {
    console.log(inputRef);
    console.log("btn clicked");
  };

  const callBack = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setpage(page + 1);
      console.log(entry);
      console.log("load data");
    }
    return null;
  };

  const options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "100px",
    threshold: 0.1,
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callBack, options);
    inputRef.current && observer.observe(inputRef.current);
  }, [valueApi]);

  // console.log(inputRef);
  return (
    <div>
      <div className="App">
        <input
          value={value}
          onChange={handleChange}
          className="input"
          style={{
            padding: ".5rem 1rem",
            borderRadius: "25px",
            border: "none",
          }}
          placeholder="search..."
        />
      </div>
      <div
        style={{
          // marginTop: "5.5rem",
          display: "flex",
          flexDirection: "column",
          // margin: "auto",
          textAlign: "center",
          // justifyContent: "center",
          alignItems: "center",
          background: "#cecece",
        }}
      >
        {valueApi.map((val, index) => (
          <div
            key={index}
            style={{
              width: "440px",
              height: "300px",
              background: `url("${val.src}")`,
              padding: "1rem",
              margin: ".5rem 0",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            ref={index + 1 === valueApi.length ? inputRef : null}
          >
            {/* <img src={val} alt={val} /> */}
            <p>{val.id}</p>
          </div>
        ))}
      </div>
      {isLoading ? "Loading..." : null}
    </div>
  );
}

export default App;
