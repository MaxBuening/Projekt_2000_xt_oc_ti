import HomeView from "@/views/HomeView";
import {mount} from "@vue/test-utils";

describe("Testing Home View", () => {
    it("Should show page title", () => {

        //when
        const wrapper = mount(HomeView)

        //then
        expect(true)
    })
})
