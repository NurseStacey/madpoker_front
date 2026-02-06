import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    // Check if the click target is outside the referenced element
    if (ref.current && !ref.current.contains(e.target)) {
      callback(); // Call the provided callback function
    }
  };

  useEffect(() => {
    // Add event listener to the document for click events
    document.addEventListener('click', handleClick);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }); // Note: dependencies can be added to the useEffect array if the callback or ref can change

  // This custom hook typically doesn't return anything unless a library implementation is used, 
  // in which case it might return the ref itself. The ref is typically defined in the component using the hook.
};

export default useClickOutside;