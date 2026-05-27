export const urlBuilder = (base, query = {}) => {
  const queryString = new URLSearchParams(query).toString();

  if (!queryString) return base;

  return `${base}?${queryString}`;
};

const getter = (base, id, query) => {
  const url = id ? `${base}/${id}` : base;
  return urlBuilder(url, query);
};

const API_ROUTES = {
    AUTH: {
        LOGIN: "/user/login",
        REGISTER: "/user/",
        ME: "user/me"
    },
    USER: {
        GET_ALL: (query) => getter('/users', null, query),
        GET: (id) => getter('/users', id),
        BASE: "/users"
    },
    PLAYLIST: {
        
    },
    TRACK: {
        
    },
}

export default API_ROUTES;