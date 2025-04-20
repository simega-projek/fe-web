import React from "react";

export const SkletonDetailPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="mb-5 h-56 w-full animate-pulse rounded-lg bg-gray-100 md:h-96"></div>
      <div className="h-5 w-full animate-pulse rounded-lg bg-gray-100"></div>
      <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-100"></div>
      <div className="h-5 w-2/4 animate-pulse rounded-lg bg-gray-100"></div>
      <div className="h-5 w-1/4 animate-pulse rounded-lg bg-gray-100"></div>
    </div>
  );
};
