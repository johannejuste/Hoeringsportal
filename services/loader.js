class LoaderService {
  constructor() {
    // this.template();
  }

  //returns the HTML content: loader and spinner in #hoeringsportal
  template() {
    document.querySelector('#grid-hoeringer').innerHTML += /*html*/ `
      <div id="loader">
        <div class="spinner"></div>
      </div>
    `;
  }

  show(show) {
    // variable of the div "#loader" from html
      let loader = document.querySelector('#loader');
      //condition (show) to present from the start.
      if (show) {
        loader.classList.remove("hide");
      } else {
        // else add hide
        loader.classList.add("hide");
      }
    }
  
  }

const loaderService = new LoaderService();
export default loaderService;