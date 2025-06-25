const grid = document.getElementById("playerGrid");
const modal = document.getElementById("modal");

function renderPlayers(filterText = "", role = "all") {
  grid.innerHTML = "";

  let filtered = players.filter(player => {
    const matchName = player.name.toLowerCase().includes(filterText.toLowerCase());
    const matchRole = role === "all" || player.role === role;
    return matchName && matchRole;
  });

  filtered.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${player.image}" alt="${player.name}" />
      <h2>${player.name}</h2>
      <p>${player.role}</p>
    `;
    card.onclick = () => openModal(index);
    grid.appendChild(card);
  });
}

function openModal(index) {
  const player = players[index];
  document.getElementById("modal-name").textContent = player.name;
  document.getElementById("modal-role").textContent = player.role;
  document.getElementById("modal-jersey").textContent = player.jersey;
  document.getElementById("modal-matches").textContent = player.matches;
  document.getElementById("modal-strike").textContent = player.strikeRate;
  document.getElementById("modal-best").textContent = player.best;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

document.getElementById("searchInput").addEventListener("input", e => {
  renderPlayers(e.target.value, document.getElementById("roleFilter").value);
});

document.getElementById("roleFilter").addEventListener("change", e => {
  renderPlayers(document.getElementById("searchInput").value, e.target.value);
});

renderPlayers();
