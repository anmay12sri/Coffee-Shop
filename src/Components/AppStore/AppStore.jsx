import React from "react";
import Apple from "../../assets/apple.png";
import Android from "../../assets/android.png";

const AppStore = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-secondary to-primary py-14">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div data-aos="fade-up" className="space-y-6 max-w-xl mx-auto ">
              {/* Text content  */}
              <h1 className="text-2xl text-center sm:text-left sm:text-4xl font-semibold text-white/90 pl-3 ">
               Café Nirvana is available for Android and IOS{" "}
               <br></br>
               Download it Now!!
              </h1>
              {/* Logo Section  */}
              <div data-aos="fade-up" data-aos-delay="300"  className="flex flex-wrap justify-center sm:justify-start items-center">
                <a href="#">
                  <img
                    src={Apple}
                    alt="Apple Store"
                    className="pt-3 max-w-[150px] sm:max-w-[120px] md:max-w-[200px]  "
                  />
                </a>
                <a href="#">
                  <img
                    src={Android}
                    alt="Andriod Store"
                    className="pt-2 h-[93px]  max-w-[150px] sm:max-w-[120px] md:max-w-[200px]  "
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppStore;
