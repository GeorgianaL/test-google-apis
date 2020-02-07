import Cookie from "js-cookie";

const Cookies = {
  get: Cookie.get,
  set: (name, value, opts) => {
    return Cookie.set(name, value, opts);
  },
  remove: Cookie.remove
};

export default Cookies;
