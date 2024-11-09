//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Produto from "../Modelo/produto.js";

export default class ProdutoCtrl{

    gravar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const descricao  = requisicao.body.descricao;
            const preCusto = requisicao.body.preCusto;
            const preVenda = requisicao.body.preVenda;
            const estq = requisicao.body.estq;
            const urlImg  = requisicao.body.urlImg;
            const dtValidade = requisicao.body.dtValidade;
            const {categoria} = requisicao.body.categoria
            //pseudo validação
            if (descricao && preCusto > 0 &&
                preVenda > 0 && estq >= 0 &&
                urlImg && dtValidade)
            {
                //gravar o produto
                const produto = new Produto(0,
                    descricao, preCusto, preVenda,
                    estq,urlImg,dtValidade,categoria);
                
                produto.incluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Produto adicionado com sucesso!",
                        "codigo": produto.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir o produto: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um produto conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            //o código será extraída da URL (padrão REST)
            const codigo     = requisicao.params.codigo;
            const descricao  = requisicao.body.descricao;
            const preCusto = requisicao.body.preCusto;
            const preVenda = requisicao.body.preVenda;
            const estq = requisicao.body.estq;
            const urlImg  = requisicao.body.urlImg;
            const dtValidade = requisicao.body.dtValidade;
            const {categoria} = requisicao.categoria;
            //pseudo validação
            if (codigo > 0 && descricao && preCusto > 0 &&
                preVenda > 0 && estq >= 0 &&
                urlImg && dtValidade)
            {
                //alterar o produto
                const produto = new Produto(codigo,
                    descricao, preCusto, preVenda,
                    estq,urlImg,dtValidade, categoria);
                produto.alterar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Produto alterado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar o produto: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um produto conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE'){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            //pseudo validação
            if (codigo > 0)
            {
                //alterar o produto
                const produto = new Produto(codigo);
                produto.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Produto excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o produto: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido de um produto conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo;
            //evitar que código tenha valor undefined
            if (isNaN(codigo)){
                codigo = "";
            }

            const produto = new Produto();
            //método consultar retorna uma lista de produtos
            produto.consultar(codigo)
            .then((listaProdutos) =>{
                resposta.status(200).json(listaProdutos
                    /*{
                        "status": true,
                        "listaProdutos": listaProdutos
                    }*/
                );
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar produtos " + erro
                    }
                );
            });

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}