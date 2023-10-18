import { S3 } from "aws-sdk";
import { GetObjectOutput } from "aws-sdk/clients/s3";

const s3 = new S3({
  apiVersion: "latest",
});

export const getPreSignedUrl = async (
  methodType: string,
  bucketName: string,
  key: string
) => {
  return await s3.getSignedUrlPromise(methodType, {
    Bucket: bucketName,
    Key: key,
    Expires: 900,
  });
};

export const uploadFile = async (
  bucketName: string,
  key: string,
  data: Buffer
) => {
  return await s3
    .upload({
      Bucket: bucketName,
      Key: key,
      Body: data,
    })
    .promise();
};

export const getFile = async (
  bucketName: string,
  key: string
): Promise<GetObjectOutput> => {
  return await s3
    .getObject({
      Bucket: bucketName,
      Key: key,
    })
    .promise();
};

export const getFileStream = async (bucketName: string, key: string) => {
  return s3
    .getObject({
      Bucket: bucketName,
      Key: key,
    })
    .createReadStream();
};
