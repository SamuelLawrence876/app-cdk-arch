import { App, Stack, StackProps } from "aws-cdk-lib";
import {
  Distribution,
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from "@aws-cdk/aws-cloudfront";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { Bucket } from "@aws-cdk/aws-s3";

class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket = new Bucket(this, "MyBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    new BucketDeployment(this, "Deployment", {
      sources: [Source.asset("./public")],
      destinationBucket: bucket,
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity",
      {
        comment: "Allows CloudFront to access files in the S3 bucket",
      }
    );

    const distribution = new Distribution(this, "MyDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, "MyStack", {});
app.synth();
