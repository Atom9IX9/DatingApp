export const getShortValuesFromSetCookies = (headers: Headers) => {
  const cookieValues = headers.getSetCookie();
  const shortCookieValues: string[] = [];

  cookieValues.forEach((val) => {
    const start = val.indexOf("=") + 1;
    const end = val.indexOf(";");
    shortCookieValues.push(val.substring(start, end));
  });

  return shortCookieValues;
};
