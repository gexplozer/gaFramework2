// shortcut для document.querySelector (типа замена джиквери и всё такое)))
const qS = function (el, box) { if (box) { if (box.querySelector(el)) return box.querySelector(el)} else {if (document.querySelector(el)) return document.querySelector(el)}};
const qSA = function (el, box) {if (box) {if (box.querySelectorAll(el)) return box.querySelectorAll(el)} else {if (document.querySelectorAll(el)) return document.querySelectorAll(el)}};

const fqSA = function (el, handler, box) { // box - коробка, внутри которой ищем чё надо
	if (box) { if (box.querySelectorAll(el)) [].forEach.call(box.querySelectorAll(el), handler)}
	else { if (document.querySelectorAll(el)) [].forEach.call(document.querySelectorAll(el), handler)}  
}; // el - это селектор, по которому будем искать; handler - это функция, которую применяем к каждому найденному элементу

const fClick = function (el, handler, box) {
	let clickEvent = function (target) {
		target.addEventListener("click", handler)
	}
	if (box) {if (box.querySelectorAll(el)) [].forEach.call(box.querySelectorAll(el), clickEvent)} // если указан box для поиска
	else {if (document.querySelectorAll(el)) [].forEach.call(document.querySelectorAll(el), clickEvent)} // вешаем на все элементы документа
};