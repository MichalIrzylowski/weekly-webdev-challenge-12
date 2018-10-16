const headers = document.querySelectorAll(".header");
const header = document.querySelector("header");
const controllers = document.querySelectorAll(".controllers button");
const burger = document.querySelector(".burger-icon");
const nav = document.querySelector("nav");
const lastMenuItem = document.querySelector(".last-menu-item");

let turn = 0;

let touchStartX, touchEndX;

const headerInterval = setInterval(() => {
  turn -= 100;
  turn <= -399 || turn > 0 ? (turn = 0) : null;
  moveHeaders();
}, 10000);

headers.forEach(header => {
  header.addEventListener("touchstart", e => {
    touchStartX = (e.changedTouches[0].clientX / window.innerWidth) * 100;
  });

  header.addEventListener("touchmove", e => {
    let movePoints = (e.changedTouches[0].pageX / window.innerWidth) * 100;
    const side = touchStartX < movePoints ? movePoints : -movePoints;
    moveHeaders(side);
  });

  header.addEventListener("touchend", e => {
    touchEndX = (e.changedTouches[0].pageX / window.innerWidth) * 100;
    if (!(touchEndX > touchStartX)) {
      turn -= 100;
      turn <= -399 || turn > 0 ? (turn = 0) : null;
      moveHeaders();
    } else {
      turn += 100;
      turn <= -399 || turn > 0 ? (turn = -300) : null;
      moveHeaders();
    }
  });
});

controllers.forEach(controller => {
  controller.addEventListener("click", function() {
    if (this.textContent === "Next") {
      turn -= 100;
      turn <= -399 || turn > 0 ? (turn = 0) : null;
      moveHeaders();
    } else {
      turn += 100;
      turn <= -399 || turn > 0 ? (turn = -300) : null;
      moveHeaders();
    }
  });
});

burger.addEventListener("click", function() {
  serviceTheMenu();
});

lastMenuItem.addEventListener("click", () => {
  serviceTheMenu();
});

function serviceTheMenu() {
  burger.classList.toggle("active");
  header.classList.toggle("active");
  nav.classList.toggle("active");
}

function moveHeaders(movePts) {
  let move = movePts ? turn + movePts : turn;
  headers.forEach(header => {
    header.style.transform = `translateX(${move}%)`;
  });
}
