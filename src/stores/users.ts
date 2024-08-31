import {ref, reactive} from "vue";
import {defineStore} from "pinia";

import loadUsers from "@/services/users/load-users";
import updateUsersRoles from "@/services/users/update-user-roles";

export const useUsers = defineStore('users', () => {
    const usersPaginate = reactive({
        list: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
    });

    const userRolesChanges = reactive({});
    const updateUserRoleChanges = ({user, roles}) => {
        if (!userRolesChanges.hasOwnProperty(user.id))
            userRolesChanges[user.id] = {};

       userRolesChanges[user.id].roles = roles;
    };

    const loadUsersList = async (filters = {}) => {
        const response = await loadUsers(filters);
        const {data, total} = response;
        usersPaginate.list = data;
        usersPaginate.total = total;
    };

    const updateUserRoles = async () => {
      const userRoles = [];

      Object
          .keys(userRolesChanges)
          .map(userId => userRoles.push({
              userId: userId,
              roles: userRolesChanges[userId].roles,
          }));

      await updateUsersRoles(userRoles);
      Object.keys(userRolesChanges).forEach(userId => delete userRolesChanges[userId]);
    };

    return {
        usersPaginate,
        userRolesChanges,

        // Actions
        loadUsersList,
        updateUserRoles,
        updateUserRoleChanges,
    };
});