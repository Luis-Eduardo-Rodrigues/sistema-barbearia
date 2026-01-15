import { prisma } from "../utils/prisma";

export class UserRepository {
  create(data: { nome: string; email: string; senha: string }) {
    return prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      },
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
