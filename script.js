const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

let W,H;
let flowers=[];
let start=performance.now();

function resize(){

    const box=canvas.getBoundingClientRect();

    const dpr=Math.min(window.devicePixelRatio||1,1.5);

    W=box.width;
    H=box.height;

    canvas.width=W*dpr;
    canvas.height=H*dpr;

    ctx.setTransform(dpr,0,0,dpr,0,0);

    createHeart();
}

function insideHeart(x,y){

    const X=x/250;
    const Y=y/230;

    return Math.pow(X*X+Y*Y-1,3)
        -X*X*Math.pow(Y,3)<=0;
}

function createHeart(){

    flowers=[];

    const scale=Math.min(W/620,H/600);

    const cx=W/2;
    const cy=H/2+20*scale;

    const spacing=21*scale;

    for(let y=-250;y<=250;y+=spacing){

        for(let x=-300;x<=300;x+=spacing){

            let px=x+(Math.random()-0.5)*7*scale;
            let py=y+(Math.random()-0.5)*7*scale;

            if(insideHeart(px,py)){

                flowers.push({
                    x:cx+px*scale,
                    y:cy-py*scale,

                    size:(11+Math.random()*4)*scale,

                    delay:
                        (px+300)/600*4.5+
                        Math.random()*0.6,

                    rotation:Math.random()*Math.PI*2,

                    sway:Math.random()*Math.PI*2
                });
            }
        }
    }

    /*
      Slightly fewer flowers on smaller screens
      so the animation stays smooth.
    */

    if(flowers.length>420)
        flowers=flowers.slice(0,420);
}

function drawFlower(f,t){

    const progress=Math.max(
        0,
        Math.min(1,(t-f.delay*1000)/900)
    );

    if(progress<=0)return;

    const ease=1-Math.pow(1-progress,3);

    const sway=
        Math.sin(t/1400+f.sway)*0.8;

    const size=f.size*ease;

    ctx.save();

    ctx.translate(f.x+sway,f.y);
    ctx.rotate(f.rotation);

    ctx.globalAlpha=ease;

    /*
      Soft flower shadow
    */

    ctx.shadowColor="rgba(0,0,0,.25)";
    ctx.shadowBlur=3;
    ctx.shadowOffsetY=1;

    /*
      Carnation petals
    */

    for(let i=0;i<8;i++){

        const a=i*Math.PI/4;

        ctx.save();

        ctx.rotate(a);

        ctx.beginPath();

        ctx.ellipse(
            0,
            -size*.42,
            size*.42,
            size*.62,
            0,
            0,
            Math.PI*2
        );

        const g=ctx.createRadialGradient(
            0,-size*.45,1,
            0,-size*.45,size
        );

        g.addColorStop(0,"#ffffff");
        g.addColorStop(.55,"#f5f5f5");
        g.addColorStop(1,"#d8d8d8");

        ctx.fillStyle=g;
        ctx.fill();

        /*
          soft ruffle line
        */

        ctx.strokeStyle="rgba(190,190,190,.35)";
        ctx.lineWidth=.6;

        ctx.stroke();

        ctx.restore();
    }

    /*
      Inner petals
    */

    for(let i=0;i<6;i++){

        const a=i*Math.PI/3;

        ctx.save();

        ctx.rotate(a);

        ctx.beginPath();

        ctx.ellipse(
            0,
            -size*.20,
            size*.28,
            size*.42,
            0,
            0,
            Math.PI*2
        );

        ctx.fillStyle="#eeeeee";
        ctx.fill();

        ctx.restore();
    }

    /*
      Carnation center
    */

    ctx.shadowBlur=0;

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        size*.16,
        0,
        Math.PI*2
    );

    ctx.fillStyle="#d6d6d6";
    ctx.fill();

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        size*.07,
        0,
        Math.PI*2
    );

    ctx.fillStyle="#bdbdbd";
    ctx.fill();

    ctx.restore();
}

function animate(t){

    ctx.clearRect(0,0,W,H);

    /*
      Draw from left to right.
    */

    for(const f of flowers)
        drawFlower(f,t-start);

    requestAnimationFrame(animate);
}

window.addEventListener("resize",resize);

resize();

requestAnimationFrame(animate);
