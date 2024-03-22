const container = document.querySelector(".container");

let cardsInfo;
let currentTimeframe = "daily";

const createCards = () => {
  fetch("./data.json")
    .then((res) => res.json())
    .then((res) => {
      cardsInfo = res;
      console.log(cardsInfo);

      cardsInfo.forEach((card, index) => {
        let newCard = `      <div class="card grid-card card-${index + 1}">
        <div class="card__content">
          <div class="card__header">
            <h2 class="card__subtitle">${card.title}</h2>
            <button class="card__menu-btn">
              <img src="assets/images/icon-ellipsis.svg" alt="Menu Icon" />
            </button>
          </div>
          <div class="card__worker-metrics">
            <span class="card__worker-hours">${
              card.timeframes[currentTimeframe].current
            }hrs</span>
            <span class="card__previous-week">Last Week - ${
              card.timeframes[currentTimeframe].previous
            }hrs</span>
          </div>
        </div>
      </div>`;

        container.innerHTML += newCard;

        const navbarBtns = document.querySelectorAll(".navbar__item");

        navbarBtns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            navbarBtns.forEach((el) => {
              el.classList.remove("navbar__item--active");
            });

            btn.classList.add("navbar__item--active");

            currentTimeframe = btn.textContent.toLowerCase();
            console.log(currentTimeframe);

            let cards = document.querySelectorAll(".card");

            cards.forEach((card) => {
              container.removeChild(card);
            });

            createCards();
          });
        });
      });
    });
};

createCards();
