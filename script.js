const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

let W,H;
let particles=[];

function resize(){

    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;

    createHeart();
}

function createHeart(){

    particles=[];

    /*
      BIG HEART
    */

    const scale=Math.min(W,H)*0.0205;

    const cx=W/2;
    const cy=H/2+25;

    /*
      MANY SMALL PARTICLES
    */

    for(let t=0;t<Math.PI*2;t+=0.006){

        const x=
            16*Math.pow(Math.sin(t),3);

        const y=
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);

        /*
          THICK HEART
          Several particles around
          the main curve.
        */

        for(let j=0;j<3;j++){

            const thickness=
                (Math.random()-.5)*28;

            particles.push({

                x:
                    cx+
                    x*scale+
                    thickness,

                y:
                    cy-
                    y*scale+
                    thickness,

                size:
                    .6+
                    Math.random()*1.5,

                /*
                  LEFT → RIGHT position
                */

                order:
                    (x+16)/32,

                random:
                    Math.random()*Math.PI*2,

                offset:
                    Math.random()*1000

            });
        }
    }
}


/*
  DRAW
*/

function animate(time){

    ctx.clearRect(0,0,W,H);

    const seconds=time/1000;

    /*
      BIG → SMALL → BIG

      Gentle continuous breathing.
    */

    const pulse=
        1+
        Math.sin(seconds*1.5)*0.055;


    /*
      LEFT → RIGHT → LEFT

      This value continuously travels
      across the heart.
    */

    const wave=
        (Math.sin(seconds*1.3)+1)/2;


    for(const p of particles){

        /*
          Distance from moving wave
        */

        let distance=
            Math.abs(p.order-wave);

        /*
          Wrap-around so the animation
          feels continuous.
        */

        distance=Math.min(
            distance,
            1-distance
        );

        /*
          Particles near the moving wave
          become brighter/larger.
        */

        const glow=
            Math.max(
                0,
                1-distance*7
            );

        /*
          Tiny natural movement
        */

        const movement=
            Math.sin(
                seconds*2+
                p.random+
                p.offset
            )*.7;

        const x=
            W/2+
            (p.x-W/2)*pulse+
            movement;

        const y=
            H/2+
            (p.y-H/2)*pulse+
            movement*.5;

        const size=
            p.size+
            glow*1.5;

        const alpha=
            .45+
            glow*.55;


        /*
          PARTICLE
        */

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI*2
        );

        ctx.fillStyle=
            `rgba(255,255,255,${alpha})`;

        /*
          WHITE GLOW
        */

        ctx.shadowColor=
            "rgba(255,255,255,.9)";

        ctx.shadowBlur=
            3+glow*8;

        ctx.fill();
    }

    requestAnimationFrame(animate);
}


window.addEventListener(
    "resize",
    resize
);

resize();

requestAnimationFrame(animate);
