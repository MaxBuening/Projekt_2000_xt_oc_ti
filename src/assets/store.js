import {reactive} from "vue";

export const store = reactive({
    userId : Number,
    auth : Boolean,
    amount : Number,
    kontostandId : Object,
    success : Boolean,
    newAmount : 0,
    table_reload : 0,
    tabelle : Boolean,
    navbar : false,
    nav : 0,
    login : false
})
