import { describe, test, useTestContext } from "@talla-ui/test-handler";
import { MainActivity } from "./MainActivity";

describe("MainActivity", (scope) => {
  let activity: MainActivity;
  scope.beforeEach(() => {
    const app = useTestContext();
    activity = new MainActivity();
    app.addActivity(activity, true);
  });

  test("Counter shows 0 at first", async (t) => {
    await t.expectOutputAsync({ text: "0" });
  });

  test("Counter goes up when button clicked", async (t) => {
    let btn = await t.clickOutputAsync({
      type: "button",
      accessibleLabel: "Increment counter",
    });
    btn.click();
    await t.expectOutputAsync({ text: "2" });
  });
});
