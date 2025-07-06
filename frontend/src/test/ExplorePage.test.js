// Simple test to reproduce the API error
// This test demonstrates the issue: API endpoint doesn't exist

const testExploreAPI = async () => {
  console.log("Testing explore API...");
  
  try {
    const response = await fetch("/api/explore/repos/javascript");
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error (this is the bug!):", error.message);
    return error;
  }
};

// Run the test
testExploreAPI();
