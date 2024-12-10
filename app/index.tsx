import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const auth: boolean = true; // Example: false means user is not logged in

  useEffect(() => {
    // Delay navigation slightly to ensure Root Layout has mounted
    const timer = setTimeout(() => {
      if (auth) {
        router.replace('/home'); // Navigate to Home if authenticated
      } else {
        router.replace('/login'); // Navigate to Login if not authenticated
      }
    }, 0); // Delay is very short but ensures layout mounting

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, [auth, router]);

  return null; // No UI, just redirection logic
};

export default Index;
