import http from "../../plugins/http";

export default (taskID: number, data: Object) => {
    return http.post(`/telegram/tasks/${taskID}/request`, {
        period_execution: data.periodExecution,
        description: data.description,
        price: data.price,
    });
};