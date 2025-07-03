import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface prop {
    avgRating:number
}

const ProductRating = ({avgRating}:prop) => {
  return (
    <div>
    {new Array(5).fill("").map((_, i) => {
        if (i < avgRating) {
          return (
            <FontAwesomeIcon icon={faStar} className="fill" key={i}/>
          );
        } else {
          return <FontAwesomeIcon icon={faStar} className="empty" key={i}/>;
        }
      })} 
   </div>
  )
}

export default ProductRating