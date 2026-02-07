const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const answer = document.getElementById("answer-container");
const question = document.getElementById("question-container");
const canvas = document.getElementById("canvas");

function RandomPosition() {
  return Math.round(Math.random() * 90);
}
noBtn.addEventListener("mouseenter", () => {
  noBtn.style.cssText = `
     position:absolute;
     top:${RandomPosition()}%;
     right:${RandomPosition()}%;
    `;
});
yesBtn.addEventListener("click", (e) => {
  question.style.display = "none";
  answer.style.display = "flex";
  noBtn.style.position = "relative";
  setInterval(() => {
    launchFireworks()
  }, 700);
});

function createFireworks(x, y,color) {
  const firework = document.createElement("div");

  firework.className = "firework";

  firework.style.left = x + "px";
  firework.style.top = y + "px";
  for (let index = 0; index < 24; index++) {
    const particle = document.createElement("span");

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80;

    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    particle.style.background = color;

    firework.appendChild(particle);
  }
  canvas.appendChild(firework);

  setTimeout(() => {
    firework.remove();
  }, 3000);
}
function launchFireworks(){
    const rocket = document.createElement("div");
  const colors = ["#ff0043", "#14fc56", "#1e90ff", "#ffd700", "#ff7f50","#1fd","#f1e"];
  const color = colors[Math.floor(Math.random() * colors.length)];

    rocket.className = "rocket";
    rocket.style.background = color;
    const startX = Math.random() * window.innerWidth;
    const targetY = Math.random() * window.innerHeight * 0.5 + 100;

    rocket.style.left = startX + "px";
    rocket.style.bottom = "0px";

    canvas.appendChild(rocket);
    const duration = 2000;
    const startTime = performance.now();

    function animateRocket(time){
        const progress = (time - startTime) / duration;
        const y = progress * (window.innerHeight - targetY);
          rocket.style.transform = `translateY(-${y}px)`;

    if (progress < 1) {
      requestAnimationFrame(animateRocket);
    } else {
      rocket.remove();
      createFireworks(startX, targetY,color);
    }
  }

  requestAnimationFrame(animateRocket);
    
    }