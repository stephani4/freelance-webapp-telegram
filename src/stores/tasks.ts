import {reactive, ref} from "vue";
import type {Form} from "@/types/tasks/form";

import {useVuelidate} from "@vuelidate/core";
import {required} from '@vuelidate/validators'
import {defineStore} from "pinia";
import moment from "moment";

import fetchModeratesTasks from "@/services/tasks/moderates";
import fetchCreateTask from "@/services/tasks/create";
import fetchLoadMyTasks from "@/services/tasks/my";
import fetchToAcceptChange  from "@/services/tasks/set-accept";

export const useTasksStore = defineStore('tasks', () => {
    const myTasks = reactive({
       list: [],
       total: 0
    });

    const moderateTasks = reactive({
        list: [],
        total: 0,
    });

    const loadModerates = async () => {
        const response = await fetchModeratesTasks();
        moderateTasks.list = response.data;
        moderateTasks.total = response.total;
    };

    const isCreating = ref(false);

    const form: Form = reactive({
        name: '',
        description: '',
        price: '',
        category: '',
        completeAt: '',
        mainImage: '',
    });

    const resetFormToDefaultState = () => {
        form.name = '';
        form.description = '';
        form.price = '';
        form.category = '';
        form.completeAt = '';
        form.mainImage = '';
    };

    const rules = {
        name: {required},
        description: {required},
        price: {required},
        category: {required},
        completeAt: {required},
        mainImage: {required},
    };

    const v = useVuelidate(rules, form);

    const createTask = async () => {
        // Подготовка данных для отправки на сервак
        const prepareCreateData = {
            name: form.name,
            service_category_id: form.category.id,
            description: form.description,
            price: form.price,
            complete_at: moment(form.completeAt).format('YYYY-MM-DD'),
            main_image_id: form.mainImage,
        };

        // Флаг создания заказа
        isCreating.value = true;

        // Создание заявки
        await fetchCreateTask(prepareCreateData);

        // Флаг окончания создания заказа
        isCreating.value = false;
    };

    const loadMyTasks = async () => {
        const response = await fetchLoadMyTasks();
        myTasks.list = response.data;
        myTasks.total = response.total;
    };

    const changeToAccept = async (id) => {
        return await fetchToAcceptChange(id);
    };

    return {
        v,
        form,
        myTasks,
        isCreating,
        moderateTasks,

        createTask,
        loadMyTasks,
        loadModerates,
        changeToAccept,
        resetFormToDefaultState,
    }
});