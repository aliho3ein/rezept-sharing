import { FC,Dispatch,SetStateAction,useState } from "react";
import styles from "../../styles/comments/textTareaComment.module.scss";
import instance from "../../api/instance";
import { comment } from "../../models/comment"

//type recipeID = {recipeID:string | any}

type useStateProps = {
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean> >;
  recipeID: string | undefined,
  setText:Dispatch<SetStateAction<string> >;
}
const TextareaComment: FC<useStateProps> = ({recipeID,flag,setFlag,setText}) => {
  const [textarea,setTextarea] = useState<string>();
  
  const sendData = (e:any) => {
      e.preventDefault();
      setText('Alle Kommentare anzeigen');
      console.log(e.target[0].value);
      console.log(e.nativeEvent.submitter.value);//* get Abbrechen input..
      if(e.nativeEvent.submitter.value === 'Abbrechen' ){
        e.target[0].value="";
        setTextarea('');
        
      }
      const data:comment = {
        userID:'64d3939ede491a0d0fc2cd13',//! no final*** userID come from user in usercontext global
        recipeID,
        desc:e.target[0].value.trim(),
      }
      instance.post(
          '/comment',
           data
      ).then((response) =>  console.log(response)).catch((err) => console.log(err));
      setFlag(!flag);
  }


  
  return (
    <div>
      <form onSubmit={sendData} method="post">
      <textarea onChange={(e)=>setTextarea(e.target.value)}
        className={styles.textarea}
        name=""
        rows={5}
        placeholder='"Verfasse deinen Kommentar zu diesem Rezept."'
        
      />
      <div className= {styles.inputContainer}>
        <input className={styles.abbrechen} type="submit" value="Abbrechen"/>
        <input disabled =  { textarea? false:true} className={textarea? styles.senden : styles.sendenOff}  type="submit" value="Senden"   />
      </div>
      </form>
     
    </div>
  );
};

export default TextareaComment;
