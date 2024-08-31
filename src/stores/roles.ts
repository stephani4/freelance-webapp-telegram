import {ref} from 'vue';
import {defineStore} from 'pinia';
import {fetchRoles} from '../services/roles';

export const useRolesStore = defineStore('roles', () => {
    const roles = ref([]);

    const loadRoles = async () => {
        const rolesData = await fetchRoles();
        roles.value = rolesData;
    };

    return {roles, loadRoles};
})