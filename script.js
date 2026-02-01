/* ================================
   😈 NO BUTTON RUN AWAY
================================ */
function moveRandomElement(elm) {
    elm.style.position = "absolute";
    elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
    elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

const noBtn = document.querySelector("#move-random");
if (noBtn) {
    noBtn.addEventListener("mouseenter", e => {
        moveRandomElement(e.target);
    });
}

/* ================================
   🎶 MUSIC OVERLAY & AUDIO
================================ */
const overlay = document.getElementById("music-overlay");
const bgMusic = document.getElementById("bg-music");

/* Start music on overlay tap (INDEX PAGE) */
if (overlay && bgMusic) {
    overlay.addEventListener("click", () => {

        /* 💖 HEART BLAST */
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.textContent = "❤";

            heart.style.setProperty("--x", `${Math.random() * 600 - 300}px`);
            heart.style.setProperty("--y", `${Math.random() * 600 - 300}px`);

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 900);
        }

        /* 🎶 START MUSIC */
        bgMusic.currentTime = 175; // start time (change if needed)
        bgMusic.volume = 0.6;
        bgMusic.play().catch(() => {});

        sessionStorage.setItem("musicPlaying", "true");

        /* ✨ REMOVE OVERLAY */
        overlay.style.display = "none";
    });
}

/* ================================
   🔁 RESUME MUSIC ACROSS PAGES
================================ */
if (bgMusic && sessionStorage.getItem("musicPlaying") === "true") {
    bgMusic.volume = 0.6;
    bgMusic.play().catch(() => {});
}

/* 🔓 Resume music on FIRST click on NO pages (browser rule) */
document.addEventListener("click", () => {
    if (
        bgMusic &&
        bgMusic.paused &&
        sessionStorage.getItem("musicPlaying") === "true"
    ) {
        bgMusic.volume = 0.6;
        bgMusic.play().catch(() => {});
    }
}, { once: true });

/* ================================
   YES BUTTON (IMMEDIATE NAVIGATION)
================================ */
document.querySelectorAll('a[href*="yes"]').forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();

        /* 💥 Confetti explosion */
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");

            const colors = ["#ff416c", "#ff4b2b", "#ff9a9e", "#fbc2eb"];
            confetti.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];

            confetti.style.setProperty("--x", `${Math.random() * 600 - 300}px`);
            confetti.style.setProperty("--y", `${Math.random() * 600 - 300}px`);

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 900);
        }

        /* Mark YES clicked */
        sessionStorage.setItem("fadeAfterYes", "true");

        /* 🚀 Navigate immediately */
        window.location.href = btn.href;
    });
});

/* ================================
   🎶 FADE MUSIC 10s AFTER YES PAGE LOAD
================================ */
if (
    window.location.pathname.includes("yes.html") &&
    sessionStorage.getItem("fadeAfterYes") === "true"
) {
    setTimeout(() => {
        if (!bgMusic) return;

        let vol = bgMusic.volume || 0.6;

        const fade = setInterval(() => {
            vol -= 0.05;
            if (vol <= 0) {
                clearInterval(fade);
                bgMusic.pause();
                bgMusic.volume = 0;

                sessionStorage.removeItem("musicPlaying");
                sessionStorage.removeItem("fadeAfterYes");
            } else {
                bgMusic.volume = vol;
            }
        }, 100);
    }, 10000); // ⏱️ 10 seconds after YES page loads
}
