import React, { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchImg, FetchInfo } from "../FetchInf";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/ReduxStore";  
import { CircularProgress } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const Main: React.FC = () => {
 
  const initial = useSelector((state: RootState) => state.mainReducer.initial);

  const { data, isLoading, error } = useQuery ({
    queryFn: FetchInfo,
    queryKey: ["planets"],
  });

  const {
    data: dataImg,
    isLoading: imgLoading,
    error: imgError,
  } = useQuery ({
    queryFn: FetchImg,
    queryKey: ["planetsImg"],
  });

  useLayoutEffect(() => {
    if (!data) return;  

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "header h1, header p",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: "header",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.utils
        .toArray<HTMLDivElement>("#section > div")
        .forEach((section, index) => {
          gsap.fromTo(
            section,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      gsap.utils.toArray<HTMLImageElement>(".image").forEach((img, index) => {
        gsap.fromTo(
          img,
          { opacity: 0.5, scale: 0.9, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();  
  }, [data]);

  if (isLoading || imgLoading)
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CircularProgress />
    </div>
  );

if (error || imgError)
  return (
    <h1 className="text-center text-red-600 text-3xl min-h-screen flex items-center justify-center">
      Something's wrong
    </h1>
  );

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10 pointer-events-none">
        <img
          src={dataImg?.hdurl || ""}
          alt="Backdrop img"
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" flex flex-col justify-start left-1/3 max-sm:left-0 items-center min-h-screen text-center">
        <h1 className="text-3xl sm:text-5xl max-lg:text-3xl font-extrabold text-yellow-400 tracking-wide mb-4">
          NASA Planetary Data
        </h1>
        <p className="text-sm sm:text-lg text-gray-100">
          Exploring the cosmos, one planet at a time.
        </p>
      </div>

      <div
        className={`absolute top-[40vh] sm:top-[50vh] left-0 min-w-full p-6 sm:p-10 text-center
        ${initial ? "bg-black text-white" : "text-black bg-slate-400"} z-10`}
        id="section"
      >
        {data?.items?.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-700 px-4 md:px-10 max-w-screen-lg mx-auto"
          >
            {item.data.map((it, idx) => (
              <div key={it.nasa_id || idx}>
                {" "}
                <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-500 mb-2">
                  {it.title}
                </h2>
                <p
                  className={`text-sm sm:text-base mt-2 ${
                    initial ? " text-gray-300" : "text-black"
                  }`}
                >
                  {it.description}
                </p>
                <p className="text-sm sm:text-base text-gray-500 mt-4">
                  <strong>NASA ID:</strong> {it.nasa_id}
                </p>
              </div>
            ))}

            <div className="flex justify-center p-6">
              {item.links && item.links[0]?.href && (
                <Image
                  src={item.links[0].href}
                  alt={
                    item.data[0]?.title || `Image from ${item.data[0]?.nasa_id}`
                  }
                  className="rounded-lg shadow-lg hover:scale-105 opacity-70 transform transition-all duration-300 image"
                  width={600}
                  height={400}
                />
              )}
            </div>
          </div>
        ))}

        <footer
          className={`relative text-center text-gray-400 p-6 sm:p-10 ${
            initial ? "bg-black" : "bg-slate-400"
          } border-t border-gray-700`}
        >
          <a
            href="https://www.nasa.gov/"
            className="text-yellow-400 hover:text-yellow-300 transition-all duration-300"
          >
            <p>Data provided by NASA's image API.</p>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Main;
