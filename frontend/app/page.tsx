"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { callApi, clearResult } from "@/store/apiSlice";

export default function Home() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const dispatch = useAppDispatch();
  const { result, loading, error } = useAppSelector((state) => state.api);
  const router = useRouter();

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

  const sum = result !== null && typeof result === "object" && result !== null
    ? (result as { result: number }).result
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Calculator</h1>
          <button
            onClick={() => router.push("/hello")}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-800 border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-lg transition-colors"
          >
            Hello World →
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Number 1</label>
            <input
              type="number"
              value={number1}
              onChange={(e) => setNumber1(e.target.value)}
              placeholder="Enter first number"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Number 2</label>
            <input
              type="number"
              value={number2}
              onChange={(e) => setNumber2(e.target.value)}
              placeholder="Enter second number"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || number1 === "" || number2 === ""}
            className="flex-1 bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Calculating..." : "Add Numbers"}
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

        {sum !== null && !error && (
          <div className="rounded-2xl bg-linear-to-r from-indigo-500 to-blue-500 p-6 text-center text-white shadow-md">
            <p className="text-sm font-medium opacity-80 mb-1">Result</p>
            <p className="text-4xl font-bold tracking-tight">
              Sum is {sum}
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
}
