const EM=parseFloat(getComputedStyle(document.body).fontSize);var elem,step,iconPath,iconName,translate=0;document.addEventListener("DOMContentLoaded",function(){lazyload(),fClick(".scrollButton",function(t){t.preventDefault(),qS(this.dataset.scrollto)&&qS(this.dataset.scrollto).scrollIntoView({behavior:"smooth"})});const t=new tingle.modal({cssClass:["ytTingle"],beforeClose:function(){return qS(".frameYT").remove(),!0}});fClick(".popup-youtube",function(){t.setContent(`<iframe class="frameYT" src="https://www.youtube.com/embed/${this.dataset.href}?autoplay=1"></iframe>`),t.open()});const e=new tingle.modal({cssClass:["ctaTingle"],onOpen:function(){n.formsListener(".tingle-modal .leadData")}});fClick(".FAQ span, .openCta, .actionButton",function(t){function n(t,e){qS(".ctaTingle form .ctaRequest").value=`${t} | ${e}`,qS(".ctaTingle form h3").innerHTML=t,qS(".ctaTingle form button").innerHTML=e}t.preventDefault(),e.setContent(qS(".inlineCtaBlock").innerHTML),this.dataset.title&&this.dataset.button?n(this.dataset.title,this.dataset.button):this.querySelector("h3")&&n(this.querySelector("h3").innerHTML,this.querySelector("button").innerHTML),e.open()});const n=sendData(e);function s(t,e){for(;(t=t.parentElement)&&!t.matches(e););return t}fClick(".thumbs img",function(){let t=this.getAttribute("data-src");t||(t=this.getAttribute("src")),s(this,"#msProduct").querySelector(".mainImg").setAttribute("src",t)}),fClick(".tabButtons span",function(){let t=s(this,".tabs");fqSA(".tab",function(t){t.style.display="none"},t),qS(this.dataset.tab,t).style.display="block",fqSA(".tabButtons span",function(t){t.classList.remove("tabSelected")},t),this.classList.add("tabSelected")}),fClick(".accTitle",function(){let t=s(this,".accordion");fqSA(".accTitle",function(t){t.classList.remove("active")},t),(elem=this.nextElementSibling).style.maxHeight?fqSA(".accTitle+div",function(t){t.style.maxHeight=null},t):(fqSA(".accTitle+div",function(t){t.style.maxHeight=null},t),elem.style.maxHeight=elem.scrollHeight+"px",this.classList.add("active"))}),fClick(".openButton",function(){let t=this.nextElementSibling;t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"}),fClick(".scrollBlockUp",function(){let t=this.parentNode,e=qS(".scrollable",t);step=120,translate<0&&(translate+=step),e.style.transform=`translateY(${translate}px)`}),fClick(".scrollBlockDown",function(){let t=this.parentNode,e=qS(".scrollable",t);step=120,-translate<e.scrollHeight-3*step&&(translate-=step),e.style.transform=`translateY(${translate}px)`});const i=qS(".mobileSubmenu"),o=qS(".menuWrapper"),l=qS(".mainMenu"),a=qS(".menuBox"),r=qS("header");(window.innerWidth>0?window.innerWidth:screen.width)<530&&(window.addEventListener("resize",function(){(window.innerWidth>0?window.innerWidth:screen.width)<530?document.body.insertBefore(a,r):document.body.insertBefore(a,qS("#wrapper"))}),document.body.insertBefore(a,r),fClick(".hasSubmenu",function(t){t.preventDefault(),qS(".menuButton").classList.toggle("arrowMenu","openedMenu"),document.body.scrollIntoView(),i.innerHTML=this.innerHTML,o.style.transform="translateX(-100vw)",o.style.maxHeight=i.children[1].scrollHeight+5*EM+"px"})),fClick(".menuButton",function(){let t=o,e=this.classList;e.contains("arrowMenu")?(e.remove("arrowMenu"),e.add("openedMenu"),t.style.transform="translateX(0)",t.style.maxHeight=l.scrollHeight+"px"):e.contains("openedMenu")?(e.remove("arrowMenu","openedMenu"),t.style.maxHeight="0",a.classList.toggle("menuBoxOpened")):(e.add("openedMenu"),a.classList.toggle("menuBoxOpened"),t.style.maxHeight=l.scrollHeight+"px")})});