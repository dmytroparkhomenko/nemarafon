import React, { useState } from "react";

interface TogglerProps {
  onToggle: (isOn: boolean) => void;
}

const Toggler: React.FC<TogglerProps> = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);
    onToggle(newIsOn);
  };

  const switchStyle = {
    position: "relative" as const,
    width: "48px",
    height: "24px",
    backgroundColor: isOn ? "#0a9393" : "#ccc",
    borderRadius: "24px",
    cursor: "pointer",
    transition: "background-color 0.4s",
  };

  const sliderStyle = {
    position: "absolute" as const,
    top: "2px",
    left: isOn ? "26px" : "2px",
    width: "20px",
    height: "20px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    transition: "transform 0.4s",
  };

  return (
    <div style={switchStyle} onClick={toggleSwitch}>
      <div style={sliderStyle}></div>
    </div>
  );
};

export default Toggler;
