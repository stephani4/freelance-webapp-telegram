import http from "../../plugins/http";

export default async (taskID: Number) => {
    const response = await http.post(`/telegram/admin/tasks/${taskID}/status`, {
        'status': 'accept'
    });

    return response.data;
}