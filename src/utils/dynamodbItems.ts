import { getPreSignedUrl } from "@lib/s3";

const getKeyFromLocation = (location: string) => {
  const url = new URL(location);
  return url.pathname.substring(1);
};

export const addPresignedUrlInItems = async (
  items: Record<string, any>[],
  BucketName: string
) => {
  const updatedItems = [];

  for (const item of items) {
    updatedItems.push({
      ...item,
      fileLocation: await getPreSignedUrl(
        "getObject",
        BucketName,
        getKeyFromLocation(item.fileLocation)
      ),
    });
  }

  return updatedItems;
};
