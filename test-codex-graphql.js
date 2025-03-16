// Test script for Codex.io GraphQL API
const axios = require("axios");

// Using the user's API key
const API_KEY = "22c98e492fc97424434dcb07700b8704ec4276c1";

console.log("Testing Codex.io GraphQL API with your key...");

axios
  .post(
    "https://graph.codex.io/graphql",
    {
      query: `{
        getNetworks {
          name
          id
        }
      }`
    },{
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY,
        "Origin": "https://yums.fun"
      }
    }
  )
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(response.data, null, 2));
  })
  .catch((error) => {
    console.error("Error:", error.message);
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data, null, 2));
    }
  }); 