import { Router } from 'express'
import CategoriaCtrl from '../Controle/categoriaCtrl.js'

const catCtrl = new CategoriaCtrl()
const rotaCategoria = Router()

rotaCategoria.post('/', catCtrl.gravar)
rotaCategoria.get('/', catCtrl.consultar)
rotaCategoria.get('/:codigo', catCtrl.consultar)
rotaCategoria.put('/:codigo', catCtrl.editar)
rotaCategoria.delete('/:codigo', catCtrl.excluir)

export default rotaCategoria
