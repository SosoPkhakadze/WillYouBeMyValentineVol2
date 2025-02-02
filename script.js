const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const title = document.getElementById('title');
const card = document.getElementById('card');
const gifContainer = document.getElementById('gifContainer');
const heartsContainer = document.getElementById('hearts-container'); // Get the hearts container
let noCount = 0;

function showFinalMessage() {
  card.style.display = "none";

  const existingGiantButtons = document.querySelectorAll('.giant-yes');
  existingGiantButtons.forEach(button => button.remove());

  gifContainer.style.display = "flex";
  gifContainer.innerHTML = `
    <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamx5MHo2dmJhenBxOXlvcHhwMWF1M2I1MWVwZ3B1eXlxcjJ0dnVzMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4pTdcifPZLpDjL1e/giphy.gif" alt="Final GIF">
    <h1>YAAAAAY I LOVE YOU SO MUCH!!!</h1>
  `;

  title.style.display = "none";
  const extraYesButtons = document.querySelectorAll('.extra-yes');
  extraYesButtons.forEach(button => button.remove());
}

yesButton.addEventListener('click', showFinalMessage);

function createExtraYesButton(left, top) {
  const newYesButton = document.createElement('button');
  newYesButton.textContent = 'კი';
  newYesButton.className = 'extra-yes';

  // Ensure buttons stay within viewport
  const maxWidth = window.innerWidth - 100;
  const maxHeight = window.innerHeight - 50;

  if (left !== undefined && top !== undefined) {
    newYesButton.style.left = `${Math.min(Math.max(0, left), maxWidth)}px`;
    newYesButton.style.top = `${Math.min(Math.max(0, top), maxHeight)}px`;
  } else {
    newYesButton.style.left = `${Math.random() * maxWidth}px`;
    newYesButton.style.top = `${Math.random() * maxHeight}px`;
  }

  newYesButton.addEventListener('click', showFinalMessage);
  document.body.appendChild(newYesButton);
}

function createManyYesButtons(num) {
  for (let i = 0; i < num; i++) {
    createExtraYesButton();
  }
}

function createGiantYesButton() {
  const giantYesButton = document.createElement('button');
  giantYesButton.textContent = 'კი';
  giantYesButton.className = 'giant-yes';

  giantYesButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    showFinalMessage();
  });

  document.body.appendChild(giantYesButton);
}

noButton.addEventListener('click', () => {
  noCount++;

  if (noCount === 1) {
    title.textContent = "უი.. შემთხვევით არასწორ ღილაკს დაგეჭირა..";
    const noButtonRect = noButton.getBoundingClientRect();
    createExtraYesButton(noButtonRect.left, noButtonRect.top - 50);
    createExtraYesButton(noButtonRect.right + 10, noButtonRect.top);
    createExtraYesButton(noButtonRect.left, noButtonRect.bottom + 10);
  } else if (noCount === 2) {
    title.textContent = "ამმ... კიდე შეგშლია.. მოდი ცოტას მოგეხმარები";
    createManyYesButtons(10);
  } else if (noCount === 3) {
    title.textContent = "გასაგებია. ურევს შენი ეკრანი.. აბა ახლა სცადე";
    createManyYesButtons(25);
  } else if (noCount === 4) {
    title.textContent = "TAKO... MODI KIDEV ERTXELACCC............";
    createManyYesButtons(40);
  } else if (noCount === 5) {
    title.textContent = "შანსი არაა! მიიღე ჩემი გულებიიი";
    createGiantYesButton();
  }
});

// Function to create a heart element
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heartsContainer.appendChild(heart);

  // Randomize heart size and position
  const size = Math.random() * 20 + 10; // Between 10 and 30
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  const maxX = window.innerWidth - size;
  const x = Math.random() * maxX;
  heart.style.left = `${x}px`;

  // Randomize animation duration for variety
  const duration = Math.random() * 4 + 4; // Between 4 and 8 seconds
  heart.style.animationDuration = `${duration}s`;

  // Remove heart after animation completes to avoid too many elements
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

// Create hearts at intervals
setInterval(createHeart, 300);