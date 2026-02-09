import { useRef, useEffect } from 'react';

/**
 * Hook that calls a callback function when a click occurs outside of the referenced element
 */
//const useOutsideClick = (callback) => {
export default function useOutsideClick(callback){    
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element is outside the referenced element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Bind the event listener to the document object
    document.addEventListener('mousedown', handleClick);

    // Unbind the event listener on component cleanup to prevent memory leaks
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]); // Re-run the effect if ref or callback changes

  return ref;
};
