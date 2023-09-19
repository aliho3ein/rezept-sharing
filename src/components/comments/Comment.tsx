import {FC} from 'react'
import  styles from "../../styles/comments/commet.module.scss"
import { comment } from '../../models/comment'

//const data: Comment | undefined;
type commetType = { data: comment };
const Comment:FC<commetType>  = ({data}) => {
      
  return (
    
    <div className={styles.main}>
        <img src={"/buddy-60fix.jpg"} alt="user img" />
        <div>
             <p>{data?.userID?.username}</p>
             <p>{data?.desc}</p>
        </div>
    </div>
  )
}

export default Comment