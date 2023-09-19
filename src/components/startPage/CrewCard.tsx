import { FC } from "react";
import style from "./../../styles/startPage/crew.module.scss";
import { crewType } from "../../models/user";

const CrewCard: FC<{ detail: crewType }> = ({ detail }) => {
  return (
    <>
      <div
        className={style.crewCard}
        //data-aos="fade-down"
        style={{
          ["--img" as string]: `url("/${detail.name.toLocaleLowerCase()}.png")`,
        }}
      >
        
        <span className={style.userPosition}>{detail.position}</span>
        <h3>{detail.name}</h3>
        <div className={style.socialContainer}>
          {detail.social.map((item, index) => {
            return (
              <a
                href={item.link}
                key={index}
                target="_blank"
                className={style.social}
                title={item.title}
                style={{ ["--delay" as string]: `${index * 50}ms` }}
              >
                <i className={`fab fas ${item.icon}`}></i>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CrewCard;
