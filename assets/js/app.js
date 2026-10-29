/* Interacción: menú, idioma, filtros y panel de accesibilidad. */
(function(){
 var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
 var S=[100,112,125,150];
 function sync(){var s=Prefs.s;
  $$('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===s.lang)});
  $$('[data-theme]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.theme===s.theme)});
  $('#sw-hc').setAttribute('aria-checked',s.hc==='on');
  $('#sw-mo').setAttribute('aria-checked',document.documentElement.dataset.motion==='off');
  $('#sw-ft').setAttribute('aria-checked',s.font==='legible');
  $('#size-v').textContent=s.size+'%';}
 function panel(open){var p=$('#panel'),b=$('#a11y');p.hidden=!open;b.setAttribute('aria-expanded',open);
  if(open)p.querySelector('button').focus();else b.focus();}
 document.documentElement.classList.add('js');
 Render.all();sync();
 document.addEventListener('prefs',function(e){if(e.detail==='lang'||e.detail==='all')Render.all();sync();});
 $$('[data-lang]').forEach(function(b){b.onclick=function(){Prefs.set('lang',b.dataset.lang)}});
 $$('[data-theme]').forEach(function(b){b.onclick=function(){Prefs.set('theme',b.dataset.theme)}});
 $('#sw-hc').onclick=function(){Prefs.set('hc',Prefs.s.hc==='on'?'off':'on')};
 $('#sw-mo').onclick=function(){Prefs.set('motion',document.documentElement.dataset.motion==='off'?'on':'off')};
 $('#sw-ft').onclick=function(){Prefs.set('font',Prefs.s.font==='legible'?'normal':'legible')};
 $('#size-dn').onclick=function(){var i=Math.max(0,S.indexOf(Prefs.s.size)-1);Prefs.set('size',S[i])};
 $('#size-up').onclick=function(){var i=Math.min(S.length-1,S.indexOf(Prefs.s.size)+1);Prefs.set('size',S[i])};
 $('#reset').onclick=function(){Prefs.reset()};
 $('#a11y').onclick=function(){panel($('#panel').hidden)};
 $('#close').onclick=function(){panel(false)};
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(!$('#panel').hidden)panel(false);else $('#nav').classList.remove('open')}});
 document.addEventListener('click',function(e){if(!$('#panel').hidden&&!e.target.closest('#panel,#a11y'))$('#panel').hidden=true,$('#a11y').setAttribute('aria-expanded',false);
  var f=e.target.closest('[data-f]');if(f){Render.filter=f.dataset.f;Render.filters();Render.projects();var n=$('[data-f="'+f.dataset.f+'"]');n&&n.focus();}
  if(e.target.closest('#nav a'))$('#nav').classList.remove('open');});
 $('#menu').onclick=function(){var n=$('#nav'),o=n.classList.toggle('open');this.setAttribute('aria-expanded',o)};
})();
