// shortcut для document.querySelector (типа замена джиквери и всё такое)))
const qS = function (el, box) {if (box) {return box.querySelector(el)} else {return document.querySelector(el)}};
const qSA = function (el, box) {if (box) {return box.querySelectorAll(el)} else {return document.querySelectorAll(el)}};

const fqSA = function (el, handler, box) { // box - коробка, внутри которой ищем чё надо
    if (box) { if (searchTarget = box.querySelectorAll(el)) [].forEach.call(searchTarget, handler) }
        else { if (searchTarget = document.querySelectorAll(el)) [].forEach.call(searchTarget, handler) }  
} // el - это селектор, по которому будем искать; handler - это функция, которую применяем к каждому найденному элементу

const fClick = function (el, handler) { 
    if (searchTarget = document.querySelectorAll(el)) [].forEach.call(searchTarget, (function (target) { // if searchTarget = ... проверяет существование элемента в ДОМ
        target.addEventListener("click", handler);
    })); // находим все элементы по селектору el и вешаем функцию handler при клике на el
}

const EM = parseFloat(getComputedStyle(document.body).fontSize); // чтобы считать значения с em
var translate = 0;

document.addEventListener("DOMContentLoaded", function () {
    lazyload(); // прикручиваем ленивую загрузку всем изображениям с классом lazyload и data-src
    
    // Прокрутка по странице по якорям
    fClick(".scrollButton", function (e) {
        e.preventDefault();
        if (el = qS(this.dataset.scrollto)) { el.scrollIntoView({ behavior: "smooth" }) }; // считываем dsta-scrollto и едем к нему
    })

    // Инициилизируем новое окно Tingle.js для ютуб окон
    const modalYt = new tingle.modal({
        cssClass: ['ytTingle'],
        beforeClose: function () {
            qS('.frameYT').remove();
            return true;
        }
    });
    //Прикручиваем всплывание видоса по клику на кнопку youtube
    fClick('.popup-youtube', function () {
        modalYt.setContent(`<iframe class="frameYT" src="https://www.youtube.com/embed/${this.dataset.href}?autoplay=1"></iframe>`);
        modalYt.open();
    });


    // Модальное окно для всех лид-форм, данные могут меняться
    const modalCta = new tingle.modal({
        cssClass: ['ctaTingle'],
        onOpen: function () {
            common.formsListener(".tingle-modal .leadData"); // прикручиваем прослушку submit'а текущей формы в модале
        }
    });
    //Клик по кнопке FAQ или по openCta на странице
    fClick(".FAQ span, .openCta, .actionButton", function (e) {
        e.preventDefault();
        modalCta.setContent(qS(".inlineCtaBlock").innerHTML); // берём html формы из узла на странице
        if (this.dataset.title && this.dataset.button) { // если нажатая кнопка имеет заголовок и кнопку для формы, считываем
            qS(".ctaTingle form h3").innerHTML = this.dataset.title;
            qS(".ctaTingle form button").innerHTML = this.dataset.button;
        } else if (this.querySelector("h3")) { // если у нажатого блока есть свои h3 и кнопка, берём их
            qS(".ctaTingle form h3").innerHTML = this.querySelector("h3").innerHTML;
            qS(".ctaTingle form button").innerHTML = this.querySelector("button").innerHTML;
        }
        modalCta.open(); // и только после замены заголовка и кнопки, открываем модаль
    });
    const common = sendData(modalCta); // отправляем по аяксу введённые данные

    //Галерея со сменой главного изображения по клику на мини-копию
    fClick(".thumbs img", function () { // вешаем "клик" на все тамбы
        let src = this.getAttribute("src"); // считываем дата-аттрибут нажатого
        this.parentNode.parentNode.parentNode.querySelector(".mainImg").setAttribute("src", src); // меняем src главного изображения
    })

    // Табы
    fClick(".tabButtons span", function () {
        let thisParent = this.parentNode.parentNode.parentNode;
        fqSA(".tab", function (tab) { // сначала скрываем все табы
            tab.style.display = "none";
        }, thisParent);

        qS(this.dataset.tab, thisParent).style.display = "block"; // потом показваем только выбранный
        
        fqSA(".tabButtons span", function (tabButton) { // отключаем всем кнопкам класс "tabSelected"
            tabButton.classList.remove("tabSelected")
        }, thisParent)
        this.classList.add("tabSelected"); // включаем одному "tabSelected"
    })

    // Аккордион
    fClick(".accTitle", function () { // вешаем "клик" на все тайтлы
        let thisParent = this.parentNode.parentNode;
        fqSA(".accTitle", function (el) { el.classList.remove("active") }, thisParent) // удаляем у всех класс "актив"
        elem = this.nextElementSibling; // paragraph, который сейчас надо показать
        if (elem.style.maxHeight) { // если блок итак раскрыт, то закрываем его и все остальные
            fqSA(".accTitle+p", function (el) { el.style.maxHeight = null }, thisParent)
            
        } else { // если блок закрыт - раскрываем, закрывая попутно все остальные
            fqSA(".accTitle+p", function (el) { el.style.maxHeight = null }, thisParent)
            elem.style.maxHeight = elem.scrollHeight + "px" // высота показываемого блока
            elem.previousElementSibling.classList.add("active") // добаляем нажатому иконку "минус"
        }
    });

    // свёрнутый блок с кнопкой для открытия
    fClick(".openButton", function () {
        let elem = this.nextElementSibling;
        if (elem.style.maxHeight) { elem.style.maxHeight = null} // если блок открыт - закрываем
        else { elem.style.maxHeight = elem.scrollHeight + "px" } // высота показываемого блока
    })

    //делаем кнопки прокрутки в галерее
    fClick(".scrollBlockUp", function () {
        let parent = this.parentNode;
        let elem = qS('.scrollable', parent);
        step = 120;
        if (translate < 0) { translate += step };
        elem.style.transform = `translateY(${translate}px)`;
    });
    fClick(".scrollBlockDown", function () {
        let parent = this.parentNode;
        let elem = qS('.scrollable', parent);
        step = 120;
        if (-translate < elem.scrollHeight - 3 * step) {translate -= step};
        elem.style.transform = `translateY(${translate}px)`;
    });


    function readSvg(file) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.send(null);
        let svg = rawFile.responseText;
        if (svg) return svg;
    }
    
    window.onload = fqSA(".fi", function (svgIcon) {
        iconName = svgIcon.dataset.icon;
        iconPath = "/img/fa/" + iconName + ".svg";
        let newSvg = document.createElement('span');
        newSvg.innerHTML = readSvg(iconPath);
        newSvg.classList.add("fi");
        svgIcon.parentNode.replaceChild(newSvg, svgIcon);
    })

    // переставляем меню вверх страницы
    const mobileSubmenu = qS(".mobileSubmenu");
    const menuWrapper = qS(".menuWrapper");
    const mainMenu = qS(".mainMenu");
    const menuBox = qS(".menuBox");
    const header = qS("header");

    window.addEventListener('resize', function () {
        let sW = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        (sW < 530) ? document.body.insertBefore(menuBox, header) : document.body.insertBefore(menuBox, qS("#wrapper"))
    });
    if (screen.width < 530) document.body.insertBefore(menuBox, header);
    

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
        } else {
            cL.add("openedMenu");
            elem.style.maxHeight = mainMenu.scrollHeight + "px";
        }
    })

    // добавление стрелки вправо к пунктам с подменюшкой
    const folderIcon = readSvg("/img/fa/angle-right.svg");
    fqSA(".mainMenu>li", function (elem) {
        if (elem.querySelector("ul")) {
            elem.classList.add("hasSubmenu");
            let newSvg = document.createElement('span');
            newSvg.innerHTML = folderIcon;
            newSvg.classList.add("menuIcon");
            elem.appendChild(newSvg);
        }
    })

    fClick(".hasSubmenu", function(e) {
        e.preventDefault();
        qS(".menuButton").classList.toggle("arrowMenu","openedMenu");
        document.body.scrollIntoView();
        mobileSubmenu.innerHTML = this.innerHTML;
        menuWrapper.style.transform = "translateX(-100vw)";
        menuWrapper.style.maxHeight = (mobileSubmenu.children[1].scrollHeight + 5 * EM) + "px";
    })

    
});