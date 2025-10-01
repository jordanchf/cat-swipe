import React, { useState } from "react";
import TinderCard from "react-tinder-card";

const App = () => {
  // Generate 10 random cat URLs
  const cats = Array.from({ length: 10 }, (_, i) => ({
    url: `https://cataas.com/cat?random=${i}`,
  }));

  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);

  const swiped = (direction, cat) => {
    if (!cat) return;

    if (direction === "right") {
      setLiked((prev) => [...prev, cat]);
    }

    setIndex((prev) => prev + 1);
  };

  // When all cats are swiped → show summary
  if (index >= cats.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Summary</h2>
        <p>You liked {liked.length} cats ❤️</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {liked.map((cat, i) => (
            <img
              key={i}
              src={cat.url}
              alt="liked cat"
              style={{ width: "120px", margin: "5px", borderRadius: "8px" }}
            />
          ))}
        </div>

        <button
          style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
          onClick={() => {
            setIndex(0);
            setLiked([]);
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  const currentCat = cats[index];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      {/* Instruction text */}
      <p style={{ marginBottom: "20px", fontSize: "4vw", color: "#555" }}>
        Find Your Favourite Kitty (Jordan Cheng Heng Fong)
      </p>
      <p style={{ marginBottom: "20px", fontSize: "4vw", color: "#555" }}>
        👉 Swipe right = Like | 👈 Swipe left = Dislike
      </p>

      <TinderCard
        key={currentCat.url}
        onSwipe={(dir) => swiped(dir, currentCat)}
        preventSwipe={["up", "down"]} // Only allow left/right
      >
        <img
          src={currentCat.url}
          alt="cat"
          style={{
          width: "100%",          
          maxWidth: "300px",      
          maxHeight: "70vh",      
          objectFit: "cover",     
          borderRadius: "12px",
        }}
        />
      </TinderCard>
    </div>
  );
};

export default App;
