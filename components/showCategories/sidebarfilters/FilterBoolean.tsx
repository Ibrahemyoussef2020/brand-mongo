import React, { MutableRefObject } from 'react';
import { customStringIncludes } from '@/utilities';
import DropArrow from '../../general/DropArrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useLang } from '@/context/LangContext';
import { dictionaries } from '@/lib/dictionaries';

interface FilterBooleanProps {
  visibleSection: string[];
  toggleArrowDrop: (value: string) => void;
  handleRemoveFilter: (filter: string) => void;
  handleBooleanValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPremium: boolean;
  isFreeDelivery: boolean;
  isToHome: boolean;
  ref_premium_offer: MutableRefObject<HTMLInputElement[]>;
  ref_free_delivery: MutableRefObject<HTMLInputElement[]>;
  ref_to_home: MutableRefObject<HTMLInputElement[]>;
}

const FilterBoolean: React.FC<FilterBooleanProps> = ({
  visibleSection,
  toggleArrowDrop,
  handleRemoveFilter,
  handleBooleanValues,
  isPremium,
  isFreeDelivery,
  isToHome,
  ref_premium_offer,
  ref_free_delivery,
  ref_to_home,
}) => {
  const { translate } = useLang();

  return (
    <article
      className={`features filter-section 
            ${customStringIncludes(visibleSection, 'features') ? 'drop-dowen' : 'pull-up'}
        `}
    >
      <div className='filter-header'>
        <h3>{translate(dictionaries.filters.features)}</h3>
        <button onClick={() => toggleArrowDrop('features')}>
          <DropArrow list={visibleSection} item='features' />
        </button>
      </div>

      <div className='filter-body'>
        <button
          className="clear pt-1"
          onClick={() => {
            handleRemoveFilter('premium_offer');
            handleRemoveFilter('free_delivery');
            handleRemoveFilter('to_home');
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <span>{translate(dictionaries.filters.removeFilter)}</span>
        </button>

        <label>
          <input
            onChange={handleBooleanValues}
            type="checkbox"
            id="premium_offer"
            name="premium_offer"
            value="premium_offer"
            checked={isPremium}
            ref={(el: HTMLInputElement) => (ref_premium_offer.current[0] = el)}
          />
          <span className={`label__sub-title ml-1`}>{translate(dictionaries.filters.enabledInPremium)}</span>
        </label>

        <label>
          <input
            onChange={handleBooleanValues}
            type="checkbox"
            id="free_delivery"
            name="free_delivery"
            value="free_delivery"
            checked={isFreeDelivery}
            ref={(el: HTMLInputElement) => (ref_free_delivery.current[0] = el)}
          />
          <span className={`label__sub-title ml-2`}>{translate(dictionaries.filters.freeDelivery)}</span>
        </label>
        <label>
          <input
            onChange={handleBooleanValues}
            type="checkbox"
            id="to_home"
            name="to_home"
            value="to_home"
            checked={isToHome}
            ref={(el: HTMLInputElement) => (ref_to_home.current[0] = el)}
          />
          <span className={`label__sub-title ml-2`}>{translate(dictionaries.filters.gitItToHome)}</span>
        </label>
      </div>

      <div className='filter-footer'></div>
    </article>
  );
};

export default FilterBoolean;
