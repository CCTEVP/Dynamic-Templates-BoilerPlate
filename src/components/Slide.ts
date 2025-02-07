import { log } from "../utils/Functions";
import { SlideParameters } from "../utils/Interfaces";

export default class Slide {
    private identifier = "";
    private status: string = "";

    constructor(parameters: SlideParameters) {
        this.identifier = parameters.identifier;
        this.status = parameters.status;
    }
    render() {
        log("Slide " + this.identifier + " rendered.", true);
        const slide = document.createElement("div");
        slide.id = this.identifier;
        slide.classList.add("slide", "fullscreen");
        if (this.status != "") {
            slide.classList.add(this.status);
        }
        return slide;
    }
}
