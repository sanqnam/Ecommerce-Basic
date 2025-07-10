const Footer = () => {
    return (
        <footer className="w-full py-15 bg-neutral-950 text-white">
            <div className="max-w-[1100px] m-auto grid grid-cols-12">
                <div className="col-span-3">
                    <h3 className="font-medium italic mb-2 ">
                        CUSTOMER SERVICES
                    </h3>
                    <ul className="text-neutral-600 text-sm italic">
                        <li><a href="/"></a>Help & Contact us</li>
                        <li><a href="/"></a>Return & Refunds</li>
                        <li><a href="/"></a>Online Stores</li>
                        <li><a href="/"></a>Terms & Conditions</li>
                    </ul>
                </div>
                <div className="col-span-4">
                <h3 className="font-medium italic mb-2 ">
                COMPANY
                    </h3>
                    <ul className="text-neutral-600 text-sm italic">    
                        <li><a href="/"></a>What We Do </li>
                        <li><a href="/"></a>Available Services</li>
                        <li><a href="/"></a>Latest Posts</li>
                        <li><a href="/"></a>FAQS</li>
                    </ul>
                </div>
                <div className="col-span-5 r">
                <h3 className="font-medium italic mb-2 ">
                SOCIAL MEDIA 
                    </h3>
                    <ul className="text-neutral-600 text-sm italic">
                        <li><a href="/"></a>Twitter </li>
                        <li><a href="/"></a>Instagram </li>
                        <li><a href="/"></a>Facebook </li>
                        <li><a href="/"></a>Pinterest</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
export default Footer