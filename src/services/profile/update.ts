import http from "../../plugins/http";

export const update = (data: Object) => http.post('/telegram/profile/update', data);