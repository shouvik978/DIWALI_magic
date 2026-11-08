const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create fireworks
function createFirework(x, y) {

    const colors = [
        "#ffcc33",
        "#ff3d72",
        "#44ddff",
        "#a879ff",
        "#ffffff",
        "#ff8c32"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 65; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            size: Math.random() * 3 + 1,
            color: color
        });
    }
}

// Animate fireworks
function animate() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p, index) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.035;
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.alpha -= 0.014;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}

animate();

// Touch or click anywhere for fireworks
document.addEventListener("pointerdown", (event) => {

    createFirework(event.clientX, event.clientY);

});

// Light individual diya
document.querySelectorAll(".diya").forEach((diya) => {

    function lightDiya() {

        diya.classList.add("lit");

        const rect = diya.getBoundingClientRect();

        createFirework(
            rect.left + rect.width / 2,
            rect.top
        );
    }

    diya.addEventListener("click", lightDiya);

    diya.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            lightDiya();
        }
    });

});

// Light all diyas
document.getElementById("lightAll").addEventListener("click", () => {

    document.querySelectorAll(".diya").forEach((diya, index) => {

        setTimeout(() => {

            diya.classList.add("lit");

            const rect = diya.getBoundingClientRect();

            createFirework(
                rect.left + rect.width / 2,
                rect.top
            );

        }, index * 350);

    });

});
// Automatic fireworks in the sky

setInterval(() => {

    const x = Math.random() * window.innerWidth;

    const y = Math.random() * (window.innerHeight * 0.45);

    createFirework(x, y);

}, 2200);