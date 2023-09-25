/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState } from "react";
import style from "../../styles/contact.module.scss";
import { alertMassage } from "../../actions/alerts";
import instance from "../../api/instance";

const Contact: FC = () => {
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    subject: "",
    textMessage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    instance
      .post("/user/contact", contactData)
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        alertMassage(res.data.message);
        // inputs must be empty
        setContactData({
          username: "",
          email: "",
          subject: "",
          textMessage: "",
        });
      })
      .catch(() => alertMassage("Fehler beim Senden der E-Mail", "error"));
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div id="contact" className={style.contactPage}>
      <h2 className={style.contactHeading}>
        Kontaktiere uns für weitere Informationen.
      </h2>
      <div className={style.contactContainer}>
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
          <form className={style.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Name"
              className={style.contactInput}
              value={contactData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={style.contactInput}
              value={contactData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="Betreff"
              className={style.contactInput}
              value={contactData.subject}
              onChange={handleChange}
            />
            <textarea
              rows={10}
              name="textMessage"
              placeholder="Deine Nachricht"
              className={style.contactInput}
              value={contactData.textMessage}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className={style.contactButton}>
              <span>SENDEN</span>
              <span>Sende uns deine Nachricht</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
