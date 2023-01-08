
import {shallowMount} from "@vue/test-utils";
import register from "@/components/Register";
import axios from "axios";

jest.mock('axios')

describe("Testing register.vue", () =>{

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should find the register button ', function () {
        const wrapper = shallowMount(register)
        expect(wrapper.find('#RegisterButton').text()).toBe('Registrieren')
    });

    it('should show the Benutzer bereits vergeben alert when the username is already in use', async () => {
        //given
        const wrapper = shallowMount(register)
        await wrapper.find('#passwortInput').setValue('!!Test!!')
        const axiosResponse = {
            request : {
                status : 400,
                error : "Bad Request",
                message : "Benutzername existiert bereits",
                path : "/api/register"
            }
        }
        axios.post.mockResolvedValueOnce(axiosResponse)

        //when
        await wrapper.find('button').trigger('submit')

        //then
        expect(axios.post).toHaveBeenCalled()
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/register', {"benutzername": "", "nachname": "", "passwort": "!!Test!!", "vorname": ""})
        expect(wrapper.find('#BenutzerNameBereitsVergeben').exists()).toBe(true)


    });

    it('should show the Passwort zu schwach alert when a passwort doesn´t have a special charakter', async () => {
        //given
        const wrapper = shallowMount(register)
        await wrapper.find('#passwortInput').setValue('SchwachOhneSonderZeichen')
        const axiosResponse = {
            request : {}
        }
        axios.post.mockResolvedValueOnce(axiosResponse)
        //when
        await wrapper.find('button').trigger('submit')

        //then
        expect(wrapper.find('#PasswortZuSchwach').exists()).toBe(true)
        expect(axios.post).not.toHaveBeenCalled()

    });


})
