/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../index";
import { act } from "react-dom/test-utils";
import { click } from "@testing-library/user-event/dist/click";

describe("<App />", () => {
  it("Expect not to log any errors in console", () => {
    const spy = jest.spyOn(global.console, "error");
    render(<Table />);
    expect(spy).not.toHaveBeenCalled();
  });
  it("Table should have a zone dropdown", () => {
    render(<Table />);
    expect(screen.getByLabelText("Select-0")).toBeDefined();
  });

  it("Test delete row", () => {
    render(<Table />);
    const table = screen.getByRole("table");
    expect(table).toBeDefined();
    expect(table.children[1].childElementCount).toBe(1);
    act(() => {
      click(screen.getByLabelText("delete row 0"));
    });
    expect(table.children[1].childElementCount).toBe(0);
  });
});
