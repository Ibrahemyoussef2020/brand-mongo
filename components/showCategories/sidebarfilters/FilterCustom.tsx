import React, { MutableRefObject } from 'react';
import { customStringIncludes } from '@/utilities';
import { useLang } from '@/context/LangContext';
import { LocalizedString } from '@/types';
import DropArrow from '../../general/DropArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface FilterCustomProps {
  section: 'category' | 'color';
  visibleSection: string[];
  toggleArrowDrop: (value: string) => void;
  handleRemoveFilter: (filter: string) => void;
  handleRadioValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue?: string; // For category
  productsData?: LocalizedString[]; // Types or Colors
  checkedValue: string; // typeValue or colorValue
  refs: MutableRefObject<HTMLInputElement[]>;
}

const FilterCustom: React.FC<FilterCustomProps> = ({
  section,
  visibleSection,
  toggleArrowDrop,
  handleRemoveFilter,
  handleRadioValues,
  selectedValue = '',
  productsData,
  checkedValue,
  refs,
}) => {
  const { lang, translate } = useLang();
  const isCategory = section === 'category';
  const title = isCategory ? 'Category' : 'Color';
  const filterName = isCategory ? 'type' : 'color'; // name attribute for input

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
        {isCategory && (
            <h4>
              <span>{selectedValue}</span>
            </h4>
        )}
        <button className={`clear ${!isCategory ? 'pt-1 mb-1 ml-3' : ''}`} onClick={_ => handleRemoveFilter(filterName)}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>remove filter</span>
        </button>
        
        <div className={!isCategory ? "less-items" : ""}>
        {productsData && productsData.length > 0 ? (
          productsData.map((itemObj, index) => {
            const itemName = typeof itemObj === 'string' ? itemObj : itemObj?.en || '';
            const translatedItem = translate(itemObj);

            return (
              <label key={itemName + '' + index} className={`${index <= 5 ? 'less-than-5' : 'more-than-5'}`}>
                <input
                  onChange={handleRadioValues}
                  type="radio"
                  name={filterName}
                  value={itemName}
                  checked={checkedValue === itemName}
                  ref={(el: HTMLInputElement) => (refs.current[index] = el)}
                />
                <span>{isCategory ? `${selectedValue.slice(0, -1)} a ${translatedItem}` : translatedItem}</span>
              </label>
            );
          })
        ) : null}
        </div>
      </div>

      <div className='filter-footer'>
        <Link href='#' className='not-allowed'>
          See all
        </Link>
      </div>
    </article>
  );
};

export default FilterCustom;
