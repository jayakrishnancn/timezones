/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { click } from "@testing-library/user-event/dist/click";
import Table from "../index";
import moment from "../../../utils/tz";

jest.mock(
  "react-select",
  () =>
    ({ options, value, menuPosition, onChange, ...rest }: any) => {
      function handleChange(event: any) {
        const option = options.find(
          (option: any) => option.value === Number(event.target.value)
        );
        onChange(option);
      }
      return (
        <select
          {...rest}
          data-testid="select"
          value={value}
          onChange={handleChange}
        >
          {options.map(({ label, value }: any) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    }
);
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

  it("Test IST timezone", async () => {
    const ISTIndex = moment.tz.names().findIndex((item) => item === "IST");
    render(<Table />);
    fireEvent.change(screen.getByTestId("select"), {
      target: { value: ISTIndex },
    });
    const table = screen.getByRole("table");
    expect(table).toBeDefined();
    expect(
      table.lastChild?.firstChild?.childNodes[2].firstChild?.firstChild
    ).toHaveTextContent("12");
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
