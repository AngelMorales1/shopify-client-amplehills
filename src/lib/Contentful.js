import { createClient } from "contentful";

export default () => {
  console.log(process.env);
  return createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
  });
};
