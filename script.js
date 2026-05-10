function toggleFaq(el){
  const item=el.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

const slider=document.getElementById('bill-slider');
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
  if(bill<4000){rec='1.5kW Basic Backup System';desc='Covers lights, fan, TV, Wi-Fi & phone charging for a 1–2 bedroom home.';cost=85000;waMsg='1.5kW Basic system';}
  else if(bill<10000){rec='3kW Hybrid System';desc='Perfect for a 3-bedroom home. Covers lights, fridge, TV, Wi-Fi & fans.';cost=280000;waMsg='3kW Hybrid system';}
  else if(bill<20000){rec='5kW Family Comfort System';desc='Handles fridge, microwave, washing machine + all standard loads.';cost=380000;waMsg='5kW Family Comfort system';}
  else if(bill<35000){rec='10kW Off-Grid Master System';desc='Full independence from KPLC. Ideal for large homes or small businesses.';cost=700000;waMsg='10kW Off-Grid system';}
  else{rec='20kW+ Commercial System';desc='Enterprise-grade solar for high-consumption businesses, schools, or clinics.';cost=1500000;waMsg='20kW Commercial system';}
  sysRec.textContent='Recommended: '+rec;
  sysDesc.textContent=desc;
  sysCost.textContent='Ksh '+cost.toLocaleString();
  annualSave.textContent='Ksh '+(bill*12*0.85).toLocaleString();
  calcWa.href='https://wa.me/254700000000?text=Hi%2C%20I%20spend%20Ksh%20'+bill.toLocaleString()+'%20monthly%20on%20KPLC.%20I%27d%20like%20to%20discuss%20a%20'+encodeURIComponent(waMsg)+'!';
}
slider.addEventListener('input',updateCalc);
updateCalc();

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

const nav=document.querySelector('nav');
const hamburger=document.querySelector('.nav-hamburger');
hamburger.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const processSection=document.getElementById('process');
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
