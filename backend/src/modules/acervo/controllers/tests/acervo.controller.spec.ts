import { Test, TestingModule } from "@nestjs/testing";
import { AcervoController } from "../acervo.controller";

describe("AcervoController", () => {
  let controller: AcervoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcervoController],
    }).compile();

    controller = module.get<AcervoController>(AcervoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
