import iphone from '../../assets/imgs/product_1.png'
import mac from '../../assets/imgs/product_2.png'
import ipad from '../../assets/imgs/product_3.png'
import watch from '../../assets/imgs/product_4.png'
import airpods from '../../assets/imgs/product_5.png'
const Categories = () => {
    return (
        <section className="my-10">
            <div className="text-center mb-4">
                <p className="italic text-sm text-neutral-400">
                    AREFULLY CREATED COLLECTIONS
                </p>
                <h2 className="italic text-neutral-950 text-xl mt-0.5">
                    BROWSE OUR CATEGORIES
                </h2>
            </div>
            <div className="flex gap-3 rounded-xl overflow-hidden">
                <div className="w-1/2 group cursor-pointer relative">
                    <img className='w-full' src={iphone} alt={iphone} />
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                </div>
                <div className="w-1/2 group cursor-pointer relative">
                    <img className='w-full' src={mac} alt={mac} />
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                </div>
            </div>
            <div className="flex gap-3 rounded-xl overflow-hidden  mt-4">
                <div className="w-1/3 group cursor-pointer relative">
                    <img src={ipad} alt={ipad} className='w-full' />
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300">
                    </div>
                </div>
                <div className="w-1/3 group cursor-pointer relative">
                    <img src={watch} alt={watch} className='w-full' />
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                </div>
                <div className="w-1/3 group cursor-pointer relative">
                    <img src={airpods} alt={airpods} className='w-full' />
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                </div>

            </div>
        </section>
    )
}
export default Categories