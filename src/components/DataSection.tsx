import React, { useState, useEffect, useRef } from "react";

type DataSectionProps = {
  url: string;
};

const DataSection: React.FC<DataSectionProps> = ({ url }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error("Error capturing data....");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError("Failed to fetch data");
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;
    fetchData(signal);
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [url]);

  const handleRefresh = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const newController = new AbortController();
    controllerRef.current = newController;
    fetchData(newController.signal);
  };
  return (
    <div className="data-section">
      <button onClick={handleRefresh}>Refresh</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default DataSection;
