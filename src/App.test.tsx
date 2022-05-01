import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "./App";
describe("<App />", () => {
  it("Expect not to log any errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<App />);
    expect(spy).not.toHaveBeenCalled();
  });
  it("Expects an Add Timezone button", () => {
    render(<App />);
    const table = screen.getByRole("table");
    expect(table).toBeDefined();
    expect(screen.getByRole("button")).toHaveTextContent("Add Timezone");
    click(screen.getByRole("button"));
    // eslint-disable-next-line testing-library/no-node-access
    expect(table.children[1].childElementCount).toBe(2);
  });
});
