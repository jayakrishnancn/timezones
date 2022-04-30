import { useEffect, useState } from "react";
import { DEFAULT_TIMEZONE_ID } from "../../constants";
import { timeZones } from "../../utils/timezones";
import Select from "react-select";
import Button from "../button";
import "./style.css";

interface Props {
  tableRef: React.MutableRefObject<any>;
}
function Table(props: Props) {
  const [startTimes, setSetStartTimes] = useState<number[]>([
    DEFAULT_TIMEZONE_ID,
  ]);

  const addNewTimeZone = () => {
    setSetStartTimes((prev) => [...prev, DEFAULT_TIMEZONE_ID]);
  };

  useEffect(() => {
    props.tableRef.current = { addNew: addNewTimeZone };
  }, [props.tableRef]);

  const shiftTimeWithOffset = (offset: number): string[] => {
    const clock: string[] = [];
    for (let i = 1; i <= 24; i++) {
      let time = i + offset;
      const amPm = time < 12 ? "AM" : "PM";
      time = time > 12 ? time % 12 : time;
      clock.push(`${time || 12} ${amPm}`);
    }
    return clock;
  };

  // load data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("saved");
    if (data) {
      setSetStartTimes(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    startTimes && localStorage.setItem("saved", JSON.stringify(startTimes));
  }, [startTimes]);

  const TIME_ZONES = timeZones.map((item, value) => ({
    label: item.abbr + item.text,
    value,
    offset: item.offset,
  }));
  return (
    <table className="table">
      <tbody>
        {startTimes.map((startTime, index) => (
          <tr key={startTime}>
            <td>
              <Select
                onChange={(option) => {
                  option !== null &&
                    setSetStartTimes((prev) => {
                      prev[index] = option?.value;
                      return [...prev];
                    });
                }}
                value={TIME_ZONES.find(
                  (item) => item.value === startTimes[index]
                )}
                options={TIME_ZONES}
              />
            </td>
            {shiftTimeWithOffset(TIME_ZONES[startTime].offset).map(
              (time, index) => (
                <td className="time" key={index}>
                  {time}
                </td>
              )
            )}
            <td>
              <Button
                variant="RED"
                onClick={() => {
                  setSetStartTimes((prev: number[]) =>
                    prev.filter((_, prevIndex) => prevIndex !== index)
                  );
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
