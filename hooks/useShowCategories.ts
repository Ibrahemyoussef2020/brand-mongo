'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { sortLists } from '@/utilities';
import { FilterProps, ProductProps, FilterInputProps } from '@/types';
import { 
  updateURLHelper, 
  getUpdatedFilterList,
  parseSearchParamsHelper
} from '@/helpers/ShowItems';
import { fetchProductsAction } from "@/lib/actions/product";

type prop = {
  category?: string;
  section?: string;
}

export const useShowCategories = () => {
    const params = useParams<prop>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { category, section } = params;
    
    // Determine the main key for querying (either category or section)
    // If section page, we might want to query by section, but the API expects 'category' for filtering 
    // or we might need to pass 'section' to selecting the model.
    // The previous logic was: param 'category' -> filter by category.
    // New logic: param 'section' -> select model. Param 'category' -> filter by category.
    
    const filterListRef = useRef<FilterProps[]>([]);
    
    const [products,setProducts] = useState<[]|ProductProps[]>([]);
    const [constantProducts, setConstantProducts] = useState<[]|ProductProps[]>([]);
    const [filterSelectedList,setFilterSelectedList] = useState<[]|FilterProps[]>([]);

    const [selectedValue, setSelectedValue] = useState<string>('')
    const [filtersClear,setFiltersClear] = useState<boolean>(false)
    const [filterRemove,setFilterRemove] = useState<FilterInputProps>({name:'',value:''})
    
    const [design,setDesign] = useState<string>('list')
    const [sort,setSort] = useState<string>('');

    const [maxCountProducts,setMaxCountProducts] = useState<number>(100);

    // Update URL with filters, sort, and design
    const updateURL = useCallback((filters: FilterProps[], currentSort?: string, currentDesign?: string) => {
      updateURLHelper(router, pathname, filters, currentSort, currentDesign);
    }, [pathname, router]);

    // Unified sync effect for products and filters
    useEffect(() => {
      let isCancelled = false;

      const runSync = async () => {
        // 1. Parse Params
        const filters = parseSearchParamsHelper(searchParams);

        if (isCancelled) return;
        setFilterSelectedList(filters);
        filterListRef.current = filters;

        // Parse sort and design
        const urlSort = searchParams.get('sort') || '';
        setSort(urlSort);
        const urlDesign = searchParams.get('design') || 'list';
        setDesign(urlDesign);

        // 2. Fetch Constant Products (Sidebar)
        // Replaced fetchCategoryProducts with Server Action
        try {
           // We pass both category and section. 
           // If 'section' is present (e.g. /showSections/deal-offers), getProductsFromDB uses it to select Model.
           // If 'category' is present (e.g. /showCategories/laptops), it filters by category.
           // Note: On ShowSections page, 'category' param is undefined, so we fetch all items from that section.
           const categoriesResult = await fetchProductsAction({ category, section });
           if (isCancelled) return;
           const allProducts = categoriesResult?.data || [];
           setConstantProducts(allProducts);
        } catch (error) {
           console.error("Failed to fetch constant products", error);
        }

        // 3. Fetch Displayed Products
        let displayProducts = [];
        const hasFilters = filters.length > 0;

        try {
          if (hasFilters) {
            // Convert filters to a plain object for the Server Action
            const queryParams: Record<string, any> = { category, section };
            
            filters.forEach(filter => {
                if (filter.type === 'list' && filter.values) {
                    queryParams[filter.prop] = filter.values;
                } else if (filter.type === 'minmax') {
                    if (filter.min !== undefined) queryParams[`${filter.prop}_min`] = filter.min;
                    if (filter.max !== undefined) queryParams[`${filter.prop}_max`] = filter.max;
                } else if (filter.type === 'boolean' || filter.type === 'custom') {
                    queryParams[filter.prop] = filter.checked ?? filter.value;
                }
            });

            const result = await fetchProductsAction(queryParams);
            if (isCancelled) return;
            displayProducts = result?.data || [];
          } else {
             // If no filters, we can just use the constant products we already fetched, 
             // OR fetch again if pagination is involved (but here it seems we want all or same set)
             // For now, let's rely on constantProducts if possible, or fetch again to be safe/consistent
             if (constantProducts.length > 0 && !isCancelled) {
                 displayProducts = constantProducts;
             } else {
                 const result = await fetchProductsAction({ category, section });
                 if (isCancelled) return;
                 displayProducts = result?.data || [];
             }
          }
        } catch (error) {
            console.error("Failed to fetch displayed products", error);
        }

        // 4. Apply Sorting
        if (urlSort && urlSort !== '#') {
          displayProducts = sortLists({ filter: urlSort, products: displayProducts });
        }

        if (isCancelled) return;
        setProducts(displayProducts);
      };

      runSync();
      return () => { isCancelled = true; };
    }, [searchParams, category, section]);


    const handleFilter = async (filterData: FilterProps, isAdded: boolean) => {
      
      const updatedFilters = getUpdatedFilterList(filterListRef.current, filterData, isAdded);
    
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

    function handleSortStrategy(){
       const sortedProducts = sortLists({filter:sort,products}) 
       return sortedProducts
    }

    return {
        category: category || section,
        products,
        setProducts,
        constantProducts,
        filterSelectedList,
        setFilterSelectedList,
        selectedValue,
        filtersClear,
        setFiltersClear,
        filterRemove,
        setFilterRemove,
        design,
        setDesign,
        sort,
        setSort,
        maxCountProducts,
        setMaxCountProducts,
        handleFilter,
        handleSortStrategy,
        updateURL
    }
}
