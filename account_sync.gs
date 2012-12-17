/*
  --- Context.IO API Connector ---
 
   Copyright (c) 2012 Marcello Scacchetti - Jelly Bend

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/**
 * Sync status for all sources of the account
 *
 * @param {String} id Unique id of an account 
 */
function account_sync(id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sync";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Trigger a sync of all sources on the account
 *
 * @param {String} id Unique id of an account  
 */
function account_sync_trigger(id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sync";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST")).getContentText());
  return response;
  //TODO: Handle errors 
}
