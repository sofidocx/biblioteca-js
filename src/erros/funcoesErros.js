// funcoes para separar o tratamento de erro do código 

function trataErros(erro) {
    if(erro.code === 'ENOENT') {
        return 'Arquivo não encontrado'; 
    }else {
        return 'Erro na aplicação'; 
    }
}

module.exports = trataErros; 
