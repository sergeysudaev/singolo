const [slider, services, portfolio, about_us, get_a_quote] = [
  "slider",
  "services",
  "portfolio",
  "about-us",
  "get-a-quote"
];
const headerHeight = 95;

const menuItemsList = document.querySelectorAll(".menu__list>li>a");

document.querySelector("nav").addEventListener("click", event => {
  menuItemsList.forEach(elem => {
    if (elem !== event.target) {
      elem.classList.remove("menu__list_active");
    } else {
      elem.classList.add("menu__list_active");
    }
  });
});
const getSectionPosition = sectionsName => {
  return sectionsName.reduce((acc, item) => {
    return {
      ...acc,
      [item]: document.getElementById(item).offsetTop - headerHeight
    };
  }, {});
};

const sectionsPositions = getSectionPosition([
  services,
  portfolio,
  about_us,
  get_a_quote
]);

const setActiveClass = element => {
  element.classList.add("menu__list_active");
};
const removeAllActiveClasses = () => {
  menuItemsList.forEach(elem => elem.classList.remove("menu__list_active"));
};

const setActiveNavLink = activeLink => {
  removeAllActiveClasses();
  switch (activeLink) {
    case slider:
      setActiveClass(menuItemsList[0]);
      break;
    case services:
      setActiveClass(menuItemsList[1]);
      break;
    case portfolio:
      setActiveClass(menuItemsList[2]);
      break;
    case about_us:
      setActiveClass(menuItemsList[3]);
      break;
    case get_a_quote:
      setActiveClass(menuItemsList[4]);
  }
};

document.addEventListener("scroll", event => {
  const currentPosition = event.target.scrollingElement.scrollTop;
  currentPosition < sectionsPositions[services] && setActiveNavLink(slider);
  currentPosition >= sectionsPositions[services] &&
    currentPosition < sectionsPositions[portfolio] &&
    setActiveNavLink(services);
  currentPosition >= sectionsPositions[portfolio] &&
    currentPosition < sectionsPositions[about_us] &&
    setActiveNavLink(portfolio);
  currentPosition >= sectionsPositions[about_us] &&
    currentPosition < sectionsPositions[get_a_quote] &&
    setActiveNavLink(about_us);
  currentPosition >= document.documentElement.offsetHeight - innerHeight &&
    setActiveNavLink(get_a_quote);
});

// turn ON/OFF phones
const verticalPhone = document.querySelector(".slider__iphone-vertical");
const horizontalPhone = document.querySelector(".slider__iphone-horizontal");
verticalPhone.addEventListener("click", () => {
  verticalPhone.children[1].classList.toggle(
    "iphone-vertical__background_hide"
  );
});
horizontalPhone.addEventListener("click", () => {
  horizontalPhone.children[1].classList.toggle(
    "iphone-horizontal__background_hide"
  );
});

// slider
class Slider {
  constructor() {
    this.isProcessing = false;
    this.isRedSlideActive = true;
    this.redSlide = document.querySelector(".slider-one");
    this.blueSlide = document.querySelector(".slider-two");
    this.sliderContainer = document.querySelector(".slider__container");
  }

  getWindowWidth() {
    let result = 1020;
    if (document.documentElement.clientWidth < 1020) {
      result = document.documentElement.clientWidth;
    }
    return result;
  }

