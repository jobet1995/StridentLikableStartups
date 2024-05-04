import http from "../../http";

const service = {
  get(id) {
    if (id) {
      return http.get(`/Accounts/${id}`);
    } else {
      return http.get("/Accounts" + location.search);
    }
  },
  create(data) {
    if (data) {
      return http.post("/Accounts", data);
    } else {
      return http.get("/Accounts/create");
    }
  },
  edit(id, data) {
    if (data) {
      return http.put(`/Accounts/${id}`, data);
    } else {
      return http.get(`/Accounts/${id}/edit`);
    }
  },
  delete(id, data) {
    if (data) {
      return http.delete(`/Accounts/${id}`);
    } else {
      return http.get(`/Accounts/${id}/delete`);
    }
  },
};

export default service;
