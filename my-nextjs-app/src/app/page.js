"use client";
"use strict";
import React, { useState, Suspense } from "react";
import Loading from "./components/Loading";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    //makes POST reqeust to api
    //Sets content to JSON
    //Takes prompt variable and sends it as JSON in the reqesutbody
    //await waits for the fetch to complete before contiuing

    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      //logs response data
      //if there is data, updates state with setGeneratedText
      //if no content, logs an error

      const data = await response.json();
      console.log(data);

      if (data.content) {
        setGeneratedText(data.content);
      } else {
        console.log("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to generate", error);
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-200 to-amber-50">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="w-full font-extralight text-2xl text-center text-black">
            LinkedIn Post Generator
          </h1>
          <input
            className="bg-amber-50 py-2 px-2 rounded-s outline-2 outline-transparent focus:outline-none items-center w-full"
            placeholder="Enter post prompt here..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          {loading ? (
            <Loading />
          ) : (
            <p className="text-black">{generatedText || "Generated text will appear here"}</p>
          )}
          <button
            className="bg-amber-500 hover:bg-amber-300 text-black font-bold py-2 px-4 rounded w-full"
            onClick={handleGenerate}
            disabled={loading} //disables loading
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </main>
      </div>
    </div>
  );
}
