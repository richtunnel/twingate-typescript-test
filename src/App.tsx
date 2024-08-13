import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import ImageTextSection from "./components/ImageTextSection";
import DataSection from "./components/DataSection";
import { Section } from "./types/types";
import "./App.css";

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonInput(value);
    try {
      const jsonData: Section[] = JSON.parse(value);
      setSections(jsonData);
      setError(null);
    } catch (err) {
      setError("JSON is not valid.");
      setSections([]);
    }
  };

  return (
    <div className="app">
      <div className="add-json-div border-gray">
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Enter data here..."
          style={{
            width: "100%",
            height: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "none",
            boxSizing: "border-box",
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="preview">
        {sections.map((section, index) => {
          switch (section.type) {
            case "hero":
              return <HeroSection key={index} imageURI={section.imageURI} />;
            case "image-text":
              return (
                <ImageTextSection
                  className={"imageTemplate"}
                  key={index}
                  imageURI={section.imageURI}
                  text={section.text}
                  title={section.title}
                  leftToRight={section.leftToRight !== undefined ? section.leftToRight : true}
                />
              );
            case "data":
              return <DataSection key={index} url={section.url} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default App;
