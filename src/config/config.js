export const URL = "https://jsonplaceholder.typicode.com/posts";

export const api = {
  get: "https://jsonplaceholder.typicode.com/posts",
  auth: {
    login: "http://localhost:9050/api/v1/auth/login",
    register: "http://localhost:9050/api/v1/auth/register",
  },
  seller: {
    get: "http://localhost:9050/api/v1/seller/get",
    getById: "http://localhost:9050/api/v1/seller/get/",
    create: "http://localhost:9050/api/v1/seller/create",
    update: "http://localhost:9050/api/v1/seller/update/",
    delete: "http://localhost:9050/api/v1/seller/delete/",
  },
  fish: {
    get: "http://localhost:9050/api/v1/fish/get",
    getById: "http://localhost:9050/api/v1/fish/get/",
    create: "http://localhost:9050/api/v1/fish/create",
    update: "http://localhost:9050/api/v1/fish/update/",
    delete: "http://localhost:9050/api/v1/fish/delete/",
  },
  temp: {
    get: "http://localhost:9050/api/v1/temp/get",
  },
};
