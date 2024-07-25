let list = [];

window.onload = function () {
  document.querySelector("#name").innerText = localStorage.getItem("userName");
  document.querySelector("#role").innerText = localStorage.getItem("cargo");

  getProjects();
};

function getProjects() {
  fetch("https://668da18f099db4c579f384b1.mockapi.io/api/project")
    .then((response) => response.json()) //trazer resposta em JSON
    .then((response) => {
      list = response;
      buildTable();
    });
}

function goToEdit(id) {
  window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id) {
  fetch(`https://668da18f099db4c579f384b1.mockapi.io/api/project/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json()) //trazer resposta em JSON
    .then((response) => {
      list = list.filter((project) => project.id != id);
      buildTable();
    });
}

function buildTable() {
  document.querySelector("#table-template").innerHTML = "";
  const idClient = localStorage.getItem("idClient");
  list = list.filter((element) => element.idClient === idClient);

  list.forEach((element) => {
    let template = `
  <div class="row">
  <div class="title-description">
    <h6 class="title">${element.title}</h6>
    <p class="descricao">${element.description}</p>
  </div>
  <div class="value">${element.totalCost}</div>
  <div class="actions">
    <i class="edit bi bi-pencil-fill" onclick= "goToEdit(${element.id})"></i>
    <i class="delete bi bi-trash3-fill" onclick = "deleteProject(${element.id})"></i>
  </div>
</div>
  `;
    document
      .querySelector("#table-template")
      .insertAdjacentHTML("beforeend", template);
  });
}
