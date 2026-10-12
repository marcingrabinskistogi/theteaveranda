(function(){
var EMAIL='clevedon@theteaveranda.com';
// Mobile menu
var btn=document.querySelector('.mobile-menu'),header=document.querySelector('.site-header');
if(btn&&header){btn.addEventListener('click',function(){var nav=document.getElementById('mobile-navigation');
 if(nav){nav.remove();btn.setAttribute('aria-expanded','false');return;}
 nav=document.createElement('nav');nav.id='mobile-navigation';nav.className='mobile-navigation';nav.setAttribute('aria-label','Mobile navigation');
 document.querySelectorAll('.desktop-nav a').forEach(function(a){var l=document.createElement('a');l.href=a.getAttribute('href');l.textContent=a.textContent;nav.appendChild(l);});
 header.appendChild(nav);btn.setAttribute('aria-expanded','true');});}
// Menu tabs
document.querySelectorAll('[role=tab]').forEach(function(t){t.addEventListener('click',function(){var tpl=document.querySelector('template[data-tab="'+t.id+'"]');if(!tpl)return;
 document.getElementById('menu-panel').innerHTML=tpl.innerHTML;
 document.querySelectorAll('[role=tab]').forEach(function(o){var on=o===t;o.setAttribute('aria-selected',on);o.className=on?o.className.replace('glass','veranda'):o.className.replace('veranda','glass');});});});
// Enquiry forms -> prepared email
document.querySelectorAll('form.booking-form').forEach(function(f){var b=f.querySelector('button[type=submit]');if(b)b.disabled=false;
 f.addEventListener('submit',function(e){e.preventDefault();var lines=[];
 f.querySelectorAll('label').forEach(function(l){var i=l.querySelector('input,textarea,select');if(i&&i.value)lines.push(l.childNodes[0].textContent.trim()+': '+i.value);});
 lines.push('','Please confirm availability, price and next steps.');
 location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent(f.dataset.subject||'Website Enquiry')+'&body='+encodeURIComponent(lines.join('\n'));
 if(!f.querySelector('.notice')){var n=document.createElement('p');n.className='notice';n.setAttribute('role','status');n.textContent='Please send the prepared email from your email app. If it didn\u2019t open, email '+EMAIL+' or call 07455 213 660. Nothing is confirmed until we reply.';b.after(n);}});});
// Carousel arrows
var car=document.querySelector('.category-carousel');
document.querySelectorAll('.carousel-buttons button').forEach(function(b,i){b.addEventListener('click',function(){car&&car.scrollBy({left:i?300:-300,behavior:'smooth'});});});
// Photo viewer
var items=[].slice.call(document.querySelectorAll('.gallery-item'));
items.forEach(function(it,idx){var b=it.querySelector('button');if(!b)return;b.addEventListener('click',function(){open(idx);});});
function open(i){var o=document.createElement('div');o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');
 o.style.cssText='position:fixed;inset:0;z-index:100;background:rgba(10,25,18,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:12px;color:#fff';
 function show(){var it=items[i],img=it.querySelector('img');o.innerHTML='<img src="'+img.src+'" alt="'+img.alt+'" style="max-height:78vh;max-width:100%;border-radius:12px"><p>'+it.querySelector('figcaption').textContent+'</p><div style="display:flex;gap:10px"><button data-a="-1">\u2190 Previous</button><button data-a="0">Close</button><button data-a="1">Next \u2192</button></div>';
  o.querySelectorAll('button').forEach(function(x){x.style.cssText='padding:8px 16px;border-radius:999px;border:1px solid #fff;background:transparent;color:#fff;cursor:pointer';});}
 o.addEventListener('click',function(e){var a=e.target.dataset&&e.target.dataset.a;if(e.target===o||a==='0'){close();}else if(a){i=(i+ +a+items.length)%items.length;show();}});
 function key(e){if(e.key==='Escape')close();if(e.key==='ArrowRight'){i=(i+1)%items.length;show();}if(e.key==='ArrowLeft'){i=(i-1+items.length)%items.length;show();}}
 function close(){o.remove();document.removeEventListener('keydown',key);}
 document.addEventListener('keydown',key);show();document.body.appendChild(o);}
// Footer year
})();
