import { Dispatch, FC,SetStateAction, } from "react";
import { Rating } from 'react-simple-star-rating'

type rating = {
  size: number,
  initialValue: number,
  readonly: boolean,
  showTooltip: boolean,
  width: string,
  setRating:Dispatch<SetStateAction<number> >,
  
}
const Rewiews: FC<rating> = ({size,initialValue,readonly,showTooltip,width,setRating,}) => {

 
  const handleRating = (rate: number) => {
    setRating(rate)
 }

  // const onPointerEnter = () => console.log('Enter')
  // const onPointerLeave = () => console.log('Leave')
  // const onPointerMove = (value: number, index: number) => console.log(index,value)
  return (
  <div style={{width:width}}>
    

    <Rating
         onClick={handleRating}
        // onPointerMove={onPointerMove}
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
