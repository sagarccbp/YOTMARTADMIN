import React from "react";
import {Puff} from "react-loader-spinner";

const ImageLoader = () => {
  return (
    <div
      className="container-fluid"
      style={{
        left: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        backgroundColor: "#ffffff",
        position: "relative",
        zIndex: 9999,
      }}
    >
      <Puff
        height={50}
        width={50}
        color="#9a031e"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="Loading"
      />
    </div>
  );
};

export default ImageLoader;
