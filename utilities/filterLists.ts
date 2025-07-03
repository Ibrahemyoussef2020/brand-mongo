import { FilterProps, ProductProps, filterProductsListProps } from "@/types";
import { customStringIncludes } from ".";


// const filterProductsList = (filters:FilterProps[]|[], list:ProductProps[]|[] , checkValuesLength:number = 1) => {
   
//       let filterdList = list;

//       if (!filters.length) {
//             return list
//       }else{
      
//       filters.forEach((filter:FilterProps) => {
            
//             switch (filter.type) {
//                   case 'boolean': {
                        
//                         //filterdList = filterdList.filter(item => item[filter.prop] === filter.checkd)
//                         filterdList = filterdList.filter(product => filter.filterFn(product,filter))
//                         break;
//                   }
//                   case 'list': { 
                        
//                        filterdList = filterdList.filter((item:any) => customStringIncludes(filter.values,`${item[filter.prop]}`) ) 
//                        ;
//                        // filterdList = filterdList.filter(product => filter.filterFn(product,filter)) 
//                         break;
//                   }
//                   case 'custom': {
//                         filterdList = filterdList.filter(product => filter.filterFn(product,filter))
//                         break;
//                   }
//                   case 'clear': {
//                        // filterdList = filterdList.filter(product => filter.filterFn(product,filter))
//                        break;
//                    }
//                   case 'minmax':{
//                         filterdList = filterdList.filter(product => filter.filterFn(product,filter))
//                   }
//                   default:
//                         break;
//             }
//       });

// }

      
//       return filterdList
// }

import ProductModel from "@/lib/models/ProductModel";

const filterProductsList = async (filters: FilterProps[]) => {
  let query: any = {};

  if (!filters.length) {
    return await ProductModel.find({}).sort({ _id: -1 }).limit(60).lean();
  }

  filters.forEach((filter) => {
    switch (filter.type) {
      case "boolean":
        query[filter.prop] = filter.checked;
        break;

      case "list":
        if (filter.values && filter.values.length) {
          query[filter.prop] = { $in: filter.values };
        }
        break;

      case "custom":
        // للتعامل مع الفلاتر المخصصة مثل الـ radio buttons
        query[filter.prop] = filter.value;
        break;

      case "minmax":
        const min = filter.min ?? 0;
        const max = filter.max ?? Number.MAX_VALUE;
        query[filter.prop] = { $gte: min, $lte: max };
        break;

      case "clear":
        query = {}; // إعادة تعيين الفلترة
        break;

      default:
        break;
    }
  });

  // تنفيذ الاستعلام
  const products = await ProductModel.find(query).sort({ _id: -1 }).limit(60).lean();
  return products;
};

//export default filterProductsFromDB;


export default  filterProductsList  