import { LoggerParameters } from "../utils/Interfaces";
export default class Logger {
    public logger: HTMLElement;
    public attributes: string[] = [];
    constructor(parameters: LoggerParameters) {
        this.logger = document.createElement("div");
        this.logger.id = parameters.identifier;
        this.attributes = parameters.attributes;
    }
    render() {
        if (this.attributes.length > 0) {
            this.attributes.forEach((attribute: string) => {
                this.logger.classList.add(attribute);
            });
        }
        const performance = document.createElement("div");
        performance.id = "performance";
        const performanceHeading = document.createElement("h2");
        performanceHeading.innerText = "Performance Log";
        const performanceList = document.createElement("ul");
        performance.appendChild(performanceHeading);
        performance.appendChild(performanceList);
        const responses = document.createElement("div");
        responses.id = "responses";
        const responsesHeading = document.createElement("h2");
        responsesHeading.innerText = "Details Log";
        const responsesList = document.createElement("ul");
        responses.appendChild(responsesHeading);
        responses.appendChild(responsesList);
        this.logger.appendChild(performance);
        this.logger.appendChild(responses);
        return this.logger;
    }
    show() {
        this.logger.classList.remove("hidden");
    }
}
