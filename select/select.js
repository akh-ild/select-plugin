const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? 'Default placeholder';
  const items = data.map((item) => {
    return `
      <li class="select__item" data-type="item" data-id=${item.id}>${item.value}</li>
    `
  });
  return `
  <div class="select__input" data-type="input">
          <span data-type="placeholder">${text}</span>
          <i class="fa fa-chevron-down" data-type="arrow"></i>
        </div>
        <div class="select__dropdown">
          <ul class="select__list">
            ${items.join('')}
          </ul>
        </div>
        `
};


export class Select {
  constructor(selector, options) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.selectedId = null;

    this.#render();
    this.#setup();
  }
  // Private method
  #render() {
    const {placeholder, data} = this.options;
    this.el.classList.add('select');
    this.el.innerHTML = getTemplate(data, placeholder);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.el.addEventListener('click', this.clickHandler);
    this.arrow = this.el.querySelector('[data-type="arrow"]');
    this.placeholder = this.el.querySelector('[data-type="placeholder"]');
  }

  clickHandler(event) {
    const {type} = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    }
  }

  get isOpen() {
    return this.el.classList.contains('open');
  }

  get currentOption() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.placeholder.textContent = this.currentOption.value;
    this.close();
  }

  toggle() {
    this. isOpen ? this.close() : this.open();
  }

  open() {
    this.el.classList.add('open');
    this.arrow.classList.remove('fa-chevron-down');
    this.arrow.classList.add('fa-chevron-up');
  }
  close() {
    this.el.classList.remove('open');
    this.arrow.classList.remove('fa-chevron-up');
    this.arrow.classList.add('fa-chevron-down');
  }

  destroy() {
    thiis.el.removeEventListener('click', this.clickHandler);
  }
}