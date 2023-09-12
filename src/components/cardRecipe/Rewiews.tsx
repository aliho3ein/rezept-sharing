import { FC,useState } from "react";
import { Rating } from 'react-simple-star-rating'

type rating = {
  size: number,
  initialValue: number,
  readonly: boolean,
  showTooltip: boolean,
  width: string,
}
const Rewiews: FC<rating> = ({size,initialValue,readonly,showTooltip,width}) => {
  //const styles = { color: "#FEB51D !important", fontSize:"1.5em"} //{ color: "#FEB51D",}
  const [rating, setRating] = useState(0)
  const handleRating = (rate: number) => {
    setRating(rate)

    // other logic
  }

  // const onPointerEnter = () => console.log('Enter')
  // const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(index,value)
  return (
  <div style={{width:width}}>
    

    <Rating
         onClick={handleRating}
         onPointerMove={onPointerMove}
         //style={{cursor: "pointer"}}
        /* Available Props */
        size={size}
        initialValue={initialValue} 
        readonly ={readonly}
        showTooltip = {showTooltip}
        tooltipArray={[
          'Mangelhaft',
          'Ausbaufähig',
          'Ganz gut',
          'Sehr gut',
          'Pefekt'
        ]}
        transition
        
      />
  
    </div>
  );
};

export default Rewiews;
