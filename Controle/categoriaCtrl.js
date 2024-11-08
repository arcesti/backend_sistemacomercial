import Categoria from "../Modelo/categoria.js";

export default class CategoriaCtrl {
    gravar(req, res) {
        res.type('Application/json')
        if (req.method === 'POST') {
            const descricao = req.body.descricao
            if (descricao) {
                const cat = new Categoria(0, descricao)
                cat.gravar()
                    .then(() => {
                        res.status(201).json(cat);
                    })
                    .catch((err) => {
                        res.status(500).json({
                            "message": "Não foi possivel incluir a categoria: " + err.message
                        })
                    })
            }
            else {
                res.status(400).json({
                    "message": "Descrição inválida"
                })
            }
        }
        else {
            res.status(400).json({
                "message": "Metodo inválido"
            })
        }
    }

    consultar(req, res) {
        res.type('Application/json')
        if (req.method === "GET") {
            let codigo = req.params.codigo
            if (isNaN(codigo)) {
                codigo = ""
            }
            const cat = new Categoria()
            cat.consultar(codigo)
                .then((listaCat) => {
                    res.status(200).json(listaCat)
                })
                .catch((err) => {
                    res.status(500).json({
                        "message": "Não foi possivel recuperar a categoria: " + err.message
                    })
                })
        }
        else {
            res.status(400).json({
                "message": "Metodo inválido"
            })
        }
    }

    excluir(req, res) {
        res.type('Application/json')
        let codigo = req.params.codigo
        if (req.method === 'DELETE') {
            if (codigo > 0) {
                const cat = new Categoria(codigo)
                cat.excluir()
                    .then(() => {
                        res.status(200).json({
                            "message": `Categoria codigo: ${codigo} excluida com sucesso`
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            "message": "Erro ao excluir categoria: " + err.message
                        })
                    })
            } else {
                res.status(400).json({
                    "message": `Codigo inválido`
                })
            }
        } else {
            res.status(400).json({
                "message": "Requisição inválida"
            })
        }
    }

    editar(req, res) {
        res.type('Application/json')

        if (req.method === 'PUT') {
            const catDescr = req.body.descricao
            const codigo = req.params.codigo
            if (novaCat) {
                const cat = new Categoria(codigo, catDescr)
                cat.editar()
                    .then(() => res.status(200).json({ "Categoria atualizada": cat }))
                    .catch((err) => res.status(500).json({ "message": "Erro ao atualizar categoria: " + err.message }))
            }
            else {
                res.status(400).json({ message: "Descrição enviada não é válida" })
            }
        }
        else {
            res.status(400).json({ message: "Requisição inválida" })
        }
    }
}