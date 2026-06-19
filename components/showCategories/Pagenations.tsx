import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

interface props {
  maxCountProducts: number;
  setMaxCountProducts: (number: number) => void;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalItems?: number;
}

const Pagenations = ({ maxCountProducts, setMaxCountProducts, currentPage = 1, setCurrentPage, totalItems = 0 }: props) => {
  const { translate } = useLang();

  const handleProducts = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const number = +e.target.value;
    setMaxCountProducts(number);
    if (setCurrentPage) setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(totalItems / maxCountProducts));

  const handlePrev = () => {
    if (currentPage > 1 && setCurrentPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && setCurrentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Limit the displayed page numbers to a sliding window of 5
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(totalPages, 5);
  }
  
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <div className='result-pagenations'>

      <div className='select-results-showen select-wrapper'>
        <select
          name="select-results-showen"
          id="select-results-showen"
          onChange={handleProducts}
          value={maxCountProducts}
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
        <button className="left" onClick={handlePrev} disabled={currentPage === 1} style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? '' : 'pointer' }}>
          <Image
            src='/images/icons/left-pag.png'
            alt=""
            height={14}
            width={8}
          />
        </button>
        <div className='page-numbers'>
          {pageNumbers.map(num => (
            <button
              key={num}
              className={`page-number ${currentPage === num ? 'selected' : ''}`}
              onClick={() => setCurrentPage && setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
        <button className="right" onClick={handleNext} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? '' : 'pointer' }}>
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