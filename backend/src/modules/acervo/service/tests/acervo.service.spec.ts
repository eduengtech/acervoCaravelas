import { Test, TestingModule } from "@nestjs/testing";
import { AcervoService } from "../acervo.service";

describe("AcervoService", () => {
  let service: AcervoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcervoService],
    }).compile();

    service = module.get<AcervoService>(AcervoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
