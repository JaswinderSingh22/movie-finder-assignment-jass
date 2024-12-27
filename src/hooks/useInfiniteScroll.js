import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (callback, isLoading) => {
    const handleScroll = useCallback(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
        && !isLoading
      ) {
        callback();
      }
    }, [callback, isLoading]);
  
    useEffect(() => {
      console.log("scrollllll-------");
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
  };