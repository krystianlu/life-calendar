const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const dateInput = document.getElementById("date");
const updateBtn = document.getElementById("updateBtn");
const goodBtns = document.querySelectorAll(".good");
const badBtns = document.querySelectorAll(".bad");
const habits = document.querySelectorAll(".good, .bad");
const gender = document.querySelectorAll(".radio");

let userDate = "";
let userYear = "";
let userMonth = "";
let userAge = 0;
let lifeExpectancy = 0;

const quotes = [
  "He who has a why to live can bear almost any how. — Nietzsche",
  "The unexamined life is not worth living. — Socrates",
  "We are what we repeatedly do. — Aristotle",
  "Life must be understood backward. But it must be lived forward. — Kierkegaard",
  "Happiness is not something ready made. It comes from your own actions. — Dalai Lama",
  "To live is the rarest thing in the world. Most people exist, that is all. — Oscar Wilde",
  "Time flies over us, but leaves its shadow behind. — Nathaniel Hawthorne",
  "Life is long, if you know how to use it. — Seneca",
  "Be here now. — Ram Dass",
  "Death is not the opposite of life, but a part of it. — Haruki Murakami",
  "To live is to suffer, to survive is to find meaning. — Nietzsche",
  "It is not length of life, but depth of life. — Ralph Waldo Emerson",
  "Begin at once to live. — Seneca",
  "Waste no more time arguing what a good man should be. Be one. — Marcus Aurelius",
  "Live your life as though your every act were to become a universal law. — Immanuel Kant",
  "You may delay, but time will not. — Benjamin Franklin",
  "Lost time is never found again. — Benjamin Franklin",
  "He lives twice who lives well. — Marcus Valerius Martialis",
  "Our life is frittered away by detail. Simplify. — Henry David Thoreau",
  "You cannot step into the same river twice. — Heraclitus",
  "The present moment is the only time over which we have dominion. — Thích Nhất Hạnh",
  "Nothing endures but change. — Heraclitus",
  "Freedom is the only worthy goal in life. — Epictetus",
  "Character is destiny. — Heraclitus",
  "The soul becomes dyed with the color of its thoughts. — Marcus Aurelius",
  "Act only on that maxim you would will to become a universal law. — Immanuel Kant",
  "Time is the wisest counselor of all. — Pericles",
  "A man who lives fully is prepared to die at any time. — Mark Twain",
  "To philosophize is to learn how to die. — Michel de Montaigne",
  "What is not started today is never finished tomorrow. — Johann Wolfgang von Goethe",
  "The trouble is, you think you have time. — Buddha",
  "Silence is a source of great strength. — Lao Tzu",
  "Do not spoil what you have by desiring what you have not. — Epicurus",
  "Everything we hear is an opinion, not a fact. — Marcus Aurelius",
  "While we wait for life, life passes. — Seneca",
  "Be tolerant with others and strict with yourself. — Marcus Aurelius",
  "You are not a drop in the ocean. You are the ocean in a drop. — Rumi",
  "The only wealth which you will keep forever is the wealth you have given away. — Marcus Aurelius",
  "The only thing we have to fear is the refusal to try. — Seneca",
  "He who opens a school door, closes a prison. — Victor Hugo",
  "Death smiles at us all; all we can do is smile back. — Marcus Aurelius",
  "To be is to do. — Socrates",
  "Man is not worried by real problems so much as by his imagined anxieties. — Epictetus",
  "The best revenge is to be unlike him who performed the injury. — Marcus Aurelius",
  "No man has power over the breath of life to retain it. — Ecclesiastes",
  "Time is a created thing. — Lao Tzu",
  "Every man's life ends the same way. — Ernest Hemingway",
  "Life is a spark between two identical voids. — Cormac McCarthy",
  "The secret of change is to focus all your energy not on fighting the old, but on building the new. — Socrates",
  "You have power over your mind — not outside events. Realize this, and you will find strength. — Marcus Aurelius",
];

//Check selected gender
function checkGender() {
  gender.forEach((g) => {
    const value = g.getAttribute("value");
    g.addEventListener("click", () => {
      const isChecked = (g.checked = true);
      if (value === "male" && isChecked === true) {
        lifeExpectancy = 948;
      } else {
        lifeExpectancy = 1008;
      }
    });
  });
}
checkGender();

// Calculate and update users age
function calculateUserAge() {
  if (!userDate) return;
  const [year, month] = userDate.split("-");
  userYear = parseInt(year);
  userMonth = parseInt(month);
  userAge = (currentYear - userYear) * 12 + (currentMonth + userMonth);
}

// Update lifespan display
function updateLife() {
  checkGender();
  calculateUserAge();
  const ageDifference = lifeExpectancy - userAge;
  const container = document.getElementById("lifespan");
  container.innerHTML = "";
  if (!userDate) {
    const p = document.createElement("p");
    p.textContent = "Please select a date";
    container.appendChild(p);
    return;
  }
  for (let m = 0; m < userAge; m++) {
    const span = document.createElement("span");
    span.className = "month";
    span.textContent = "🌘";
    container.appendChild(span);
  }
  for (let m = 0; m < ageDifference; m++) {
    const span = document.createElement("span");
    span.className = "month";
    span.textContent = "🌖";
    span.style.animationDelay = `${m * 1}ms`;
    container.appendChild(span);
  }
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  h3.innerHTML = `Your current life expectancy is ${Math.round(
    lifeExpectancy / 12
  )} years.`;
  h4.innerHTML = `You have ${Math.round(ageDifference / 12)} years left.`;
  container.appendChild(h3);
  container.appendChild(h4);
}
dateInput.addEventListener("change", () => {
  userDate = dateInput.value;
});

// Change life expectancy when habits are clicked and update display
habits.forEach((btn) => {
  const value = parseInt(btn.getAttribute("data-value"));
  btn.addEventListener("click", () => {
    const isActive = btn.classList.toggle("active");
    if (isActive) {
      lifeExpectancy += value;
    } else {
      lifeExpectancy -= value;
    }
    if (btn.classList.contains("good")) {
      btn.classList.toggle("activeGood", isActive);
    } else {
      btn.classList.toggle("activeBad", isActive);
    }
    updateLife();
  });
});

gender.forEach((g) => {
  const value = g.getAttribute("value");
  g.addEventListener("change", () => {
    const isChecked = (g.checked = true);
    if (value === "male" && isChecked === true) {
      lifeExpectancy = 948;
    } else {
      lifeExpectancy = 1008;
    }
    updateLife();
  });
});
updateBtn.addEventListener("click", () => {
  const quoteBox = document.getElementById("quoteBox");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = `${randomQuote}`;
});
