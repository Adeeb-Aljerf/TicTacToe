//? creating the stars in the background
export function createStars() {
  const starryBackground = document.querySelector(".starry-background");
  // let starsHTML = '';
  //? more loops = more stars
  for (let i = 0; i < 160; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 4}px`;
    star.style.height = star.style.width;
    //? control the speed of the stars
    star.style.animationDuration = `${Math.random() * 20 + 25}s`;

    //? Without this line, the stars would be created but never actually added to the page, so you wouldn't see them. It's the final step that makes each star visible in your starry background.
    starryBackground.appendChild(star);

    //? if you to do the samething but without using the appendChild method you can do it like this :
    // starsHTML += `<div class="star" style="left:${left}; top:${top}; width:${width}; height:${width}; animation-duration:${animationDuration};"></div>`;
  }
  // starryBackground.innerHTML = starsHTML;
}
