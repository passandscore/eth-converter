import React from "react";
import { featureName, featureSubtitle } from "config";

const Preloader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "white", fontWeight: "bold" }}>
        {featureName}
      </h1>
      <h2 style={{ fontSize: "1.2rem", color: "#4299E1", fontWeight: "bold" }}>
        {featureSubtitle}
      </h2>
    </div>
  );
};

export default Preloader;
