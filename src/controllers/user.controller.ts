import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";

import { loginSchema, createSchema } from "../schemas/user.schema";
import { ZodError } from "zod";

import formatZodErrors from "../utils/formaterErros";

export class UserController {
  private service = new UserService();

  async create(req: Request, res: Response) {
    try {
      const parsed = createSchema.parse(req.body);

      const pwHash = await bcrypt.hash(parsed.senha, 10);

      const user = await this.service.createUser(
        parsed.nome,
        parsed.email,
        pwHash
      );

      return res.status(201).json({ mensage: "Usuário cadastrado!", user });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: formatZodErrors(error),
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const parsed = loginSchema.parse(req.body);

      const token = await this.service.login(parsed.email, parsed.senha);

      return res.status(200).json({
        mensagem: "Usuário logado com sucesso",
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: formatZodErrors(error),
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor",
      });
    }
  }
}
