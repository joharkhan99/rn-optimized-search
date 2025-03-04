import { useEffect, useState } from "react";

/**
 * This is our debounce hook to limit api calls. without this api calls will be sent on each user Text Input. Which will put load on server
 * and is not a good practive. so using this will limit api calls. API calls will happen only after certain milli seconds have passed.
 */
export const useDebounce = (value: string, ms: number) => {
  // state with the current value; this will hold the debounced value.
  const [debouncedValue, setDebouncedValue] = useState(value);

  // useEffect will run every time 'value' or 'ms' changes. ms means milliseconds
  useEffect(() => {
    // create a new timeout every time the value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    // Cleanup: if 'value' or 'ms' changes before the timeout is complete, then clear the previous timeout to prevent state updates.
    // eg:
    /* 
      - if user types 'a' -> timer starts from 0 and reaches 100 ms
      -  now user types another character 'ap' and the timer is at 100ms.
      - so in this case we dont wnat any api calls or states updates, so we clear the timeout and start a new one
      - so for 'ap' timer is reset to 0.
    */
    return () => {
      clearTimeout(handler);
    };
    // Re-run the effect whenever 'value' or 'ms' changes
  }, [value, ms]);

  // Return the debounced value, which can now be used for API calls or other logic.
  return debouncedValue;
};
