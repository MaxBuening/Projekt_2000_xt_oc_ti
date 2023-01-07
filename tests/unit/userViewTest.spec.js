import UserView from "@/views/UserView";
import {mount} from "@vue/test-utils";
import User from "@/components/User";
import axios from "axios";

jest.mock('axios')

 describe ("Testing UserView.vue", () => {
     afterEach(()=>{
         jest.clearAllMocks()
     })

     it ("shouldn´t have user component if not Logged in ",  () => {
         const axiosResponse = {
              message : 'Request failed with status code 401'
         }
         const wrapper = mount(UserView)
         axios.get.mockResolvedValueOnce(axiosResponse)
        const user = wrapper.findComponent(User)
         expect(axios.get).toBeCalledTimes(1)
         expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/user')
         expect(user.exists()).toBeFalsy()
     });

     it ("should have user component if Logged in ",  () => {
         const wrapper = mount(UserView)
         const axiosResponse = {
             request : {}
         }
         axios.get.mockResolvedValueOnce(axiosResponse)
         const user = wrapper.findComponent(User)

         expect(axios.get).toBeCalledTimes(1)
         expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/user')
         expect(user.exists()).toBeTruthy
     });
})
