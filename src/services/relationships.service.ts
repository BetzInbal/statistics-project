// import { fifthModel } from "../models/fifth.model";
// import { fourthModel } from "../models/fourth";
// import { orgaAndLocateModel } from "../models/orgaAndLocate.model";
// import { sixthModel } from "../models/sixth.model";
// import { ISixth } from "../types/interfaces";

import AreaModel from "../models/AreaModel";

// export const getFifthByYear = async (myYear: number) => {
//   try {
//     return await fifthModel.find({ year: myYear }).sort({ numEvent: -1 });
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const getFifthByOarg = async (oarg: string) => {
//   try {
//     return await fifthModel.find({ organizationName: oarg });
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export const getFifthAll = async () => {
//   try {
//     return await fifthModel.find();
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

export const getFiveAll = async () => {
  try {
    const result = await AreaModel.aggregate([{
      $project: {
      "area": 1,
      "latitude": 1,
      "longitude": 1,
      "incidents":{$slice: [ {$sortArray: { input: "$incidents", sortBy: { total_incidents: -1 } }},5]}
    }}
]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFiveArea = async (area: string) => {
  try {
    const result =await AreaModel.aggregate([{$match:{area:area}},{
      $project: {
      "area": 1,
      "latitude": 1,
      "longitude": 1,
      "incidents":{$slice: [ {$sortArray: { input: "$incidents", sortBy: { total_incidents: -1 } }},5]}
    }}
]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// export const getMax = async (arr: ISixth[]) => {
//   const list: ISixth[] = [];
//   for (const element of arr) {
//     const reg = await sixthModel
//       .find({ region: element.region })
//       .sort({ numCasualties: -1 });
//     if (element.numCasualties >= reg[0].numCasualties) {
//       list.push(element);
//     }
//   }
//   return list;
// };

// export const getSixthArea = async (oarg: string) => {
//   try {
//     const result = await sixthModel.find({ organName: oarg });
//     return getMax(result);
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
