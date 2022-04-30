import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("Expect not to log any errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<App />);
    expect(spy).not.toHaveBeenCalled();
  });
});
