document.addEventListener("DOMContentLoaded",()=>{

const stems=document.querySelectorAll(".stem");
const leaves=document.querySelectorAll(".leaves span");
const flowers=document.querySelectorAll(".flower");
const particles=document.querySelector(".particles");

for(let i=0;i<25;i++){
let p=document.createElement("span");
p.style.left=Math.random()*100+"%";
p.style.top=Math.random()*100+"%";
p.style.animationDelay=Math.random()*6+"s";
particles.appendChild(p);
}

stems.forEach((s,i)=>{
setTimeout(()=>s.classList.add("show"),3000+i*600);
});

leaves.forEach((l,i)=>{
setTimeout(()=>l.classList.add("show"),7000+i*400);
});

flowers.forEach((f,i)=>{
setTimeout(()=>f.classList.add("show"),11000+i*1100);
});

});
