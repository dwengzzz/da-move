document.addEventListener("DOMContentLoaded",()=>{

const stems=document.querySelectorAll(".stem");
const leaves=document.querySelectorAll(".leaves span");
const flowers=document.querySelectorAll(".flower");
const particles=document.querySelector(".particles");


/* PARTICLES */

for(let i=0;i<28;i++){
    const p=document.createElement("span");

    p.style.left=Math.random()*100+"%";
    p.style.top=Math.random()*100+"%";
    p.style.animationDelay=Math.random()*6+"s";

    particles.appendChild(p);
}


/* MAKE REALISTIC-LOOKING CARNATION */

flowers.forEach((flower,index)=>{

    const svg=document.createElementNS(
        "http://www.w3.org/2000/svg","svg"
    );

    svg.setAttribute("viewBox","0 0 200 200");

    const defs=document.createElementNS(
        "http://www.w3.org/2000/svg","defs"
    );

    defs.innerHTML=`
    <filter id="soft">
        <feGaussianBlur stdDeviation=".25"/>
    </filter>`;

    svg.appendChild(defs);


    /* PETALS */

    for(let i=0;i<18;i++){

        const petal=document.createElementNS(
            "http://www.w3.org/2000/svg","ellipse"
        );

        const angle=i*20+Math.random()*10;
        const x=100+Math.cos(angle*Math.PI/180)*35;
        const y=100+Math.sin(angle*Math.PI/180)*35;

        petal.setAttribute("cx",x);
        petal.setAttribute("cy",y);
        petal.setAttribute("rx",25+Math.random()*7);
        petal.setAttribute("ry",55+Math.random()*10);

        petal.setAttribute(
            "transform",
            `rotate(${angle} ${x} ${y})`
        );

        petal.classList.add("petal");

        if(i%4===0)
            petal.classList.add("light");

        if(i%5===0)
            petal.classList.add("dark");

        svg.appendChild(petal);
    }


    /* CENTER */

    const center=document.createElementNS(
        "http://www.w3.org/2000/svg","circle"
    );

    center.setAttribute("cx","100");
    center.setAttribute("cy","100");
    center.setAttribute("r","25");
    center.classList.add("center");

    svg.appendChild(center);


    const dot=document.createElementNS(
        "http://www.w3.org/2000/svg","circle"
    );

    dot.setAttribute("cx","100");
    dot.setAttribute("cy","100");
    dot.setAttribute("r","10");
    dot.classList.add("center-dot");

    svg.appendChild(dot);

    flower.appendChild(svg);
});


/* STEMS */

stems.forEach((stem,i)=>{
    setTimeout(()=>{
        stem.classList.add("show");
    },3000+i*650);
});


/* LEAVES */

leaves.forEach((leaf,i)=>{
    setTimeout(()=>{
        leaf.classList.add("show");
    },7000+i*450);
});


/* FLOWERS */

flowers.forEach((flower,i)=>{
    setTimeout(()=>{
        flower.classList.add("show");
    },11000+i*1200);
});

});
