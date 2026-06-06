const listEl = document.querySelector("#comp-list");

function compCard(comp) {
  return `
    <article class="comp-card" style="background-image: url('${comp.cardImage}')">
      <div class="card-overlay">
        <h2>${comp.name}</h2>
        <p>${comp.description}</p>
        <footer><strong>Main carry:</strong> ${comp.mainCarry}</footer>
        <a href="/${comp.id}" role="button">View Comp</a>
      </div>
    </article>
  `;
}

const renderComps = async () => {
  const response = await fetch("/comps");
  const data = await response.json();

  if (data) {
    listEl.innerHTML = data.map(compCard).join("");
  } else {
    listEl.innerHTML = `<h2>Could not load comps.</h2>`;
  }
};

renderComps();
