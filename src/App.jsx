import { useEffect } from "react";
import Header from "./Header";
import MainComponant from "./MainComponant";

function App() {
  useEffect(function () {
    async data = fetch('http://localhost:8000/questions')
    await data.json 
  }, []);
  return (
    <div className="app">
      <Header />
      <MainComponant>
        <p>1/15</p>
        <p>quistion ?</p>
      </MainComponant>
    </div>
  );
}

export default App;
