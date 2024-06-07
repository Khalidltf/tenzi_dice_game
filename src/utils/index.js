function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
}

// Function to save the best score to localStorage
function saveBestScore(currentScore) {
  const bestScore = localStorage.getItem("bestScore");
  if (!bestScore || currentScore < bestScore) {
    localStorage.setItem("bestScore", currentScore);
  }
}

export { formatTime, saveBestScore };
