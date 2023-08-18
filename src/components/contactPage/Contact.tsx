/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState } from "react";
import style from "../../styles/contact.module.scss";
import { alertMassage } from "../../actions/alerts";
import instance from "../../api/instance";

const Contact: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* try {
    /*  const response = await fetch("http://localhost:3000/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          subject,
          textMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alertMassage(data.message, "success");
      } else {
        alertMassage(data.error, "error");
      }
    } catch (error) {
      console.log(error);
    }*/

    instance
      .post("/user/contact", {
        username,
        email,
        subject,
        textMessage,
      })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        alertMassage(res.data.message);
        // inputs must be empty
      })
      .catch(() => alertMassage("Fehler beim Senden der E-Mail", "error"));
  };

  return (
    <div id="contact" className={style.contactPage}>
      <h1>Kontaktieren Sie Uns für weitere Informationen.</h1>

      <div className={style.contactContainer}>
        <div className={style.contactTitle}>
          <p>Kontakt aufnehmen</p>
          <h1>Kontakt</h1>
        </div>
        <div className={style.contactContent}>
          <div className={style.contactInfo}>
            <p className={style.contactInfoItem}>
              <i className="fa fa-home"></i>
              Tasty Pixel
            </p>
            <p className={style.contactInfoItem}>
              <i className="fa fa-envelope"></i>
              inforezeptsharing@gmail.com
            </p>
            <p className={style.contactInfoItem}>
              <i className="fa fa-map-marker"></i>
              Deutschland
            </p>
          </div>
          <hr />
          <form className={style.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={style.contactInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={style.contactInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="subject"
              placeholder="Betreff"
              className={style.contactInput}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              rows={10}
              name="message"
              placeholder="Ihre Nachricht"
              className={style.contactInput}
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
            ></textarea>
            <button type="submit" className={style.contactButton}>
              <span>SEND</span>
              <span>Sende Ihre Nachricht </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
