import { useEffect, useMemo, useState } from "react";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DEFAULT_TIMEZONE_ID,
  TIME_FORMAT,
} from "../../constants";
import Select from "react-select";
import Button from "../button";
import moment from "../../utils/tz";
import "./style.css";
import deleteIcon from "../../assets/icons/delete.svg";

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

  const TIME_ZONES = useMemo(
    () =>
      moment.tz.names().map((label, index) => ({
        value: index,
        label: label + " " + moment.tz(label).format("Z"),
        zone: label,
      })),
    []
  );

  const getTimeOf = (zone: string): { current: boolean; time: string }[] => {
    if (!zone) return [];
    const times = [];
    const now = moment().format(DATE_TIME_FORMAT);
    const today = moment().format(DATE_FORMAT);
    for (let i = 0; i <= 23; i++) {
      times.push({
        current: Number(moment(now, DATE_TIME_FORMAT).format("HH")) === i,
        time: moment(today + " " + i + ":00", `${DATE_FORMAT} ${TIME_FORMAT}`)
          .tz(zone)
          .format("LT"),
      });
    }
    console.log("zone: " + zone, now, times);
    return times;
  };
  return (
    <table className="table">
      <tbody>
        {startTimes.map((zoneId, index) => (
          <tr key={index}>
            <td>
              <div style={{ width: 200 }}>
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
              </div>
            </td>
            {getTimeOf(TIME_ZONES[zoneId].zone).map(
              ({ time, current }, index) => (
                <td
                  className={"time" + (current ? " current" : "")}
                  key={index}
                >
                  {time}
                </td>
              )
            )}
            <td>
              <Button
                variant="RED"
                size="S"
                onClick={() => {
                  setSetStartTimes((prev: number[]) =>
                    prev.filter((_, prevIndex) => prevIndex !== index)
                  );
                }}
              >
                <img src={deleteIcon} alt="delete row" height="15px" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
