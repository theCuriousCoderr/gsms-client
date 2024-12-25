import dateActivity from "@/helpers/dateActivity";
import { UserReportType } from "@/types";
import moment from "moment";

function getEachDayCount(
  reports: UserReportType[],
  date = moment().format("YYYY-M-D")
) {
  let dateReport = dateActivity(reports, date);

  const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "cut",
    "delete",
    "paste",
    " ",
  ];
  let count = [];

  for (let char of characters) {
    let charCount = dateReport.filter(
      (report) => report.key.toLowerCase() === char.toLowerCase()
    );
    count.push(charCount.length);
  }

  return count;
}

export default getEachDayCount;
