import hoeringService from "../services/hoeringer.js";
export default class HoeringerPage {
  constructor() {
    this.init()
  }

  init() {
    this.initData();
    this.template();
  }
  async initData() {
    let hoeringer = await hoeringService.getHoeringer();
    let categoriesLocation = await hoeringService.getLocations();
    let categoriesStatus = await hoeringService.getStatus();
    let categoriesType = await hoeringService.getType();
    this.appendHoeringer(hoeringer)
    this.appendLocations(categoriesLocation)
    this.appendStatus(categoriesStatus)
    this.appendType(categoriesType)
  }

  appendHoeringer(hoeringer) {
    console.log(hoeringer)
    let template = "";
    hoeringer.forEach((hoering) => {
      template += /*html*/ `  
      <section id="hoeringContent">
        
        <div class="flexContent">
        
        <section class="backgroundimg" style="background-image: url('${this.getFeaturedImageUrl(hoering)}')" >
        <article id="info-boks">
        <div id="paddingInfo">
        <h4>Høringsfrist</h4>
        <h3>${hoering.acf.horingsfrist}</h3>
        <div id="comments" class="flexContent">
        <img src="images/comments_icon.svg">
        10
        </div>
        </div>
        </article>
        </section> 
        </div>
        
        <article id="textBoks">
        <h2>${hoering.title.rendered}</h2>
        <p id="overflowEllipsis">${hoering.content.rendered}</p>
        
        <div id="typesTextBoks">
        <div id="location">
        <img src="images/location_icon.svg">
        <h3>${this.getLocation(hoering)}</h3>
        </div>
        <div id="hearing">
        <img src="images/hearing.svg">
        <h3>${this.getHoeringType(hoering)}</h3>
        </div>
        </div>
        
        </article>
        </section>
        `;

    });
    document.querySelector("#grid-hoeringer").innerHTML = template;
  }

  template() {
    document.querySelector('#hoeringsportal').innerHTML += /*html*/ `
      <section id="hoeringer" class="page">
      <div id="header_img">
       <img src="images/nyhavn-crop.png" alt="nyhavn">
       </div> 

       <div id="manchet_mobile">
        <h2>Høringer</h2>
       <p>I en høring har du mulighed for at gøre opmærksom på dine synspunkter om en konkret høringssag… <a href="http://dittejohannejustesen.dk/eaaa/hoeringsportaler_project/#om">Læs mere</a></p>
       </div>

       <div class="container">
       <div id="manchet_desktop">
        <h2>Hvad er en høring?</h2>
        <p>I en høring har du mulighed for at gøre opmærksom på dine synspunkter om en konkret høringssag… <a href="http://dittejohannejustesen.dk/eaaa/hoeringsportaler_project/#om">Læs mere</a></p>
       </div>
       </div>



       <!------------------ Tab menu mobil ---------------->
         <!-- Tab links -->
         <div id="tab_mobile" class="tab">
         <button class="tablinks" onclick="openTabs(event, 'Kort')">Kort</button>
         <button class="tablinks active" onclick="openTabs(event, 'grid-hoeringer')" id="defaultOpen">Liste</button>
         <button class="tablinks" onclick="modalOpen()">Filtrér</button>
         </div>

            <!------------ Tab content mobile -------->
              
            <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
             
            <!-------- Område filtrering ---------->
            <div class="filtrering-wrap">
            <h4>Område</h4>
            <select class="select-district" class="filtrering-mobile" name="districs" onchange="categorySelected(this.value)">
             <option value="">Vælg områder</option>
           </select>
           </div>
       
          <!-------- Status filtrering ---------->
          <div class="filtrering-wrap">
          <h4>Status</h4>
          <select class="select-status" name="districs" onchange="categorySelected(this.value)">
           <option value="">Vælg status</option>
         </select>
         </div>
       
       <!-------- Høringstype filtrering ---------->
       <div class="filtrering-wrap">
       <h4>Høringstype</h4>
       <select class="select-type" name="districs" onchange="categorySelected(this.value)">
        <option value="">Vælg Høringstype</option>
      </select>
      </div>
      
          <!--------Luk knap ---------->
          <button class="close" onclick="modalClose()">
         OK
          </button>

          </div>
              </div>

<!------------------ DESKTOP ---------------->


         <!------------------ Tab menu desktop ---------------->
         <!-- Tab links -->
         <div class="tab" id="tab_desktop">
         <button class="tablinks" onclick="openTabs(event, 'Kort')">Kort</button>
         <button class="tablinks active" onclick="openTabs(event, 'grid-hoeringer')" id="defaultOpen">Liste</button>
         </div>

         <div class="container">
         <input type="search" class="search-desktop" placeholder="Søg i høringssager" onkeyup="search(this.value)">
          </div>

          <!------------ Tab content desktop -------->
            
          <div id="filtrering_desktop">
          <!-------- Område filtrering ---------->
            <div class="filtrering-wrap">
            <h4>Område</h4>
            <select class="select-district-desktop" onchange="categorySelected(this.value)">
             <option value="">Vælg områder</option>
           </select>
           </div>
       
          <!-------- Status filtrering ---------->
          <div class="filtrering-wrap">
          <h4>Status</h4>
          <select class="select-status-desktop" name="districs" onchange="categorySelected(this.value)">
           <option value="">Vælg status</option>
         </select>
         </div>
       
       <!-------- Høringstype filtrering ---------->
       <div class="filtrering-wrap">
       <h4>Høringstype</h4>
       <select class="select-type-desktop" name="districs" onchange="categorySelected(this.value)">
        <option value="">Vælg Høringstype</option>
      </select>
      </div>

          </div>
          </div>


     <input type="search" class="search-mobile" placeholder="Search" onkeyup="search(this.value)">

       <div id="grid-hoeringer" class="grid-container tabcontent"></div>
       
        <div id="Kort" class="tabcontent" style="display:none">
            <img class="map_mobile" src="images/map.jpg">
            <img class="map_desktop" src="images/map_desktop.png">
              </div>
       
        </section>
      `;
  }

//-----------------------------JS FUNCTIONS()------------------------


//------------------distrtcs/location filtrering fuction()----------------

