import http from "../../plugins/http";

export default (taskId: number, requestId: number) => http.post(`/tasks/${taskId}/requests/${requestId}/cancel`);