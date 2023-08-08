import { FC } from "react";

import style from "./../../styles/startPage/crew.module.scss";
import CrewCard from "./CrewCard";
import { crewType } from "../../models/user";

const Crew: FC = () => {
  return (
    <section className={style.crewContainer}>
      <h2>unser Team</h2>
      <div>
        {crews.map((user: crewType, index: number) => {
          return <CrewCard key={index} detail={user} />;
        })}
      </div>
    </section>
  );
};

export default Crew;

/** Crew Detail */

// the user Image must be in asset file and the name of pic mus be like the first name of user all lower case

const crews: crewType[] = [
  {
    name: "Ali",
    social: [
      { icon: "fa-github-square", title: "Github", link: "" },
      { icon: "fa-instagram-square", title: "Instagram", link: "" },
      { icon: "fa-blogger", title: "Blog", link: "" },
    ],
    position: "Project Manager",
  },
  {
    name: "Osmel",
    social: [
      { icon: "fa-github-square", title: "Github", link: "" },
      { icon: "fa-twitter-square", title: "Twitter", link: "" },
      { icon: "fa-linkedin", title: "linkedin", link: "" },
    ],
    position: "Full-stack developer",
  },
  {
    name: "Charbel",
    social: [
      { icon: "fa-facebook-square", title: "Facebook", link: "" },
      { icon: "fa-instagram-square", title: "Instagram", link: "" },
      { icon: "fa-linkedin", title: "linkedin", link: "" },
    ],
    position: "Full-stack developer",
  },
  {
    name: "Jan",
    social: [
      { icon: "fa-github-square", title: "Github", link: "" },
      { icon: "fa-instagram-square", title: "Instagram", link: "" },
      { icon: "fa-blogger", title: "Blog", link: "" },
    ],
    position: "Full-stack developer",
  },
  {
    name: "Mohammad",
    social: [
      { icon: "fa-github-square", title: "Github", link: "" },
      { icon: "fa-instagram-square", title: "Instagram", link: "" },
      { icon: "fa-blogger", title: "Blog", link: "" },
    ],
    position: "UI/UX designer",
  },
  {
    name: "Mahdi",
    social: [
      { icon: "fa-github-square", title: "Github", link: "" },
      { icon: "fa-instagram-square", title: "Instagram", link: "" },
      { icon: "fa-blogger", title: "Blog", link: "" },
    ],
    position: "Front-End developer",
  },
];
