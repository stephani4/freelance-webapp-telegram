import { defineStore } from 'pinia';
import { Modal } from 'flowbite';

import {useSidebarStore} from "@/stores/sidebar";

export const useModalStore = defineStore('modals', () => {
    const sidebar = useSidebarStore();

    const factoryModal = function (modalName) {
        const $targetEl = document.getElementById(modalName);
        const instanceOptions = {
            id: modalName,
            override: true
        };

        return new Modal($targetEl, {
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: true,
            onHide: () => {
                console.log('modal is hidden');
            },
            onShow: () => {
                console.log('modal is shown');
            },
            onToggle: () => {
                console.log('modal has been toggled');
            },
        }, instanceOptions);
    };

    const openModal = function (modalName) {
        const modal = factoryModal(modalName);
        modal.show();

        sidebar.isSidebarOpen = !sidebar.isSidebarOpen;
    };

    const hideModal = function (modalName) {
        const modal = factoryModal(modalName);
        modal.hide();
    };

    return {openModal, hideModal};
});