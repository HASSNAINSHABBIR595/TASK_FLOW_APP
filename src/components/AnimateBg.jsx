const AnimateBg = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    animation: `float ${5 + (i % 10)}s ease-in-out infinite`,
    animationDelay: `${(i % 5) * 0.8}s`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen blur-2xl opacity-20 animate-pulse">
        <div
          className="absolute -bottom-40 -left-40       
         w-72 h-72 bg-pink-500 rounded-full mix-blend-screen blur-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen blur-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none ">
        {particles.map((particle, i) => (
          <div
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 "
            style={particle}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimateBg;
