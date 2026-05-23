"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { callApi, clearResult } from "@/store/apiSlice";

export default function Home() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const dispatch = useAppDispatch();
  const { result, loading, error } = useAppSelector((state) => state.api);

  const handleSubmit = () => {
    dispatch(
      callApi({
        number1: Number(number1),
        number2: Number(number2),
      })
    );
  };

  const handleClear = () => {
    setNumber1("");
    setNumber2("");
    dispatch(clearResult());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-800">API Calculator</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Number 1
            </label>
            <input
              type="number"
              value={number1}
              onChange={(e) => setNumber1(e.target.value)}
              placeholder="Enter first number"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Number 2
            </label>
            <input
              type="number"
              value={number2}
              onChange={(e) => setNumber2(e.target.value)}
              placeholder="Enter second number"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || number1 === "" || number2 === ""}
            className="flex-1 bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Calling API..." : "Submit"}
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-medium text-red-700">Error</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        )}

        {result !== null && !error && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-medium text-green-700 mb-2">
              API Response
            </p>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
