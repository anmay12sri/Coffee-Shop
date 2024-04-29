import React from "react";
import coffee from "../../assets/white-coffee.png";
import bgTexture from "../../assets/bg-image.png";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const bgImage = {
  backgroundImage: `url(${bgTexture})`,
  backgroundColor: "#270c03",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100vw",
};

const Banner = () => {
  return (
    <>
     <span id="about"></span>
      <div style={bgImage}>
        <div className="container min-h-[550px] flex justify-center items-center py-12 sm:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Text section  */}
            <div className=" flex flex-col justify-center items-center gap-6 s:pt-0">
              <h1
                data-aos="fade-up"
                className="text-5xl sm:text-4xl font-bold font-cursive text-secondary  "
              >
                Premium Blend Coffee
              </h1>
              <p
                data-aos="fade-up"
                className="text-xl  text-secondary font-medium tracking-wide leading-5"
              >
                At our establishment, we take pride in crafting premium blend coffee that embodies excellence.
                 Meticulously selecting beans from diverse regions, we meticulously blend them to create a symphony 
                 of flavors, aromas, and textures. Through our precise roasting techniques, we ensure each cup deliver
                  a harmonious balance, with notes of chocolate, caramel, fruit, and spices tantalizing the palate.
                 
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div data-aos="fade-up" className="flex items-center gap-3">
                    <GrSecure className="text-2xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100" />
                    <span>Premium Coffee</span>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="flex items-center gap-3"
                  >
                    <IoFastFood className="text-2xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100" />
                    <span>Hot Coffee</span>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="500"
                    data-aos-offset="0"
                    className="flex items-center gap-3"
                  >
                    <GiFoodTruck className="text-2xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100" />
                    <span>Cold Coffee</span>
                  </div>
                </div>
                <div data-aos="slide-left" data-aos-delay="300"  className="border-l-4 border-primary/50 pl-6 pace-y-3">
                  <h1 className="text-2xl text-secondary font-bold font-cursive">
                    Tea Lover
                  </h1>
                  <p className="text-secondary mt-3 font-medium">
                    Much like writing code, brewing the perfect cup of tea
                    requires patience, precision, and a dash of passion to
                    create a comforting blend of flavors.
                  </p>
                </div>
              </div>
            </div>
            {/* Image section  */}
            <div data-aos="zoom-in">
              <img
                src={coffee}
                alt="Coffee"
                className=" max-w-[430px] w-full mx-auto spin 
              drop-shadow-xl "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
