import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {join} from "path";
import config from "../config/config";
import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";

export interface ApiProps {
    lambdaId: string
    handlerName: string
    httpMethod: string
    apiPath: string
    environment: any
}

export abstract class GenericApi extends cdk.Stack {
    private lambda: NodejsFunction | undefined
    public lambdaIntegration: LambdaIntegration;
    private api: RestApi

    public constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope, id, props);
        // this.props = props
        this.api = new RestApi(this, id)
    }

    protected addApi(props: ApiProps){
        const lambdaId = config.account + '-' + config.env + '-' + props.lambdaId
        this.lambda = new NodejsFunction(this, lambdaId, {
            entry: join(__dirname, '..', '..','src', 'handler', props.handlerName),
            handler: 'handler',
            functionName: lambdaId,
            environment: props.environment
        })
        this.lambdaIntegration = new LambdaIntegration(this.lambda)
        const lambdaResource = this.api.root.addResource(props.apiPath)
        lambdaResource.addMethod(props.httpMethod, this.lambdaIntegration)
    }

}