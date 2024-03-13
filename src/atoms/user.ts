import { atom } from "recoil";

export const userAtom = atom({
    key: 'user',
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
        company_id: ''
    }
})