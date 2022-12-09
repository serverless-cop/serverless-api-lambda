#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoAppStack } from '../stack/todo-app-stack';

const app = new cdk.App();

new TodoAppStack(app, 'TodoApiStack', {

});