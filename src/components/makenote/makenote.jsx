import React, { useEffect, useState } from "react";
import "./makenote.css";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiNote } from "react-icons/bi";
import {url} from '../../config'

function Makenote() {
  const emailsess = sessionStorage.getItem("email");

 const [title,setTitle]=useState('')
 const [content,setContent]=useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    var snote = event.target.note.value;
    var stopic = event.target.topic.value;

    const sendData = async () => {
      axios
        .post(`${url}/note/setnote`, {
          note: snote,
          topic: stopic,
          email: emailsess,
        })
        .then((res) => {
          const box = document.getElementById("resdisplay");
          box.style.opacity = "100%";

          function showres() {
            box.style.opacity = "0";
          }

          setTitle('')
          setContent('')
          setTimeout(showres, 2000);

        });
    };

    sendData();
  };

  const handleclick = (event) => {
    document.getElementById("note").value = "";
    document.getElementById("topic").value = "";
  };

  return (
    <>
      <Link to="/">
        {" "}
        <div className="pin">
          <p>
            <FaHome
              size="35px"
              style={{ verticalAlign: "middle", marginRight: "10px" }}
            />
          </p>
        </div>{" "}
      </Link>
      <Link to="/seenote">
        {" "}
        <div className="pin2">
          <p>
            <BiNote
              size="35px"
              style={{ verticalAlign: "middle", marginLeft: "10px" }}
            />
          </p>
        </div>{" "}
      </Link>

      <div id="display">
        <div id="resdisplay">
          <p>
            {emailsess ? "note saved successfully" : "you have to login first"}
          </p>
        </div>
      </div>

      <div className="ncontainer">
        <form className="mform" onSubmit={handleSubmit}>
          <textarea
            id="note"
            className="note"
            name="note"
            maxLength="2100"
            value={content} onChange={(e)=>setContent(e.target.value)}
            required
          />

          <p className="topicp">Topic</p>
          <input
            id="topic"
            className="topicinput"
            name="topic"
            maxlength="20"
            placeholder="one word preferred"
            value={title} onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <button type="submit" className="sbtn">
            Save
          </button>

          <button className="sbtn2" onClick={handleclick}>
            Clear
          </button>
        </form>
      </div>
    </>
  );
}
export default Makenote;
