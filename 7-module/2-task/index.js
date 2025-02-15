import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
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

    this.closeButton = this.elem.querySelector(".modal__close");
    this.titleElement = this.elem.querySelector(".modal__title");
    this.bodyElement = this.elem.querySelector(".modal__body");
  }

  addEventListeners() {
    this.closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keydown", this._closeWithEscape.bind(this));
  }

  open() {
    const body = document.body;

    body.append(this.elem);
    body.classList.add("is-modal-open");
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  setBody(body) {
    this.bodyElement.innerHTML = body;
  }

  close() {
    this.elem.remove();
    body.classList.remove("is-modal-open");

    document.removeEventListener("keydown", this._closeWithEscape);
    document.removeEventListener("click", this.close);
  }

  closeWithEscape(evt) {
    if (evt.code === "Escape") {
      this.open();
    }
  }
}
