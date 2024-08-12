import http from "../../plugins/http.js";

export default async (data) => {
    const response = await http.post('telegram/tasks/create', data);
    return response.task;
};