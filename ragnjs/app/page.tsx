"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

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

    const data = await response.json();

    console.log(data.answer);
  };

  return (
    <section>
      <header>
        <h1 className="bg-red-500 text-center p-2">RAG</h1>
      </header>


      <div className="max-w-xl mx-auto">
        <p>Answers:</p>
        {data.answer}
      </div>


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