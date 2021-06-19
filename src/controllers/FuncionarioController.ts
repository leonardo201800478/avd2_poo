import { Request, response, Response } from 'express'
import { FuncionarioServices } from '../services/FuncionarioServices'

class FuncionarioController {

  async create(request: Request, response: Response) {
    const { 
        nome,
        cpf,
        funcao  } = request.body

    const funcionarioServices = new FuncionarioServices()

    try {
      const funcionarios = await funcionarioServices.create({ 
          nome,
          cpf,
          funcao  })
      return response.json(funcionarios)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const funcionarioServices = new FuncionarioServices()

    try {
      const funcionarios = await funcionarioServices.index()
      return response.json(funcionarios)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async show(request: Request, response: Response) {
    const funcionarioServices = new FuncionarioServices()
    const { id } = request.params

    try {
      const funcionarios = await funcionarioServices.show({ id })
      return response.json(funcionarios)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async delete(request: Request, response: Response) {
    const funcionarioServices = new FuncionarioServices()
    const { id } = request.params

    try {
      const funcionarios = await funcionarioServices.delete({ id })
      return response.json({ message: 'Id do funcionario deletado!!' })
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async update(request: Request, response: Response) {
    const { nome,
        cpf,
        funcao } = request.body
    const { id } = request.params

    const funcionarioServices = new FuncionarioServices()

    try {
      const funcionarios = await funcionarioServices.update({ id,
        nome,
        cpf,
        funcao })
      return response.json(funcionarios)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }
}
export { FuncionarioController }