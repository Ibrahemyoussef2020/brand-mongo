import React, { MutableRefObject } from 'react';
import { customStringIncludes } from '@/utilities';
import DropArrow from '../../general/DropArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface FilterListProps {
  section: 'brand' | 'rating';
  visibleSection: string[];
  toggleArrowDrop: (value: string) => void;
  handleRemoveFilter: (filter: string) => void;
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: string[];
  productsData?: string[]; // For brand
  refs: MutableRefObject<HTMLInputElement[]>;
}

const FilterList: React.FC<FilterListProps> = ({
  section,
  visibleSection,
  toggleArrowDrop,
  handleRemoveFilter,
  handleFilter,
  values,
  productsData,
  refs,
}) => {
  const isBrand = section === 'brand';
  const isRating = section === 'rating';
  
  // Mapping for section name display
  const title = isBrand ? 'Brand' : 'Ratings';
  const filterKey = isBrand ? 'brand' : 'avgRating'; // Use 'avgRating' for remove filter key if rating

  return (
    <article
      className={`${section} filter-section 
            ${customStringIncludes(visibleSection, section) ? 'drop-dowen' : 'pull-up'}
            `}
    >
      <div className='filter-header'>
        <h3>{title}</h3>
        <button onClick={() => toggleArrowDrop(section)}>
          <DropArrow list={visibleSection} item={section} />
        </button>
      </div>

      <div className='filter-body'>
        <button className="clear pb-2" onClick={_ => handleRemoveFilter(isRating ? 'avgRating' : section)}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>remove filter</span>
        </button>
        {isBrand && productsData && productsData.length > 0 &&
          productsData.map((brand, index) => {
            return (
              <label key={brand + '' + index} className={`${index <= 5 ? 'less-than-5' : 'more-than-5'}`}>
                <input
                  onChange={handleFilter}
                  type="checkbox"
                  name="brand"
                  value={brand}
                  checked={values.includes(brand)}
                  ref={(el: HTMLInputElement) => (refs.current[index] = el)}
                />
                <span>{brand[0].toUpperCase()}{brand.slice(1)}</span>
              </label>
            );
          })
        }

        {isRating && (
           <>
           {[5, 4, 3, 2].map((stars) => (
             <label key={stars} className="flex no-check-shape mb-3">
               <input
                 onChange={handleFilter}
                 type="checkbox"
                 id={`equal-bigger-${stars}`}
                 name="avgRating"
                 value={String(stars)}
                 data-values={values}
                 checked={values.includes(String(stars))}
                 ref={(el: HTMLInputElement) => (refs.current[stars] = el)}
               />
               <span>
                 {[...Array(5)].map((_, i) => (
                   <FontAwesomeIcon 
                     key={i} 
                     icon={faStar} 
                     className={i < stars ? '' : 'empty'} 
                    />
                 ))}
               </span>
             </label>
           ))}
         </>
        )}
      </div>

      <div className='filter-footer'>
        {isBrand && (
            <Link href='#' className='not-allowed' >
              See all
            </Link>
        )}
      </div>
    </article>
  );
};

export default FilterList;
