import { ProductProps } from "@/types"
import Link from "next/link"


interface props{
  product:ProductProps,
  selected:string,
  setSelected:(selected:string)=>void
}

const DetailsBottomNav = ({product,selected,setSelected}:props) => {

  const selectSection = (e:React.MouseEvent<HTMLElement>,value:string)=>{
    e.preventDefault();
    setSelected(value)
  }

  return (
    <nav className={`details__nav ${selected}-wrapper`}>
      <Link href='#' onClick={e=>selectSection(e,'desc')} className={`${selected === 'desc' ? 'selected' : ''} desc`}>Description</Link>
      <Link href='#' onClick={e=>selectSection(e,'reviews')} className={`${selected === 'reviews' ? 'selected' : ''} reviews`}>Reviews</Link>
      <Link href='#' onClick={e=>selectSection(e,'shipping')} className={`${selected === 'shipping' ? 'selected' : ''} shipping`}>Shipping</Link>
      <Link href='#' onClick={e=>selectSection(e,'seller')} className={`${selected === 'seller' ? 'selected' : ''} seller`}>About seller</Link>
    </nav>
  )
}

export default DetailsBottomNav