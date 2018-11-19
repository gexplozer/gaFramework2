const EM = parseFloat(getComputedStyle(document.body).fontSize); // чтобы считать значения с em
var translate = 0;
var elem,step,iconPath,iconName;

document.addEventListener("DOMContentLoaded", function () {
	// прикручиваем ленивую загрузку всем изображениям с классом lazyitem и data-src
	var myLazyLoad = new LazyLoad({
		elements_selector: ".lazyitem"
	});

	// Кнопка прокрутки вверх документа
	window.onscroll = () => {showScrollButton()};
	let showScrollButton = () => {
		let btn = qS("#scrollTop");
		if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
			btn.style.opacity = .75;
		} else {
			btn.style.opacity = 0;
		}
	}
	// Прокрутка по странице по якорям
	fClick(".scrollButton", function (e) {
		e.preventDefault();
		if (qS(this.dataset.scrollto)) {qS(this.dataset.scrollto).scrollIntoView({behavior: "smooth"})} // считываем dsta-scrollto и едем к нему
	});

	// Инициилизируем новое окно Tingle.js для ютуб окон
	const modalYt = new tingle.modal({
		cssClass: ["ytTingle"],
		beforeClose: function () {
			qS(".frameYT").remove();
			return true;
		}
	});
	//Прикручиваем всплывание видоса по клику на кнопку youtube
	fClick(".popup-youtube", function () {
		modalYt.setContent(`<iframe class="frameYT" src="https://www.youtube.com/embed/${this.dataset.href}?autoplay=1"></iframe>`);
		modalYt.open();
	});


	// Модальное окно для всех лид-форм, данные могут меняться
	const modalCta = new tingle.modal({
		cssClass: ["ctaTingle"],
		onOpen: function () {
			common.formsListener(".tingle-modal .leadData"); // прикручиваем прослушку submit'а текущей формы в модале
		}
	});
	//Клик по кнопке FAQ или по openCta на странице
	fClick(".FAQ span, .openCta, .actionButton", function (e) {
		e.preventDefault();
		modalCta.setContent(qS(".inlineCtaBlock").innerHTML); // берём html формы из узла на странице
		function insertCta(title,button) {
			qS(".ctaTingle form .ctaRequest").value = `${title} | ${button}`;
			qS(".ctaTingle form h3").innerHTML = title;
			qS(".ctaTingle form button").innerHTML = button;
		}
		if (this.dataset.title && this.dataset.button) { // если нажатая кнопка имеет заголовок и кнопку для формы, считываем
			insertCta(this.dataset.title, this.dataset.button);
		} else if (this.querySelector("h3")) { // если у нажатого блока есть свои h3 и кнопка, берём их
			insertCta(this.querySelector("h3").innerHTML, this.querySelector("button").innerHTML);
		}
		modalCta.open(); // и только после замены заголовка и кнопки, открываем модаль
	});
	const common = sendData(modalCta); // отправляем по аяксу введённые данные

	// Рекурсивный поиск родителя
	function findParent(el, selector) {
		while ((el = el.parentElement) && !el.matches(selector));
		return el;
	}

	//Галерея со сменой главного изображения по клику на мини-копию
	fClick(".thumbs img", function () { // вешаем "клик" на все тамбы
		let src = this.getAttribute("data-src"); // считываем дата-аттрибут нажатого
		if (!src) {src = this.getAttribute("src")};
		let closestParent = findParent(this, "#msProduct");
		closestParent.querySelector(".mainImg").setAttribute("src", src); // меняем src главного изображения
	});

	// Табы
	fClick(".tabButtons span", function () {
		let closestParent = findParent(this, ".tabs");
		fqSA(".tab", function (tab) { // сначала скрываем все табы
			tab.style.display = "none";
		}, closestParent);
		qS(this.dataset.tab, closestParent).style.display = "block"; // потом показваем только выбранный
		fqSA(".tabButtons span", function (tabButton) { // отключаем всем кнопкам класс "tabSelected"
			tabButton.classList.remove("tabSelected");
		}, closestParent);
		this.classList.add("tabSelected"); // включаем одному "tabSelected"
	});



	// Аккордион
	fClick(".accTitle", function () { // вешаем "клик" на все тайтлы
		let closestParent = findParent(this, ".accordion");
		fqSA(".accTitle", function (el) { el.classList.remove("active"); }, closestParent); // удаляем у всех класс "актив"
		elem = this.nextElementSibling; // paragraph, который сейчас надо показать
		if (elem.style.maxHeight) { // если блок итак раскрыт, то закрываем его и все остальные
			fqSA(".accTitle+div", function (el) {el.style.maxHeight = null; }, closestParent);
		} else { // если блок закрыт - раскрываем, закрывая попутно все остальные
			this.classList.add("active"); // добаляем нажатому иконку "минус"
			fqSA(".accTitle+div", function (el) { el.style.maxHeight = null; }, closestParent);
			elem.style.maxHeight = elem.scrollHeight + "px"; // высота показываемого блока
		}
	});

	fqSA(".accTitle + div", function(elem){
		elem.addEventListener("transitionend", function (e) {
			console.log(e);
		})
	})

	// свёрнутый блок с кнопкой для открытия
	fClick(".openButton", function () {
		let elem = this.nextElementSibling;
		if (elem.style.maxHeight) { elem.style.maxHeight = null;} // если блок открыт - закрываем
		else { elem.style.maxHeight = elem.scrollHeight + "px"; } // высота показываемого блока
	});

	// делаем кнопки прокрутки в галерее товара
	fClick(".scrollBlockUp", function () {
		let parent = this.parentNode;
		let elem = qS(".scrollable", parent);
		step = 120;
		if (translate < 0) { translate += step; }
		elem.style.transform = `translateY(${translate}px)`;
	});
	fClick(".scrollBlockDown", function () {
		let parent = this.parentNode;
		let elem = qS(".scrollable", parent);
		step = 120;
		if (-translate < elem.scrollHeight - 3 * step) {translate -= step;}
		elem.style.transform = `translateY(${translate}px)`;
	});

	const mobileSubmenu = qS(".mobileSubmenu"),
				menuWrapper = qS(".menuWrapper"),
				mainMenu = qS(".mainMenu"),
				menuBox = qS(".menuBox"),
				header = qS("header");

	// переставляем меню вверх страницы
	let sW = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if (sW < 530) {
		window.addEventListener("resize", function () {
			let sW = (window.innerWidth > 0) ? window.innerWidth : screen.width;
			(sW < 530) ? document.body.insertBefore(menuBox, header) : document.body.insertBefore(menuBox, qS("#wrapper"));
		});
		document.body.insertBefore(menuBox, header);
		fClick(".hasSubmenu", function (e) {
			e.preventDefault();
			qS(".menuButton").classList.toggle("arrowMenu", "openedMenu");
			document.body.scrollIntoView();
			mobileSubmenu.innerHTML = this.innerHTML;
			menuWrapper.style.transform = "translateX(-100vw)";
			menuWrapper.style.maxHeight = (mobileSubmenu.children[1].scrollHeight + 5 * EM) + "px";
		});
	}
    

	// клик по кнопке меню и её трансформация
	fClick(".menuButton", function () {
		let elem = menuWrapper;
		let cL = this.classList;

		if (cL.contains("arrowMenu")) {
			cL.remove("arrowMenu");
			cL.add("openedMenu");
			elem.style.transform = "translateX(0)";
			elem.style.maxHeight = mainMenu.scrollHeight + "px";
		} else if (cL.contains("openedMenu")) {
			cL.remove("arrowMenu", "openedMenu");
			elem.style.maxHeight = "0";
			menuBox.classList.toggle("menuBoxOpened");
		} else {
			cL.add("openedMenu");
			menuBox.classList.toggle("menuBoxOpened");
			elem.style.maxHeight = mainMenu.scrollHeight + "px";
		}
	});
});