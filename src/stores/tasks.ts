import {reactive, ref, watch} from "vue";
import type {Form} from "@/types/tasks/form";

import {useVuelidate} from "@vuelidate/core";
import {required} from '@vuelidate/validators';
import {defineStore} from "pinia";
import moment from "moment";

import {useServiceCategoriesStore} from "@/stores/serviceCategories";
import fetchModeratesTasks from "@/services/tasks/moderates";
import fetchCreateTask from "@/services/tasks/create";
import fetchUpdateTask from "@/services/tasks/update";
import fetchLoadMyTasks from "@/services/tasks/my";
import fetchToAcceptChange from "@/services/tasks/set-accept";
import fetchLoadActiveTasks from "@/services/tasks/load-active-tasks";
import fetchSendUserRequest from "@/services/tasks/send-user-request";
import fetchTask from "@/services/tasks/load-task";


import fetchCancelTaskRequest from "@/services/task-requests/cancel-request";

export const useTasksStore = defineStore('tasks', () => {
    const serviceCategoriesStore = useServiceCategoriesStore();

    const myTasks = reactive({
        list: [],
        total: 0
    });

    const activeTasks = reactive({
        list: [],
        total: 0,
        perPage: 0,
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
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        completeAt: '',
        files: [],
        requests: [],
    });

    const resetFormToDefaultState = () => {
        form.name = '';
        form.description = '';
        form.price = '';
        form.category = '';
        form.completeAt = '';
        form.files = [];
    };

    const rules = {
        name: {required},
        description: {required},
        price: {required},
        category: {required},
        completeAt: {required},
    };

    const v = useVuelidate(rules, form);

    // Получить данные для формы
    const getFormTask = () => {
        return {
            name: form.name,
            service_category_id: form.category.id,
            description: form.description,
            price: form.price,
            complete_at: moment(form.completeAt).format('YYYY-MM-DD'),
            files: form.files,
        };
    };

    // Создание задачи
    const createTask = async () => {
        // Подготовка данных для отправки на сервак
        const prepareCreateData = getFormTask();

        // Флаг создания заказа
        isCreating.value = true;

        // Создание заявки
        await fetchCreateTask(prepareCreateData);

        // Флаг окончания создания заказа
        isCreating.value = false;
    };

    // Обновление задачи
    const updateTask = async () => {
        const updateForm = getFormTask();

        isCreating.value = true;

        await fetchUpdateTask(form.id, updateForm);

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

    // Фильтры для отображения заказов
    const filterTasks = reactive({
        name: ''
    });

    const loadActiveTasks = async () => {
        const response = await fetchLoadActiveTasks(filterTasks);
        const {data, total, per_page} = response;
        activeTasks.list = data;
        activeTasks.total = total;
        activeTasks.perPage = per_page; // Задаем количество заказов на странице
    };

    // Форма для отправки заявки на исполнение заказа
    const taskRequestFormRules = {
      periodExecution: {required},
      description: {required},
      price: {required},
    };

    // Заказ для которого отправляется заявка
    const selectedTaskRequest = ref(null);

    const taskRequestForm = reactive({
        periodExecution: '',
        description: '',
        price: '',
    });

    const taskRequestFormV = useVuelidate(taskRequestFormRules, taskRequestForm);

    // Отправка заявки на исполнение заказа
    const sendTaskRequest = async (taskId) => {
      const response = await fetchSendUserRequest(taskId, taskRequestForm);
      return response.data;
    };

    // Загрузка заказа по ID
    const loadTask = async (taskId: number) => {
        const {data} = await fetchTask(taskId);
        const {
            id,
            name,
            price,
            description,
            service_category,
            files,
            requests,
            complete_at,
        } = data;

        form.id = id;
        form.name = name;
        form.category = service_category;
        form.files = files;
        form.price = price;
        form.description = description;
        form.requests = requests;
        form.completeAt = moment(new Date(complete_at)).format('YYYY-MM-DD')
    };

    watch(
        () => form.category,
        async () => {
            if (form.category) {
                await serviceCategoriesStore.loadChildrenByParent(form.category.id);
            } else {
                await serviceCategoriesStore.loadChildrenByParent(1);
            }
        }
    );

    // Отклонение запроса на выполнение задачи
    const cancelTaskRequest = async (taskId: number, requestId: number) => {
        const response = await fetchCancelTaskRequest(taskId, requestId);
        const request = response.data.payload;

        const updatedRequest = form.requests.find(r => r.id === request.id);
        updatedRequest.completed_at = request.completed_at;
        updatedRequest.status = request.status;
    };

    return {
        v,
        form,
        myTasks,
        isCreating,
        moderateTasks,
        activeTasks,
        filterTasks,

        createTask,
        updateTask,
        loadMyTasks,
        loadModerates,
        changeToAccept,
        resetFormToDefaultState,
        loadActiveTasks,
        loadTask,

        taskRequestForm,
        taskRequestFormV,
        selectedTaskRequest,
        sendTaskRequest,

        cancelTaskRequest,
    }
});