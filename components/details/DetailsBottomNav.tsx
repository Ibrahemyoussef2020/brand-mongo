import { ProductProps } from "@/types"
import Link from "next/link"
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";


interface props{
  product:ProductProps,
  selected:string,
  setSelected:(selected:string)=>void
}

const DetailsBottomNav = ({product,selected,setSelected}:props) => {
  const { translate } = useLang();

  const selectSection = (e:React.MouseEvent<HTMLElement>,value:string)=>{
    e.preventDefault();
    setSelected(value)
  }

  return (
    <nav className={`details__nav ${selected}-wrapper`}>
      <Link href='#' onClick={e=>selectSection(e,'desc')} className={`${selected === 'desc' ? 'selected' : ''} desc`}>
        {translate(dictionaries.productTabs.description)}
      </Link>
      <Link href='#' onClick={e=>selectSection(e,'reviews')} className={`${selected === 'reviews' ? 'selected' : ''} reviews`}>
        {translate(dictionaries.productTabs.reviews)}
      </Link>
      <Link href='#' onClick={e=>selectSection(e,'shipping')} className={`${selected === 'shipping' ? 'selected' : ''} shipping`}>
        {translate(dictionaries.productTabs.shipping)}
      </Link>
      <Link href='#' onClick={e=>selectSection(e,'seller')} className={`${selected === 'seller' ? 'selected' : ''} seller`}>
        {translate(dictionaries.productTabs.aboutSeller)}
      </Link>
    </nav>
  )
}

export default DetailsBottomNav