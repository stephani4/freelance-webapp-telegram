import type {Register} from "@/types/auth/register";
import http from "../../plugins/http";

export const register = (data: Register) => http.post('/auth/telegram/register', data);