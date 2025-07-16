import iphone from '../../assets/imgs/product_1.png'
import mac from '../../assets/imgs/product_2.png'
import ipad from '../../assets/imgs/product_3.png'
import watch from '../../assets/imgs/product_4.png'
import airpods from '../../assets/imgs/product_5.png'
const Categories = () => {
    return (
        <section className="my-10 px-4">
          <div className="text-center mb-4">
            <p className="italic text-sm text-neutral-400">
              CAREFULLY CREATED COLLECTIONS
            </p>
            <h2 className="italic text-neutral-950 text-xl mt-0.5">
              BROWSE OUR CATEGORIES
            </h2>
          </div>
      
          {/* First row */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 rounded-xl overflow-hidden">
            <div className="group cursor-pointer relative">
              <img className="w-full" src={iphone} alt="iPhone" />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
            </div>
            <div className="group cursor-pointer relative">
              <img className="w-full" src={mac} alt="Mac" />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
            </div>
          </div>
      
          {/* Second row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl overflow-hidden mt-4">
            <div className="group cursor-pointer relative">
              <img src={ipad} alt="iPad" className="w-full" />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
            </div>
            <div className="group cursor-pointer relative">
              <img src={watch} alt="Watch" className="w-full" />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
            </div>
            <div className="group cursor-pointer relative sm:w-auto w-[208%]">
              <img src={airpods} alt="AirPods" className="w-full" />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
            </div>
          </div>
        </section>
      );
      
}
export default Categories