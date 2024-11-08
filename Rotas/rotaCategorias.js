import { Router } from 'express'
import CategoriaCtrl from '../Controle/categoriaCtrl'

const catCtrl = new CategoriaCtrl()
export const rotaCategoria = Router()

rotaCategoria.post('/', catCtrl.gravar)
rotaCategoria.get('/', catCtrl.consultar)
rotaCategoria.get('/:codigo', catCtrl.consultar)
rotaCategoria.put('/:codigo', catCtrl.editar)
rotaCategoria.delete('/:codigo', catCtrl.excluir)
