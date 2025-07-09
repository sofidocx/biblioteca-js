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