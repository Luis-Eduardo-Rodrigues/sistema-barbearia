import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

export class UserService {
  private repository = new UserRepository();

  async createUser(nome: string, email: string, senha: string) {
    return this.repository.create({
      nome,
      email,
      senha,
    });
  }

  async login(email: string, senha: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const comparePw = await bcrypt.compare(senha, user.senha);

    if (!comparePw) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      { id: user.id_user, email: user.email, nome: user.nome },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}
