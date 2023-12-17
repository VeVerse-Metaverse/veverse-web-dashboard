export const getErrMsg = (err: { code: number; message: string } | string) => {
  if (typeof err === "object" && err !== null)
    return `Error code: ${err.code}; \n Error message: ${err.message}`;
  else return err;
};
