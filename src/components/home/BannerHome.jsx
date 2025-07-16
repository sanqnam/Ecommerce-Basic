import banner from '../../assets/imgs/banner1.jpg'
const BannerHome = () => {
    return (
        <div
            className="w-full bg-cover bg-center h-[500px] relative flex items-center"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className="px-4 md:px-10 max-w-xl">
                <p className="text-neutral-400 text-sm md:text-base">
                    NEW INSPIRATION 2020
                </p>
                <h2 className="text-neutral-950 text-xl md:text-3xl my-3 italic">
                    20% OFF ON NEW SEASON
                </h2>
                <button className="bg-neutral-950 text-white px-4 py-2 cursor-pointer text-sm md:text-base">
                    Browse collections
                </button>
            </div>
        </div>
    );

}
export default BannerHome