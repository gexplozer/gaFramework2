/*! Lazy Load 2.0.0-beta.2 - MIT license - Copyright 2007-2017 Mika Tuupola */
!function(t,e){"object"==typeof exports?module.exports=e(t):"function"==typeof define&&define.amd?define([],e(t)):t.LazyLoad=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";function e(t,e){this.settings=r(s,e||{}),this.images=t||document.querySelectorAll(this.settings.selector),this.observer=null,this.init()}const s={src:"data-src",srcset:"data-srcset",selector:".lazyload"},r=function(){let t={},e=!1,s=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(e=arguments[0],s++);for(;s<o;s++)!function(s){for(let o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e&&"[object Object]"===Object.prototype.toString.call(s[o])?t[o]=r(!0,t[o],s[o]):t[o]=s[o])}(arguments[s]);return t};if(e.prototype={init:function(){if(!t.IntersectionObserver)return void this.loadImages();let e=this,s={root:null,rootMargin:"0px",threshold:[0]};this.observer=new IntersectionObserver(function(t){t.forEach(function(t){if(t.intersectionRatio>0){e.observer.unobserve(t.target);let s=t.target.getAttribute(e.settings.src),r=t.target.getAttribute(e.settings.srcset);"img"===t.target.tagName.toLowerCase()?(s&&(t.target.src=s),r&&(t.target.srcset=r)):t.target.style.backgroundImage="url("+s+")"}})},s),this.images.forEach(function(t){e.observer.observe(t)})},loadAndDestroy:function(){this.settings&&(this.loadImages(),this.destroy())},loadImages:function(){if(!this.settings)return;let t=this;this.images.forEach(function(e){let s=e.getAttribute(t.settings.src),r=e.getAttribute(t.settings.srcset);"img"===e.tagName.toLowerCase()?(s&&(e.src=s),r&&(e.srcset=r)):e.style.backgroundImage="url("+s+")"})},destroy:function(){this.settings&&(this.observer.disconnect(),this.settings=null)}},t.lazyload=function(t,s){return new e(t,s)},t.jQuery){const s=t.jQuery;s.fn.lazyload=function(t){return t=t||{},t.attribute=t.attribute||"data-src",new e(s.makeArray(this),t),this}}return e});

document.addEventListener("DOMContentLoaded", lightSlider(2000));

function lightSlider(interVar) {
	// shortcut для document.querySelector (типа замена джиквери и всё такое)))
	var qS = function(el) {return document.querySelector(el);};
	var qSA = function(el) {return document.querySelectorAll(el);};

	// задаём дефолтные значения для счётчиков, отступов и т.п.
	var show = 1;
	var translate = 0;

	// находим в ДОМ нужные элементы
	var controls = qS(".controls"); //кнопки контроля
	var sliderDiv = qS(".mySlider"); //родительский блок слайдера
	var slideInner = qS(".slideInner"); 
	var myNodeList = qSA(".slide");	

	
	// пишем параметры в переменные
	var slWidth = myNodeList[0].clientWidth;
	var listLength = myNodeList.length;

	// автостарт функции слайдера с интервалом
	interval = setInterval(mySlider, interVar);

	//Аппендим элемменты навигации прямо из скрипта без вёрстки
	for (var i = 0; i < listLength; ++i) {
		var newLi = document.createElement('span');
  		newLi.innerHTML = '<i class="fas fa-circle"></i>';
  		newLi.addEventListener("click", function(){
  			data = this.dataset;
		    show = data.number;
		    restartSlider();
		});
		newLi.setAttribute("DATA-NUMBER", i);
  		controls.appendChild(newLi);
	};
	//находим все кнопочки контроля
	conChilds = controls.children;

	// функция слайдера
	function mySlider() {		
		if ( document.hasFocus() && sliderDiv.classList.contains("fadeEffect")) {
			if (show>=listLength) {show = 0}; // если текущий слайд последний, обнуляем счётчик
			if (show<0) {show = listLength}; // если счётчик слайдов отрицательный, чиним эту фигню

			if (show<listLength) { //реагируем, только если счётчик слайдов имеет адекватное число
				for (var i = 0; i < listLength; ++i) {
				  var element = myNodeList[i]; //
				  var child = conChilds[i];
				  element.style.position = "absolute";
				  element.style.opacity = "0";
				  child.style.color = "#999";
				};
				myNodeList[show].style.position = "relative";
				myNodeList[show].style.opacity = "1";
				conChilds[show].style.color = "#333";
				show++;
			};
        };

        if ( document.hasFocus() && sliderDiv.classList.contains("slideEffect")) {
			if (show>=listLength) {show = 0};

			translate = -1 * slWidth * show + "px";
			slideInner.style.transform = "translateX("+translate+")";
			firstClone = myNodeList[0].cloneNode(true);
			for (var i = 0; i < listLength; ++i) {
				  var child = conChilds[i];
				  child.style.color = "#999";
				};
			conChilds[show].style.color = "#333";
			show++;
        };
	};

	function restartSlider() {
		mySlider();
		clearInterval(interval);
		interval = setInterval(mySlider, interVar);
	}
	

		//прокрутка кнопками вправо и влево
	qS(".left").addEventListener("click", function(){
		show-=2;
		if (show<0) {show = listLength-1};
		restartSlider();
	});
	qS(".right").addEventListener("click", function(){
		if (show>=listLength) {show = 0};
		restartSlider();
	});

	/*
	//прикручиваем свайпы влево и вправо
	var hammertime = new Hammer(sliderDiv);
	hammertime.on('swiperight', function(ev) {
		show-=2;
		if (show<0) {show = 0};
		restartSlider();
	});

	hammertime.on('swipeleft', function(ev) {
		if (show==listLength) {return false};
		restartSlider();
	});*/
};


!function(t,o){"function"==typeof define&&define.amd?define(o):"object"==typeof exports?module.exports=o():t.tingle=o()}(this,function(){function t(t){var o={onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]};this.opts=r({},o,t),this.init()}function o(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}function e(){this.modal=document.createElement("div"),this.modal.classList.add("tingle-modal"),0!==this.opts.closeMethods.length&&this.opts.closeMethods.indexOf("overlay")!==-1||this.modal.classList.add("tingle-modal--noOverlayClose"),this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),this.opts.closeMethods.indexOf("button")!==-1&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.classList.add("tingle-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML="×",this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)),this.modalBox=document.createElement("div"),this.modalBox.classList.add("tingle-modal-box"),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),this.opts.closeMethods.indexOf("button")!==-1&&this.modal.appendChild(this.modalCloseBtn),this.modal.appendChild(this.modalBox)}function s(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}function i(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:l.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:n.bind(this)},this.opts.closeMethods.indexOf("button")!==-1&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn),this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav)}function n(t){this.opts.closeMethods.indexOf("escape")!==-1&&27===t.which&&this.isOpen()&&this.close()}function l(t){this.opts.closeMethods.indexOf("overlay")!==-1&&!d(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close()}function d(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o););return t}function a(){this.opts.closeMethods.indexOf("button")!==-1&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn),this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav)}function r(){for(var t=1;t<arguments.length;t++)for(var o in arguments[t])arguments[t].hasOwnProperty(o)&&(arguments[0][o]=arguments[t][o]);return arguments[0]}function h(){var t,o=document.createElement("tingle-test-transition"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in e)if(void 0!==o.style[t])return e[t]}var c=h();return t.prototype.init=function(){this.modal||(e.call(this),i.call(this),document.body.insertBefore(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter())},t.prototype.destroy=function(){null!==this.modal&&(a.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.open=function(){var t=this;"function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),document.body.classList.add("tingle-enabled"),this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("tingle-modal--visible"),c?this.modal.addEventListener(c,function o(){"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t.modal.removeEventListener(c,o,!1)},!1):"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),this.checkOverflow()},t.prototype.isOpen=function(){return!!this.modal.classList.contains("tingle-modal--visible")},t.prototype.close=function(){if("function"==typeof this.opts.beforeClose){var t=this.opts.beforeClose.call(this);if(!t)return}document.body.classList.remove("tingle-enabled"),this.modal.classList.remove("tingle-modal--visible");var o=this;c?this.modal.addEventListener(c,function t(){o.modal.removeEventListener(c,t,!1),o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this)},!1):(o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this))},t.prototype.setContent=function(t){"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t))},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){s.call(this)},t.prototype.setFooterContent=function(t){this.modalBoxFooter.innerHTML=t},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),o.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky")))},t.prototype.addFooterBtn=function(t,o,e){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",e),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){s.classList.add(t)}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){var t=window.innerHeight,o=this.modalBox.clientHeight;return o>=t},t.prototype.checkOverflow=function(){this.modal.classList.contains("tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("tingle-modal--overflow"):this.modal.classList.remove("tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(o.call(this),this.setStickyFooter(!0)))},{modal:t}});