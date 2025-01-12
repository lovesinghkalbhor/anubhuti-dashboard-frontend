const ErrorForMainPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="relative bg-blue-600 rounded-3xl p-16 max-w-lg w-full text-center">
        {/* Top dots decoration */}
        <div className="absolute top-4 left-4 grid grid-cols-4 gap-1">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot-top-${i}`}
              className="w-1 h-1 bg-white/30 rounded-full"
            />
          ))}
        </div>

        {/* Bottom dots decoration */}
        <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot-bottom-${i}`}
              className="w-1 h-1 bg-white/30 rounded-full"
            />
          ))}
        </div>

        {/* Main content */}
        <h1 className="text-white text-8xl font-bold mb-4">404</h1>
        <h2 className="text-white text-2xl font-semibold mb-4">
          Here Is Some Problem
        </h2>
        <p className="text-white/90 mb-8">
          There is some problem Try Logout or got to another page
        </p>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
};
const ErrorForEntirePage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="relative bg-blue-600 rounded-3xl p-16 max-w-lg w-full text-center">
        {/* Top dots decoration */}
        <div className="absolute top-4 left-4 grid grid-cols-4 gap-1">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot-top-${i}`}
              className="w-1 h-1 bg-white/30 rounded-full"
            />
          ))}
        </div>

        {/* Bottom dots decoration */}
        <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot-bottom-${i}`}
              className="w-1 h-1 bg-white/30 rounded-full"
            />
          ))}
        </div>

        {/* Main content */}
        <h1 className="text-white text-8xl font-bold mb-4">404</h1>
        <h2 className="text-white text-2xl font-semibold mb-4">
          Here Is Some Problem
        </h2>
        <p className="text-white/90 mb-8">
          Contact Developer support or try reloading the page
        </p>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Reload the Page
        </button>
      </div>
    </div>
  );
};

export { ErrorForMainPage, ErrorForEntirePage };
