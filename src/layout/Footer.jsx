const Footer = () => {
    return (
      <footer className="w-full py-10 bg-neutral-950 text-white">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="font-medium italic mb-2">CUSTOMER SERVICES</h3>
            <ul className="text-neutral-400 text-sm italic space-y-1">
              <li><a href="/">Help & Contact us</a></li>
              <li><a href="/">Return & Refunds</a></li>
              <li><a href="/">Online Stores</a></li>
              <li><a href="/">Terms & Conditions</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-medium italic mb-2">COMPANY</h3>
            <ul className="text-neutral-400 text-sm italic space-y-1">
              <li><a href="/">What We Do</a></li>
              <li><a href="/">Available Services</a></li>
              <li><a href="/">Latest Posts</a></li>
              <li><a href="/">FAQS</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-medium italic mb-2">SOCIAL MEDIA</h3>
            <ul className="text-neutral-400 text-sm italic space-y-1">
              <li><a href="/">Twitter</a></li>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Facebook</a></li>
              <li><a href="/">Pinterest</a></li>
            </ul>
          </div>
  
        </div>
      </footer>
    );
  };
  
  export default Footer;
  