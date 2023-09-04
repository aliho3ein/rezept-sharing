import {FC} from 'react'
import Rewiews from '../cardRecipe/Rewiews'
import styles from "../../styles/counterRewiews/counterRewiews.module.scss"
export const CountRewiews:FC = () => {
  return (
    <div className={styles.mainRewiews}>
          {[...Array(5)].map((iteem:any,index:number) => {
            return <Rewiews key={index} />  
           })}
           <p>(8 Rewiews)Rewiews </p>       {/*(8 Rewiews)*/}    
    </div> 
  )
}
