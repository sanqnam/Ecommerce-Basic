import { useLoaderData } from "react-router-dom"
import ProductList from "./ProductList"

const Products = () => {
    const data = useLoaderData()
    return (
        <section className="text-neutral-950 mb-10">
            <div className="mb-10">
                <p className="italic text-sm text-neutral-500 ">
                    MADE THE HARD WAY
                </p>
                <h2 className="italic text-2xl">
                    TOP TRENDING PRODUCTS
                </h2>
            </div>
            <ProductList data={data} />
        </section>
    )
}
export default Products

export const loader = async()=>{
    const results = await fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
    const data = await results.json()

    return data
}