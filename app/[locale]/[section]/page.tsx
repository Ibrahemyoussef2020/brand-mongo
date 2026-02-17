'use client';

import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"
import FilterSidebar from "@/components/showCategories/FilterSidebar";
import ResultsSection from "@/components/showSections/ResultsSection";
import ProgressNavSection from "@/components/showSections/ProgressNavSection";
import FilterNavSection from "@/components/showSections/FilterNavSection";
import FiltersSelected from "@/components/showCategories/FiltersSelected";
import Pagenations from "@/components/showCategories/Pagenations";
import Subscribe from "@/components/layout/Subscribe";
import AnotherItems from "@/components/general/AnotherItems";
import CategoriesLinksSwipper from "@/components/layout/categoriesLinksSwipper";
import { useShowCategories } from "@/hooks/useShowCategories";



const page = () => {
    
    const {
        category = '',
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
        updateURL,
        loading
    } = useShowCategories();
    
  return (
    <>
    <Header page="results" heading={category}/> 

    <MenuSidebar />
    
    <section className="results">
        <div className="container">

          <CategoriesLinksSwipper />

          <ProgressNavSection page="results" section={category} item="" />

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
                loading={loading}
            />

            <div className="main">
              <FilterNavSection 
                products={products} 
                setProducts={setProducts} 
                section={category}
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

              
              <ResultsSection products={products} section={category} maxCountProducts={maxCountProducts} handleFilter={handleFilter} loading={loading}/>
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
