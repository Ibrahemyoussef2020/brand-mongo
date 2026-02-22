import { ProductProps } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IRootState } from "../store";
import { toast } from "react-toastify";

// Helper for type safety if needed, but existing code was loose.

const initialState = {
    products: [] as ProductProps[],
    purchases: [] as ProductProps[],
    productCount: 0,
    bill: 0,
    finalBill: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null as string | null
};

// Async Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.get("/api/cart");
    return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product: any, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    
    // product payload should match structure expected by API
    // Mapping _id to product if needed
    const payload = { ...product };
    if (!payload.product && payload._id) {
        payload.product = payload._id;
    }

    const response = await axios.post("/api/cart", payload);
    return response.data;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.delete("/api/cart", { data: { productId } }); 
    return response.data;
});

export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.patch("/api/cart", { productId, action: 'increase' });
    return response.data;
});

export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (productId: string, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.patch("/api/cart", { productId, action: 'decrease' });
    return response.data;
});

export const handleProductsQuantity = createAsyncThunk("cart/handleProductsQuantity", async (payload: { id: string, value: number }, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.patch("/api/cart", { productId: payload.id, action: 'set', value: payload.value });
    return response.data;
});

export const createOrder = createAsyncThunk("cart/createOrder", async (paymentIntentId: string, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.post("/api/orders", { paymentIntentId });
    return response.data;
});

export const fetchOrders = createAsyncThunk("cart/fetchOrders", async (_, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.get("/api/orders");
    return response.data;
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, { getState, rejectWithValue }) => {
    const state = getState() as IRootState;
    if (!state.combine.log.isLogged) {
        toast.error("You should login first");
        return rejectWithValue("Not logged in");
    }
    const response = await axios.delete("/api/cart", { data: {} }); 
    return response.data;
});

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            const items = action.payload.items?.map((item: any) => ({
                ...item,
                _id: item.product || item._id
            })) || [];

            state.products = items;
            state.bill = action.payload.bill || 0;
            state.productCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
            state.finalBill = state.bill;
            state.purchases = state.products;
        },
        handleBill: (state) => {
             state.finalBill = state.bill;
             state.purchases = state.products;
        }
    },
    extraReducers: (builder) => {
        const updateState = (state: any, action: any) => {
             // Normalize items: map 'product' (ID) to '_id' so components use the correct ID.
             const items = action.payload.items?.map((item: any) => ({
                ...item,
                _id: item.product || item._id
            })) || [];

            state.products = items;
            state.bill = action.payload.bill || 0;
            state.productCount = items.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;
            state.status = 'succeeded';
        };

        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, updateState)
            .addCase(addToCart.fulfilled, updateState)
            .addCase(removeFromCart.fulfilled, updateState)
            .addCase(increaseQuantity.fulfilled, updateState)
            .addCase(decreaseQuantity.fulfilled, updateState)
            .addCase(handleProductsQuantity.fulfilled, updateState)
            .addCase(clearCart.fulfilled, (state) => {
                 state.products = [];
                 state.bill = 0;
                 state.productCount = 0;
                 state.finalBill = 0;
                 state.purchases = [];
                 state.status = 'succeeded';
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Failed to fetch cart";
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Failed to add to cart";
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                // Move current products to purchases, then clear cart
                state.purchases = state.products;
                state.products = [];
                state.bill = 0;
                state.productCount = 0;
                state.finalBill = 0;
                state.status = 'succeeded';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                // Flatten orders' items into purchases for display
                const allItems = action.payload.flatMap((order: any) => 
                    order.items.map((item: any) => ({
                        ...item,
                        _id: item.product || item._id,
                        orderId: order._id,
                        orderStatus: order.status,
                        orderDate: order.createdAt
                    }))
                );
                state.purchases = allItems;
                state.status = 'succeeded';
            });
    }
});

export const { setCart, handleBill } = cartSlice.actions; 
export default cartSlice.reducer;