import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { customStringIncludes } from '@/utilities'

interface props{
    list:string[]|[];
    item:string
}

const DropArrow = (props:props) => {

    const {list,item} = props;

  return (
    <>
      {
        customStringIncludes(list,item) ?

        <FontAwesomeIcon icon={faAngleUp} />
        :
        <FontAwesomeIcon icon={faAngleDown} />
      }  
    </>
  )
}

export default DropArrow