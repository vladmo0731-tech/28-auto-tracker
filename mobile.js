
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
    nav.innerHTML=`
      <button id="mHome">⌂<br>Главная</button>
      <button id="mCars">▣<br>Машины</button>
      <button id="mExpenses">▤<br>Расходы</button>
      <button id="mAnalytics">◫<br>Аналитика</button>
      <button id="mSettings">⚙<br>Настройки</button>`;
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
})();
