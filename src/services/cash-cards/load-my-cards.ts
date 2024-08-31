import http from "../../plugins/http";

/**
 * Загрузка списка моих карт
 */
export const loadMyCards = async () => {
  const response = await http.get('/cash-cards/my');
  return response.data;
};