import compareActivityPercentage from "@/helpers/compareActivityPercentage";
import dateActivity from "@/helpers/dateActivity";
import keyPressPerMinute from "@/helpers/keyPressPerMinute";
import { UserReportType } from "@/types";
import moment from "moment";

declare global {
  interface Array<T> {
    getMaxCountElement(): string | number;
    getMinCountElement(): string | number;
    sortByHighestCount(): string[] | number[];
    removeDuplicates(): string[] | number[];
  }
}

Array.prototype.getMaxCountElement = function () {
  const countMap = this.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});

  return Object.keys(countMap).reduce(
    (maxItem, currentItem) =>
      countMap[currentItem] > countMap[maxItem] ? currentItem : maxItem,
    Object.keys(countMap)[0]
  );
};

Array.prototype.getMinCountElement = function () {
  const countMap = this.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});

  return Object.keys(countMap).reduce(
    (maxItem, currentItem) =>
      countMap[currentItem] < countMap[maxItem] ? currentItem : maxItem,
    Object.keys(countMap)[0]
  );
};

Array.prototype.sortByHighestCount = function () {
  const countMap: Record<string, number> = this.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});

  let sortedListsByCount: string[] = [];
  const sortedListCounts = Object.keys(countMap)
    .map((item) => countMap[item])
    .sort(function (a, b) {
      return b - a;
    });
  sortedListCounts.removeDuplicates().map((count, index) => {
    Object.keys(countMap).forEach((item) => {
      if (countMap[item] === count) {
        sortedListsByCount.push(item);
      }
    });
  });

  return sortedListsByCount;
};

Array.prototype.removeDuplicates = function () {
  let arraySet: string[] | number[] = [];

  arraySet = this.reduce((prev, curr) => {
    if (!prev.includes(curr)) {
      prev.push(curr);
    }
    return prev;
  }, []);

  return arraySet;
};

function getTodayActivityOverview(reports: UserReportType[], date = moment().format("YYYY-M-D")) {
  let today = date;
  let yesterday = moment(date).subtract(1, 'days').format("YYYY-M-D");
  let todayReport = dateActivity(reports, today);
  let yesterdayReport = dateActivity(reports, yesterday);
  let activityDifference = compareActivityPercentage(yesterdayReport.length, todayReport.length);
  let todayTotalKeyPresses = todayReport.length;
  let todayAvgKeyPressPerMinute = keyPressPerMinute(todayReport);
  let todayActiveFolder = todayReport
    .map((report) => report._workSpace)
    .getMaxCountElement();
  let todayMostPressedKey = todayReport
    .map((report) => report.key)
    .getMaxCountElement();
    todayMostPressedKey = todayMostPressedKey === " " ? "Space" : todayMostPressedKey
  let todayLeastPressedKey = todayReport
    .map((report) => report.key)
    .getMinCountElement();

    todayLeastPressedKey = todayLeastPressedKey === " " ? "Space" : todayLeastPressedKey
  let todayTop5Keys = todayReport
    .map((report) => report.key)
    .sortByHighestCount();

  return {
    activityDifference: activityDifference < 0 ? `${activityDifference}% 📉` : `${activityDifference}% 📈` ,
    todayTotalKeyPresses: todayTotalKeyPresses,
    todayAvgKeyPressPerMinute: todayTotalKeyPresses === 0 ? 0 : todayAvgKeyPressPerMinute,
    todayActiveFolder: todayTotalKeyPresses === 0 ? "---" : todayActiveFolder,
    todayMostPressedKey: todayTotalKeyPresses === 0 ? "---" : todayMostPressedKey,
    todayLeastPressedKey: todayTotalKeyPresses === 0 ? "---" : todayLeastPressedKey,
    todayTop5Keys: todayTotalKeyPresses === 0 ? ["---"] : todayTop5Keys,
  };
}

export default getTodayActivityOverview;
