import http from '../../plugins/http';

export default async (data) => {
    const response = await http.put('/admin/users/roles/sync', {data});
    return response.data;
};