import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth";

export const authMiddleware = (context) => {
    const store = useAuthStore();
    const {auth} = storeToRefs(store);
    const {next, router} = context;
    if (!auth.value) {
        router.push({
            name: 'signup'
        });
    }

    next();
};