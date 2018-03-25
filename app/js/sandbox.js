/*class ferrari {
	constructor() {
        let newCar = document.createElement("div");
        newCar.style.cssText = "width: 300px; height: 100px; background-color: red; transition: all 1s ease-out;";
        document.querySelector(".sandbox").appendChild(newCar);
	}
    
	move() {
		this.style.transform = "translateX(500px)";
	}
}

let f480 = new ferrari();
f480.move();*/
/*
qS = function (el) { return document.querySelector(el); };
let a = [];
let size = [];

var promise = new Promise((resolve => {
	qS(".async").style.width = "0px";
	setTimeout(() => { resolve();}, 0);
}));

let i = 40;

async function getRndImg() {
	return new Promise (function(resolve) {
		i++;
		let newImg = document.createElement('img');
		let url = `https://jsonplaceholder.typicode.com/photos/${i}`;
		let xhr = new XMLHttpRequest;

		xhr.open("GET", url, true);
		xhr.send();
		xhr.onload = function () { // (3)
			if (xhr.readyState != 4) return;
			let data = JSON.parse(xhr.responseText);
			newImg.setAttribute("src", data.url);
			qS(".images").appendChild(newImg);
			console.log(data.id);
			resolve();
		}
	});
}
(async function () {
	await getRndImg();
	await getRndImg();
	await getRndImg();
	await getRndImg();
	await getRndImg();
})();

promise
	.then(() => { return getRndImg() })
	.then(() => { return getRndImg() })
	.then(() => { return getRndImg() })
	.then(() => { return getRndImg() })
	.then((suka) => {
		console.log(suka);
	});
	*/
let vert = 550;
let horizon = 1100;


document.querySelector("button").addEventListener("click", () => {
	rectum();
});
function rectum() {
	for (let i = 0; i < 10; i++) {
		let rand = Math.random();
		let newEl = document.createElement("div");
		newEl.classList.add("rect");
		newEl.style.top = vert * Math.random() + "px";
		newEl.style.left = horizon * Math.random() + "px";
		document.body.appendChild(newEl);
	}
	setTimeout(function() {
		document.querySelectorAll('.rect').forEach(elem => {
			elem.classList.add("boom");
			setTimeout(function() {
				elem.remove();
			}, 1000);
		});
	}, 1000);
}

let xhr = new XMLHttpRequest;
xhr.open("GET", 'data.json', true);
xhr.send();
xhr.onload = function () { // (3)
	if (xhr.readyState != 4) return;
	//let data = JSON.parse(xhr.responseText);
	
	document.body.innerHTML = xhr.responseText;
}