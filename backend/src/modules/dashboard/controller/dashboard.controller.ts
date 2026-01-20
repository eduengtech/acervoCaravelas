import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "../service/dashboard.service";
import { DashboardStatsDto } from "../Dto/DashboardStatsDto";
import { ApiResponse } from "@nestjs/swagger";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("stats")
  @ApiResponse({
    status: 200,
    description: "Estatísticas recuperadas com sucesso.",
    type: DashboardStatsDto,
  })
  async getStats(): Promise<DashboardStatsDto> {
    return this.dashboardService.getStats();
  }
}
