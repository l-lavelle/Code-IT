import { toast } from "react-toastify";
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

export const showErrorToast = (msg) => {
  toast.error(msg || `Something went wrong! Please try again.`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccessToast = (msg) => {
  toast.success(msg || `Compiled Successfully!`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
