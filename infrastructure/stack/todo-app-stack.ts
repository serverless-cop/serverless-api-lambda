import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {GenericApi} from "../lib/GenericApi";

export class TodoAppStack extends GenericApi {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.addApi({
      lambdaId: 'hello',
      handlerName: 'todo-handler.ts',
      httpMethod: 'GET',
      apiPath: 'hello',
      environment: {}
    })

  }
}
