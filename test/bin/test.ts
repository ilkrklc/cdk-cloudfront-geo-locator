#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TestStack } from '../lib/test-stack';

const app = new cdk.App();
new TestStack(app, 'TestStack', {
  env: { account: '976837651329', region: 'us-east-1' },
});
