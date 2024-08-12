// src/ImageTextSection.tsx
import React from "react";

type ImageTextSectionProps = {
  imageURI: string;
  text: string;
  title?: string;
  leftToRight?: boolean;
};

const ImageTextSection: React.FC<ImageTextSectionProps> = ({ imageURI, text, title, leftToRight = true }) => {
  return (
    <div className={`image-text-section ${leftToRight ? "ltr" : "rtl"}`}>
      <img src={imageURI} alt={title} className="image-text-img" />
      <div className="image-text-content">
        {title && <h2>{title}</h2>}
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ImageTextSection;
