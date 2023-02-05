import React, { useEffect, useState } from "react";
import "./contact.css";
import axios from "axios";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import ReCAPTCHA from "react-google-recaptcha";
import {url} from '../../config'


function Contact() {
  const navigate = useNavigate();

  const [sent, setsent] = useState(false);
 
  const[message,setMessage]=useState('')

  const emailsess = sessionStorage.getItem("email");

  const [verified,setVerified]=useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    var message = event.target.message.value;

    const sendData = async () => {
      axios
        .post(`${url}/contact/addcontact`, {
          email: emailsess,
          message: message,
        })
        .then((res) => {
          if (res.data == "saved") {
            setsent(true);

            setTimeout(function () {
              setsent(false);
              setMessage('')
            }, 1000);
          }
        });
    };
    sendData();
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

      <div className="contactcontainer">
        <div className="contactformbox contactform">
          <h1 className="contactheader">Contact</h1>

          <form className="contactform" onSubmit={handleSubmit}>
            <div>
              <b>Email: </b>
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={emailsess}
              />
            </div>

            <div>
              <b>Message: </b>
              <textarea
                className="messageinput"
                type="password"
                name="message"
                placeholder="Message"
                value={message} onChange={(e)=>setMessage(e.target.value)}
                required
              />
            </div>

            <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={()=>{setVerified(true)}}
              />

            <div>
              <button disabled={!verified}>Send</button>
            </div>
          </form>
        </div>
      </div>

      {sent && (
        <div className="contactsent">
          <p>Message sent!</p>
        </div>
      )}
    </>
  );
}

export default Contact;
