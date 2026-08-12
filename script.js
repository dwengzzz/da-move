const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

let W, H;
let particles = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    createHeart();
}

function createHeart() {

    particles = [];

    const scale = Math.min(W, H) * 0.0205;

    const cx = W / 2;
    const cy = H / 2 + 20;

    /*
      CREATE THE HEART
    */

    for (let t = 0; t < Math.PI * 2; t += 0.008) {

        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        /*
          THICKNESS
        */

        for (let j = 0; j < 3; j++) {

            const thickness = 25;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * thickness;

            particles.push({

                x:
                    cx +
                    x * scale +
                    Math.cos(angle) * distance,

                y:
                    cy -
                    y * scale +
                    Math.sin(angle) * distance,

                size:
                    0.7 + Math.random() * 1.5,

                /*
                  Position around heart
                */

                order: (x + 16) / 32,

                random:
                    Math.random() * Math.PI * 2,

                speed:
                    0.5 + Math.random()

            });
        }
    }
}


/*
  ANIMATION
*/

function animate(time) {

    ctx.clearRect(0, 0, W, H);

    const seconds = time / 1000;

    /*
    ========================================
    HEART BREATHING

    0.82 = small
    1.18 = big

    This is intentionally exaggerated
    so you can clearly see it on mobile.
    ========================================
    */

    const breathing =
        1 +
        Math.sin(seconds * 1.4) * 0.18;


    /*
    ========================================
    TRAVELING WAVE

    LEFT → RIGHT → LEFT
    ========================================
    */

    const wave =
        (Math.sin(seconds * 1.8) + 1) / 2;


    for (const p of particles) {

        /*
        ------------------------------------
        HEART SIZE
        ------------------------------------
        */

        const x =
            W / 2 +
            (p.x - W / 2) * breathing;

        const y =
            H / 2 +
            (p.y - H / 2) * breathing;


        /*
        ------------------------------------
        FLOATING MOTION
        ------------------------------------
        */

        const floatX =
            Math.sin(
                seconds * p.speed +
                p.random
            ) * 1.2;

        const floatY =
            Math.cos(
                seconds * p.speed * 0.8 +
                p.random
            ) * 1.2;


        /*
        ------------------------------------
        MOVING LIGHT WAVE
        ------------------------------------
        */

        let distance =
            Math.abs(p.order - wave);

        /*
          Make the wave wrap around
        */

        distance =
            Math.min(
                distance,
                1 - distance
            );

        /*
          Strong glowing section
        */

        const glow =
            Math.max(
                0,
                1 - distance * 8
            );


        /*
        ------------------------------------
        PARTICLE SIZE
        ------------------------------------
        */

        const size =
            p.size +
            glow * 2.2;


        /*
        ------------------------------------
        BRIGHTNESS
        ------------------------------------
        */

        const alpha =
            0.45 +
            glow * 0.55;


        /*
        ------------------------------------
        DRAW
        ------------------------------------
        */

        ctx.beginPath();

        ctx.arc(
            x + floatX,
            y + floatY,
            size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        ctx.shadowColor =
            "rgba(255,255,255,0.95)";

        ctx.shadowBlur =
            3 + glow * 10;

        ctx.fill();
    }


    requestAnimationFrame(animate);
}


/*
  START
*/

window.addEventListener(
    "resize",
    resize
);

resize();

requestAnimationFrame(animate);
