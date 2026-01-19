import { Request, Response } from "express";
import { AgendamentoService } from "../services/agendamento.service";

export class AgendamentoController {
  private service = new AgendamentoService();

  async criar(req: Request, res: Response) {
    try {
      const { user_id, data, observacao } = req.body;

      const agendamento = await this.service.criarAgendamento(
        user_id,
        new Date(data),
        observacao
      );

      return res.status(201).json(agendamento);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarPorUsuario(req: Request, res: Response) {
    const { user_id } = req.params;

    const agendamentos = await this.service.listarPorUsuario(user_id);
    return res.json(agendamentos);
  }

  async cancelar(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.cancelarAgendamento(id);
    return res.status(204).send();
  }
}
