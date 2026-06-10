"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);

  const handleSubmit = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );

    const result = await response.json();
    setData(result);

    console.log(result.answer);
  };

  return (
    <section>
      <header>
        <h1 className="bg-red-500 text-center p-2">RAG</h1>
      </header>


      {data ? (
        <div className="mt-4 rounded-lg border p-4">
          <h2 className="font-bold">Answer</h2>

          <p>{data.answer}</p>

          <div className="mt-3 text-sm text-gray-500">
            <p>Source: {data.metadata.source_file}</p>
            <p>Score: {data.score.toFixed(3)}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Ask a question...</p>
      )}


      <div className="max-w-xl mx-auto flex flex-col gap-2 mt-5">
        <label htmlFor="input" className="text-sm font-medium">
          Enter your query
        </label>

        <input
          id="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
          className="w-full rounded-lg border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Ask
        </button>
      </div>
    </section>
  );
}