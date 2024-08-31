import http from "../../plugins/http";

export default (taskID: number) => {
    return http.get(`/tasks/${taskID}`);
};