import {FC} from 'react'
import styles from "../../styles/counterRewiews/counterRewiews.module.scss"
export const CountRewiews:FC = () => {
  return (
    <div className={styles.mainRewiews}>
          {/* {[...Array(5)].map((item:any,index:number) => {
            return <Rewiews key={index+item} />  
           })} */}
           {/* <Rewiews size={20} in/>
           <p>(8 Rewiews)Rewiews </p>       (8 Rewiews)     */}
    </div> 
  )
}
