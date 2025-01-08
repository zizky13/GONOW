import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useLoginState from "@/hooks/loginState";
import app from "@/utils/firebase";

const Index = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useLoginState((state) => state.isLoggedIn);
  const setIsLoggedIn = useLoginState((state) => state.setIsLoggedIn);

  // Auth state listener
  useEffect(() => {
    console.log("Setting up auth listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", !!user);
      setIsLoggedIn(!!user); // Update Zustand store
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, setIsLoggedIn]);

  // Navigate based on login state
  useEffect(() => {
    console.log("Navigation effect running, isLoggedIn:", isLoggedIn);
    if (!loading) {
      try {
        router.replace("/home");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default Index;
