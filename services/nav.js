class NavService {
    constructor() {
   
    }

    // Burgermenu
    burgerMenu() {
        var x = document.getElementById("burgercontent");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }
    closeBurger() {
        let burger = document.querySelector("#burgercontent");

        burger.style.display = "none";

    }

}
const navService = new NavService();
export default navService;