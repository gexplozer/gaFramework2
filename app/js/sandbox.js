class ferrari {
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
f480.move();
