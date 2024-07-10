// Wait for the element to load
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// Canvas background drawing
export async function asyncCall() {
  await waitForElm("#canvas");
  const canvas = document.querySelector("canvas");
  const img = await document.getElementById("above-img");

  canvas.height = img.height * 1.2;
  canvas.width = window.innerWidth;

  const ctx = canvas.getContext("2d");

  initialize();

  function initialize() {
    // Register an event listener to call the resizeCanvas() function
    // each time the window is resized.
    window.addEventListener("resize", resizeCanvas, false);

    // Draw canvas border for the first time.
    //     resizeCanvas();
  }
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = img.height * 1.2;
    redraw();
  }

  function redraw() {
    ctx.strokeStyle = "#F1B866";
    ctx.lineWidth = "4";
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
  }

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#F1B866";
  ctx.strokeStyle = "rgba(219, 237, 243, 1)";

  const particles = [];

  function getDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function init() {
    for (let i = 0; i < 100; i += 1) {
      const x = Math.floor(Math.random() * canvas.width);
      const y = Math.floor(Math.random() * canvas.height);
      const speedX = Math.random();
      const speedY = Math.random();
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.5 ? 1 : -1;

      particles.push({
        x,
        y,
        speedX: dirX * speedX,
        speedY: dirY * speedY,
        neighbors: [],
      });
    }
    requestAnimationFrame(draw);
  }

  let mouseX;
  let mouseY;

  function draw() {
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#F1B866";

    for (let i = 0; i < particles.length; i += 1) {
      let x = particles[i].x + particles[i].speedX;
      let y = particles[i].y + particles[i].speedY;
      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
        x = Math.floor(Math.random() * canvas.width);
        y = Math.floor(Math.random() * canvas.height);
      }

      const x1 = mouseX || 2000;
      const y1 = mouseY || 2000;
      const dist = getDist(x, y, x1, y1);
      if (dist < 200) {
        if (x < x1) {
          x -= 2;
        } else {
          x += 2;
        }
        if (y < y1) {
          y -= 2;
        } else {
          y += 2;
        }
      }

      ctx.moveTo(x, y);
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      particles[i].x = x;
      particles[i].y = y;
    }
    ctx.fill();

    for (let i = 0; i < particles.length; i += 1) {
      const x = particles[i].x;
      const y = particles[i].y;
      const neighbors = particles[i].neighbors;
      for (let j = 0; j < neighbors.length; j += 1) {
        const x1 = neighbors[j].x;
        const y1 = neighbors[j].y;
        const dist = getDist(x, y, x1, y1);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  init();

  canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setTimeout(() => {
      if (mouseX === e.clientX && mouseY === e.clientY) {
        for (let i = 0; i < particles.length; i += 1) {
          let x = particles[i].x;
          let y = particles[i].y;
          const x1 = e.clientX;
          const y1 = e.clientY;
          const dist = getDist(x, y, x1, y1);

          if (dist < 200) {
            if (x < x1) {
              x -= 2;
            } else {
              x += 2;
            }
            if (y < y1) {
              y -= 2;
            } else {
              y += 2;
            }
          }
          particles[i].x = x;
          particles[i].y = y;
        }
      }
    }, 10);
  });

  setInterval(() => {
    const copy = [...particles];
    for (let i = 0; i < particles.length; i += 1) {
      const x = particles[i].x;
      const y = particles[i].y;

      copy.sort((a, b) => {
        const x1 = a.x;
        const x2 = b.x;
        const y1 = a.y;
        const y2 = b.y;
        const dist1 = getDist(x, y, x1, y1);
        const dist2 = getDist(x, y, x2, y2);
        return dist1 - dist2;
      });

      particles[i].neighbors = copy.slice(0, 10);
    }
  }, 250);
}
