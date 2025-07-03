'use client'
import { ProductProps } from "@/types";

const ascending = 'ascending';
const descending = 'descending';

interface ItemProps{
    [prop:string]:string,
}

const manageTitles = (item:ItemProps,prop:string)=>{

    const lowerCaseItem = item[prop] && item[prop].toLowerCase() 
    const charCodeItem = item[prop] && lowerCaseItem.charCodeAt(0)
    return charCodeItem
}

interface sortProps {
    filter:string,
    products:ProductProps[],
}


const sortLists = ({filter,products}:sortProps) => {

    let list = products;

    if (filter === 'new-arrivals') {
        
       list =  products.reverse()
    }
    else if (filter === 'heigh-price') {
        list =  products.sort((a:ProductProps,b:ProductProps) => a['avgRating'] - b['avgRating'] )
    }
    else if (filter === 'low-price') {
        products.sort((a:ProductProps,b:ProductProps) => b['avgRating'] - a['avgRating'])
    }
    else if(filter === 'ratings'){
        list =  products.sort((a:ProductProps,b:ProductProps) => a['avgRating'] - b['avgRating'])
    }

    return list
}

export {
    ascending,
    descending,
}

export default sortLists