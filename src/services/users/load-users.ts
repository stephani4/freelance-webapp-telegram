import http from "../../plugins/http"

export default async (filters = {}) => {
  const response = await http.get('/admin/telegram/users', {filters});
  return response.data;
};