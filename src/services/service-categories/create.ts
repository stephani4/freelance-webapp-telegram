import http from "../../plugins/http";

export default (supCategory: Number, data: Object) => http.post('/admin/telegram/service-categories/create', {
    parentCategory: supCategory,
    createData: data
});