export const handler = async (event: any): Promise<any> => {
  try {
    console.log(event);
    return event;
  } catch (error) {
    console.log(error);
  }
};
