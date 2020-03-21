window.onload = function() {
  this.document
    .querySelector(".slider__right-arrow")
    .addEventListener("click", function() {
      let leftPosition = 0;
      while (leftPosition > -1020) {
        document
          .querySelector(".slider__container")
          .setAttribute("style", `left:${leftPosition--}px`);
      }
    });
  this.document
    .querySelector(".slider__left-arrow")
    .addEventListener("click", function() {
      let leftPosition = 1020;
      while (leftPosition > 0) {
        document
          .querySelector(".slider__container")
          .setAttribute("style", `left:${leftPosition--}px`);
      }
    });
};
