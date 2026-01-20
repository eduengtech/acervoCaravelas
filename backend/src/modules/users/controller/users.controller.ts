import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../service/users.service";
import { CreateUsersDto } from "../dto/create-users.dto";
import { UpdateUserDto } from "../dto/update-users.dto";
import { JwtAuhGuards } from "../../auth/guards/jwtAuthGuards";
import { Role } from "@prisma/client";
import { RolesGuard } from "src/modules/auth/roles.guard";
import { Roles } from "src/modules/auth/decorators/roles.decorator";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuhGuards, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @Post()
  @ApiOperation({ summary: "Cria um novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso." })
  @ApiResponse({ status: 400, description: "Dados inválidos." })
  create(@Body() data: CreateUsersDto, @Req() req: AuthenticatedRequest) {
    const userLoggedRole = req.user.role;
    return this.usersService.create(data, userLoggedRole);
  }

  @UseGuards(JwtAuhGuards, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiBearerAuth("access-token")
  @Get("me")
  @ApiOperation({ summary: "Retorna os dados do usuário autenticado" })
  @ApiResponse({ status: 200, description: "Dados do usuário retornados" })
  @ApiResponse({ status: 401, description: "Token inválido ou ausente" })
  findMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.findMe(req.user.id);
  }

  @UseGuards(JwtAuhGuards)
  @ApiBearerAuth("access-token")
  @Patch(":id")
  @ApiOperation({ summary: "Atualiza os dados de um usuário" })
  @ApiParam({ name: "id", description: "ID do usuário" })
  @ApiResponse({ status: 200, description: "Usuário atualizado com sucesso." })
  @ApiResponse({ status: 400, description: "Dados inválidos." })
  @ApiResponse({ status: 404, description: "Usuário não encontrado." })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.usersService.update(id, data, req.user.id, req.user.role);
  }

  @UseGuards(JwtAuhGuards, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth("access-token")
  @Delete(":id")
  @ApiOperation({ summary: "Remove um usuário" })
  @ApiParam({ name: "id", description: "ID do usuário" })
  @ApiResponse({ status: 200, description: "Usuário removido com sucesso." })
  @ApiResponse({ status: 404, description: "Usuário não encontrado." })
  remove(@Param("id", ParseUUIDPipe) id: string, @Req() req: AuthenticatedRequest) {
    return this.usersService.remove(id, req.user.role);
  }
}
