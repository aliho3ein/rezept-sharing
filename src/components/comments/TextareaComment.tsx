import { FC } from "react";
import styles from "../../styles/comments/textTareaComment.module.scss";
import instance from "../../api/instance";
import { comment } from "../../models/comment"

type recipeID = {recipeID:string | any}
const TextareaComment: FC<recipeID> = ({recipeID}) => {
  
  const sendData = (e:any) => {
      e.preventDefault();
      console.log(e.target[0].value);
      
      const data:comment = {
        userID:'64d3939ede491a0d0fc2cd13',//! no final*** userID come from user in usercontext global
        recipeID,
        desc:e.target[0].value.trim(),
      }
      instance.post(
          '/comment',
           data
      ).then((response) =>  console.log(response)).catch((err) => console.log(err));
  }

  
  return (
    <div>
      <form onSubmit={sendData} method="post">
      <textarea 
        className={styles.textarea}
        name=""
        rows={5}
        placeholder='"Verfasse deinen Kommentar zu diesem Rezept."'
        
      />
      <div className= {styles.inputContainer}>
        <input className={styles.abbrechen} type="submit" value="Abbrechen"/>
        <input className={styles.senden} type="submit" value="Senden"   />
      </div>
      </form>
     
    </div>
  );
};

export default TextareaComment;
