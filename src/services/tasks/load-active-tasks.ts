import qs from "qs";
import http from "../../plugins/http";

/**
 * Загрузка активных заказов
 *
 * @param filters
 */
export default async (filters: Object) => {
  const response = await http.get('/telegram/tasks/actives?' + qs.stringify(filters));
  return response.data
};