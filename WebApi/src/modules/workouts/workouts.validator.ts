import BaseValidator from "@abstracts/validator.abstract";
import { RequestHandler } from "express";
import { Create } from "./dtos/create.dto";
import { Update } from "./dtos/update.dto";

class Validator extends BaseValidator {
  public create: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "body", Create);
  };

  public update: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "body", Update);
  };
}

export default new Validator();
