import {FC} from 'react'
import  styles from "../../styles/comments/commet.module.scss"
const Comment:FC = () => {
  return (
    <div className={styles.main}>
        <img src={"/src/assets/buddy-60fix.jpg"} alt="user img" />
        <div>
            <p>user</p>
            <p>Das Rezept ist sehr gut, bislang möchte ich keine Avocado. Aber ich habe reichlich Salz dazugeben müssen, bis der Geschmack perfekt war. Aber dann absolut lecker.</p>
        </div>
    </div>
  )
}

export default Comment