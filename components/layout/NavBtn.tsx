'use client'

import { useDispatch, useSelector } from "react-redux"
import { toggleAside } from "@/redux/slices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { IRootState } from "@/redux/store";

const NavBtn = () => {

    const dispatch = useDispatch()
    const {isOppend } =  useSelector((state:IRootState )=> state.combine.aside)
    
  return (
    <button className='aside_toggle' onClick={_=>dispatch(toggleAside(true))}>
        <FontAwesomeIcon icon={faBars}  color="gray"  />
    </button>
  )
}

export default NavBtn