import Categoria from "../Modelo/categoria";

export default class CategoriaCtrl {
    gravar(req, res) {
        res.type('Application/json')
        if(req.method === 'POST') {
            const descricao = req.body.descricao
            if(descricao) {
                const cat = new Categoria(0, descricao)
                cat.gravar()
                .then(() => {
                    res.status(201).json(cat);
                })
                .catch((err) => {
                    res.status(500).json({
                        "message": "Não foi possivel incluir a categoria: "+err.message
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
        if(req.method === "GET") {
            let codigo = req.params.codigo
            if(isNaN(codigo)) {
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
}