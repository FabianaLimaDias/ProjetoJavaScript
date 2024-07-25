function checkIfAnyRoleIsChecked() {
  // Obtém todos os elementos com o nome "cargo"
  let list = document.getElementsByName("cargo");

  // Inicializa um contador
  let counter = 0;

  // Percorre cada botão de rádio na lista
  for (let radioButton of list) {
    // Se o botão de rádio NÃO estiver marcado, incrementa o contador
    if (radioButton.checked === false) {
      counter++;
    }
  }

  // Retorna true se pelo menos um botão estiver marcado, false caso contrário
  return counter !== list.length;
}

function cadastrar() {
  //checa se algum cargo foi checado
  // Se ele entrou aqui, é porque o form está válido! Caso seja falso ele retorna para continuar preencher
  if (checkIfAnyRoleIsChecked() === false) {
    Swal.fire("Algo de errado...", "Marque alguma role!", "error");

    return;
  }
  //return para execução da função ou seja o restante não é seguido

  //Inicia a massa de dados (payload)
  let payload = {
    cargo:
      document.getElementsByName("cargo")[0].checked == true
        ? "dev"
        : "cliente",
    fullname: document.querySelector("#fullname").value,
    birtdate: document.querySelector("#birtdate").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  // Enviar para API
  fetch("https://668da18f099db4c579f384b1.mockapi.io/api/users", {
    method: "POST", //tipo de metodo - cadastro
    body: JSON.stringify(payload), //transforrmando o payload em uma string
    headers: {
      "Content-Type": "application/json", //paremytro do monki api
    },
  })
    .then((response) => response.json()) //trazer resposta em JSON
    .then((response) => {
      Swal.fire({
        title: "Bom Trabalho!",
        text: "Cadastrado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("userName", response.fullName);
          localStorage.setItem(
            "role",
            response.role === "dev" ? "Desenvolvedor" : "Cliente"
          );
          localStorage.setItem("idClient", response.id);

          window.location.href = "list.html";
        }
      });
    });
}
