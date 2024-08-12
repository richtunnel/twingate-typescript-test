import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import ImageTextSection from "./components/ImageTextSection";
import DataSection from "./components/DataSection";
import { Section } from "./types/types";

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
      setError("JSON is no valid,");
      setSections([]);
    }
  };

  return (
    <div className="app" style={{ display: "flex", padding: "20px" }}>
      <div className="editor" style={{ flex: 1, paddingRight: "20px" }}>
        <textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter data here..." style={{ width: "100%", height: "300px", padding: "10px", fontSize: "16px" }} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="preview" style={{ flex: 5, paddingLeft: "30px", borderLeft: "2px solid #e1e1e1" }}>
        {sections.map((section, index) => {
          switch (section.type) {
            case "hero":
              return <HeroSection key={index} imageURI={section.imageURI} />;
            case "image-text":
              return (
                <ImageTextSection key={index} imageURI={section.imageURI} text={section.text} title={section.title} leftToRight={section.leftToRight !== undefined ? section.leftToRight : true} />
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
