import React from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import Slider from "react-infinite-logo-slider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const companies = [
    {
      src: "/JTI.png",
      language: "JOURNEYTECH INC",
    },
    {
      src: "/TRIPKO.png",
      language: "TRIPKO™",
    },
    {
      src: "/MARK.png",
      language: "MARK™",
    },
    {
      src: "/KITAKO.png",
      language: "KITAKO™",
    },
    {
      src: "/MARS.png",
      language: "MARS",
    },
    {
      src: "/TICKETKO.png",
      language: "TICKETKO™",
    },
    {
      src: "/SEATKO.png",
      language: "SEATKO",
    },
  ];
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center overflow-hidden hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <Slider
            duration={15}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={"#fff"}
          >
            {companies.map((data, index) => (
              <Slider.Slide key={index}>
                <div className="p-7 bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.1)] backdrop-blur-[6px] rounded-md" title={data.language}>
                  <img
                    className="w-[100px] mx-auto"
                    src={data.src}
                    alt={data.language}
                  />
                </div>
              </Slider.Slide>
            ))}
          </Slider>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