  //filters høringer by location
  async filterByLocation(locationId) {
    let locations = await hoeringService.categorySelected(locationId); //variable with høringer by selected category from hoeringService.categorySelected()
    this.appendHoeringer(locations); //append the høringer by selected category
  }

  // append all genres as select options (dropdown)
  appendLocations(districts) { //argument with districts from hoeringService.getLocations()
    console.log(districts);
    let htmlTemplate = ""; // variable with empty string
    for (let district of districts) { //loops through districts
      htmlTemplate += ` 
      <option value="${district.id}">${district.name}</option>  /* shows district name in dropdown with district is as value */
    `;
    }

    document.querySelector('.select-district').innerHTML += htmlTemplate;
    document.querySelector('.select-district-desktop').innerHTML += htmlTemplate;
  }

  //------------------status filtrering fuction()----------------

  //filters høringer by status
  async filterByStatus(locationId) {
    let status = await hoeringService.categorySelected(locationId); //variable with høringer by selected category from hoeringService.categorySelected()
    this.appendHoeringer(status); //append the høringer by selected category
  }

  // append all genres as select options (dropdown)
  appendStatus(statuses) { //argument with statuses from hoeringService.getStatus()
    console.log(statuses);
    let htmlTemplate = ""; // variable with empty string
    for (let status of statuses) { //loops through statuses
      htmlTemplate += `
      <option value="${status.id}">${status.name}</option> /* shows status name in dropdown with status id as value */
    `;
    }

    document.querySelector('.select-status').innerHTML += htmlTemplate;
    document.querySelector('.select-status-desktop').innerHTML += htmlTemplate;
  }

   //------------------Høringstype filtrering fuction()----------------

   async filterByType(locationId) {
    let status = await hoeringService.categorySelected(locationId); //variable with høringer by selected category from hoeringService.categorySelected() 
    this.appendHoeringer(status); //append the høringer by selected category
  }

  // append all genres as select options (dropdown)
  appendType(types) { //argument with types from hoeringService.getType()
    console.log(types);
    let htmlTemplate = ""; // variable with empty string
    for (let type of types) { //loops through types
      htmlTemplate += `
      <option value="${type.id}">${type.name}</option> /* shows type name in dropdown with status id as value */
    `;
    }

    document.querySelector('.select-type').innerHTML += htmlTemplate;
    document.querySelector('.select-type-desktop').innerHTML += htmlTemplate;
  }

   //------------------ Søgefunktion ----------------

  async filterBySearch(value) {
    let search = await hoeringService.search(value); //variable with høringer by search from hoeringService.search() 
    this.appendHoeringer(search); //append høringer by search
  }

  // gets the featured image url
  getFeaturedImageUrl(hoering) {
    let imageUrl = ""; //empty string
    if (hoering._embedded['wp:featuredmedia']) { //condition if there is a featured media from WP
      imageUrl = hoering._embedded['wp:featuredmedia'][0].source_url; // but the featured media from WP in imageURL string 
    }
    return imageUrl; //ends function execution and specifies imageURL to be returned to the function caller and is used as backgroundimage in appendHoeringer().
  }

    // gets name of område
    getLocation(hoering) { 
      console.log(hoering);
      let categories = hoering._embedded['wp:term'][0]; // variabel with arrays 
      let name = ""; //variable with empty string
      for (const category of categories) { //loops through arrays of categories
        if (category.acf.parentCategory) { //if condition is true
          if (category.acf.parentCategory.slug === "omraader") { //if condition is true > compares on both value and type
            name = category.name; // then variable name is the categorys name
          }
        }
      }
      return name; //ends function execution and specifies name to be returned to the function caller and is used in appendHoeringer().
    }

      // gets name of høringstyper
      getHoeringType(hoering) {
        let categories = hoering._embedded['wp:term'][0]; // variabel with arrays 
        let name = ""; //variable with empty string
        for (const category of categories) { //loops through arrays of categories
          if (category.acf.parentCategory) { //if condition is true
            if (category.acf.parentCategory.slug === "hoeringstype") { // compares on both value and type
              name = category.name; // then variable name is the categorys name
            }
          }
        }
        return name; //ends function execution and specifies name to be returned to the function caller and is used in appendHoeringer().
      }

    

    //   appendActive() {
    //   var header = document.getElementById("tab_desktop");
    //   var btns = header.getElementsByClassName("tablinks");
    //   for (var i = 0; i < btns.length; i++) {
    //     btns[i].addEventListener("click", function() {
    //     var current = document.getElementsByClassName("active");
    //     current[0].className = current[0].className.replace(" active", "");
    //     this.className += " active";
    //     });
    //   }
    //   this.appendActive()
    // }
  

}