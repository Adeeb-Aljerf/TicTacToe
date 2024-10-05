//? creating the bubbles in the background
export function createBubbles() {
  const bubbles = document.querySelector(".bubbles");
  //? more loops = more stars
  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() * 60 + 20}px`;
    bubble.style.height = bubble.style.width;
    //? control the speed of the stars
    bubble.style.animationDuration = `${Math.random() * 20 + 25}s`;
    // bubble.style.animationDelay = `${Math.random() * 0}s`;
    bubbles.appendChild(bubble);
  }
}
