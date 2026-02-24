import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

interface props {
  maxCountProducts:number
  setMaxCountProducts:(number:number)=>void
}

const Pagenations = ({maxCountProducts,setMaxCountProducts}:props) => {
  const { translate } = useLang();

  const handleProducts = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const number = +e.target.value;
    setMaxCountProducts(number)
  }


  return (
    <div className='result-pagenations'>
        
        <div className='select-results-showen select-wrapper'>
          <select 
            name="select-results-showen" 
            id="select-results-showen"
            onChange={handleProducts}
          >
              <option value="10">{translate(dictionaries.pagination.show)} 10</option>
              <option value="9">{translate(dictionaries.pagination.show)} 9</option>
              <option value="8">{translate(dictionaries.pagination.show)} 8</option>
              <option value="7">{translate(dictionaries.pagination.show)} 7</option>
              <option value="5">{translate(dictionaries.pagination.show)} 5</option>
              <option value="4">{translate(dictionaries.pagination.show)} 4</option>
              <option value="3">{translate(dictionaries.pagination.show)} 3</option>
              <option value="2">{translate(dictionaries.pagination.show)} 2</option>
              <option value="1">{translate(dictionaries.pagination.show)} 1</option>
              <option value="0">{translate(dictionaries.pagination.show)} 0</option>
          </select>
        </div>

        <div className='pags-control-wrapper'>
            <button className="left">
               <Image
                src='/images/icons/left-pag.png'
                alt=""
                height={14}
                width={8}
              /> 
            </button>
            <div className='page-numbers'>
                <button className="page-number selected"> 1 </button>
                <button className="page-number"> 2 </button>
                <button className="page-number"> 3 </button>
            </div>
            <button className="right"> 
              <Image
                src='/images/icons/right-pag.png'
                alt=""
                height={14}
                width={8}
              />
             </button>
        </div>
    </div>
  )
}

export default Pagenations