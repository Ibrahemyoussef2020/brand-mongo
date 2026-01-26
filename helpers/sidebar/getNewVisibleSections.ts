import { customStringIncludes } from "@/utilities";

/**
 * Toggles the visibility of a filter section.
 */
export const getNewVisibleSections = (visibleSection: string[], value: string) => {
  if (customStringIncludes(visibleSection, value)) {
    return visibleSection.filter((string: string) => string !== value);
  } else {
    return [...visibleSection, value];
  }
};
