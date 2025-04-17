import React from "react";

export default function SkletonCardSitus({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`group relative flex h-36 w-full animate-pulse flex-wrap overflow-hidden rounded-lg shadow-2xl transition-all duration-300 md:h-72 lg:h-80 lg:items-center`}
        >
          <div className="w-full bg-white object-cover transition-all duration-500 sm:h-full" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-primary/30"></div>
          <div className="absolute bottom-0 left-0 z-20 m-2 w-2/3 pl-1 md:m-5">
            <div className="mb-2 h-4 w-full rounded-full bg-white/30"></div>
            <div className="/70 h-3 w-1/2 rounded-full bg-white/30"> </div>
          </div>
        </div>
      ))}
    </>
  );
}
