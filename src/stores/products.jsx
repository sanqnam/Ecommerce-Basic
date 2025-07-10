import { createSlice } from "@reduxjs/toolkit"


const productDefault = {
    products: [],
    productsCart: [],
    total: 0
}
const productSlice = createSlice({
    initialState: productDefault,
    name: 'products',
    reducers: {
        saveProducts: (state, action) => {
            state.products = action.payload
        },
        addProducts: (state, action) => {
            const index = state.productsCart.findIndex((pr) => pr._id.$oid == action.payload._id.$oid)
            console.log(index)
            if (index === -1) {
                state.productsCart.push(action.payload)
            } else {
                state.productsCart[index].quantity = Number(state.productsCart[index].quantity) + Number(action.payload.quantity)
                state.productsCart[index].total = Number(state.productsCart[index].total) + Number(action.payload.total)
            }
            state.total = state.productsCart.reduce((sum, product) => sum + Number(product.total), 0)

        },
        updateProducts: (state, action) => {
            const index = state.productsCart.findIndex((pr) => pr._id.$oid === action.payload.id)
            // cập nhập lại khi giảm
            if (action.payload.type === "reduce") {
                if (state.productsCart[index].quantity === 1) {
                    state.productsCart.splice(index, 1)
                } else {
                    state.productsCart[index].quantity = Number(state.productsCart[index].quantity) - 1
                    state.productsCart[index].total = state.productsCart[index].price * state.productsCart[index].quantity
                }// cập nhập khi tăng
            } if (action.payload.type === "increase") {
                state.productsCart[index].quantity = Number(state.productsCart[index].quantity) + 1
                state.productsCart[index].total = state.productsCart[index].quantity * state.productsCart[index].price
            }
            state.total = state.productsCart.reduce((sum, product) => product.total + sum, 0)
        },
        deleteProducts: (state, action) => {
            const index = state.productsCart.findIndex((pr) => pr._id.$oid === action.payload)
            state.productsCart.splice(index, 1)
            state.total = state.productsCart.reduce((sum, product) => product.total + sum, 0)
        }
    }
})
export default productSlice.reducer
export const { saveProducts, updateProducts, addProducts, deleteProducts } = productSlice.actions