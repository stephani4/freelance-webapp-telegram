import http from "../../plugins/http";

export default async (parentID) => {
    const response = await http.get(`/telegram/service-categories/${parentID}/children`);
    return response.data.children;
};