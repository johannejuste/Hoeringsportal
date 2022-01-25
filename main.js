// import your components, pages and services
import NavBar from "./components/navbar.js";
import HomePage from "./pages/borgermoeder.js";
import HoeringerPage from "./pages/hoeringer.js";
import spaService from "./services/spa.js";
import navService from "./services/nav.js"
import OmPage from "./pages/omHoeringsportalen.js";
import hoeringService from "./services/hoeringer.js"
//import loaderService from "./services/loader.js";

// Declare and init
let navbar = new NavBar();
let homePage = new HomePage();
let hoeringerPage = new HoeringerPage();
let omPage = new OmPage();

// init services
spaService.init();
//loaderService.show(true);

window.pageChange = () => spaService.pageChange();
window.burgerMenu = () => navService.burgerMenu();
window.closeBurger = () => navService.closeBurger();
window.getFeaturedImageUrl = (hoering) => hoeringerService.getFeaturedImageUrl(hoering);
window.getFeaturedName = (hoering) => hoeringerService.getFeaturedName(hoering);
window.getFeaturedType = (hoering) => hoeringerService.getFeaturedType(hoering);
window.openTabs = (evt, tabName) => hoeringService.openTabs(evt, tabName);
window.defaultOpen = () => hoeringService.defaultOpen();
window.modalOpen = () => hoeringService.modalOpen();
window.categorySelected = (value) => hoeringerPage.filterByLocation(value);
window.cateogrySelected = (value) => hoeringerPage.filterByStatus(value);
window.cateogrySelected = (value) => hoeringerPage.filterByType(value);
window.search = (value) => hoeringerPage.filterBySearch(value);
window.modalClose = () => hoeringService.modalClose();