import React from "react";
import Coffee from "../../assets/coffee.png";
 
 


const Home = () => {
  return (
    <div className="min-h-[550px] sm:min-h-[600px] bg-brandDark flex justify-center items-center text-white">
      <div className="container pb-8 sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Text content section */}
          <div className="order-2 sm:order-1 flex flex-col justify-center gap-6">
            <h1 
            // data-aos='fade-up'
              data-aos-once="true" className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              We serve the richest{" "}
              <span data-aos='zoom-out' data-aos-delay="300"
              className="text-primary font-cursive">Coffee</span> in the
              city
            </h1>
            <div data-aos='fade-up' data-aos-delay="400">
    {/* New Buy button */}
    <button className="bg-gradient-to-r from-primary to-secondary border-2 border-primary rounded-full px-4 py-2 text-white hover:scale-105 duration-200">
        <a href="/#services" className="text-white">
            Buy Coffee
        </a>
    </button>
</div>

          </div>
          
          {/* Image section */}
          <div data-aos="zoom-in" className=" min-h-[450px] flex justify-end items-center order-2 sm:order-1 relative   ">
            <img
              src={Coffee}
              alt="Coffee"
              className=" w-[200px] sm:w-[450px] sm:scale-110 mx-auto spin mr-[30px]"
            />
            {/* <div data-aos='fade-left' className="bg-gradient-to-r from-primary to-secondary absolute top-10 left-10 p-3 rounded-xl">
              Hey There!!
            </div>
            <div data-aos='fade-right' className="bg-gradient-to-r from-primary to-secondary absolute bottom-10 right-10 p-3 rounded-xl">
              Best Coffee
            </div> */}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
