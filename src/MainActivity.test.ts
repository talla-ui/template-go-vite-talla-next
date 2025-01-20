import {
  clickOutputAsync,
  expectOutputAsync,
  useTestContext,
} from "@talla-ui/test-handler";
import { beforeEach, test } from "vitest";
import { MainActivity } from "./MainActivity";

let activity: MainActivity;
beforeEach(() => {
  const app = useTestContext();
  activity = new MainActivity();
  app.addActivity(activity, true);
});

test("Counter shows 0 at first", async (t) => {
  await expectOutputAsync({ text: "0" });
});

test("Counter goes up when button clicked", async (t) => {
  let btn = await clickOutputAsync({
    type: "button",
    accessibleLabel: "Increment counter",
  });
  btn.click();
  await expectOutputAsync({ text: "2" });
});
