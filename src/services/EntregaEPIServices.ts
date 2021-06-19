import { getCustomRepository } from 'typeorm'
import { EntregaEPIRepository } from '../repositories/EntregaEPIRepository'

interface IEntregaEPICreate {
  funcionario_id: string;
  nome_epi: string;
  data_entrega: Date;
  quantidade_entregue: number;
}

interface IEntregaEPIUpdate {
  id: string;
  funcionario_id: string;
  nome_epi: string;
  data_entrega: Date;
  quantidade_entregue: number;
}

interface IEntregaEPIShow {
  id: string
}

class EntregaEPIServices {
  async create({ 
    funcionario_id,
    nome_epi,
    data_entrega,
    quantidade_entregue
 }: IEntregaEPICreate) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository)

    const entregaEPI = entregaEPIRepository.create({
        funcionario_id,
        nome_epi,
        data_entrega,
        quantidade_entregue
    })

    await entregaEPIRepository.save(entregaEPI)

    return entregaEPI
  }
  async index() {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository)

    const entregaEPI = await entregaEPIRepository.find({
      relations: ['funcionarios', 'entregaEPI']
    })

    return entregaEPI
  }

  async show({ id }: IEntregaEPIShow) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository)

    const entregaEPI = await entregaEPIRepository.findOne(id, {
      relations: ['funcionarios', 'entregaEPI']
    })

    return entregaEPI
  }

  async delete({ id }: IEntregaEPIShow) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository)

    const entregaEPI = await entregaEPIRepository.findOne({ id })

    if (!entregaEPI) {
      throw new Error('Id da entrega nao encontrado!!!')
    }

    return await entregaEPIRepository.delete({ id })
  }

  async update({ 
    id,
    funcionario_id,
    nome_epi,
    data_entrega,
    quantidade_entregue
 }: IEntregaEPIUpdate) {
    const entregaEPIRepository = getCustomRepository(EntregaEPIRepository)

    let entregaEPID = await entregaEPIRepository.findOne({ id })

    if (!entregaEPID) {
      throw new Error('Id da entrega nao encontrado!!!')
    }

    const entregaEPIUpdated = await entregaEPIRepository.update(id, {
        funcionario_id,
        nome_epi,
        data_entrega,
        quantidade_entregue
    })
    entregaEPID = await entregaEPIRepository.findOne(id)
    return entregaEPID
  }
}
export { EntregaEPIServices }