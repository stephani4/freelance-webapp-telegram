import http from "../../plugins/http.js";

export default async (taskId: number, data: Object) => {
    const response = await http.post(`/telegram/tasks/${taskId}/update`, data);
    return response.data.task;
};