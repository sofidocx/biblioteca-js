import fs from 'fs';
import trataErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from '../helpers.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf-8', (erro, texto) => {
  try {
    if (erro) throw erro;
    const resultado = contaPalavras(texto);
    criaESalvaArquivo(resultado, endereco)
    //todo o codigo que a gente quer que de certo, mas se der erro, queremos monitorar o código que está dentro desse bloco 
  } catch (erro) {
    trataErros(erro);

  }
})

//asyn - na declaração da função
async function criaESalvaArquivo(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);//await --> adicionamos na linha onde iremos executar o método 
    console.log('Arquivo criado');
  } catch (erro) {
    throw erro;
  }
}