const credentials = {
  username: "admin",
  password: "codex123"
};

let cards = [];

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const msg = document.getElementById('login-msg');

  if (user === credentials.username && pass === credentials.password) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('card-form').style.display = 'block';
    loadSavedCards();
  } else {
    msg.textContent = "Invalid login.";
    msg.style.color = "red";
  }
}

function generateCard() {
  const card = {
    name: document.getElementById('cardName').value,
    type: document.getElementById('cardType').value,
    faction: document.getElementById('faction').value,
    cost: parseInt(document.getElementById('cost').value),
    rarity: document.getElementById('rarity').value,
    stats: {
      attack: parseInt(document.getElementById('attack').value),
      health: parseInt(document.getElementById('health').value)
    },
    abilities: document.getElementById('abilities').value.split(',').map(a => a.trim()),
    description: document.getElementById('description').value,
    image: document.getElementById('image').value
  };

  cards.push(card);
  localStorage.setItem("myCards", JSON.stringify(cards));
  displayCards();
}

function loadSavedCards() {
  const saved = localStorage.getItem("myCards");
  if (saved) {
    cards = JSON.parse(saved);
    displayCards();
  }
}

function displayCards() {
  const output = document.getElementById('jsonOutput');
  output.textContent = JSON.stringify(cards, null, 2);
}

function clearCards() {
  localStorage.removeItem("myCards");
  cards = [];
  displayCards();
}

function downloadCards() {
  const blob = new Blob([JSON.stringify(cards, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = "cards.json";
  link.click();
  URL.revokeObjectURL(url);
}

