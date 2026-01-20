import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AcervoService } from "../service/acervo.service";

@ApiTags("Acervo")
@Controller("acervo")
export class AcervoController {
  constructor(private readonly acervoService: AcervoService) {}

  @Get("recent")
  @ApiResponse({
    status: 200,
    description: "Dados do dashboard recuperados com sucesso.",
  })
  async getDashboardData() {
    return this.acervoService.getRecent();
  }
}
