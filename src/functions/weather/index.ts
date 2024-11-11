// import { handlerPath } from '@libs/handler-resolver';

// export default {
//   handler: `${handlerPath(__dirname)}/handler.main`,
//   events: [
//     {
//       http: {
//         method: 'get',
//         path: 'weather',

//       },
//     },
//   ],
// };

import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

//find weather
const findweather = {
  handler: `${handlerPath(__dirname)}/findweather.main`,
  events: [
    {
      http: {
        method: "get",
        path: "findweather",
      },
    },
  ],
};

const create = {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: "post",
        path: "addweather",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
        // private: true
      },
    },
  ],
};

const fetch = {
  handler: `${handlerPath(__dirname)}/fetch.main`,
  events: [
    {
      http: {
        method: "get",
        path: "weatherbyid/{weatherId}",
      },
    },
  ],
};

const fetchAll = {
  handler: `${handlerPath(__dirname)}/fetchAll.main`,
  events: [
    {
      http: {
        method: "get",
        path: "weatherall",
      },
    },
  ],
};

export { create, fetch, fetchAll,findweather };
