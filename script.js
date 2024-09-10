const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const textoGerado = document.getElementById("texto-gerado");
const downloadTextoBtn = document.getElementById("download-texto");
const nomeArquivoInput = document.getElementById("nome-arquivo");

downloadTextoBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita comportamento padrão do botão

  const ativo = document.getElementById("ativo").value;
  const patrimonio = document.getElementById("patrimonio").value;
  const modelo = document.getElementById("modelo").value;
  const atividadeRealizada = document.getElementById(
    "atividade_realizada"
  ).value;

  const antivirus = document.getElementById("antivirus").value;
  const bigfix = document.getElementById("bigfix").value;
  const saveenergy = document.getElementById("saveenergy").value;
  const hostname = document.getElementById("hostname").value;

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
    const patrimonioInput = document.getElementById("patrimonio");
    const erroPatrimonio = document.getElementById("erro-patrimonio");

    patrimonioInput.classList.add("invalid");
    erroPatrimonio.textContent =
      "Todos os patrimônios devem ser números de 6 dígitos.";
    return;
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
        `Patrimônio: ${pat}\nAtivo: ${ativo}\nModelo: ${modelo}\nAtividade Realizada: ${atividadeRealizada}\n• Antivírus instalado: ${antivirus}\n• BigFix instalado: ${bigfix}\n• Save Energy instalado: ${saveenergy}\n• Hostname correto: ${hostname}`
    )
    .join("\n\n");

  // Substituir \n por quebras de linha HTML
  const textoFormatado = textos.replace(/\n/g, "<br>");
  textoGerado.innerHTML = `<pre>${textoFormatado}</pre>`; // Exibe o texto formatado com <pre>

  resultado.style.display = "flex";
  resultado.style.flexDirection = "column";

  // Baixar o texto como arquivo .txt
  const nomeArquivo = nomeArquivoInput.value.trim() || "arquivo"; // Define um nome padrão se o campo estiver vazio
  downloadTxtFile(textos, nomeArquivo);
});

// Função para gerar e baixar o arquivo .txt
function downloadTxtFile(texto, nomeArquivo) {
  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${nomeArquivo}.txt`;
  link.click();
}
