export interface ChildrenProps  { 
    children: React.ReactNode
}

export interface ProductProps {
            _id: string,
            static_id:string,
            title: string,
            type: string,
            section: string,
            image: string,
            brand: string,
            description: string,
            avgRating: number,
            ratings: number,
            price: number,
            oldPrice: number,
            badge: string,
            free_delivery: boolean,
            color: string,
            to_home: boolean,
            premium_offer: boolean,
            has_discount: boolean,
            quantity:number,
            deliveryPrice:number,
            total:number,
            discount?:string,
            prop:string
}


// export interface FilterProps{
//     prop:'type'| 'brand' | 'premium_offer' | 'free_delivery' | 'to_home' | 'price' | 'color' | 'avgRating' | string,
//     checked?:boolean,
//     type: string,
//     value: string,
//     values:string[]|[],
//     min?:Number,
//     max?:Number,
//     filterFn?:(product:ProductProps,filter:FilterProps)=> boolean,
// }

export interface FilterProps {
    prop: 
      | 'type'
      | 'brand'
      | 'premium_offer'
      | 'free_delivery'
      | 'to_home'
      | 'price'
      | 'color'
      | 'avgRating'
      | string; 
  
    type: 
      | 'boolean'  
      | 'list'    
      | 'custom'   
      | 'minmax'   
      | 'clear'
      |'remove-filter';
  
    value?: string;          
    values?: string[];  
    checked?: boolean;  
    min?: number;     
    max?: number;
  }
  

export interface FilterInputProps{
    name:string,
    value:string
}


export interface FilterSidebarProps{
    handleFilter:(filterData:FilterProps, isAdded:boolean)=>boolean|void|null|Promise<null>,
    selectedValue:string,
    constantList:[]|ProductProps[],
    setProducts:((products:ProductProps[]|[])=> void),
    filtersClear:boolean,
    setFiltersClear:((filter:boolean)=> void ),
    filterRemove:FilterInputProps,
    setFilterRemove:((filter:FilterInputProps)=> void),
    filterSelectedList:[]|FilterProps[],
    setFilterSelectedList:(filter:[]|FilterProps[])=>void,
   
}

export interface FilterNavprops {
    products:ProductProps[]|[],
    category:string,
    setProducts:(products:ProductProps[]|[])=>void,
    sort:string,
    setSort:(sort:string)=>void,
    handleSortStrategy:()=>void,
    design:string
    setDesign:(sort:string)=>void,
    filterSelectedList:FilterProps[]|[],
    filtersClear:boolean
    setFiltersClear:(filter:boolean)=>void,
    maxCountProducts:number,
    handleFilter:(filterData:FilterProps, isAdded:boolean)=>boolean|void,
}

export interface FiltersSelectedProps{
    filterSelectedList:FilterProps[]|[],
    setFilterSelectedList:(filter:[]|FilterProps[])=>void,
    filterRemove:FilterInputProps,
    setFilterRemove:((filter:FilterInputProps)=> void),
    setFiltersClear:(filter:boolean)=>void,
    setMaxCountProducts:(number:number)=>void
  }

export interface filterProductsListProps {
    filters:FilterProps[]|[];
    list:ProductProps[]|[];
    checkValuesLength:number
}

