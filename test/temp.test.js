const { expect } =  require('chai');

const getKeyFromLocation = (location) => {
  const url = new URL(location);
  return url.pathname.substring(1);
};

describe('Testing', () => {
  it('should do something', () => {
    const fileLocationUrl = "https://my-bucket.s3.amazonaws.com/file.csv";
    const key = getKeyFromLocation(fileLocationUrl);

    expect(key).to.equal("file.csv")
  });
});