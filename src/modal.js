const mobMenuSearchBtn = document.querySelector("div.mobile-nav__search");
const AllModalWindows = new Map();

class ModalWindows {
  constructor(modal, el, listiner = () => null) {
    this.$modal = modal;
    this.$el = document.querySelector(el);
    this.listiner = listiner;
    this.#setup();
    this.#setState();
    this.globalBackground = document.querySelector("div.global--bg");
  }
  get modalStatus() {
    return this.$modal.classList.contains("modal-open");
  }
  get scrollStatus() {
    return this.modalStatus ? "hidden" : "";
  }
  modalToggle() {
    this.modalStatus ? this.close() : this.open();
  }
  bgToggle() {
    this.modalStatus
      ? this.globalBackground.classList.add("active")
      : this.globalBackground.classList.remove("active");
  }
  open() {
    this.$modal.classList.add("modal-open");
    this.$el.classList.add("active");
    this.globalBackground.addEventListener("click", () => {
      this.close();
      this.bgToggle();
    });
  }
  close() {
    this.$modal.classList.remove("modal-open");
    this.$el.classList.remove("active");
    this.globalBackground.removeEventListener("click", () => {
      this.listiner();
    });
  }
  #setState() {
    AllModalWindows.set(this, "AllModalWindows");
  }
  #setup() {
    this.$el.addEventListener("click", () => {
      this.listiner();
      AllModalWindows.set(this, "AllModalWindows");
    });
  }
  blockScroll() {
    document.body.style.overflowY = this.scrollStatus;
  }
}
/*
 * PHONE MODAL WINDOW
 */
const phoneModalWindow = document.querySelector("div.phone-dropdown");
class PhoneModal extends ModalWindows {
  constructor(modal, el, listiner = () => this.PhoneModalListiner()) {
    super(modal, el, listiner);
    this.$modal = modal;
    this.#setup();
  }
  PhoneModalListiner() {
    super.modalToggle();
    super.bgToggle();
    super.blockScroll();
  }
  #setup() {
    this.$modal.addEventListener("click", (e) => {
      if (e.target.dataset.options === "PHONE_CLOSE_BNT") {
        this.PhoneModalListiner();
      }
    });
  }
}
new PhoneModal(phoneModalWindow, "div.header-area-menu__phone");

/*
 *SEARCH MODAL
 */
const seachDropDownMenu = document.querySelector("div.search-dropdown-menu");
const seachDropDownMenuBtn = document.querySelector(
  "div.search-handler__dropdown-btn"
);

class SearchModal extends ModalWindows {
  constructor(modal, el, listiner = () => this.searchModalListiner()) {
    super(modal, el, listiner);
    this.$modal = modal;
    this.$buttonContent = document.querySelector(
      "button.search-handler__dropdown-btn-text"
    );
    this.$icon = document.getElementById("icon-in-search-area");
    this.#setup();
  }
  searchModalListiner() {
    super.modalToggle();
  }

  #setup() {
    this.$modal.addEventListener("click", (e) => {
      if (e.target.dataset.options === "LIST") {
        this.$buttonContent.textContent = e.target.textContent;
      }
    });
  }
}

new SearchModal(seachDropDownMenu, "div.search-handler__dropdown-btn");

/*
 * COPY TO BUFFER
 */
const copyBtn = document.querySelector("button.copy-btn");

class CopyModal extends ModalWindows {
  constructor(modal, el, listiner = () => this.copyButtonListiner()) {
    super(modal, el, listiner);
    this.$copyButton = document.querySelector("button.copy-btn");
    this.#setup();
  }

  copyButtonListiner() {
    super.modalToggle();
  }

  copyTextToBuffer() {
    navigator.clipboard.writeText("test");
  }

  #setup() {
    this.$copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText("info@stolovay.ru");
    });
  }
}

new CopyModal(copyBtn, "div.header-area-menu__mail");

const copyTextToBuffer = () => {
  navigator.clipboard.writeText("test");
};

/*
CATEGORIES
*/
class CatergoriesModal extends ModalWindows {
  constructor(modal, el, listiner = () => this.categoriesListiner()) {
    super(modal, el, listiner);
    this.$modal = modal;
    this.$subEl = document.querySelector("li.dd-submodal");
    this.$subModal = document.querySelector("div.dd-submodal--visibble");
    this.#setup();
  }

  get subModalStatus() {
    return this.$subModal.classList.contains("modal-open");
  }

  subModalTogle() {
    this.subModalStatus
      ? this.$subModal.classList.remove("modal-open")
      : this.$subModal.classList.add("modal-open");
  }

  categoriesListiner() {
    super.modalToggle();
    super.blockScroll();
    super.bgToggle();
  }

  #setup() {
    this.$subEl.addEventListener("click", () => {
      this.subModalTogle();
    });
  }
}
const categoriesModalOpener = document.querySelector("div.categories-dd-menu");
new CatergoriesModal(categoriesModalOpener, "div.dd-parick");
