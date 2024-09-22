import { useWebContext } from "@talla-ui/web-handler";
import { ui } from "talla-ui";
import { MainActivity } from "./MainActivity";

const app = useWebContext((options) => {
  options.theme.colors.set("Background", ui.color("#222"));
});
app.addActivity(new MainActivity(), true);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      () => {
        // registered
      },
      (err) => {
        // error
        console.error("ServiceWorker registration failed: ", err);
      }
    );
  });
}
