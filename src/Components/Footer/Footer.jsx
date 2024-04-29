import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import footer from "../../assets/footer.jpg";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];
const bgImage = {
  backgroundImage: `url(${footer})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  miHeight: "400px",
  width: "100vw",
};
const Footer = () => {
  return (
    <>
      <div style={bgImage} className=" text-white">
        <div className="bg-black/40 min-h-[400px]  ">
          <div className="container grid md:grid-cols-3 pb-20 pt-5  ">
            {/* Company Details  */}
            <div data-aos="fade-left" className="py-8 px-4">
              <a
                href="#"
                className="font-semibold tracking-widest text-2xl sm:text-3xl font-cursive"
              >
                 Cafe Nirvana
              </a>
              <p className="pt-4">
                Crafted coffee, Cozy Vibes, Unforgettable Moments ||Your Perfect
                Espresso Escape
              </p>
              <a
                href="https://youtube.com/"
                target="_blank"
                className="inline-block border-white bg-[#3d2517] py-2 px-4 mt-5 text-sm rounded-full"
              >
                Visit our Youtube Channel
              </a>
            </div>
            {/* Footer Links  */}
            <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
              {/* first col links  */}
              <div
                data-aos="fade-down"
                data-aos-delay="300"
                className="py-8 px-4"
              >
                <h1 className="text-xl font-semibold sm:text-left mb-3">
                  Footer Links
                </h1>
                <ul className="space-y-3">
                  {FooterLinks.map((data, index) => {
                    return (
                      <li key={index}>
                        <a
                          href={data.link}
                          className="inline-block hover:scale-105 duration-200"
                        >
                          {data.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Second col links  */}
              <div
                data-aos="fade-down"
                data-aos-delay="300"
                className="py-8 px-4"
              >
                <h1 className="text-xl font-semibold sm:text-left mb-3">
                  Quick Links
                </h1>
                <ul className="space-y-3">
                  {FooterLinks.map((data, index) => {
                    return (
                      <li key={index}>
                        <a
                          href={data.link}
                          className="inline-block hover:scale-105 duration-200"
                        >
                          {data.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Company address section  */}
              <div
                data-aos="fade-right"
                className=" py-8 px-4 col-span-2 sm:col-auto "
              >
                <h1 className="text-xl font-semibold sm:text-left mb-3">
                  Address
                </h1>
                <div>
                  <p className="mb-3">#16,Near Hill Cart Road,Subbari,Siliguri,WestBengal</p>
                  <p className="mb-3">Email:  shamandeep635@gmail.com</p>
                  <p className="mb-3">+91 8670226518</p>
                  {/* Social Links */}
                  <div className="flex flex-col">
                    <a href="#" className="mb-3">
                      <FaFacebook className="inline-block text-3xl hover:scale-105 duration-200 mr-3" />{" "}
                      Facebook
                    </a>
                    <a href="#" className="mb-3">
                      <FaInstagram className="inline-block text-3xl hover:scale-105 duration-200  mr-3" />{" "}
                      Instagram
                    </a>
                    <a href="#" className="mb-3">
                      <FaLinkedin className="inline-block text-3xl hover:scale-105 duration-200  mr-3" />{" "}
                      Linkedin
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
