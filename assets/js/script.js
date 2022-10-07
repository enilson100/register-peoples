class Pessoa {
  constructor(
    nome,
    sobreNome,
    dataNascimento,
    email,
    contato,
    telefone,
    cargo
  ) {
    this.nome = nome;
    this.sobreNome = sobreNome;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.contato = contato;
    this.telefone = telefone;
    this.cargo = cargo;
  }
  static historicoCadastro = [];

  static addPessoa(pessoa) {
    const idade = calcularIdade(pessoa.dataNascimento);
    if (Pessoa.historicoCadastro.length <= 0) {
      if (idade < 18) {
        alert("Erro, Não aceitamos menores de 18 anos");
      } else {
        Pessoa.historicoCadastro.push(pessoa);
        cadastrados(pessoa);
      }
    } else {
      const verificar = Pessoa.historicoCadastro.some(
        (elem) => elem.email == pessoa.email
      );
      console.log(pessoa.dataNascimento);
      if (verificar == true) {
        alert("Erro, email já cadatastrado!");
      } else if (idade < 18) {
        alert("Erro, Não aceitamos menores de 18 anos");
      } else {
        Pessoa.historicoCadastro.push(pessoa);
        cadastrados(pessoa);
      }
    }
  }
  static filtro() {
    const ul = document.querySelector("#lista-de-cadastrados");
    document.querySelector("#btn").addEventListener("click", function () {
      ul.innerHTML = "";
      const cargos = document.querySelector("#cargoOption").value;
      Pessoa.historicoCadastro.forEach((elem) => {
        if (cargos == "Todos") {
          cadastrados(elem);
        }
        if (elem.cargo == cargos) {
          cadastrados(elem);
        }
      });
    });
  }
}

function formularioEvento() {
  document.querySelector(".form").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.querySelector("#nome").value;
    const sobreNome = document.querySelector("#sobreNome").value;
    const dataNascimento = document.querySelector("#nascimento").value;
    const email = document.querySelector("#email").value;
    const contato = document.querySelector("#contato").value;
    const telefone = document.querySelector("#telefone").value;
    const cargo = document.querySelector("#cargo").value;

    const pessoa = new Pessoa(
      nome,
      sobreNome,
      dataNascimento,
      email,
      contato,
      telefone,
      cargo
    );
    Pessoa.addPessoa(pessoa);
    Pessoa.filtro();
  });
}
formularioEvento();

function cadastrados(pessoa) {
  const ul = document.querySelector("#lista-de-cadastrados");
  const li = document.createElement("li");
  const nome = document.createElement("p");
  const email = document.createElement("p");
  const cargo = document.createElement("p");

  nome.innerText = `${pessoa.nome} ${pessoa.sobreNome}`;
  email.innerText = pessoa.email;
  cargo.innerText = pessoa.cargo;

  li.append(nome, email, cargo);
  ul.appendChild(li);
}

function calcularIdade(idade) {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();

  const anoNascArr = idade.split("-");
  const diaNasc = anoNascArr[2];
  const mesNasc = anoNascArr[1];
  const anoNasc = anoNascArr[0];

  let idadeAtual = anoAtual - anoNasc;

  if (mesAtual < mesNasc) {
    idadeAtual--;
  } else {
    if (mesAtual == mesNasc) {
      if (new Date().getDate() < diaNasc) {
        idadeAtual--;
      }
    }
  }
  return idadeAtual;
}
