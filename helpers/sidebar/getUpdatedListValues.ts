/**
 * Updates a list of values (e.g., brands, ratings) based on checkbox state.
 */
export const getUpdatedListValues = (currentList: string[], value: string, isChecked: boolean) => {
  if (isChecked) {
    return [...currentList, value];
  } else {
    return currentList.filter((item: string) => item !== value);
  }
};
