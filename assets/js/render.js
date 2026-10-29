/* Construye cada sección a partir de /data. Para cambiar contenido, edita los archivos de data/ y no este. */
(function(){
 var $=function(s,r){return (r||document).querySelector(s)};
 var L=function(o){return typeof o==='string'?o:o[Prefs.s.lang]};
 var T=function(){return I18N[Prefs.s.lang]};
 var ext=function(u,t,cls,ic){return '<a class="'+cls+'" href="'+u+'" target="_blank" rel="noopener noreferrer">'+t+'<span class="sr">'+T().newtab+'</span></a>'};
 var R=window.Render={filter:'all',
  i18n:function(){var t=T();document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t[e.dataset.t]});
   document.querySelectorAll('[data-al]').forEach(function(e){e.setAttribute('aria-label',t[e.dataset.al])});
   document.title=Prefs.s.lang==='es'?'Roderick Grez · Portafolio':'Roderick Grez · Portfolio';},
  hero:function(){var p=PROFILE;$('#hero-sub').textContent=T().h_sub;
   $('#stats').innerHTML=p.stats.map(function(s){return '<li><strong>'+s.n+'</strong><span>'+L(s.l)+'</span></li>'}).join('');
   $('#ig').innerHTML=ext(p.instagram.u,'Instagram '+p.instagram.h,'link');},
  about:function(){var p=PROFILE;$('#about-text').innerHTML=L(p.about).map(function(x){return '<p>'+x+'</p>'}).join('');
   $('#facts').innerHTML=p.facts.map(function(f){return '<div><dt>'+L(f.k)+'</dt><dd>'+L(f.v)+'</dd></div>'}).join('');},
  filters:function(){var t=T(),f=[['all',t.f_all],['tool',t.f_tool],['site',t.f_site]];
   $('#filters').innerHTML=f.map(function(x){return '<button type="button" class="chip" data-f="'+x[0]+'" aria-pressed="'+(R.filter===x[0])+'">'+x[1]+'</button>'}).join('');},
  projects:function(){var t=T();
   $('#grid').innerHTML=PROJECTS.filter(function(p){return R.filter==='all'||p.kind===R.filter}).map(function(p){
    var bg=p.shot?'<img class="shot" src="'+p.shot+'" alt="" loading="lazy" decoding="async">':'';
    var st=p.status==='wip'?'<span class="badge">'+t.wip+'</span>':'';
    var links=p.links.map(function(k,i){return k.u?ext(k.u,L(k.l),i?'btn ghost':'btn'):'<span class="btn off" aria-disabled="true">'+t.soon+'</span>'}).join('');
    return '<li><article class="card" style="--a:'+p.pal[0]+';--b:'+p.pal[1]+'"><div class="art">'+bg+'<div class="tint"></div>'+ART[p.id]+st+'</div><div class="body"><h3>'+L(p.name)+'</h3><p>'+L(p.desc)+'</p><ul class="tags">'+L(p.tags).map(function(g){return '<li>'+g+'</li>'}).join('')+'</ul><div class="acts">'+links+'</div></div></article></li>'}).join('');},
  skills:function(){var lv=T().lv;
   $('#skill-list').innerHTML=PROFILE.skills.map(function(g){return '<section class="sk"><h3>'+L(g.g)+'</h3><ul>'+g.i.map(function(i){return '<li>'+i[0]+(i[1]?'<small>'+lv[i[1]]+'</small>':'')+'</li>'}).join('')+'</ul></section>'}).join('');},
  timeline:function(id,arr){$(id).innerHTML=arr.map(function(e){return '<li><time>'+e.d+'</time><div><h3>'+L(e.t)+'</h3>'+(e.o?'<p class="org">'+L(e.o)+'</p>':'')+'<p>'+L(e.x)+'</p></div></li>'}).join('');},
  all:function(){R.i18n();R.hero();R.about();R.filters();R.projects();R.skills();R.timeline('#exp-list',PROFILE.exp);R.timeline('#edu',PROFILE.edu);
   $('#cv-btn').href=PROFILE.cv;$('#cv-btn').setAttribute('download','');}
 };
})();
