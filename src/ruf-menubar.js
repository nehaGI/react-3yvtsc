class RufMenubar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.items;
    this.shadowRoot.innerHTML = `
    <style>
      .menubar-style {
          display: flex;
          flex-direction: row;
          align-items: center;
          border: 1px solid #b3bfc2;
      }
      .ruf-menubar-item {
        padding: 10px 15px;
        cursor: pointer;
        border-bottom: solid 4px transparent;
      }
      .ruf-menubar-item:hover {
          background:  #ffffff26;
      }

      .ruf-ruf-menubar-item-active {
        border-bottom-color: #4bcd3e;
      }
    </style>
    <div id="menubar-container" class="menubar-style">

    </div>`;
  }

  connectedCallback() {
    this._render();
    const menubarItem = this.shadowRoot.querySelectorAll('.ruf-menubar-item');
    menubarItem.forEach((ele) => {
      ele.addEventListener('click', this.elementClicked.bind(this));
    });
  }

  _render() {
    let innerDivs = [];
    let data = document.querySelector('ruf-menubar').getAttribute('items');
    //converting data into array
    this.items = data.split(',');

    let menubarContainer = this.shadowRoot.getElementById('menubar-container');

    //generating div based on number of elements in items attribute
    this.items.forEach((item, i) => {
      innerDivs.push(this.createDiv(item, i));
      menubarContainer.appendChild(innerDivs[i]);
    });
  }

  //called on click on any item of menubar
  elementClicked(event) {
    this.updateActiveClass(event);
    //creating  a custom event
    const selectChangeEvent = new CustomEvent('selectChange', {
      detail: { selectedItem: event.target.innerText }, // send data to listened
      bubbles: true, // bubble event upwards in DOM
      composed: true, //bubble up event from Shadow DOM to real DOM
    });
    this.shadowRoot.dispatchEvent(selectChangeEvent);
  }

  updateActiveClass(event) {
    const items = this.shadowRoot.querySelectorAll(
      '#menubar-container .ruf-menubar-item'
    );

    items?.forEach((item) => {
      if (event.target.innerText === item.innerText) {
        item.classList.add('ruf-ruf-menubar-item-active');
      } else {
        item.classList.remove('ruf-ruf-menubar-item-active');
      }
    });
  }

  //creates inner divs
  createDiv(label, id) {
    let div = document.createElement('div');
    div.className = 'ruf-menubar-item';
    div.innerText = label;
    div.id = `tab${id}`;
    return div;
  }

  //get called when element gets removed from DOM
  disconnectedCallback() {
    const menubarItem = this.shadowRoot.querySelectorAll('.ruf-menubar-item');
    menubarItem.forEach((ele) => {
      ele.removeEventListener('click', this.elementClicked.bind(this));
    });
  }
}

//registering custom element
customElements.define('ruf-menubar', RufMenubar);
