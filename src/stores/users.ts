import {ref, reactive} from "vue";
import {defineStore} from "pinia";

import loadUsers from "@/services/users/load-users";

export const useUsers = defineStore('users', () => {
    const usersPaginate = reactive({
        list: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
    });

    const loadUsersList = async (filters = {}) => {
        const response = await loadUsers(filters);
        const {data, total} = response;
        usersPaginate.list = data;
        usersPaginate.total = total;
    };


    return {
        usersPaginate,
        loadUsersList,
    };
});