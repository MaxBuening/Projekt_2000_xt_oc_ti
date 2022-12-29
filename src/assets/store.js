import {reactive} from "vue";

export const store = reactive({
    userId : Number,
    auth : Boolean,
    amount : Number,
    kontostandId : Object,
    success : Boolean
})
