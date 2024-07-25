//pega os paremtros URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

Type: "create" | "edit";
const screenType = params.id ? "edit" : "create";

function createOrEdit() {
  //Inicia a massa de dados (payload)
  let payload = {
    title: document.querySelector("#title").value,
    totalCost: document.querySelector("#totalCost").value,
    description: document.querySelector("#description").value,
    idClient: localStorage.getItem("idClient"),
  };

  // Enviar para API
  fetch(
    `https://668da18f099db4c579f384b1.mockapi.io/api/project${
      screenType === "edit" ? "/" + params.id : ""
    }`,
    {
      method: screenType === "edit" ? "PUT" : "POST", //tipo de metodo - cadastro se for igual a edit é PUT senao é POST      body: JSON.stringify(payload), //transforrmando o payload em uma string
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json", //parametro do monki api
      },
    }
  )
    .then((response) => response.json()) //trazer resposta em JSON
    .then((response) => {
      if (screenType === "edit") {
        Swal.fire({
          title: "OK",
          text: "Editado com sucesso",
          icon: "sucess",
          confirmButtonText: "ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "list.html";
          }
        });
      } else {
        Swal.fire({
          title: "OK",
          text: "Cadastrado com sucesso",
          icon: "sucess",
          confirmButtonText: "ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "list.html";
          }
        });
      }
    });
}

window.onload = function () {
  setScreenTypeTexts();
  fillInputs();
};

function fillInputs() {
  if (screenType == "edit") {
    fetch(
      `https://668da18f099db4c579f384b1.mockapi.io/api/project/${params.id}`
    )
      .then((response) => response.json())
      .then((project) => {
        document.querySelector("#title").value = project.title;
        document.querySelector("totalCost").value = project.totalCost;
        document.querySelector("#descuiption").value = project.description;
      });
  }
}

function setScreenTypeTexts() {
  //Modo criar
  if (screenType == "create") {
    document.querySelector("#main-title").innerText =
      "Vamos cadastrar seu novo projeto!";
    document.querySelector("#action-button").innerText = "Cadastrar";
  }

  // Modo editar
  if (screenType == "edit") {
    document.querySelector("#main-title").innerText = "Editar projeto!";
    document.querySelector("#action-button").innerText = "Salvar";
  }
}
