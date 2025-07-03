import  {cache} from 'react'
import dbConnect from '../dbConnect';
import ProductModel, { Product } from '../models/ProductModel';
import { FilterProps } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

const revalidate = 3600;

const getLatest = cache(async ()=>{
    await dbConnect()
    const products = await ProductModel.find({}).sort({ _id: -1 }).limit(60).lean();
    return products as Product[] 
})

const filterProductsFromDB = async (req: NextApiRequest, res: NextApiResponse) => {
  

    const filters = req.body.filters || [];

    let query: any = {};

    if (!filters.length) {
      return await ProductModel.find({}).sort({ _id: -1 }).limit(60).lean();
    }
  
    filters.forEach((filter:FilterProps) => {
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
          query[filter.prop] = filter.value;
          break;
  
        case "minmax":
          const min = filter.min ?? 0;
          const max = filter.max ?? Number.MAX_VALUE;
          query[filter.prop] = { $gte: min, $lte: max };
          break;
  
        case "clear":
          query = {};
          break;
  
        default:
          break;
      }
    });
  
    const products = await ProductModel.find(query).sort({ _id: -1 }).lean();
    res.status(200).json(products);
  
  };
  
  export default filterProductsFromDB;
  