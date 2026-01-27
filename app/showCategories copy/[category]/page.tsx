'use client';

import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"

import {  showProducts } from "@/app/apis";
import FilterSidebar from "@/components/showCategories/FilterSidebar";
import { FilterInputProps, ProductProps } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
    filterProductsList,
    sortLists,
}

from '@/utilities'

import {
    FilterProps
} from '@/types'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ProductRating from "@/components/general/ProductRating";
import Results from "@/components/showCategories/Results";
import ProgressNav from "@/components/layout/ProgressNav";
import FilterNav from "@/components/showCategories/FilterNav";
import FiltersSelected from "@/components/showCategories/FiltersSelected";
import Pagenations from "@/components/showCategories/Pagenations";
import Subscribe from "@/components/layout/Subscribe";
import AnotherItems from "@/components/general/AnotherItems";
import CategoriesLinksSwipper from "@/components/layout/categoriesLinksSwipper";
import { fetchCategoryProducts } from "@/lib/services";


type prop = {
  category:string;
}


let filterList:FilterProps[]|[] = [];

const page = () => {
    const params = useParams<prop>();
    const {category} = params;
    

    const [products,setProducts] = useState<[]|ProductProps[]>([]);
    const [constantProducts, setConstantProducts] = useState<[]|ProductProps[]>([]);
    const [filterSelectedList,setFilterSelectedList] = useState<[]|FilterProps[]>([]);

    const [productsColor, setProductsColor] = useState<[]|string[]>([])
    const [productsBrand, setProductsBrand] = useState<[]|string[]>([])
    const [productsType, setProductsType] = useState<[]|string[]>([])

    const [fileterdOption, setFileterdOption] = useState<string>('all')
    const [hierarchyState, setHierarchyState] = useState<string>('')
    const [selectedValue, setSelectedValue] = useState<string>('')


    const [isSelectParentClicked,setIsSelectParentClicked] = useState<boolean>(true)
    const [isMobileFilterOppen, setIsMobileFilterOppen] = useState<boolean>(false)
    const [clear,setClear] = useState<boolean>(false)
    const [filtersClear,setFiltersClear] = useState<boolean>(false)
    const [filterRemove,setFilterRemove] = useState<FilterInputProps>({name:'',value:''})
    
    const [design,setDesign] = useState<string>('list')
    const [sort,setSort] = useState<string>('');

    const [maxCountProducts,setMaxCountProducts] = useState<number>(100);


    const fetchCategoryProductsFn = async()=>{

      console.log(category);
      
      const categories = await fetchCategoryProducts('products' , category );
      setProducts(categories?.data)      
    }

    useEffect(()=> {
      fetchCategoryProductsFn()
      }, [category,sort]);



const fetchFilteredProducts = async (filters: FilterProps[]) => {
  try {
 
    const queryParams = filters
      .flatMap((filter) => {
        if (filter.type === "list") {
          return filter.values?.map((value) => `${filter.prop}=${encodeURIComponent(value)}`) || [];
        }
        if (filter.type === "minmax") {
          return [
            filter.min !== undefined ? `${filter.prop}_min=${filter.min}` : "",
            filter.max !== undefined ? `${filter.prop}_max=${filter.max}` : "",
          ].filter(Boolean);
        }
        if (filter.type === "boolean" || filter.type === "custom") {
          return `${filter.prop}=${filter.checked ?? filter.value}`;
        }
        return "";
      })
      .join("&");

    const url = `/api/products/seed?category=${category}&${queryParams}`;


    console.log('url' , url);
    
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Failed to fetch filtered products");
    }

    const data = await response.json();

    console.log("filtered::=>", data);

    setProducts(data?.data);
  } catch (error: any) {
    console.error("Error fetching filtered products:", error.message);
  }
};




const handleFilter = async (filterData: FilterProps, isAdded: boolean) => {
  let updatedFilters = [...filterList];

  // ✅ 1. Clear all filters
  if (filterData.type === "clear") {
    updatedFilters = [];
    setFilterSelectedList(updatedFilters);
    await fetchFilteredProducts(updatedFilters); // Fetch products after clearing filters
    return null;
  }

  // ✅ 2. Remove a specific filter
  if (filterData.type === "remove-filter") {
    updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
    setFilterSelectedList(updatedFilters);
    await fetchFilteredProducts(updatedFilters);
    return null;
  }

  // ✅ 3. Adding or updating a filter
  if (isAdded) {
    const existingFilterIndex = updatedFilters.findIndex((filter) => filter.prop === filterData.prop);

    if (existingFilterIndex !== -1) {
      updatedFilters[existingFilterIndex] = filterData; // Modify existing filter
    } else {
      updatedFilters.push(filterData); // Add new filter
    }
  } else {
    // ✅ 4. Removing a filter when unchecked
    if (filterData.type === "list") {
      const newValues = filterData.values || [];
      if (newValues.length > 0) {
        updatedFilters = updatedFilters.map((filter) =>
          filter.prop === filterData.prop ? { ...filter, values: newValues } : filter
        );
      } else {
        updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
      }
    } else {
      updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
    }
  }

  // ✅ Update filter state
  setFilterSelectedList(updatedFilters);

  // ✅ Fetch new filtered data
  await fetchFilteredProducts(updatedFilters);

  // ✅ Reset temporary states
  setFiltersClear(false);
  setFilterRemove({ name: "", value: "" });

  return null
};




// _______________________  end handle filter  ____________//


 


//will remove
  function handleSortStrategy(){

   const sortedProducts = sortLists({filter:sort,products}) 
  
   return sortedProducts
    
  }

  return (
    <>
    <Header page="results" heading={category}/> 

    <MenuSidebar />
    
    <section className="results">
        <div className="container">

          <CategoriesLinksSwipper />

          <ProgressNav page="results" category={category} item="" />

          <div className={`${design} show-result`}>

            <FilterSidebar 
                handleFilter={handleFilter}
                selectedValue={selectedValue}
                constantList={constantProducts}
                setProducts={setProducts}
                filtersClear={filtersClear}
                setFiltersClear={setFiltersClear}
                filterRemove={filterRemove}
                setFilterRemove={setFilterRemove}
                filterSelectedList={filterSelectedList}
                setFilterSelectedList={setFilterSelectedList}
            />

            <div className="main">
              <FilterNav 
                products={products} 
                setProducts={setProducts} 
                category={category}
                sort={sort}
                setSort={setSort}
                handleSortStrategy={handleSortStrategy}
                design={design}
                setDesign={setDesign} 
                filterSelectedList={filterSelectedList}
                filtersClear={filtersClear}
                setFiltersClear={setFiltersClear}
                maxCountProducts={maxCountProducts}
                handleFilter={handleFilter as any}
              />

              <FiltersSelected
                filterSelectedList={filterSelectedList}
                setFilterSelectedList={setFilterSelectedList}
                setFiltersClear={setFiltersClear}
                filterRemove={filterRemove}
                setFilterRemove={setFilterRemove}
                setMaxCountProducts={setMaxCountProducts}
              />

              
              <Results products={products} category={category} maxCountProducts={maxCountProducts} handleFilter={handleFilter}/>
              <AnotherItems products={products} title='You may also like' category={category} />
              <Pagenations maxCountProducts={maxCountProducts} setMaxCountProducts={setMaxCountProducts} />
            </div>
          </div>
        </div>
        <Subscribe />
    </section>
    </>
  )
}

export default page