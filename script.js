document.addEventListener("DOMContentLoaded",()=>{

const stems=document.querySelectorAll(".stem");
const leaves=document.querySelectorAll(".leaves span");
const flowers=document.querySelectorAll(".flower");
const particles=document.querySelector(".particles");

/* PARTICLES */

for(let i=0;i<35;i++){

const p=document.createElement("span");

p.style.left=Math.random()*100+"%";
p.style.top=Math.random()*100+"%";
p.style.animationDelay=Math.random()*7+"s";

particles.appendChild(p);

}


/* BUILD EACH CARNATION */

flowers.forEach((flower)=>{

const svg=document.createElementNS(
"http://www.w3.org/2000/svg","svg"
);

svg.setAttribute("viewBox","0 0 200 200");

const defs=document.createElementNS(
"http://www.w3.org/2000/svg","defs"
);

defs.innerHTML=`
<filter id="blur">
<feGaussianBlur stdDeviation=".18"/>
</filter>`;

svg.appendChild(defs);


/* OUTER PETALS */

for(let i=0;i<22;i++){

const p=document.createElementNS(
"http://www.w3.org/2000/svg","ellipse"
);

let a=i*(360/22);
let r=38;

let x=100+Math.cos(a*Math.PI/180)*r;
let y=100+Math.sin(a*Math.PI/180)*r;

p.setAttribute("cx",x);
p.setAttribute("cy",y);
p.setAttribute("rx",28+Math.random()*6);
p.setAttribute("ry",48+Math.random()*9);

p.setAttribute(
"transform",
`rotate(${a+Math.random()*12-6} ${x} ${y})`
);

p.classList.add("petal");

if(i%7===0)p.classList.add("pale");
else if(i%4===0)p.classList.add("light");
else if(i%5===0)p.classList.add("dark");

svg.appendChild(p);
}


/* INNER RUFFLED PETALS */

for(let i=0;i<16;i++){

const p=document.createElementNS(
"http://www.w3.org/2000/svg","ellipse"
);

let a=i*(360/16);
let r=20;

let x=100+Math.cos(a*Math.PI/180)*r;
let y=100+Math.sin(a*Math.PI/180)*r;

p.setAttribute("cx",x);
p.setAttribute("cy",y);
p.setAttribute("rx",18);
p.setAttribute("ry",35+Math.random()*8);

p.setAttribute(
"transform",
`rotate(${a+Math.random()*15-7} ${x} ${y})`
);

p.classList.add("petal","light");

svg.appendChild(p);
}


/* CENTER */

const center=document.createElementNS(
"http://www.w3.org/2000/svg","circle"
);

center.setAttribute("cx","100");
center.setAttribute("cy","100");
center.setAttribute("r","22");
center.classList.add("center");

svg.appendChild(center);


const dot=document.createElementNS(
"http://www.w3.org/2000/svg","circle"
);

dot.setAttribute("cx","100");
dot.setAttribute("cy","100");
dot.setAttribute("r","8");
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
},7200+i*450);

});


/* FLOWERS */

flowers.forEach((flower,i)=>{

setTimeout(()=>{
flower.classList.add("show");
},11500+i*1300);

});

});
