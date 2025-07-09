// funcoes para separar o tratamento de erro do código 

export default function trataErros(erro) {
    if(erro.code === 'ENOENT') {
        return 'Arquivo não encontrado'; 
    }else {
        return 'Erro na aplicação'; 
    }
}

