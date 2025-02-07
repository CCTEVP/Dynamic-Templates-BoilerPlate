import "./style.css";
import Slide from "./components/Slide";
import Logger from "./components/Logger";
import { log, mode, action } from "./utils/Functions";
const visibility: string = mode("debug") ? "visible" : "hidden";
const app = document.querySelector<HTMLDivElement>("#app");
const slide01 = new Slide({
    identifier: "slide01",
    attributes: [],
    status: "",
});
const slide02 = new Slide({
    identifier: "slide02",
    attributes: [],
    status: "hidden",
});
const logger = new Logger({ identifier: "logger", attributes: [visibility] });
let BroadSignObject: Object = {};

declare global {
    interface Window {
        BroadSignPlay: () => void;
        DebugMode: boolean;
        PlayerEnv: boolean;
        IgnoreCache: boolean;
    }
}

if (app) {
    app.appendChild(slide01.render());
    app.appendChild(slide02.render());
    app.appendChild(logger.render());
    window.BroadSignPlay = () => {
        log("BroadSignPlay() function executed", true);
        return true;
    };
    document.addEventListener("DOMContentLoaded", () => {
        window.DebugMode = mode("debug");
        window.IgnoreCache = action("cache");
        window.PlayerEnv =
            Object.keys(BroadSignObject).length > 1 ? true : false;
        const path = window.location.hostname;
        const isRemote = path.includes("ccplay");
        const pathRoot = isRemote ? "/test/facedetection/" : "/dist/";
        // *** Unregister Service Worker
        if (window.IgnoreCache) {
            navigator.serviceWorker.ready.then(function (registration) {
                registration
                    .unregister()
                    .then(function () {
                        console.log(
                            "Service worker unregistered successfully.",
                        );
                        caches.keys().then(function (cacheNames) {
                            return Promise.all(
                                cacheNames.map(function (cacheName) {
                                    return caches.delete(cacheName);
                                }),
                            );
                        });
                    })
                    .catch(function (error) {
                        console.error(
                            "Error unregistering service worker:",
                            error,
                        );
                    });
            });
        } else {
            if (
                (isRemote || window.DebugMode) &&
                "serviceWorker" in navigator
            ) {
                navigator.serviceWorker
                    .register(pathRoot + "sw.js?location=" + pathRoot)
                    .then(() => log("Service Workers registered", true))
                    .catch((err) =>
                        log("Service worker registration failed: " + err, true),
                    );
            } else {
                log("Service Workers registration skipped", true);
            }
        }
        // ***
        if (!window.PlayerEnv) {
            log("Not In-Player environment", true);
            setTimeout(() => {
                window.BroadSignPlay();
            }, 5000);
        }
    });
}
