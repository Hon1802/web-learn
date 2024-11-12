import { useState, useEffect } from "react";

// Define the generic type T for value to make the hook flexible
export function useLocalStorage<T>(
   initialValue: T,
   key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
   const [value, setValue] = useState<T>(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
   }, [value, key]);

   return [value, setValue];
}
