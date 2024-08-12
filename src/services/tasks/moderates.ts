import http from "../../plugins/http";

export default async () => {
  const response = await http.get('/telegram/admin/tasks/moderates');
  return response.data.tasks;
};