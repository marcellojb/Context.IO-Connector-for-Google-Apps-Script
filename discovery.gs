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
 * Attempts to discover IMAP settings for a given email address
 *
 * @param {String} source_type the type of source you want to discover settings for. Right now, 
 *                             the only supported source type is IMAP
 * @param {String} email an email address you want to discover IMAP settings for. Make sure 
 *                       source_type is set to IMAP
 */
function discovery(source_type, email) {
  var url = "https://api.context.io/2.0/discovery?source_type=" + encodeURIComponent(source_type) + "&email=" + encodeURIComponent(email);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors

}
