import BannerHome from "../../components/home/BannerHome"
import Categories from "../../components/home/Categories"
import Products from "../../components/Products/Products"
import Service from "../../components/home/Service"
import Subscribe from "../../components/home/Subscribe"

const PageHome = () =>{
    return(
        <>
            <BannerHome />
            <Categories />
            <Products />
            <Service />
            <Subscribe />
        </>
    )
}
export default PageHome