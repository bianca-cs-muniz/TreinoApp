import * as fs from "fs/promises";
import * as path from "path";

const INDEX_ROUTES_PATH = path.join(__dirname, "src", "routes", "index.ts");

const pascalCase = (name: string) =>
  name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const camelCase = (name: string) => {
  const pascal = pascalCase(name);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const createModule = async (moduleName: string, prismaDelegate?: string) => {
  const modulePath = path.join(__dirname, "src", "modules", moduleName);
  const delegate = prismaDelegate ?? camelCase(moduleName);

  // Verifique se o módulo já existe
  try {
    await fs.access(modulePath);
    console.error(`O módulo "${moduleName}" já existe.`);
    return;
  } catch (error) {
    // O módulo não existe, continue com a criação
  }

  // Crie a estrutura de pastas
  await fs.mkdir(modulePath, { recursive: true });

  // Crie a pasta "dtos"
  const dtoPath = path.join(modulePath, "dtos");
  await fs.mkdir(dtoPath);

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.controller.ts`),
    generateControllerContent(moduleName)
  );

  await fs.writeFile(
    path.join(dtoPath, "create.dto.ts"),
    generateCreateDtoContent()
  );
  await fs.writeFile(
    path.join(dtoPath, "update.dto.ts"),
    generateUpdateDtoContent()
  );

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.repository.ts`),
    generateRepositoryContent(delegate)
  );

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.validator.ts`),
    generateValidatorContent()
  );

  await fs.writeFile(
    path.join(modulePath, `${moduleName}.routes.ts`),
    generateRoutesContent(moduleName)
  );
  await fs.writeFile(
    path.join(modulePath, `${moduleName}.service.ts`),
    generateServiceContent(moduleName)
  );

  await registerModuleInIndexRoutes(moduleName);

  console.log(`Módulo "${moduleName}" criado com sucesso.`);
  console.log(
    `Repository apontando para prisma.${delegate}. Confira se esse model existe no schema.prisma (rode "npm run prisma:migrate" se precisar criar/ajustar).`
  );
};

async function registerModuleInIndexRoutes(moduleName: string) {
  const routesVar = `${pascalCase(moduleName)}Routes`;
  const importLine = `import ${routesVar} from "../modules/${moduleName}/${moduleName}.routes";`;
  const useLine = `router.use("/${moduleName}", ${routesVar});`;

  const content = await fs.readFile(INDEX_ROUTES_PATH, "utf-8");

  if (content.includes(importLine)) {
    // já registrado, nada a fazer.
    return;
  }

  const withImport = content.replace(
    /const router = Router\(\);/,
    `${importLine}\n\nconst router = Router();`
  );

  const withUse = withImport.replace(
    /export default router;/,
    `${useLine}\n\nexport default router;`
  );

  await fs.writeFile(INDEX_ROUTES_PATH, withUse);
}

function generateControllerContent(moduleName: string) {
  return `import { Request, Response } from "express";
import Service from "./${moduleName}.service";
import { TryCatch } from "@decorators/try-catch.decorator";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

class Controller {
  @TryCatch()
  public async create(req: Request, res: Response) {
    const result = await Service.create(req.body as createDto);
    res.status(201).json(result);
  }

  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const result = await Service.findAll();
    res.status(200).json(result);
  }

  @TryCatch()
  public async readById(req: Request, res: Response) {
    const result = await Service.readById(req.params.id);
    res.status(200).json(result);
  }

  @TryCatch()
  public async update(req: Request, res: Response) {
    const result = await Service.update(req.params.id, req.body as UpdateDto);
    res.status(200).json(result);
  }

  @TryCatch()
  public async delete(req: Request, res: Response) {
    const result = await Service.delete(req.params.id);
    res.status(200).json(result);
  }
}

export default new Controller();
`;
}

function generateRepositoryContent(prismaDelegate: string) {
  return `import { prisma } from "@database/data-source";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

class Repository {
  private readonly repository;

  constructor() {
    // ATENÇÃO: confira se o model no schema.prisma corresponde ao delegate abaixo.
    // (o Prisma Client expõe cada model em camelCase do nome definido no schema).
    this.repository = prisma.${prismaDelegate};
  }

  public findAll() {
    return this.repository.findMany();
  }

  public readById(id: string) {
    return this.repository.findUnique({
      where: { id },
    });
  }

  public create(data: createDto) {
    return this.repository.create({
      data,
    });
  }

  public update(id: string, data: UpdateDto) {
    return this.repository.update({
      where: { id },
      data,
    });
  }

  public delete(id: string) {
    return this.repository.delete({
      where: { id },
    });
  }
}

export default new Repository();
`;
}

function generateRoutesContent(moduleName: string) {
  return `import { Router } from "express";
import Controller from "./${moduleName}.controller";
import Validator from "./${moduleName}.validator";
// Proteja as rotas quando necessário, seguindo o padrão de "usuarios":
// import { authMiddleware } from "@middlewares/authMiddleware";

const router = Router();

router
  .route("/")
  .get(Validator.queryParams, Controller.findAll)
  .post(Validator.create, Controller.create);

router
  .route("/:id")
  .get(Validator.pathParams, Controller.readById)
  .put(Validator.pathParams, Validator.update, Controller.update)
  .delete(Validator.pathParams, Controller.delete);

export default router;
`;
}

function generateServiceContent(moduleName: string) {
  return `import Repository from "./${moduleName}.repository";
import { createDto } from "./dtos/create.dto";
import { UpdateDto } from "./dtos/update.dto";

class Service {
  public async create(data: createDto) {
    return await Repository.create(data);
  }

  public async findAll() {
    return await Repository.findAll();
  }

  public async readById(id: string) {
    return await Repository.readById(id);
  }

  public async update(id: string, data: UpdateDto) {
    return await Repository.update(id, data);
  }

  public async delete(id: string) {
    return await Repository.delete(id);
  }
}

export default new Service();
`;
}

function generateCreateDtoContent() {
  return `import { z } from "zod";

export const Create = z.object({
  // defina as propriedades de criação aqui
});

export type createDto = z.output<typeof Create>;
`;
}

function generateUpdateDtoContent() {
  return `import { z } from "zod";

export const Update = z.object({
  // defina as propriedades de atualização aqui
});

export type UpdateDto = z.output<typeof Update>;
`;
}

function generateValidatorContent() {
  return `import BaseValidator from "@abstracts/validator.abstract";
import { RequestHandler } from "express";
import { Create } from "./dtos/create.dto";
import { Update } from "./dtos/update.dto";

// pathParams e queryParams já vêm prontos de BaseValidator.
class Validator extends BaseValidator {
  public create: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "body", Create);
  };

  public update: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "body", Update);
  };
}

export default new Validator();
`;
}

const args = process.argv.slice(2);

if (args.length < 1 || args.length > 2) {
  console.error("Uso: tsx generateModule.ts <nome-do-modulo> [delegate-do-prisma]");
  process.exit(1);
}

const [moduleName, prismaDelegate] = args;
createModule(moduleName, prismaDelegate);
