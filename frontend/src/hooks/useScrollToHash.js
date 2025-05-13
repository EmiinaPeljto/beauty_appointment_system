import { useEffect } from "react";

const useScrollToHash = (hash, refs, ids) => {
  useEffect(() => {
    console.log("Hash:", hash); // Debugging
    console.log("Category IDs:", ids); // Debugging
    const index = ids.indexOf(hash);
    if (index !== -1 && refs.current[index]) {
      setTimeout(() => {
        refs.current[index].scrollIntoView({ behavior: "smooth" });
      }, 200); // Delay scrolling by 200ms
    }
  }, [hash, refs, ids]);
};

export default useScrollToHash;