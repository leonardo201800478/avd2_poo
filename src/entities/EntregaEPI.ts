import { Entity, PrimaryColumn, CreateDateColumn, Column, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'

import { v4 as uuid } from 'uuid'

import { Funcionario } from './Funcionario'

@Entity('entregaEPI')
class EntregaEPI {

  @PrimaryColumn()
  id: string;

    //Não achei em lugar nenhum como se faz o OneToMany desse seu modo.

  @JoinColumn({ name: 'funcionario_id' })
  @ManyToOne(() => Funcionario)
  funcionarios: Funcionario;

  @Column()
  funcionario_id: string;

  @Column()
  nome_epi: string;

  @Column()
  data_entrega: Date;

  @Column()
  quantidade_entregue: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { EntregaEPI }