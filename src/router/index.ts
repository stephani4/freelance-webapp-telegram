import {createRouter, createWebHistory} from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import CalendarView from '@/views/CalendarView.vue'
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ServiceCategories from "@/views/ServiceCategories/ServiceCategories.vue"
import ProfileView from '@/views/ProfileView.vue'
import TasksView from '@/views/TasksView.vue'
import TasksMyView from "@/views/Tasks/TasksMyView.vue";
import TasksCreateView from "@/views/Tasks/TasksCreateView.vue";
import TasksModerationView from "@/views/Admins/Tasks/TasksModerationView.vue";
import UsersView from "@/views/Admins/Users/UsersView.vue";

import middlewarePipeline from "@/router/middlewarePipeline";
import {authMiddleware} from "./middleware/auth";
import TasksMyEditView from "@/views/Tasks/TasksMyEditView.vue";

const routes = [
    {
        path: '/',
        name: 'Домашняя страница',
        component: ECommerceView,
        meta: {
            title: 'Главная',
            middleware: [authMiddleware]
        }
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: CalendarView,
        meta: {
            title: 'Календарь',
            middleware: [authMiddleware]

        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: {
            title: 'Profile',
            middleware: [authMiddleware]
        }
    },
    {
        path: "/admin/users",
        name: '_users',
        component: UsersView,
        meta: {
            title: 'Пользователи',
            middleware: [authMiddleware,]
        }
    },
    {
        path: '/tasks/my',
        name: 'tasks-my',
        component: TasksMyView,
        meta: {
            title: 'Мои заказы',
            middleware: [authMiddleware]
        }
    },
    {
        path: '/tasks/my/:id/edit',
        name: 'tasks-my-edit',
        component: TasksMyEditView,
        meta: {
            title: 'Редактирование задачи',
            middleware: [authMiddleware],
        }
    },
    {
        path: '/tasks/create',
        name: 'tasks-create',
        component: TasksCreateView,
        meta: {
            title: 'Создание задачи',
            middleware: [authMiddleware],
        }
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: TasksView,
        meta: {
            title: 'Последние заказы',
            middleware: [authMiddleware]

        }
    },
    {
        path: '/service-categories',
        name: 'service-categories',
        component: ServiceCategories,
        meta: {
            title: 'Категории заказов',
            middleware: [authMiddleware]
        }
    },
    {
        path: '/pages/settings',
        name: 'settings',
        component: SettingsView,
        meta: {
            title: 'Settings',
            middleware: [authMiddleware]

        }
    },
    {
        path: '/auth/signin',
        name: 'signin',
        component: SigninView,
        meta: {
            title: 'Signin'
        }
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: SignupView,
        meta: {
            title: 'Signup'
        }
    },
    {
        path: '/admin/tasks/moderates',
        name: 'moderate-tasks',
        component: TasksModerationView,
        meta: {
            title: 'Модерация заказов',
            middleware: [authMiddleware]
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {left: 0, top: 0}
    }
})

router.beforeEach((to, from, next) => {
    document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`

    if (!to.meta?.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        router
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
