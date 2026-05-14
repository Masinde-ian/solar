function toggleFaq(el){
  const item=el.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

const slider=document.getElementById('bill-slider');
if(slider){
  const billVal=document.getElementById('bill-val');
  const sysRec=document.getElementById('system-rec');
  const sysDesc=document.getElementById('system-desc');
  const sysCost=document.getElementById('sys-cost');
  const annualSave=document.getElementById('annual-save');
  const calcWa=document.getElementById('calc-wa');
  function updateCalc(){
    const bill=parseInt(slider.value);
    billVal.textContent='Ksh '+bill.toLocaleString();
    let rec,desc,cost,waMsg;
    if(bill<=3000){rec='PowerPlay';desc='Ideal for small apartments. Powers lights, TV, Wi-Fi, and phone charging.';cost=90000;waMsg='PowerPlay system';}
    else if(bill<=6000){rec='PowerHub 3.3kW';desc='Perfect for 1-2 bedroom homes. Covers lights, fridge, TV, Wi-Fi, and fans.';cost=208000;waMsg='PowerHub 3.3kW system';}
    else if(bill<=10000){rec='PowerHub 5kW';desc='Great for 3-bedroom homes. Handles fridge, microwave, washing machine, and all standard loads.';cost=345000;waMsg='PowerHub 5kW system';}
    else if(bill<=20000){rec='PowerHub 10kW';desc='Ideal for large homes or small businesses. Covers all appliances with room to grow.';cost=707000;waMsg='PowerHub 10kW system';}
    else if(bill<=30000){rec='PowerHub 15kW';desc='Designed for large compounds or growing businesses. Near-complete grid independence.';cost=900000;waMsg='PowerHub 15kW system';}
    else{rec='PowerHub 20kW';desc='Enterprise-grade system for high-consumption businesses, schools, or clinics.';cost=1200000;waMsg='PowerHub 20kW system';}
    sysRec.textContent='Recommended: '+rec;
    sysDesc.textContent=desc;
    sysCost.textContent='Ksh '+cost.toLocaleString();
    annualSave.textContent='Ksh '+(bill*12*0.85).toLocaleString();
    calcWa.href='https://wa.me/254727895108?text=Hi%2C%20I%20spend%20Ksh%20'+bill.toLocaleString()+'%20monthly%20on%20KPLC.%20I%27d%20like%20to%20discuss%20a%20'+encodeURIComponent(waMsg)+'!';
  }
  slider.addEventListener('input',updateCalc);
  updateCalc();
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  const h=a.getAttribute('href');
  if(h==='#')return;
  a.addEventListener('click',e=>{
    const target=document.querySelector(h);
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

const nav=document.querySelector('nav');
const hamburger=document.querySelector('.nav-hamburger');
hamburger.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a, .nav-active').forEach(el=>el.addEventListener('click',()=>nav.classList.remove('open')));

const processSection=document.getElementById('process');
if(processSection){
  const processObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        processSection.classList.add('visible');
        document.querySelectorAll('.step').forEach((step,i)=>{
          setTimeout(()=>step.classList.add('visible'),i*200);
        });
        processObserver.unobserve(processSection);
      }
    });
  },{threshold:0.3});
  processObserver.observe(processSection);
}

document.querySelectorAll('.current-year').forEach(el=>el.textContent=new Date().getFullYear());
