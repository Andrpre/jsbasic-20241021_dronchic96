import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();

    this.closeButton = this.elem.querySelector(".modal__close");
    this.titleElement = this.elem.querySelector(".modal__title");
    this.bodyElement = this.elem.querySelector(".modal__body");
  }

  render() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
    `);
  }

  addEventListeners() {
    this.elem.addEventListener("click", (event) => this.onClick(event));
    document.addEventListener("keydown", this._closeWithEscape.bind(this));
  }

  onClick(event) {
    if (event.target.closest(".modal__close")) {
      event.preventDefault();
      this.close();
    }
  }

  open() {
    this.addEventListeners();

    const body = document.body;

    body.append(this.elem);
    body.classList.add("is-modal-open");
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  setBody(node) {
    this.bodyElement.innerHTML = '';
    this.bodyElement.append(node);
  }

  close() {
    this.elem.remove();

    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this._closeWithEscape);
  }

  _closeWithEscape(evt) {
    if (evt.code === "Escape") {
      evt.preventDefault();
      this.close();
    }
  }
}
