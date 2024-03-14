import { atom } from "recoil";
import { localStorageEffect } from "./helper";

const key = 'user';

export const userAtom = atom({
    key: key,
    default: {
        id: '',
        name: '',
        phone: '',
        email: '',
        // address: '',
        // signature_type: '',
        // due_data: '',
        created: '',
        updated: '',
        roles: {
            briefing: '',
            catalogs: '',
            client: ''
        },
        company: ''
    },
    effects: [localStorageEffect(key)]
})