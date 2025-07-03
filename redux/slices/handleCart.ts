import { ProductProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const strorageProducts:ProductProps[] | [] = []
const stroragePurchases:ProductProps[] | [] = []
const productCount:number = 0
const theBill:number = 0
const theFinalBill:number = 0

const initialState = {
    products:strorageProducts,
    purchases:stroragePurchases,
    productCount:productCount,
    bill:theBill,
    finalBill:theFinalBill      
}

const cartSlice = createSlice({
    name : "Cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const addProduct = state.products?.find((product:ProductProps )=> product._id === action.payload.id)

            if(addProduct){ 
                const quantity = addProduct.quantity + 1;//action.payload.quantity;
                const total = (addProduct.total + action.payload.total) - addProduct.deliveryPrice;

                state.productCount = state.productCount + quantity;
                state.bill = state.bill + total;
                state.products = state.products.map(product => product._id === product._id ? {...product,quantity:quantity,total:total} : product)

            }else{
                state.productCount = state.productCount + action.payload.quantity;
                state.bill = state.bill + action.payload.total
                state.products = [...state.products,action.payload]               
            }

        },
        removeFromCart:(state,action)=>{
            const deletedProduct = state.products?.find(product => product._id === action.payload)

            if (deletedProduct && state.products.length) {           

                    state.bill = state.bill - deletedProduct.total
                    state.productCount = state.productCount - deletedProduct.quantity
                    state.products = state.products.filter(product => product._id !== action.payload);
                           
            }

        },
        clearCart:(state)=>{
            state.bill = 0;
            state.productCount = 0;
            state.products = [];                         
        },
        handleProductsQuantity:(state,action)=>{
            const modifiedProduct = state.products.find(product => product._id == action.payload.id)
            
            if (modifiedProduct) {

                if (modifiedProduct.quantity > +action.payload.value) {
                    
                    const quantityDifference = modifiedProduct.quantity - action.payload.value;
                    const priceDifference = quantityDifference * modifiedProduct.price;

                    state.productCount = state.productCount - quantityDifference;
                    state.bill = state.bill - priceDifference;
                    state.products = state.products.map(product => product._id === action.payload.id ? {...product,quantity:action.payload.value,total:product.total - priceDifference} : product)        
                }
                else if (modifiedProduct.quantity < +action.payload.value){

                    const quantityDifference =  action.payload.value - modifiedProduct.quantity;
                    const priceDifference = quantityDifference * modifiedProduct.price;

                    state.productCount = state.productCount + quantityDifference;
                    state.bill = state.bill + priceDifference;
                    state.products = state.products.map(product => product._id === action.payload.id ? {...product,quantity:action.payload.value,total:product.total + priceDifference} : product)
                }
    
            }

        },
        handleBill:(state)=>{
  
            state.finalBill = state.bill
            state.purchases = state.products
            
        },
        increaseQuantity:(state,action)=>{
            const increasedProduct = state.products.find(product => product._id === action.payload);

            if (increasedProduct) {
             const quantity = increasedProduct.quantity + 1;
             const total = increasedProduct.total + increasedProduct.price;
  
              state.productCount = state.productCount + 1;
              state.bill = state.bill + increasedProduct.price;
              state.products = state.products.map(product => product._id === action.payload ? {...product,quantity:quantity,total:total} : product) 
            }
        },
        decreaseQuantity:(state,action)=>{
           const decreasedProduct = state.products.find(product => product._id === action.payload);

           if (decreasedProduct && decreasedProduct.quantity > 1) {
            const quantity = decreasedProduct.quantity - 1;
            const total = decreasedProduct.total - decreasedProduct.price;
 
             state.productCount = state.productCount - 1;
             state.bill = state.bill - decreasedProduct.price;
             state.products = state.products.map(product => product._id === action.payload ? {...product,quantity:quantity,total:total} : product) 
           }
        },
    }
})

export const {addToCart,removeFromCart,clearCart,handleProductsQuantity,handleBill,increaseQuantity,decreaseQuantity} = cartSlice.actions

export default cartSlice.reducer