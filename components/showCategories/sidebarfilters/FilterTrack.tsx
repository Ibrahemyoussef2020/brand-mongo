import React from 'react';
import { customStringIncludes } from '@/utilities';
import DropArrow from '../../general/DropArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface FilterTrackProps {
  visibleSection: string[];
  toggleArrowDrop: (value: string) => void;
  handleRemoveFilter: (filter: string) => void;
  minPriceFromData: number;
  maxPriceFromData: number;
  minPriceValue: number;
  maxPriceValue: number;
  handleMinMaxPrice: (e: React.ChangeEvent<HTMLInputElement>, minMax: string) => void;
  submitMinMix: () => void;
}

const FilterTrack: React.FC<FilterTrackProps> = ({
  visibleSection,
  toggleArrowDrop,
  handleRemoveFilter,
  minPriceFromData,
  maxPriceFromData,
  minPriceValue,
  maxPriceValue,
  handleMinMaxPrice,
  submitMinMix,
}) => {
  return (
    <article
      className={`price filter-section 
            ${customStringIncludes(visibleSection, 'price') ? 'drop-dowen' : 'pull-up'}
        `}
    >
      <div className='filter-header'>
        <h3>Price range</h3>
        <button onClick={() => toggleArrowDrop('price')}>
          <DropArrow list={visibleSection} item='price' />
        </button>
      </div>

      <div className='filter-body'>
        <button className="clear pb-2" onClick={_ => handleRemoveFilter('price')}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>remove filter</span>
        </button>
        <div className='ranges'>
          <div className='range'>
            <input 
              type="range" 
              id="min-price" 
              name="min-price" 
              min={minPriceFromData} 
              max={maxPriceFromData} 
              value={minPriceValue} 
              onChange={(e) => handleMinMaxPrice(e, 'min')} 
              className='price no-check-shape' 
            />
          </div>
          <div className='range'>
            <input 
              type="range" 
              id="max-price" 
              name="max-price" 
              min={minPriceFromData} 
              max={maxPriceFromData} 
              value={maxPriceValue} 
              onChange={(e) => handleMinMaxPrice(e, 'max')} 
              className='price no-check-shape' 
            />
          </div>
        </div>
        <div className='numbers'>
          <div>
            <h4>Min</h4>
            <input 
              type="number" 
              min={minPriceFromData} 
              max={maxPriceFromData} 
              value={minPriceValue} 
              onChange={(e) => handleMinMaxPrice(e, 'min')} 
              placeholder='0' 
            />
          </div>
          <div>
            <h4>Max</h4>
            <input 
              type="number" 
              min={minPriceFromData} 
              max={maxPriceFromData} 
              value={maxPriceValue} 
              onChange={(e) => handleMinMaxPrice(e, 'max')} 
              placeholder='999' 
            />
          </div>
        </div>

        <button className='apply' onClick={submitMinMix}>
          Apply
        </button>
      </div>

      <div className='filter-footer'></div>
    </article>
  );
};

export default FilterTrack;
