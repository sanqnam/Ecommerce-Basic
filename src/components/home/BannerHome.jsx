import banner from '../../assets/imgs/banner1.jpg'
const BannerHome = () =>{
    return (
        <div className="w-full bg-cover bg-center h-[500px] relative" style={{backgroundImage: `url(${banner})`}}>
            <div className='absolute top-6/12 left-10 transform -translate-y-1/2 w-6/12'>
                <p className='text-neutral-400'>
                    NEW INSPIRATION 2020
                </p>
                <h2 className='text-neutral-950 text-3xl my-3 style italic'>
                    20% OFF ON NEW SEASON
                </h2>
                <button className='bg-neutral-950 text-white px-4 py-1.5 cursor-pointer'>
                    Browser collections
                </button>
            </div>
        </div>
    )
}
export default BannerHome