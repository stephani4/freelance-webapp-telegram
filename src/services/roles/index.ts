import http from "../../plugins/http";

/**
 * Загрузка ролей из базы данных
 */
export const fetchRoles = async () => {
    const response = await http.get('/roles');
    return response.data;
};