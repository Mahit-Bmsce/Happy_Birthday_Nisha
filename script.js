// =============================================================
// CONFIG — edit these to personalize the site
// =============================================================
const CONFIG = {
  name: "Nisha Punia",
  age: 21,
  message: "Helloooo Ms Nisha Punia ji ,\n\n Marwadi Sahiba, janamdin ri ghani-ghani badhai! \n Happy Birthday to someone truly special! \n\n ill start off with your \n USER MANUAL : \n 1.FEATURES : Special in all the sense , Visionary , professional troublemaker , always fun , unlimited energy. \n 2.WARNINGS : May randomly start bully , Handle with gym jokes. \n 3.BATTERY : Charged by protein , good startup ideas , sleep and gossip. \n 4.WARRANTY : Lifetime bakchodi. \n\n uk i have so many things to tell you.... par I wont disturb u for my flatu cheeze so ill skip that part and ill tell you a STORY : \n\n STORY TIME : \n\n The day I joined college, I saw someone in class and, for a second, I genuinely thought I'd just discovered the 8th wonder of the world. Fast forward to second year, and luckily, I actually got to know that wonder. Looking back, that was probably one of the best things that happened to me in college. I had no idea I'd meet someone who's so persistent, futuristic, full of energy, always ready for fun, and somehow manages to make even ordinary days more interesting. Never lose that spark. I genuinely hope you always stay this happy, this ambitious, and this unapologetically yourself. May you achieve everything you've been working for, buy everything on your wishlist... (aur mujhe bhi kuchi dilate rehna Marwadi Sahiba ). \n\n Thank you for all the laughs, the chaos, and the adventures. \n\n Aur mera ek help kardogi mujhe marwadi sihka dogi ?? i can talk to aramse bina atke so....\n\n Maaf kardena mujhe if i annoy u too much or if i have unknowingly hurt u \n\n Happy Birthday! \n\n Cheers... until the day you forget me. \n\n Hamesha haste haste kush raho Ms.Nishaaaaa / Your Honor / Maharani Sahiba \n\n With best wishes, \n Mahit"
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("heroName").textContent = CONFIG.name;
  document.getElementById("finalName").textContent = CONFIG.name;
  document.getElementById("ageCount").textContent = CONFIG.age;

  initStarsCanvas();
  initLoader();
  initFloatingHearts();
});

// =============================================================
// STARFIELD BACKGROUND (canvas)
// =============================================================
function initStarsCanvas() {
  const canvas = document.getElementById("stars-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }
  function createStars() {
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.2
    }));
  }
  resize();
  createStars();
  window.addEventListener("resize", () => { resize(); createStars(); });

  let t = 0;
  function animate() {
    t += 0.02;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 212, 124, ${0.25 + twinkle * 0.6})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// =============================================================
// LOADER SCREEN
// =============================================================
function initLoader() {
  const fill = document.getElementById("loaderFill");
  const percentEl = document.getElementById("loaderPercent");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(showEnvelopeScreen, 400);
    }
    fill.style.width = progress + "%";
    percentEl.textContent = Math.floor(progress) + "%";
  }, 220);
}

function showEnvelopeScreen() {
  document.getElementById("loader-screen").classList.remove("active");
  const envelopeScreen = document.getElementById("envelope-screen");
  setTimeout(() => {
    envelopeScreen.classList.add("active");
    initEnvelope();
  }, 300);
}

// =============================================================
// ENVELOPE INTERACTION
// =============================================================
function initEnvelope() {
  const envelope = document.getElementById("envelope");
  const btn = document.getElementById("openEnvelopeBtn");

  function openEnvelope() {
    envelope.classList.add("open");
    btn.disabled = true;
    btn.style.opacity = "0.5";
    setTimeout(revealMainContent, 1300);
  }

  btn.addEventListener("click", openEnvelope);
  envelope.addEventListener("click", openEnvelope);
}

// =============================================================
// REVEAL MAIN CONTENT
// =============================================================
function revealMainContent() {
  const envelopeScreen = document.getElementById("envelope-screen");
  envelopeScreen.classList.remove("active");

  setTimeout(() => {
    envelopeScreen.style.display = "none";
    const main = document.getElementById("main-content");
    main.classList.add("show");

    // Fire an initial confetti burst
    fireConfetti();

    // Init AOS after content is visible
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 60
    });

    initTypewriter();
    initCakeInteraction();
    initMusicToggle();
    initCelebrateButton();
  }, 850);
}

// =============================================================
// TYPEWRITER EFFECT FOR MESSAGE
// =============================================================
function initTypewriter() {
  const el = document.getElementById("typewriterText");
  const text = CONFIG.message;
  let i = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "\u00A0";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !el.dataset.typed) {
        el.dataset.typed = "true";
        type();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(el);

  function type() {
    if (i <= text.length) {
      el.innerHTML = text.slice(0, i).replace(/\n/g, "<br>");
      el.appendChild(cursor);
      i++;
      setTimeout(type, 28);
    } else {
      cursor.remove();
    }
  }
}

// =============================================================
// CAKE / BLOW OUT CANDLES INTERACTION
// =============================================================
function initCakeInteraction() {
  const candles = document.querySelectorAll(".candle");
  const result = document.getElementById("cakeResult");
  let blownCount = 0;

  candles.forEach(candle => {
    candle.style.cursor = "pointer";
    candle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!candle.classList.contains("blown")) {
        candle.classList.add("blown");
        blownCount++;
        if (blownCount === candles.length) {
          setTimeout(() => {
            result.classList.add("show");
            fireConfetti();
          }, 300);
        }
      }
    });
  });

  // Also allow clicking the whole cake to blow all at once
  document.getElementById("cakeWrap").addEventListener("click", () => {
    if (blownCount < candles.length) {
      candles.forEach(c => c.classList.add("blown"));
      blownCount = candles.length;
      setTimeout(() => {
        result.classList.add("show");
        fireConfetti();
      }, 300);
    }
  });
}

// =============================================================
// CONFETTI BURST
// =============================================================
function fireConfetti() {
  if (typeof confetti !== "function") return;
  const colors = ["#f3d47c", "#ff9fc0", "#a99bff", "#7fe0c9", "#fdf6ea"];
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors
  });
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1 }, colors });
  }, 250);
}

// =============================================================
// FLOATING HEARTS (ambient background)
// =============================================================
function initFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  if (!container) return;

  function spawnHeart() {
    const heart = document.createElement("i");
    heart.className = "fa-solid fa-heart floating-heart";
    const size = Math.random() * 14 + 10;
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = size + "px";
    heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    const duration = Math.random() * 6 + 8;
    heart.style.animationDuration = duration + "s";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(spawnHeart, 900);
}

// =============================================================
// MUSIC TOGGLE
// =============================================================
function initMusicToggle() {
  const btn = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  let playing = false;

  btn.addEventListener("click", () => {
    if (!playing) {
      audio.play().catch(() => {});
      btn.classList.add("playing");
      playing = true;
    } else {
      audio.pause();
      btn.classList.remove("playing");
      playing = false;
    }
  });
}

// =============================================================
// CELEBRATE AGAIN BUTTON (final section)
// =============================================================
function initCelebrateButton() {
  const btn = document.getElementById("celebrateBtn");
  btn.addEventListener("click", () => {
    fireConfetti();
    setTimeout(fireConfetti, 300);
  });
}
