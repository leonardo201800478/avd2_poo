import { getCustomRepository } from 'typeorm'
import { FuncionarioRepository } from '../repositories/FuncionarioRepository'

interface IFuncionarioCreate {
  nome: string;
  cpf: string;
  funcao: string
}

interface IFuncionarioShow {
  id: string
}

interface IFuncionarioUpdate {
  id: string
  nome: string;
  cpf: string;
  funcao: string
}

class FuncionarioServices {

  async create({ nome, cpf, funcao }: IFuncionarioCreate) {

    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    const cpfAlreadyExists = await funcionarioRepository.findOne({
      cpf
    })

    if (cpfAlreadyExists) {
      throw new Error('Esse CPF ja existe!!')
    }

    const funcionarios = funcionarioRepository.create({
      nome,
      cpf,
      funcao
    })

    await funcionarioRepository.save(funcionarios)

    return funcionarios
  }

  async index() {
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    const funcionarios = await funcionarioRepository.find()

    return funcionarios;
  }

  async show({ id }: IFuncionarioShow) {
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    const funcionarios = await funcionarioRepository.findOne({ id })

    console.log(funcionarios)

    if (!funcionarios) {
      throw new Error('Id do funcionario nao encontrado!!')
    }

    return funcionarios;
  }

  async delete({ id }: IFuncionarioShow) {
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    const funcionarios = await funcionarioRepository.findOne({ id })

    if (!funcionarios) {
      throw new Error('Id do funcionario nao encontrado!!')
    }

    return await funcionarioRepository.delete({ id })
  }

  async update({ id, nome, cpf, funcao }: IFuncionarioUpdate) {
    const funcionarioRepository = getCustomRepository(FuncionarioRepository)

    let funcionarios = await funcionarioRepository.findOne({ id })

    if (!funcionarios) {
      throw new Error('Id do funcionario nao encontrado!!')
    }
    await funcionarioRepository.update(
      id, {
      nome,
      cpf,
      funcao
    })
    funcionarios = await funcionarioRepository.findOne({ id })
    return funcionarios
  }
}
export { FuncionarioServices }