import http from "../../plugins/http";

export default async (id: Number) => {
    const response = await http.get(`/telegram/tasks/my/${id}`);
    return response.data.task;
};