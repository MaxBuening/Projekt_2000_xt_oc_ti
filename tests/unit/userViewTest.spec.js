import UserView from "@/views/UserView";
import {mount} from "@vue/test-utils";
import User from "@/components/User";



 describe ("Testing UserView.vue", () => {

     it ("should have user component",  () => {

         const wrapper = mount(UserView)

        const user = wrapper.findComponent(User)
        expect(user.exists()).toBeTruthy()
     });
})
