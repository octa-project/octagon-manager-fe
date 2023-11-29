
const sleep = async (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

export {
  sleep
};
