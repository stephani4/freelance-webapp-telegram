import http from "../../plugins/http.js";

export default async () => {
    const response = await http.get('telegram/tasks/my');
    return response.data.tasks;
};