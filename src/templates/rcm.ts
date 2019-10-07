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
      .get(this.path, this.all)
      .post(this.path, this.add);

    // GET, MOD AND DEL
    this.router
      .get(\`\${this.path}/:${name}_id\`, this.get)
      .patch(\`\${this.path}/:${name}_id\`, this.mod)
      .delete(\`\${this.path}/:${name}_id\`, this.del);
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

  private model = model;

  public async all(request: MyRequest) {
    // const query = request.query;
    try {
      return await this.model.find();
    } catch (error) {
      throw new Exception(500, error);
    }
  }

  public async get(request: MyRequest) {
    const params = request.params;
    try {
      return await this.model.findById(params.${name}_id);
    } catch (error) {
      throw new Exception(500, error);
    }
  }

  public async add(request: MyRequest) {
    // const files = request.files;
    const body = request.body;
    const save = new this.model({
      ...body,
    });
    try {
      return await save.save();
    } catch (error) {
      throw new Exception(500, error);
    }
  }

  public async mod(request: MyRequest) {
    const params = request.params;
    // const files = request.files;
    const body = request.body;
    try {
      return await this.model.findByIdAndUpdate(params.${name}_id, body, { new: true });
    } catch (error) {
      throw new Exception(500, error);
    }
  }

  public async del(request: MyRequest) {
    const params = request.params;
    try {
      return await this.model.findByIdAndDelete(params.${name}_id);
    } catch (error) {
      throw new Exception(500, error);
    }
  }

}

export default new ${cname}Controller();\n`,
    models: `// AUTO GENERATED [RCM: https://github.com/panelssh/ets-extension]
// dependency
import { Document, Schema, model } from 'mongoose';
// interface
// import { ${cname} } from '../interfaces';

const schema = new Schema({
  name: {
    type: String,
  },
});

export default model<Document>('${cname}', schema);\n`,
  }
}
