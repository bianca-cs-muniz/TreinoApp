import BaseValidator from "@abstracts/validator.abstract";
import { RequestHandler } from "express";
import { UpdateSetLog } from "./dtos/update-set-log.dto";
import { Finish } from "./dtos/finish.dto";

class Validator extends BaseValidator {
  public updateSetLog: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "body", UpdateSetLog);
  };

  public finish: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "body", Finish);
  };
}

export default new Validator();
