import got from "got";

export const getJSONFromWWWPromise = async (url) => {
  return await got(url, { responseType: "json" }).json();
};
