import S3 from "react-aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

export const configAWS = {
  bucketName: "aaron-table-tennis",
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

export const uploadImage = async(image, imageName) => {
    const ReactS3Client = new S3(configAWS);
    await ReactS3Client.uploadFile(image, imageName);
}
