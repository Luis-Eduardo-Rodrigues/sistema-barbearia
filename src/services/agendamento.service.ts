import { Status } from "../../generated/prisma";
import { AgendamentoRepository } from "../repositories/agendamento.repository";

export class AgendamentoService {
  private repository = new AgendamentoRepository();

  async criarAgendamento(user_id: string, data: Date, observacao?: string) {
    if (data < new Date()) {
      throw new Error("Não é possível agendar para uma data passada");
    }

    return this.repository.create({
      user_id,
      data,
      observacao,
    });
  }

  async listarPorUsuario(user_id: string) {
    return this.repository.findByUser(user_id);
  }

  async cancelarAgendamento(id: string) {
    return this.repository.updateStatus(id, Status.CANCELADO);
  }

  async concluirAgendamento(id: string) {
    return this.repository.updateStatus(id, Status.CONCLUIDO);
  }
}
