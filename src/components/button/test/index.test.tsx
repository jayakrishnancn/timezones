import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import { act } from "react-dom/test-utils";
import Button from "../index";
describe("<App />", () => {
  it("Expect not to log any errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Button />);
    expect(spy).not.toHaveBeenCalled();
  });
  it("Button click should work as expected", () => {
    const fn = jest.fn();
    render(<Button onClick={fn} />);
    act(() => {
      click(screen.getByRole("button"));
    });
    expect(fn).toBeCalledTimes(1);
  });
});
