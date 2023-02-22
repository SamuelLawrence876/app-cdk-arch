// download the latest version of code from github repository and store it in s3 bucket
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const handler = async (): Promise<void> => {
  const repoName = process.env.GITHUB_REPO;
  const s3Bucket = process.env.S3_BUCKET;
  const s3Key = process.env.S3_KEY;

  const s3 = new S3Client({ region: "us-east-1" });

  // downloadArchive function is used to download the latest version of code from github repository
  //   downloadArchive(repoName);
  //   uploadArchive(archive, s3Bucket, s3Key);
};

const downloadArchive = async (repoName: string): Promise<void> => {};
const uploadArchive = async (
  archive: any,
  s3Bucket: string,
  s3Key: string
): Promise<void> => {};
