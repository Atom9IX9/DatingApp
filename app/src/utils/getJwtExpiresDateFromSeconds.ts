export const getJwtExpiresDateFromSeconds = (s: number) => {
  const expiresDate = new Date();
  expiresDate.setSeconds(expiresDate.getSeconds() + s);
  
  return expiresDate
};
