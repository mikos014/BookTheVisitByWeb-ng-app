// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {any} from 'codelyzer/util/function';

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8082',
  ApiUrl: 'http://localhost:8082/api',
  responseOK: 200,
  responseEmailConflict: 409,
  responseLenPasswordError: 406,
  responseServerError: 500
};
