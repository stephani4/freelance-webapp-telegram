import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth";

export const authMiddleware = (context) => {
    const store = useAuthStore();
    const {auth} = storeToRefs(store);
    const user = store.user;

    const {next, router} = context;
    if (!auth.value || !user?.register) {
        router.push({
            name: 'signup'
        });
    }

    next();
};