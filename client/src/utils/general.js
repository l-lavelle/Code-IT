export const classnames = (...args) => {
  return args.join(" ");
};

export const findURL = (param) => {
  let url2;
  let domain = window.location.origin;
  var url = new URL(domain);
  url.port = "3001";
  url2 = `${url}${param}/`;
  if (process.env.NODE_ENV === "production") {
    return (url2 = `${domain}/${param}/`);
  } else return url2;
};
