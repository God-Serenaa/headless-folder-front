import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Folder from "./components/Folder";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "folder/root")
      .then((response) => {
        // console.log(response.data);
        setId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <Header heading="Headless Folder"/>
    <div className="body">
    {id ? <Folder name="Root" id={id} parentId="" /> : null}
    </div>
    <Footer />
    </>
  );
}

export default App;
