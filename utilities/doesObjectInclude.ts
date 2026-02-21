import { ProductProps, Locale } from "../types"

const doesObjectInclude = (array: ProductProps[], value: string, locale: Locale) => {
    const  lang = locale === 'en' ? 'en' : 'ar';
  return array.filter(object => {
    const titleObj = object['title'];
    const title = typeof titleObj === 'object' 
      ? (titleObj as Record<string, any>)[lang] || titleObj.en 
      : titleObj;
   
      console.log(title) 
    return title?.toString().toLocaleLowerCase()?.includes(value.toLocaleLowerCase());
  });
}

export default doesObjectInclude
