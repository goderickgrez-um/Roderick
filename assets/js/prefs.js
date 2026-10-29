/* Preferencias del visitante: solo viven en su navegador (localStorage), nunca se envían. */
(function(){
 var K='rg-prefs',D={lang:'es',theme:'auto',size:100,hc:'off',motion:'auto',font:'normal'},h=document.documentElement;
 var P=window.Prefs={s:Object.assign({},D),
  load:function(){try{Object.assign(P.s,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}},
  save:function(){try{localStorage.setItem(K,JSON.stringify(P.s))}catch(e){}},
  apply:function(){var s=P.s;h.lang=s.lang;
   h.dataset.mode=s.theme==='auto'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):s.theme;
   h.dataset.hc=s.hc;h.dataset.font=s.font;h.style.fontSize=s.size+'%';
   h.dataset.motion=s.motion==='auto'?(matchMedia('(prefers-reduced-motion:reduce)').matches?'off':'on'):s.motion;},
  set:function(k,v){P.s[k]=v;P.save();P.apply();document.dispatchEvent(new CustomEvent('prefs',{detail:k}));},
  reset:function(){var l=P.s.lang;P.s=Object.assign({},D,{lang:l});P.save();P.apply();document.dispatchEvent(new CustomEvent('prefs',{detail:'all'}));}};
 P.load();P.apply();
 matchMedia('(prefers-color-scheme:dark)').addEventListener('change',P.apply);
})();
