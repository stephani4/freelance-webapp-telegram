import http from "../../plugins/http";

export default async () => {
    const response = await http.get('/telegram/task-statuses');
    return response.data.statuses;
};