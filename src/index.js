const fs = require('fs');
const trataErros = require('./erros/funcoesErros');

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2]; 

fs.readFile(link, 'utf-8', (erro, texto) => {
  try {
    if (erro) throw erro
    contaPalavras(texto); 
    //todo o codigo que a gente quer que de certo, mas se der erro, queremos monitorar o códiog que está dentro desse bloco 
  } catch (erro) {
    console.log(trataErros(erro)); 

  }
})

//ponto de entrada da aplicação, ponto inicial 
function contaPalavras (texto) {
  const paragrafos = extraiParagrafos(texto); 
  const contagem = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return [];
    return verificaPalavrasDuplicadas(paragrafo);
  })
  console.log(contagem);
}

function extraiParagrafos(texto) {
  return paragrafos = texto.toLowerCase().split('\n');
}


function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificaPalavrasDuplicadas(texto) {
  const listaPalavras = texto.split(' ');
  const resultado = {};
  // objeto[propriedade] = valor;
  listaPalavras.forEach(palavra => {
    if (palavra.length >= 3) {
      const palavraLimpa = limpaPalavras(palavra);
      resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
    }
  })
  return resultado;
}