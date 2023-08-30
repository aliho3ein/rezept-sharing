import { FC } from "react";
import TitleDescription from "../components/comments/TitleDescription";
import styles from "../styles/commentPage/commentPage.module.scss"
const CommentPage: FC = () => {
  return <div className={styles.main}>
  <TitleDescription/>
  </div>;
};

export default CommentPage;
