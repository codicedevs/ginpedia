import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import React from "react";
import { Button } from "react-native";
import { BASE_URL } from "../../utils/config";

WebBrowser.maybeCompleteAuthSession();

const GoogleSSOButton = () => {
  const handleGoogleSSO = async () => {
    const redirectUri = Linking.createURL("/auth/google/callback");
    const result = await WebBrowser.openAuthSessionAsync(
      `${BASE_URL}/auth/google/login`, // your Google login endpoint
      redirectUri
    );

    if (result.type === "success" && result.url) {
      // Handle the response here, extract token from result.url
      const token = extractTokenFromUrl(result.url);
      console.log("Token:", token);
    }
    console.log("no entro al if");
  };

  return <Button title="Login con Google" onPress={handleGoogleSSO} />;
};

function extractTokenFromUrl(url: any) {
  // Parse the token from the URL
  const token = new URL(url).searchParams.get("token");
  return token;
}

export default GoogleSSOButton;
