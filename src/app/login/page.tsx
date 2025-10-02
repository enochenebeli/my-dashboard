"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      // Store JWT in localStorage (for demo; use cookies for production)
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

## Error Message
Error evaluating Node.js code

## Build Output
./Desktop/ElonaMedia Test/my-dashboard/src/app/globals.css
Error evaluating Node.js code
Error: Cannot find module 'unknown'
    [at <anonymous> (turbopack:///[project]/Desktop/ElonaMedia Test/my-dashboard/node_modules/lightningcss/node/index.js:22:19)]
    [at {module evaluation} (turbopack:///[project]/Desktop/ElonaMedia Test/my-dashboard/node_modules/lightningcss/node/index.js:22:19)]
    [at instantiateModule (turbopack:///[turbopack]/nodejs/runtime.ts:228:5)]
    [at getOrInstantiateModuleFromParent (turbopack:///[turbopack]/nodejs/runtime.ts:261:10)]
    [at Context.esmImport (turbopack:///[turbopack]/shared/runtime-utils.ts:324:18)]
    [at {module evaluation} (turbopack:///[project]/Desktop/ElonaMedia Test/my-dashboard/node_modules/lightningcss/node/index.mjs:1:1)]
    [at instantiateModule (turbopack:///[turbopack]/nodejs/runtime.ts:228:5)]
    [at getOrInstantiateModuleFromParent (turbopack:///[turbopack]/nodejs/runtime.ts:261:10)]
    [at Context.esmImport (turbopack:///[turbopack]/shared/runtime-utils.ts:324:18)]
    [at {module evaluation} (turbopack:///[project]/Desktop/ElonaMedia Test/my-dashboard/node_modules/@tailwindcss/node/dist/index.mjs:15:181)]

Import trace:
  Client Component Browser:
    ./Desktop/ElonaMedia Test/my-dashboard/src/app/globals.css [Client Component Browser]
    ./Desktop/ElonaMedia Test/my-dashboard/src/app/layout.tsx [Server Component]

Next.js version: 15.5.4 (Turbopack)
={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Log In</button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  );
}
