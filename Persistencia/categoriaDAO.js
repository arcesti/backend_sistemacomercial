import Categoria from "../Modelo/categoria.js";
import conectar from "./Conexao.js"
export default class CategoriaDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(45) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(codigo)
                )
            `
            await conexao.execute(sql);
            await conexao.release();

        } catch (erro) {
            console.log("Erro ao iniciar tabela categoria: " + erro.message);
        }
    }

    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO categoria(descricao) VALUES (?)
            `;
            const parametros = [categoria.descricao];
            const resultado = await conexao.execute(sql, parametros);
            categoria.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const sql = `
                UPDATE categoria SET descricao=? WHERE codigo = ?
            `;
            const parametros = [categoria.descricao, categoria.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const conexao = await conectar();
            const [produtos, campos] = await conexao.query(
                "SELECT * FROM produto WHERE cod_cat = ?",
                categoria.codigo
            );
            if (produtos.length === 0) {
                const sql = `
                    DELETE FROM categoria WHERE codigo = ?
                `;
                const parametros = [categoria.codigo];
                await conexao.execute(sql, parametros);
                await conexao.release();
            }
            await conexao.release();
        }
    }

    async consultar(codigo) {
        const conexao = await conectar();
        let sql = ""
        if (codigo === "") {
            sql = `
                SELECT * FROM categoria ORDER BY descricao
            `;
        }
        else {
            sql = `SELECT * FROM categoria WHERE codigo = ?`
        }
        let [registro, campos] = await conexao.query(sql, codigo)
        let listaCategorias = [];
        registro.map((reg) => {
            const categoria = new Categoria(reg['codigo'], reg['descricao']);
            listaCategorias.push(categoria);
        })
        return listaCategorias;
    }
}