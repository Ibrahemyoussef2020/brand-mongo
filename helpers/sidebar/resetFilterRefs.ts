import { MutableRefObject } from 'react';

/**
 * Resets the checked state of HTMLInputElement refs.
 * @param refMap Object containing refs for each filter category
 * @param key Optional specific key to reset. If not provided, resets all.
 */
export const resetFilterRefs = (
  refMap: Record<string, MutableRefObject<HTMLInputElement[]>>,
  key?: string
) => {
  if (key) {
    // Reset specific key
    const currentRef = refMap[key];
    if (currentRef?.current) {
      currentRef.current.forEach((ref) => {
        if (ref) ref.checked = false;
      });
    }
  } else {
    // Reset all
    Object.values(refMap).forEach((refContainer) => {
      refContainer.current?.forEach((input) => {
        if (input) input.checked = false;
      });
    });
  }
};
