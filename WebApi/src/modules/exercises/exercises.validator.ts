import BaseValidator from "@abstracts/validator.abstract";
import { RequestHandler } from "express";
import { Search } from "./dtos/search.dto";

class Validator extends BaseValidator {
  public search: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, "query", Search);
  };
}

export default new Validator();
