
(function(){
  function syncNav(){
    document.querySelectorAll('#mobileNav button').forEach(b=>b.classList.remove('active'));
    const map={dashboard:'mHome',cars:'mCars',expenses:'mExpenses'};
    const id=map[window.activeView||activeView];
    if(id) document.getElementById(id)?.classList.add('active');
  }

  function makeNav(){
    if(window.matchMedia('(min-width:901px)').matches) return;
    if(document.getElementById('mobileNav')) return;
    const nav=document.createElement('div');
    nav.id='mobileNav';
    nav.innerHTML=`<button id="mHome" type="button"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10l9-7 9 7M5 9v12h5v-7h4v7h5V9"/></svg><span>Главная</span></button><button id="mCars" type="button"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 17v3M19 17v3M3 11l3-7h12l3 7v6H3zM3 11h18M6 14h2M16 14h2"/></svg><span>Машины</span></button><button id="mExpenses" type="button"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4"/></svg><span>Расходы</span></button><button id="mAnalytics" type="button"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7"/></svg><span>Аналитика</span></button><button id="mSettings" type="button"><svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="18" r="2"/></svg><span>Настройки</span></button>`;
    document.body.appendChild(nav);
    document.getElementById('mHome').onclick=()=>{showDashboard();syncNav()};
    document.getElementById('mCars').onclick=()=>{showCarsView();syncNav()};
    document.getElementById('mExpenses').onclick=()=>{showAllExpenses();syncNav()};
    document.getElementById('mAnalytics').onclick=()=>openAnalytics();
    document.getElementById('mSettings').onclick=()=>openSettings();
    syncNav();
  }
  window.addEventListener('load',()=>{makeNav();setTimeout(syncNav,100)});
  window.addEventListener('resize',makeNav);
  window.syncMobileNav=syncNav;
  function syncViewport(){
    const v=window.visualViewport;
    document.documentElement.style.setProperty('--dialog-height',(v?v.height:window.innerHeight)+'px');
    document.documentElement.style.setProperty('--dialog-top',(v?v.offsetTop:0)+'px');
  }
  function watchDialogs(){
    const dialogs=[...document.querySelectorAll('.modal,.auth-overlay')];
    const visible=new WeakMap();
    function refresh(){
      const mobile=window.matchMedia('(max-width:900px)').matches;
      let open=false;
      dialogs.forEach(dialog=>{
        const shown=!dialog.classList.contains('hidden');
        if(shown&&!visible.get(dialog)){
          const card=dialog.querySelector('.modal-card,.auth-card');
          if(card)card.scrollTop=0;
        }
        visible.set(dialog,shown);open=open||shown;
      });
      document.body.classList.toggle('mobile-dialog-open',mobile&&open);
      syncViewport();
    }
    const observer=new MutationObserver(refresh);
    dialogs.forEach(dialog=>observer.observe(dialog,{attributes:true,attributeFilter:['class']}));
    window.addEventListener('resize',refresh);
    refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watchDialogs);
  else watchDialogs();
  window.visualViewport?.addEventListener('resize',syncViewport);
  window.visualViewport?.addEventListener('scroll',syncViewport);
})();
