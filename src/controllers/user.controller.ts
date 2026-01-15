import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";

export class UserController {
  private service = new UserService();

  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ mensage: "Todos campos devem ser preenchidos!" });
      }

      const pwHash = await bcrypt.hash(senha, 10);

      const user = await this.service.createUser(nome, email, pwHash);

      return res.status(201).json({ mensage: "Usuário cadastrado!", user });
    } catch (error) {
      res.status(400).json({ mensage: "Erro interno no servidor" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos devem ser preenchidos" });
      }

      const token = await this.service.login(email, senha);

      return res.status(200).json({
        mensagem: "Usuário logado com sucesso",
        token,
      });
    } catch (error: any) {
      return res.status(400).json({
        mensagem: error.message,
      });
    }
  }
}
