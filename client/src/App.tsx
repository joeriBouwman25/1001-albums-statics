import { useEffect, useState } from "react";
import { api } from "./api";

export const App = () => {
  const [health, setHealth] = useState<string>("");

  useEffect(() => {
    api.get("/health").then((res) => setHealth(JSON.stringify(res.data)));
  }, []);

  return (
    <>
      <h1>1001 Albums Statics</h1>
      <p>Health: {health}</p>
    </>
  );
};
