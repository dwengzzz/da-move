const heart = document.getElementById("heart");

const flowers = [];

/* HEART EQUATION */

for(let t = 0; t < Math.PI * 2; t += 0.075){

    const x = 16 * Math.pow(Math.sin(t),3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2*t)
        - 2 * Math.cos(3*t)
        - Math.cos(4*t);

    flowers.push({
        x:x * 16 + 300,
        y:-y * 16 + 270
    });
}


/* FILL THE HEART */

for(let x = 80; x < 520; x += 30){

    for(let y = 70; y < 480; y += 30){

        const nx = (x - 300) / 16;
        const ny = -(y - 270) / 16;

        const value =
            Math.pow(nx / 16,2) +
            Math.pow((ny - 3) / 13,2);

        /* heart equation */

        const inside =
            Math.pow(nx,2) +
            Math.pow(ny,2) <
            256 &&
            ny < 13;

        if(inside){

            const flower = document.createElement("div");

            flower.className="flower";

            /* tiny natural randomness */

            const px =
                x + (Math.random()*12-6);

            const py =
                y + (Math.random()*12-6);

            flower.style.left=px+"px";
            flower.style.top=py+"px";

            /*
            LEFT → RIGHT ANIMATION
            */

            const delay =
                (x / 520) * 5 +
                Math.random() * .7;

            flower.style.animationDelay=delay+"s";

            /* petals */

            for(let i=0;i<8;i++){

                const petal =
                    document.createElement("span");

                petal.className="petal";

                flower.appendChild(petal);
            }

            heart.appendChild(flower);
        }
    }
}
