const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

let width;
let height;
let particles = [];

function resize(){

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    createHeart();
}

function createHeart(){

    particles = [];

    /*
        HEART SIZE
    */

    const scale = Math.min(width,height) * 0.018;

    const centerX = width / 2;
    const centerY = height / 2 + 30;

    /*
        CREATE PARTICLES
        ALONG THE HEART CURVE
    */

    for(let t = 0; t < Math.PI * 2; t += 0.012){

        const x =
            16 * Math.pow(Math.sin(t),3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2*t)
            - 2 * Math.cos(3*t)
            - Math.cos(4*t);

        /*
            Several particles around
            each point = soft glowing edge
        */

        for(let j = 0; j < 2; j++){

            particles.push({

                x:
                    centerX +
                    x * scale +
                    (Math.random()-0.5)*10,

                y:
                    centerY -
                    y * scale +
                    (Math.random()-0.5)*10,

                size:
                    Math.random()*1.7 + .5,

                alpha:
                    Math.random()*.6 + .4,

                /*
                    LEFT → RIGHT
                */

                delay:
                    ((x + 16) / 32) * 3.5
                    + Math.random()*.8,

                life:0,

                drift:
                    Math.random()*Math.PI*2

            });
        }
    }
}


/*
    DRAW PARTICLES
*/

function draw(time){

    ctx.clearRect(0,0,width,height);

    time /= 1000;

    particles.forEach(p=>{

        /*
            Particle appears according
            to its position from LEFT → RIGHT
        */

        const progress =
            Math.max(
                0,
                Math.min(
                    1,
                    (time - p.delay) / 1.2
                )
            );

        if(progress <= 0) return;

        const ease =
            1 - Math.pow(1-progress,3);

        /*
            Very subtle movement
        */

        const drift =
            Math.sin(time*2 + p.drift) * .7;

        const x = p.x + drift;
        const y = p.y;

        /*
            WHITE GLOW
        */

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            p.size * ease,
            0,
            Math.PI*2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${p.alpha * ease})`;

        ctx.shadowColor =
            "rgba(255,255,255,.8)";

        ctx.shadowBlur = 5;

        ctx.fill();

    });

    requestAnimationFrame(draw);
}


/*
    START
*/

window.addEventListener("resize",resize);

resize();

requestAnimationFrame(draw);
