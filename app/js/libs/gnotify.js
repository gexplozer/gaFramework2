boxQueue = Array(); // массив для очереди уведомлений
function gNotify(timeout, options)  {
	if (!qS(".gNotifyBox")) { // проверяем наличие контейнера для алертов. Создаём, если нету
		var container = document.createElement('div');
		container.classList.add("gNotifyBox");
		document.body.appendChild(container);
	}
	
	let box = document.createElement('div');  // спауним новый блок с уведомлением
	box.classList.add(options.type ? options.type : "info"); // цвет оформления уведомления
	box.innerHTML = build(); // формируем разметку
	box.addEventListener('click', function () { // слушаем клики по уведомлению
		this.remove(); // по клику удаляем его
		readQueue(); // и достаём следующее уведомление из очереди
	});
	if (timeout > 0) { // если задан таймер закрытия
		setTimeout(() => {
			box.remove();
			readQueue();
		}, timeout);
	}

	let alertsCount = qSA(".gNotifyBox > div").length; // проверяем количество активных уведомлений 
	if (alertsCount>4) {
		boxQueue.push(box) // если много, новое помещаем в очередь
	} else {
		qS(".gNotifyBox").appendChild(box)  // вставляем элемент в бокс к уведомлениям
	}
	
	function build() { // формируем разметку уведомления
		let boxBuild = '<span id="close">x</span>';
		if (options.header) { boxBuild += `<span class="header">${options.header}</span>` }
		if (options.body) { boxBuild += `<span class="body">${options.body}</span>` }
		if (options.link) { boxBuild += `<a class="button" href="${options.link}">${options.button}</a>` }
		return boxBuild;
	}

	function readQueue() { // выводим первое в очереди уведомление
		readyBox = boxQueue.shift(); // достаём из очереди
		if (readyBox) qS(".gNotifyBox").appendChild(readyBox); // втыкаем в страницу
	}
}