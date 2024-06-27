// app/page.tsx
"use client";

import { createWebSocketConnection } from "@/lib/websocket";
import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [inputString, setInputString] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    // Generate a unique client ID
    const id = `client-${Date.now()}`;
    setClientId(id);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!clientId) {
      console.error("Client ID is not set.");
      return;
    }
    const ws = createWebSocketConnection(
      clientId,
      (data: { progress: React.SetStateAction<number> | undefined }) => {
        if (data.progress !== undefined) {
          setProgress(data.progress);
        }
      }
    );
    const keywordsArray = keywords.split(",").map((keyword) => keyword.trim());
    const response = await fetch("http://localhost:3000/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "client-id": clientId,
      },
      body: JSON.stringify({ inputString, keywords: keywordsArray }),
    });

    if (response.ok) {
      // Establish WebSocket connection after starting the scrape process

      // Clean up WebSocket on unmount
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "data.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      return () => {
        ws.close();
      };
    }
  };
  console.log("progress", progress);
  return (
    <div>
      <h1>WebSocket Scraping Progress</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Input String:
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Keywords (comma separated):
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Start Scraping</button>
      </form>
      <div>
        <h2>Progress</h2>
        <progress value={progress} max="100">
          {progress}%
        </progress>
      </div>
    </div>
  );
};

export default Home;
