'use client';

import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"

import {  showProducts } from "@/app/apis";
import FilterSidebar from "@/components/showCategories/FilterSidebar";
import { FilterInputProps, ProductProps } from "@/types";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

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



const page = () => {
    const params = useParams<prop>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const {category} = params;
    
    const filterListRef = useRef<FilterProps[]>([]);
    

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


    // fetchCategoryProductsFn is no longer needed as standalone as it's consolidated in the sync effect

    // Update URL with filters, sort, and design
    const updateURL = useCallback((filters: FilterProps[], currentSort?: string, currentDesign?: string) => {
      const params = new URLSearchParams();
      
      filters.forEach((filter) => {
        if (filter.type === "list" && filter.values) {
          filter.values.forEach(v => params.append(filter.prop, v));
        } else if (filter.type === "minmax") {
          if (filter.min !== undefined) params.set(`${filter.prop}_min`, filter.min.toString());
          if (filter.max !== undefined) params.set(`${filter.prop}_max`, filter.max.toString());
        } else if (filter.type === "boolean" || filter.type === "custom") {
          const val = filter.checked ?? filter.value;
          if (val !== undefined && val !== false) params.set(filter.prop, val.toString());
        }
      });

      if (currentSort && currentSort !== '#') params.set('sort', currentSort);
      if (currentDesign) params.set('design', currentDesign);

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    }, [pathname, router]);

    // Unified sync effect for products and filters
    useEffect(() => {
      let isCancelled = false;

      const runSync = async () => {
        // Parse filters from search params
        const filters: FilterProps[] = [];
        const groupedParams: Record<string, string[]> = {};
        searchParams.forEach((value, key) => {
          if (!groupedParams[key]) groupedParams[key] = [];
          groupedParams[key].push(value);
        });

        const listProps = ['brand', 'avgRating'];
        const booleanProps = ['premium_offer', 'free_delivery', 'to_home', 'verified'];
        const nonFilterParams = ['sort', 'design'];

        Object.entries(groupedParams).forEach(([key, values]) => {
          if (nonFilterParams.includes(key)) return;

          if (key.endsWith('_min') || key.endsWith('_max')) {
            const baseProp = key.replace(/_(min|max)$/, '');
            let filter = filters.find(f => f.prop === baseProp && f.type === 'minmax');
            if (!filter) {
              filter = { prop: baseProp, type: 'minmax' };
              filters.push(filter);
            }
            if (key.endsWith('_min')) filter.min = Number(values[0]);
            if (key.endsWith('_max')) filter.max = Number(values[0]);
          } else if (listProps.includes(key)) {
            filters.push({ prop: key, type: 'list', values });
          } else if (booleanProps.includes(key)) {
            filters.push({ prop: key, type: 'boolean', checked: values[0] === 'true' });
          } else {
            filters.push({ prop: key, type: 'custom', value: values[0] });
          }
        });

        if (isCancelled) return;
        setFilterSelectedList(filters);
        filterListRef.current = filters;

        // Parse sort and design
        const urlSort = searchParams.get('sort') || '';
        setSort(urlSort);
        const urlDesign = searchParams.get('design') || 'list';
        setDesign(urlDesign);

        // 1. Fetch Constant Products (Sidebar)
        const categories = await fetchCategoryProducts('products', category);
        if (isCancelled) return;
        const allProducts = categories?.data || [];
        setConstantProducts(allProducts);

        // 2. Fetch Displayed Products
        let displayProducts = [];
        const hasFilters = filters.length > 0;

        if (hasFilters) {
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
          const response = await fetch(url, { method: "GET" });
          if (isCancelled) return;
          if (response.ok) {
            const data = await response.json();
            displayProducts = data?.data || [];
          }
        } else {
          displayProducts = allProducts;
        }

        // 3. Apply Sorting
        if (urlSort && urlSort !== '#') {
          displayProducts = sortLists({ filter: urlSort, products: displayProducts });
        }

        if (isCancelled) return;
        setProducts(displayProducts);
      };

      runSync();
      return () => { isCancelled = true; };
    }, [searchParams, category]);









const handleFilter = async (filterData: FilterProps, isAdded: boolean) => {
  let updatedFilters = [...filterListRef.current];

  // ✅ 1. Clear all filters
  if (filterData.type === "clear") {
    updatedFilters = [];
  } 
  // ✅ 2. Remove a specific filter
  else if (filterData.type === "remove-filter") {
    updatedFilters = updatedFilters.filter((filter) => filter.prop !== filterData.prop);
  } 
  // ✅ 3. Adding or updating a filter
  else if (isAdded) {
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
  filterListRef.current = updatedFilters;
  setFilterSelectedList(updatedFilters);

  // ✅ Update URL (this will trigger the useEffect to fetch products)
  updateURL(updatedFilters, sort, design);

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
                setSort={(val) => {
                  setSort(val);
                  updateURL(filterSelectedList, val, design);
                }}
                handleSortStrategy={handleSortStrategy}
                design={design}
                setDesign={(val) => {
                  setDesign(val);
                  updateURL(filterSelectedList, sort, val);
                }} 
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