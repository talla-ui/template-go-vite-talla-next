import { $activity, Activity, app, ui } from "talla-ui";

const view = ui.cell(
  ui.column(
    { align: "center" },
    ui.label($activity("count"), {
      style: { fontSize: 40, tabularNums: true },
    }),
    ui.button({
      icon: ui.icon.PLUS,
      accessibleLabel: "Increment counter",
      onClick: "CountUp",
      style: ui.style.BUTTON_SUCCESS,
    }),

    ui.spacer(0, 32),
    ui.label($activity.string("text").else("Loading...")),
    ui.button("Reload", { onClick: "Reload" })
  )
);

export class MainActivity extends Activity {
  createView() {
    return view.create();
  }

  protected async afterActiveAsync() {
    super.afterActiveAsync();
    await this._loadText();
  }

  count = 0;
  onCountUp() {
    this.count++;
  }

  text = "";

  async onReload() {
    this.text = "";
    await this._loadText();
  }

  private async _loadText() {
    if (typeof fetch != "function") return;
    try {
      let req = await fetch("/api/text");
      let json = await req.json();
      this.text = json.text;
    } catch (err) {
      app.log.error(err);
    }
  }
}

// hot reload for vite:
if (import.meta.hot) {
  import.meta.hot.accept();
  app.hotReload(import.meta, MainActivity);
}
