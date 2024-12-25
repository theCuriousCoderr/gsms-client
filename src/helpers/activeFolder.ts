import { UserReportType } from "@/types";

// declare global {
//   interface Array<T> {
//     getMaxCountElement(): string | number;
//     getMinCountElement(): string | number;
//     sortByHighestCount(): string | number;
//   }
// }

// Array.prototype.getMaxCountElement = function () {
//   const countMap = this.reduce((map, item) => {
//     map[item] = (map[item] || 0) + 1;
//     return map;
//   }, {});

//   return Object.keys(countMap).reduce((maxItem, currentItem) =>
//     countMap[currentItem] > countMap[maxItem] ? currentItem : maxItem
//   );
// };

// Array.prototype.getMinCountElement = function () {
//   const countMap = this.reduce((map, item) => {
//     map[item] = (map[item] || 0) + 1;
//     return map;
//   }, {});

//   return Object.keys(countMap).reduce((maxItem, currentItem) =>
//     countMap[currentItem] < countMap[maxItem] ? currentItem : maxItem
//   );
// };

// Array.prototype.sortByHighestCount = function () {
//   const countMap: Record<string, number> = this.reduce((map, item) => {
//     map[item] = (map[item] || 0) + 1;
//     return map;
//   }, {});

//   let sortedListsByCount = [];
//   const sortedListCounts = Object.keys(countMap)
//     .map((item) => countMap[item])
//     .sort(function (a, b) {
//       return b - a;
//     });
//   sortedListCounts.map((count, index) => {
//     Object.keys(countMap).forEach((item) => {
//       if (countMap[item] === count) {
//         sortedListsByCount.push(item);
//       }
//     });
//   });

//   return Object.keys(countMap).reduce((maxItem, currentItem) =>
//     countMap[currentItem] < countMap[maxItem] ? currentItem : maxItem
//   );
// };

function activeFolder(reports: UserReportType[]) {
  let activefolder = reports
    .map((report) => report._workSpace)
    .getMaxCountElement();
  return activefolder;
}

export default activeFolder;
