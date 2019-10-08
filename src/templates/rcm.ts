export default function (name: string, cname: string) {
  return {
    routers: `// AUTO GENERATED [RCM: https://github.com/panelssh/ets-extension]
// dependency
import { Router, Response, NextFunction } from 'express';
// core
import MyRouter from '../core/router';
import MyRequest from '../core/request';
// controller
import controller from '../controllers/${name}';
// dto
import * as dto from '../dto/${name}';
// middleware
import { validationQuery, validationBody } from '../middleware/validation';
import { validationId } from '../middleware/${name}';

class ${cname}Router implements MyRouter {

  public path = '${name}';
  public router = Router({ caseSensitive: true, mergeParams: true });

  constructor(version: string) {
    this.path = \`/\${version}/\${this.path}\`;
    this.init();
  }

  private init() {
    // LIST AND ADD
    this.router
      .get(this.path, validationQuery(dto.${cname}List), this.all)
      .post(this.path, validationBody(dto.${cname}Add), this.add);

    // GET, MOD AND DEL
    this.router
      .get(\`\${this.path}/:${name}_id\`, validationId, this.get)
      .patch(\`\${this.path}/:${name}_id\`, validationBody(dto.${cname}Mod), this.mod)
      .delete(\`\${this.path}/:${name}_id\`, validationId, this.del);
  }

  private async all(request: MyRequest, response: Response, next: NextFunction) {
    let res;
    try {
      res = await controller.all(request);
    } catch (error) {
      return next(error);
    }

    response.send(res);
  }

  private async get(request: MyRequest, response: Response, next: NextFunction) {
    let res;
    try {
      res = await controller.get(request);
    } catch (error) {
      return next(error);
    }

    response.send(res);
  }

  private async add(request: MyRequest, response: Response, next: NextFunction) {
    let res;
    try {
      res = await controller.add(request);
    } catch (error) {
      return next(error);
    }

    response.send(res);
  }

  private async mod(request: MyRequest, response: Response, next: NextFunction) {
    let res;
    try {
      res = await controller.mod(request);
    } catch (error) {
      return next(error);
    }

    response.send(res);
  }

  private async del(request: MyRequest, response: Response, next: NextFunction) {
    let res;
    try {
      res = await controller.del(request);
    } catch (error) {
      return next(error);
    }

    response.send(res);
  }

}

export default ${cname}Router;\n`,
    controllers: `// AUTO GENERATED [RCM: https://github.com/panelssh/ets-extension]
// dependency
import { isNumber, toNumber } from 'lodash';
// core
import { Exception } from '../core/exception';
import MyRequest from '../core/request';
// model
import model from '../models/${name}';

class ${cname}Controller {

  public async all(request: MyRequest) {
    // const query = request.query;

    let ${name};
    try {
      ${name} = await model.find().select('-password');
    } catch (error) {
      throw new Exception(500, error);
    }

    return ${name};
  }

  public async get(request: MyRequest) {
    const params = request.params;

    let ${name};
    try {
      ${name} = await model.findById(params.${name}_id).select('-password');
    } catch (error) {
      throw new Exception(500, error);
    }

    return ${name};
  }

  public async add(request: MyRequest) {
    // const files = request.files;
    const body = request.body;

    let ${name};
    const save = new model({ ...body });
    try {
      ${name} = await save.save();
    } catch (error) {
      throw new Exception(500, error);
    }

    return ${name};
  }

  public async mod(request: MyRequest) {
    const params = request.params;
    // const files = request.files;
    const body = request.body;

    let ${name};
    try {
      ${name} = await model.findByIdAndUpdate(params.${name}_id, body, { new: true });
    } catch (error) {
      throw new Exception(500, error);
    }

    return ${name};
  }

  public async del(request: MyRequest) {
    const params = request.params;

    let ${name};
    try {
      ${name} = await model.findByIdAndDelete(params.${name}_id);
    } catch (error) {
      throw new Exception(500, error);
    }

    return ${name};
  }

}

export default new ${cname}Controller();\n`,
    models: `// AUTO GENERATED [RCM: https://github.com/panelssh/ets-extension]
// dependency
import { Document, Schema, model } from 'mongoose';
// interface
import { ${cname} } from '../interfaces';

const schema = new Schema({
  name: {
    type: String,
  },
});

export default model<${cname} & Document>('${cname}', schema);\n`,
    middleware: `// AUTO GENERATED [RCM: https://github.com/panelssh/ets-extension]
// dependency
import { Response, NextFunction } from 'express';
// core
import MyRequest from '../core/request';
import { HttpException } from '../core/exception';
// model
import model from '../models/${name}';

export async function validationId(request: MyRequest, response: Response, next: NextFunction) {
  const params = request.params;

  if (params.${name}_id === undefined) return next(new HttpException(404, 'page not found'));

  let ${name};
  try {
    ${name} = await model.findById(params.${name}_id);
  } catch (error) {
    return next(new HttpException(404, 'page not found'));
  }

  if (${name} === null) return next(new HttpException(404, 'page not found'));

  next();
}\n`,
    dto: `// AUTO GENERATED [RCM: https://github.com/panelssh/ets-extension]
// dependency
import {  IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// dto
import List from './_list';

export class ${cname}List extends List {

  @IsOptional()
  @IsIn(['name'])
  public sorts: string;

  // @IsOptional()
  // @IsIn([])
  // public where: string;

  // @IsOptional()
  // @IsString()
  // public value: string;

}

export class ${cname}Add {

  @IsNotEmpty()
  @IsString()
  public name: string;

}

export class ${cname}Mod {

  @IsNotEmpty()
  @IsString()
  public name: string;

}\n`,
    interfaces: `export interface ${cname} {
  name: string;
}\n\n`,
  };
}
