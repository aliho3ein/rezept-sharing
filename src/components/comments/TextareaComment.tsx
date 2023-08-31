import { FC } from "react";
import styles from "../../styles/comments/textTareaComment.module.scss";
const TextareaComment: FC = () => {
  return (
    <div>
      <textarea
        className={styles.textarea}
        name=""
        rows={5}
        placeholder='"Verfasse deinen Kommentar zu diesem Rezept."'
      />
      <div className= {styles.inputContainer}>
        <input className={styles.abbrechen} type="button" value="Abbrechen"/>
        <input className={styles.senden} type="button" value="Senden" />
      </div>
    </div>
  );
};

export default TextareaComment;
