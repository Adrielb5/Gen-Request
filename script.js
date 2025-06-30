const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const textoGerado = document.getElementById("texto-gerado");
const downloadTextoBtn = document.getElementById("download-texto");
const copiarTextoBtn = document.getElementById("copiar-texto"); // Adicionado botão de copiar texto
const nomeArquivoInput = document.getElementById("nome-arquivo");

function gerarTexto() {
  const ativo = document.getElementById("ativo").value;
  const patrimonio = document.getElementById("patrimonio").value;
  const modelo = document.getElementById("modelo").value;
  const atividadeRealizada = document.getElementById(
    "atividade_realizada"
  ).value;

  const antivirus = document.getElementById("antivirus").value;
  const saveenergy = document.getElementById("saveenergy").value;
  const hostname = document.getElementById("hostname").value;

  // Dividir os valores de patrimônio por vírgula e remover espaços em branco
const patrimoniosArray = patrimonio.split(",").map((item) => item.trim());

// Armazenar os patrimônios inválidos
let patrimoniosInvalidos = [];

// Validar se todos os valores são números de 6 dígitos
patrimoniosArray.forEach((item) => {
  if (!/^\d{6}$/.test(item)) {
    patrimoniosInvalidos.push(item); // Adiciona item inválido à lista
  }
});

if (patrimoniosInvalidos.length > 0) {
  const patrimonioInput = document.getElementById("patrimonio");
  const erroPatrimonio = document.getElementById("erro-patrimonio");

  patrimonioInput.classList.add("invalid");
  erroPatrimonio.textContent =
    `Os seguintes patrimônios são inválidos: ${patrimoniosInvalidos.join(", ")}. Todos os patrimônios devem ser números de 6 dígitos.`;
  return null;
} else {
  const patrimonioInput = document.getElementById("patrimonio");
  const erroPatrimonio = document.getElementById("erro-patrimonio");

  patrimonioInput.classList.remove("invalid");
  erroPatrimonio.textContent = "";
}


  // Gerar o texto para cada patrimônio
  const textos = patrimoniosArray
    .map(
      (pat) =>
        `Patrimônio: ${pat}\nAtivo: ${ativo}\nModelo: ${modelo}\nAtividade Realizada: ${atividadeRealizada}\n• Antivírus instalado: ${antivirus}\n• Save Energy instalado: ${saveenergy}\n• Hostname correto: ${hostname}`
    )
    .join("\n\n");

  // Substituir \n por quebras de linha HTML
  const textoFormatado = textos.replace(/\n/g, "<br>");
  textoGerado.innerHTML = `<pre>${textoFormatado}</pre>`; // Exibe o texto formatado com <pre>

  resultado.style.display = "flex";
  resultado.style.flexDirection = "column";

  return textos;
}

// Evento do botão de "Baixar Texto"
downloadTextoBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita comportamento padrão do botão

  const textos = gerarTexto();
  if (textos) {
    const nomeArquivo = nomeArquivoInput.value.trim() || "arquivo"; // Define um nome padrão se o campo estiver vazio
    downloadTxtFile(textos, nomeArquivo);
  }
});

// Evento do botão de "Copiar Texto"
copiarTextoBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita comportamento padrão do botão

  const textos = gerarTexto();
  if (textos) {
    copiarTextoGerado(textos); // Chama a função de copiar o texto
  }
});

// Função para gerar e baixar o arquivo .txt
function downloadTxtFile(texto, nomeArquivo) {
  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}.txt`;
  link.click();
}

// Função para copiar o texto gerado para a área de transferência
function copiarTextoGerado(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    // Exibe notificação de sucesso usando Toastify
    Toastify({
      text: "Texto copiado para a área de transferência!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "#4caf50",
    }).showToast();
  }).catch((err) => {
    // Exibe notificação de erro
    Toastify({
      text: "Erro ao copiar o texto!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: "#f44336",
    }).showToast();
  });
}
