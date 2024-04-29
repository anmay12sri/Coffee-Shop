import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialData = [
  {
    id: 1,
    name: "Honey",
    feedback: "I loved the Americano here. The services are top-notch and the sandwiches are fantastic!",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Rajesh",
    feedback: "The environment here is great. I enjoyed the expresso and the friendly staff.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Mahesh",
    feedback: "The atmosphere is wonderful. The cappuccino is amazing and the desserts are divine!",
    img: "https://picsum.photos/103/103",
  },
  {
    id: 4,
    name: "Anmay",
    feedback: "I loved the mocha here. The ambiance is perfect for working and the pastries are delicious.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Suresh",
    feedback: "The latte is my favorite! The staff is very welcoming and the atmosphere is cozy.",
    img: "https://picsum.photos/105/105",
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-14 mb-10">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">Testimonials</h1>
        </div>

        {/* Testimonial Section */}
        <div>
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6" key={data.id}>
                <div className="flex flex-col gap-4 shadow-lg py-8 mx-4 rounded-xl bg-primary/10 relative">
                  {/* Image Section */}
                  <div className="mb-4 mx-4">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  {/* Content Section */}
                  <div className="flex flex-col gap-4 items-center">
                    <div className="mx-5 space-y-3">
                      <p className="text-xs font-serif text-gray-500">{data.feedback}</p>
                      <h1 className="text-xl font-bold text-black/60 font-cursive">{data.name}</h1>
                    </div>
                  </div>
                  <p className="text-black/20 font-serif text-9xl top-0 right-0 absolute">,,</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
