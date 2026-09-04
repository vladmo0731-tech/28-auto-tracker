
(function(){
  if(window.matchMedia('(min-width: 901px)').matches) return;

  function buildMobileUI(){
    const main=document.querySelector('main');
    if(!main) return;

    if(!document.getElementById('mobileHeader')){
      const wrap=document.createElement('div');
      wrap.id='mobileHeader';
      wrap.innerHTML='<label>Машина</label><select id="mobileCarSelect"></select>';
      main.insertBefore(wrap, main.firstChild);

      const select=wrap.querySelector('#mobileCarSelect');
      select.addEventListener('change',()=>{
        if(typeof state!=='undefined'){
          state.selectedId=select.value;
          if(typeof persist==='function') persist();
          if(typeof render==='function') render();
          setTimeout(syncMobileSelect,0);
        }
      });
    }

    if(!document.getElementById('mobileNav')){
      const nav=document.createElement('div');
      nav.id='mobileNav';
      nav.innerHTML=`
        <button id="mAdd">＋<br>Машина</button>
        <button id="mExpenses">▤<br>Расходы</button>
        <button id="mAnalytics">◫<br>Аналитика</button>
        <button id="mSettings">⚙<br>Настройки</button>`;
      document.body.appendChild(nav);

      nav.querySelector('#mAdd').onclick=()=>typeof openAddCar==='function'&&openAddCar();
      nav.querySelector('#mExpenses').onclick=()=>{
        const el=document.querySelector('.expenses-card');
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      };
      nav.querySelector('#mAnalytics').onclick=()=>typeof openAnalytics==='function'&&openAnalytics();
      nav.querySelector('#mSettings').onclick=()=>typeof openSettings==='function'&&openSettings();
    }

    syncMobileSelect();
  }

  function syncMobileSelect(){
    const select=document.getElementById('mobileCarSelect');
    if(!select || typeof state==='undefined') return;
    const currentValue=state.selectedId;
    select.innerHTML='';
    (state.cars||[]).forEach(car=>{
      const op=document.createElement('option');
      op.value=car.id;
      op.textContent=car.name||'Без названия';
      if(car.id===currentValue) op.selected=true;
      select.appendChild(op);
    });
  }

  window.addEventListener('load',()=>{
    buildMobileUI();
    setTimeout(syncMobileSelect,100);
  });

  // Keep selector synced after app renders.
  const timer=setInterval(syncMobileSelect,1000);
  window.addEventListener('beforeunload',()=>clearInterval(timer));
})();
