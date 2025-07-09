import fs from 'fs';
import path from 'path'; //o node usa essa biblioteca para fazer gerenciamento entre caminhos relativos e absolutos 
import trataErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from '../helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .version('0.0.1')
  .option('-t, --texto <string>', 'caminho do texto a ser processado') //flag
  .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
  .action((options) => {
    const { texto, destino } = options;

    if (!texto || !destino) {
      console.error(chalk.red('erro: Favor inserir caminho de origem e destino'));
      program.help();
      return;
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {

      processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green('Texto processado com sucesso'));


    } catch (erro) {
      console.log('Ocorreu um erro no processamento', erro);

    }
  })
program.parse();

function processaArquivo(texto, destino) {

  fs.readFile(texto, 'utf-8', (erro, texto) => {
    try {
      if (erro) throw erro;
      const resultado = contaPalavras(texto);
      criaESalvaArquivo(resultado, destino)
      //todo o codigo que a gente quer que de certo, mas se der erro, queremos monitorar o código que está dentro desse bloco 
    } catch (erro) {
      trataErros(erro);

    }
  })
}


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