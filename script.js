const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const textoGerado = document.getElementById("texto-gerado");
const copiarTextoBtn = document.getElementById("copiar-texto");
const patrimonioInput = document.getElementById("patrimonio");
const erroPatrimonio = document.getElementById("erro-patrimonio");

const alertaCustomizado = document.getElementById("alerta-customizado");
const alertaMensagem = document.getElementById("alerta-mensagem");
const fecharAlertaBtn = document.getElementById("fechar-alerta");

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const ativo = document.getElementById("ativo").value;
  const patrimonio = document.getElementById("patrimonio").value;
  const modelo = document.getElementById("modelo").value;
  const atividadeRealizada = document.getElementById(
    "atividade_realizada"
  ).value;

  // Dividir os valores de patrimônio por vírgula e remover espaços em branco
  const patrimoniosArray = patrimonio.split(",").map((item) => item.trim());

  // Validar se todos os valores são números de 6 dígitos
  let patrimoniosValidos = true;
  patrimoniosArray.forEach((item) => {
    if (!/^\d{6}$/.test(item)) {
      patrimoniosValidos = false;
    }
  });

  if (!patrimoniosValidos) {
    patrimonioInput.classList.add("invalid");
    erroPatrimonio.textContent =
      "Todos os patrimônios devem ser números de 6 dígitos.";
    mostrarAlerta("Todos os patrimônios devem ser números de 6 dígitos.");
    return;
  } else {
    patrimonioInput.classList.remove("invalid");
    erroPatrimonio.textContent = "";
  }

  // Gerar o texto para cada patrimônio
  const textos = patrimoniosArray
    .map(
      (pat) => `
    Ativo: ${ativo}
    Patrimônio: ${pat}
    Modelo: ${modelo}
    Atividade Realizada: ${atividadeRealizada}
  `
    )
    .join("\n\n");

  // Substitui \n por quebra de linha HTML e <br> duplos para separar cada bloco de texto
  const textoFormatado = textos
    .replace(/\n/g, "<br>")
    .replace(/<br><br>/g, "<br><br>");

  textoGerado.innerHTML = textoFormatado; // Exibe o texto formatado na tag <pre>

  resultado.style.display = "block";
});

copiarTextoBtn.addEventListener("click", function () {
  // Usar textoGerado.innerText para obter o texto sem HTML
  const textoACopiar = textoGerado.innerText;

  navigator.clipboard.writeText(textoACopiar).then(() => {
    mostrarAlerta("Copiado para área de transferência");
  });
});

patrimonioInput.addEventListener("input", function () {
  const valorAtual = patrimonioInput.value;
  const numerosApenas = valorAtual.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  patrimonioInput.value = numerosApenas; // Atualiza o valor do campo apenas com números

  // Verificar se há letras no valor atual
  if (/[a-zA-Z]/.test(valorAtual)) {
    mostrarAlerta("O campo Patrimônio aceita apenas números.");
  } else {
    alertaCustomizado.style.display = "none"; // Esconder o alerta se o valor estiver correto
  }
});

function mostrarAlerta(mensagem) {
  alertaMensagem.textContent = mensagem;
  alertaCustomizado.style.display = "block";
}

patrimonioInput.addEventListener("input", function () {
  patrimonioInput.classList.remove("invalid");
  erroPatrimonio.textContent = "";
});

function mostrarAlerta(mensagem) {
  alertaMensagem.textContent = mensagem;
  alertaCustomizado.style.display = "block";
}

fecharAlertaBtn.addEventListener("click", function () {
  alertaCustomizado.style.display = "none";
});
