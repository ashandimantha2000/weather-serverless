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
        path: "weather/{weatherId}",
      },
    },
  ],
};


export { create, fetch };