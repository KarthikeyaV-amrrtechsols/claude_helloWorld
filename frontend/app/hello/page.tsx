"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchHello } from "@/store/helloSlice";

export default function HelloPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.hello);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchHello());
  }, [dispatch]);

  const message = data !== null && typeof data === "object"
    ? (data as { apploud: string }).apploud
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Hello World</h1>
          <button
            onClick={() => router.push("/")}
            className="text-sm text-teal-600 font-medium hover:text-teal-800 border border-teal-200 hover:border-teal-400 px-3 py-1.5 rounded-lg transition-colors"
          >
            ← Calculator
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Fetching message...</span>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-medium text-red-700">Error</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        )}

        {message !== null && !error && (
          <div className="rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 p-8 text-center text-white shadow-md">
            <p className="text-sm font-medium opacity-80 mb-3">Message from API</p>
            <p className="text-4xl font-bold tracking-tight">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
