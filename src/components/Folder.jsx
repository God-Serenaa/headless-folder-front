import { useEffect, useState } from "react";
import {
  HiOutlineFolder,
  HiOutlineFolderAdd,
  HiOutlineFolderRemove,
  HiOutlineFolderOpen
} from "react-icons/hi";
import axios from "axios";
import "./Folder.css";

function Folder({ name, id, parentId, notifyDelete }) {
  const BASE_URL = import.meta.env.VITE_SERVER_URL + "folder/";
  const [children, setChildren] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [nameFieldShow, setNameFieldShow] = useState(false);
  const [nameField, setNameField] = useState("");

  useEffect(() => {
    // if (id) {
    axios
      .get(BASE_URL + id)
      .then((response) => {
        setChildren(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  }, []);

  async function addNewFolder(name) {
    // if (id) {
    axios
      .post(BASE_URL + id, { name: name })
      .then((response) => {
        setChildren((prev) => [...prev, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  }

  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      setNameFieldShow(false);
      addNewFolder(nameField);
    } else if (e.key === "Escape") {
      setNameFieldShow(false);
    }
  }

  async function deleteSelf() {
    // if (id) {
    axios
      .delete(BASE_URL + parentId + "/" + id)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  }

  const fromChild = (data) => {
    setChildren((prev) => prev.filter((child) => data !== child.id));
  };

  const [childInput, setChildInput] = useState(id);

  const forParent = () => {
    notifyDelete(childInput);
    deleteSelf();
  };

  return (
    <>
      <div className="container">
        <div className="alwaysshow">
          <div
            className="icons"
            onClick={() => {
              visibility ? setVisibility(false) : setVisibility(true);
            }}>
            {" "}
            {visibility ? <HiOutlineFolderOpen /> : <HiOutlineFolder />}
          </div>
          <div
            className="name"
            onClick={() => {
              visibility ? setVisibility(false) : setVisibility(true);
            }}>
            {name}
          </div>
          <div className="buttons">
            <button type="button" onClick={() => setNameFieldShow(true)}>
              <HiOutlineFolderAdd />
            </button>
            {name === "Root" ? null : (
              <button type="button" onClick={forParent}>
                <HiOutlineFolderRemove />
              </button>
            )}
          </div>
        </div>

        {nameFieldShow ? (
          <div className="addnewfolder">
            <input
              autoFocus
              className="folderName"
              type="text"
              value={nameField}
              onChange={(e) => setNameField(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
          </div>
        ) : null}
        {visibility ? (
          <div className="children">
            {children.map((child) => (
              <Folder
                name={child.name}
                id={child.id}
                parentId={id}
                key={child.id}
                notifyDelete={fromChild}
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Folder;
