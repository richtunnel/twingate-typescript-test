import React from "react";

interface HeroSectionProps {
  imageURI: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageURI }) => {
  return (
    <div className="main-hero">
      <img src={imageURI} alt="HeroImage" />
    </div>
  );
};

export default HeroSection;
