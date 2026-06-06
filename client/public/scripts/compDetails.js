const detailEl = document.querySelector("#comp-detail");

const pathParts = window.location.pathname.split("/").filter(Boolean);
const compId = pathParts[0];

const renderCompDetail = async () => {
  if (pathParts.length > 1) {
    detailEl.innerHTML = `<h1>404 No Page Found</h1>`;
    return;
  }

  const response = await fetch(`/comps/${compId}`);

  if (!response.ok) {
    detailEl.innerHTML = `<h1>404 No Page Found</h1>`;
    return;
  }

  const comp = await response.json();
  detailEl.innerHTML = `
    <a href="/" class="back-link">← Back to all comps</a>
    <article class="detail-card">
      ${comp.boardImage
        ? `<img src="${comp.boardImage}" alt="${comp.name} board composition" class="board-image" />`
        : ""
      }
      <h2>${comp.name}</h2>
      <p>${comp.description}</p>
      <p><strong>Main carry:</strong> ${comp.mainCarry}</p>
    </article>
  `;
};

renderCompDetail();
