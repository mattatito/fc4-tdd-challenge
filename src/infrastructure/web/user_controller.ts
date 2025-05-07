import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { CreateUserDTO } from "../../application/dtos/create_user_dto";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    const createUserDto: CreateUserDTO = {
      name: req.body.name,
    };

    if (createUserDto.name === "") {
      return res.status(400).json({ message: "O campo nome é obrigatório." });
    }

    await this.userService.save(createUserDto);

    return res.status(201).json({
      message: "User created successfully",
    });
  }
}
