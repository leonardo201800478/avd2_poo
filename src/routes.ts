import { Router } from 'express'

import { EntregaEPIController } from './controllers/EntregaEPIController'

import { FuncionarioController } from './controllers/FuncionarioController'

const routes = Router();

const entregaEPIController = new EntregaEPIController()

const funcionarioController = new FuncionarioController()

routes.post('/entregaEPI', entregaEPIController.create)
routes.get('/entregaEPI', entregaEPIController.index)
routes.get('/entregaEPI/:id', entregaEPIController.show)
routes.delete('/entregaEPI/:id', entregaEPIController.delete)
routes.put('/entregaEPI/:id', entregaEPIController.update)

routes.post('/funcionario', funcionarioController.create)
routes.get('/funcionario', funcionarioController.index)
routes.get('/funcionario/:id', funcionarioController.show)
routes.delete('/funcionario/:id', funcionarioController.delete)
routes.put('/funcionario/:id', funcionarioController.update)

export { routes }