import { Status } from "../../generated/prisma";
import { prisma } from "../utils/prisma";

export class AgendamentoRepository {
  create(data: { user_id: string; data: Date; observacao?: string }) {
    return prisma.agendamento.create({
      data: {
        user_id: data.user_id,
        data: data.data,
        observacao: data.observacao,
      },
    });
  }

  findByDate(date: Date) {
    return prisma.agendamento.findMany({
      where: {
        data: date,
      },
    });
  }

  findByUser(user_id: string) {
    return prisma.agendamento.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        data: "asc",
      },
    });
  }

  updateStatus(id: string, status: Status) {
    return prisma.agendamento.update({
      where: {
        id_agendamento: id,
      },
      data: {
        status,
      },
    });
  }
}
