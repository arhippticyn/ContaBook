import { useMemo } from "react";

  export const useGenerateGradient = (dependecy) => {
    return useMemo(() => {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);

      const p1 = Math.floor(Math.random() * 20);
      const p2 = p1 + 30;
      const p3 = 100;

      return `linear-gradient(
      90deg,
      rgba(${r}, ${g}, ${b}, 1) ${p1}%,
      rgba(${r + 30}, ${g + 30}, ${b + 30}, 1) ${p2}%,
      rgba(${r + 60}, ${g + 60}, ${b + 60}, 1) ${p3}%
    )`;
    }, [dependecy]);
  }