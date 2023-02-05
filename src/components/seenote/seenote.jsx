import React, { useEffect, useState } from "react";
import "./seenote.css";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
import Makenote from "../makenote/makenote";
import logo from "../../public/pinknote.gif";
import { GrContactInfo } from "react-icons/gr";
import { BiNote } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdEditNote } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { FaRegSave } from "react-icons/fa";
import {url} from '../../config'

function Seenote() {
  /* session variable */
  const emailsess = sessionStorage.getItem("email");

  const [note, setnote] = useState([]);
  const [edit, setedit] = useState(false);
  const [notevalue, setnotevalue] = useState();
  const [topicvalue, settopicvalue] = useState();
  const [user, setuser] = useState([]);
  const [togglem, settogglem] = useState(false);
  const [deleteapp, setdeleteapp] = useState(false);
  const [deleteid, setdeleteid] = useState();
  const [allnotes, setallnotes] = useState([]);

  /* fetching notes in each reload */

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`${url}/note/seenote`, { email: emailsess })
        .then((res) => {
          setnote(res.data);
          setallnotes(res.data);
        });
    };

    const fetchUser = async () => {
      axios
        .post( `${url}/user/getuser`, { email: emailsess })
        .then((res) => {
          setuser(res.data);
        });
    };

    fetchUser();
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .post(`${url}/note/seenote`, { email: emailsess })
      .then((res) => {
        setallnotes(res.data);
      });
  }, [note]);

  /* notes live search */
  async function handlechange(event) {
    const search = event.target.value;

    axios
      .post(`${url}/note/searchnote`, {
        search: search,
        email: emailsess,
      })
      .then((res) => {
        setnote(res.data);
      });
  }

  /* to logout from the current account */
  async function logout() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("username")
  }

  /* deleting notes */
  async function deletenote(event) {
    setdeleteapp(true);
    setdeleteid(event.currentTarget.id);
  }

  async function justdelete() {
    axios
      .post(`${url}/note/deletenote`, {
        id: deleteid,
        email: emailsess,
      })
      .then((res) => {
        setnote(res.data);
      });
    setdeleteapp(false);
  }

  async function dontdelete() {
    setdeleteapp(false);
  }

  async function checktodelete() {
    setdeleteapp(true);
  }

  /* updating notes */
  async function savenote(event) {
    axios
      .post(`${url}/note/savenote`, {
        id: event.currentTarget.id,
        email: emailsess,
        note: notevalue,
        topic: topicvalue,
      })
      .then((res) => {
        setnote(res.data);
      });
    setedit(false);
  }

  async function picknote(event) {
    var pick = event.currentTarget.id;

    axios
      .post(`${url}/note/picknote`, { id: pick })
      .then((res) => {
        setnote(res.data);
      });
  }

  const fetchData2 = async () => {
    axios
      .post(`${url}/note/seenote`, { email: emailsess })
      .then((res) => {
        setnote(res.data);
      });
  };

  const quitandsave = async () => {
    settogglem(false);
    fetchData2();
  };

  return (
    <>
      <div className={deleteapp && "deleteper_notseeable"}>
        <div
          className={
            togglem ? "seenotecontainer darkenback" : "seenotecontainer"
          }
        >
          <div className="seenotegrid1">
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
            <div id="display2">
              {emailsess && (
                <div id="resdisplay2">
                  <p>
                    <CgProfile
                      size="26px"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />
                    <j>
                      {user.username}
                      {user.map((user, key) => {
                        return <j>{user.username}</j>;
                      })}
                    </j>
                    's notes
                  </p>
                  {/*<img src={logo} className='pinknote' alt='' />*/}
                </div>
              )}
            </div>

            <div className="sconatiner">
              {emailsess ? (
                <div className="seenotecon1">
                  {note.map((user, key) => {
                    const list = (
                      <>
                        <div className="notecontainer">
                          <b>
                            <i className="idate">
                              <MdDateRange />
                              {user.date}
                            </i>
                          </b>
                          <div className="seenotecon2">
                            <p>
                              {" "}
                              <b className="btopic">{user.topic}</b>
                            </p>
                            <pre>
                              <p data-testid="note-content">{user.note}</p>
                            </pre>
                          </div>

                          {edit === user._id ? (
                            <button
                              id={user._id}
                              onClick={savenote}
                              className="seenote sb"
                            >
                              <FaRegSave size="23px" />{" "}
                            </button>
                          ) : null}

                          {edit === user._id ? (
                            <button
                              id={user._id}
                              onClick={() => setedit(false)}
                              className="seenote cb"
                            >
                              <GiCancel size="23px" />
                            </button>
                          ) : (
                            <button
                              id={user._id}
                              onClick={() => {
                                setedit(user._id);
                                settopicvalue(user.topic);
                                setnotevalue(user.note);
                              }}
                              className="seenote eb"
                            >
                              <MdEditNote size="23px" />{" "}
                            </button>
                          )}
                          <button
                            id={user._id}
                            onClick={deletenote}
                            className="seenote db"
                          >
                            <MdDelete size="23px" />
                          </button>

                          {/*to toggle and hide the editing inputs*/}
                          {edit === user._id && (
                            <input
                              id={user._id}
                              className="editinput2"
                              name="topic"
                              maxLength="100"
                              defaultValue={user.topic}
                              onChange={(e) => settopicvalue(e.target.value)}
                              maxlength="20"
                              required
                            />
                          )}

                          {edit === user._id && (
                            <textarea
                              id={user._id}
                              className="editinput"
                              name="note"
                              maxLength="2100"
                              defaultValue={user.note}
                              onChange={(e) => setnotevalue(e.target.value)}
                              required
                            />
                          )}
                        </div>
                      </>
                    );

                    return list;
                  })}
                </div>
              ) : (
                <div className="logtosee">Login to see your notes</div>
              )}
            </div>
          </div>

          <div className="seenotegrid2">
            <BiSearchAlt
              color="white"
              size="25px"
              style={{ verticalAlign: "middle", marginRight: "0px" }}
            />{" "}
            <input
              type="search"
              className="searchs"
              onChange={handlechange}
              placeholder="Search notes"
            />
            <div className="sepdiv" />
            <div className="buttoncol">
              <Link to="/makenote">
              <button >
                <BiNote
                  style={{ verticalAlign: "middle", marginRight: "5px" }}
                />
                Make a note
              </button>
              </Link>
              <Link to="/contact">
                <button>
                  <GrContactInfo
                    style={{ verticalAlign: "middle", marginRight: "5px" }}
                  />{" "}
                  Contact us
                </button>
              </Link>
              {emailsess ? (
                <Link to="/">
                  <button onClick={logout}>
                    <RiLogoutCircleRLine
                      style={{ verticalAlign: "middle", marginRight: "5px" }}
                    />
                    Log out{" "}
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button>
                    <BiLogIn
                      style={{ verticalAlign: "middle", marginRight: "5px" }}
                    />
                    Log in
                  </button>
                </Link>
              )}
            </div>
            {emailsess ? (
              <div className="topicscontainer">
                <button className="allnotesbtn" onClick={fetchData2}>
                  All
                </button>
                {allnotes.map((user, key) => {
                  const list = (
                    <>
                      <div className="minitopicscontainer">
                        <button
                          id={user._id}
                          className="pickbutton"
                          onClick={picknote}
                        >
                          {" "}
                          <MdEditNote />{" "}
                          <p>
                            {" "}
                            <b className="btopic">{user.topic}</b>
                          </p>{" "}
                        </button>
                      </div>
                    </>
                  );

                  return list;
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {togglem && (
          <button className="quitbutton" onClick={quitandsave}>
            X
          </button>
        )}


   
      {/*

         to toggle a frame to write notes

        {togglem && (
          <div className="togglem">
            <iframe
              src="./makenote"
              width="1000"
              height="500"
              title="makenote"
            ></iframe>
          </div>
        )}

        */}
        

      </div>

      {deleteapp && (
        <div className="deleteper">
          <p>Are you sure you want to delete this note?</p>
          <button onClick={justdelete}>Yes</button>
          <button onClick={dontdelete}>No</button>
        </div>
      )}
    </>
  );
}

export default Seenote;
