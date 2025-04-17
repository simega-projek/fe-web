export const SkletonCardArticle = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-lg shadow-lg transition"
        >
          <div className="h-16 w-full bg-white/70 object-cover md:h-36" />

          <div className="h-full bg-white px-3 py-2 sm:px-4 sm:py-3">
            <div className="block h-3 rounded-full bg-light"></div>

            <h3 className="mt-3 h-3 w-3/4 rounded-full bg-light"></h3>

            <div className="mt-4 h-3 w-2/4 rounded-full bg-light"> </div>
          </div>
        </div>
      ))}
    </>
  );
};
