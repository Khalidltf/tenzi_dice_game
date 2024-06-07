function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
}

// Function to save the best score to localStorage
// If score is nothing, then just print the new score.
// If the score is better than the current printed score, then print that one instead.
// If the score isn't as good as the current score, then don't do anything at all.
function saveBestScore(currentScore) {
  const bestScore = localStorage.getItem("bestScore");
  if (!bestScore || currentScore < bestScore) {
    localStorage.setItem("bestScore", currentScore);
  }
}

export { formatTime, saveBestScore };