  onRightClick() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    if (!this.isRedSlideActive) {
      this.sliderContainer.removeChild(this.redSlide);
      this.sliderContainer.setAttribute("style", `left:0px`);
      this.sliderContainer.append(this.redSlide);
    } else {
      this.sliderContainer.removeChild(this.blueSlide);
      this.sliderContainer.setAttribute("style", `left:0px`);
      this.sliderContainer.append(this.blueSlide);
    }
    let leftPosition = 0;
    const intervalID = setInterval(() => {
      this.sliderContainer.setAttribute(
        "style",
        `left:${(leftPosition -= 10)}px`
      );
      if (leftPosition <= -sliderCarousel.getWindowWidth()) {
        clearInterval(intervalID);
        this.isProcessing = false;
      }
    }, 1);
    this.isRedSlideActive = !this.isRedSlideActive;
  }
  onLeftClick() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    if (!this.isRedSlideActive) {
      this.sliderContainer.removeChild(this.redSlide);
      this.sliderContainer.prepend(this.redSlide);
      this.sliderContainer.setAttribute(
        "style",
        `left:-${sliderCarousel.getWindowWidth()}px`
      );
    } else {
      this.sliderContainer.removeChild(this.blueSlide);
      this.sliderContainer.prepend(this.blueSlide);
      this.sliderContainer.setAttribute(
        "style",
        `left:-${sliderCarousel.getWindowWidth()}px`
      );
    }
    let leftPosition = -sliderCarousel.getWindowWidth();
    const intervalID = setInterval(() => {
      this.sliderContainer.setAttribute(
        "style",
        `left:${(leftPosition += 10)}px`
      );
      if (leftPosition > -10) {
        clearInterval(intervalID);
        this.isProcessing = false;
      }
    }, 1);
    this.isRedSlideActive = !this.isRedSlideActive;
  }
}

const sliderCarousel = new Slider();

window.addEventListener("resize", () => {
  if (
    sliderCarousel.sliderContainer.getAttribute("style").split("").length > 9
  ) {
    sliderCarousel.sliderContainer.setAttribute(
      "style",
      `left:-${sliderCarousel.getWindowWidth()}px`
    );
  }
});

document
  .querySelector(".slider__right-arrow")
  .addEventListener("click", function() {
    sliderCarousel.onRightClick();
  });
document
  .querySelector(".slider__left-arrow")
  .addEventListener("click", function() {
    sliderCarousel.onLeftClick();
  });

// portfolio
const portfolioImages = document.querySelectorAll(".portfolio__images>img");
portfolioImages.forEach(item => {
  item.addEventListener("click", event => {
    portfolioImages.forEach(item =>
      item.classList.remove("portfolio__image_active")
    );
    event.target.classList.add("portfolio__image_active");
  });
});

const tagButtons = document.querySelectorAll(".tag-button");
const imagesComponent = document.querySelector(".portfolio__images");
tagButtons.forEach((item, index) => {
  item.addEventListener("click", event => {
    imagesComponent.append(imagesComponent.firstElementChild);
    index > 0 && imagesComponent.append(imagesComponent.firstElementChild);
    index > 1 && imagesComponent.append(imagesComponent.firstElementChild);
    index > 2 && imagesComponent.append(imagesComponent.firstElementChild);
    tagButtons.forEach(item => {
      item.classList.remove("portfolio__active-tag_color");
    });
    event.target.classList.add("portfolio__active-tag_color");
  });
});

//form

const formElement = document.querySelector("#form");
const modalElement = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal__container");

formElement.addEventListener("submit", event => {
  event.preventDefault();
  const [name, email, subject, describe] = [
    event.target["0"].value,
    event.target["1"].value,
    event.target["2"].value,
    event.target["3"].value
  ];
  modalContainer.insertAdjacentHTML(
    "afterbegin",
    `<p>${describe ? describe : "No description"}</p>`
  );
  modalContainer.insertAdjacentHTML(
    "afterbegin",
    `<p>${subject ? subject : "No subject"}</p>`
  );
  modalContainer.insertAdjacentHTML(
    "afterbegin",
    `<p><strong>The letter was sent</strong></p>`
  );
  modalElement.classList.remove("modal_hide");
});

document.querySelector("#modal-button").addEventListener("click", () => {
  formElement.reset();
  modalContainer.removeChild(modalContainer.children[0]);
  modalContainer.removeChild(modalContainer.children[0]);
  modalContainer.removeChild(modalContainer.children[0]);
  modalElement.classList.add("modal_hide");
});
