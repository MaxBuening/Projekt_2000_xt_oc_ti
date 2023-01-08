import axios from "axios";
import Navbar from "@/components/Navbar";
import {mount, RouterLinkStub} from "@vue/test-utils";

jest.mock('axios')

describe('Test NavBar.vue', () => {

    afterEach(()=>{
        jest.clearAllMocks()
    })

    it('should show the Navbar with login and Regestrieren button when not logged in', () => {
        const axiosResponse = {
            message : 'Request failed with status code 401'
        }
        const wrapper = mount(Navbar, {
            stubs: {
                RouterLink : RouterLinkStub
            }
        })

        axios.post.mockResolvedValueOnce(axiosResponse)

        expect(wrapper.find('#NavbarLoggedOut').exists()).toBeTruthy()
        expect(wrapper.find('#NavbarLoggedIn').exists()).toBeFalsy()
    });

    it('should show the Navbar with logout and profil button when logged in', () => {
        const axiosResponse = {
            status : 200
        }
        const wrapper = mount(Navbar, {
            stubs: {
                RouterLink : RouterLinkStub
            }
        })

        axios.post.mockResolvedValueOnce(axiosResponse)

        expect(wrapper.find('#NavbarLoggedOut').exists()).toBeFalsy
        expect(wrapper.find('#NavbarLoggedIn').exists()).toBeTruthy
    });

})
