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
 * Get account informations
 * 
 * @param {String} email Optional email address associated to the account to lookup
 * @param {String} status Optional status of the account to lookup possible values are:
 *                        INVALID_CREDENTIALS, CONNECTION_IMPOSSIBLE, NO_ACCESS_TO_ALL_MAIL,
 *                        OK, TEMP_DISABLED, DISABLED
 * @param {Integer} status_ok Optional set to 0 to get all accounts with sources that are not 
 *                                     working correctly. Set to 1 for the opposite.
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based).
 */
function account(email, status, status_ok, limit, offset) {
  
  var url = "https://api.context.io/2.0/accounts";
  
  // Call args
  var parametersArray = new Array();
  
  // Handle email parameter
  if(typeof email !== "undefined" && email != "") {
    parametersArray.push("email="+encodeURIComponent(email));
  }
  
  // Handle status parameter
  if(typeof status !== "undefined" && status != "") {
    parametersArray.push("status="+encodeURIComponent(status));
  }
  
  // Handle status_ok parameter
  if(typeof status_ok !== "undefined" && status_ok != "") {
    parametersArray.push("status_ok="+encodeURIComponent(status_ok));
  }
  
  // Handle limit parameter
  if(typeof limit !== "undefined" && limit != "") {
    parametersArray.push("limit="+encodeURIComponent(limit));
  }
  
  // Handle offset parameter
  if(typeof offset !== "undefined" && offset != "") {
    parametersArray.push("offset="+encodeURIComponent(offset));
  }
  
  if(parametersArray.length > 0) {
    url += "?";
    for(var i = 0; i < parametersArray.length; i++) {
      
      // check if it's the first element
      if(i == 0) {
        url += parametersArray[i];
      } else {
        url += "&" + parametersArray[i];
      }
    }
  }
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Create a new account
 *
 * @param {String} email The primary email address of the account holder
 * @param {String} first_name Optional first name of the account holder
 * @param {String} last_name Optional last name of the account holder
 */
function account_create(email, first_name, last_name) {
  
  var url = "https://api.context.io/2.0/accounts";
  
  // Handle first_name parameter
  if(typeof first_name === "undefined") {
    first_name = "";
  }
  
  // Handle last_name parameter
  if(typeof last_name === "undefined") {
    last_name = "";
  }
  
  // Post parameters
  var params = {
    "email": email,
    "first_name": first_name,
    "last_name": last_name                          
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors  
}

/**
 * Update account informations
 *
 * @param {String} id Unique id of an account
 * @param {String} first_name Optional first name of the account holder
 * @param {String} last_name Optional last name of the account holder
 */
function account_update(id, first_name, last_name) {
  var url = "https://api.context.io/2.0/accounts/" + id;
  
  // Handle first_name parameter
  if(typeof first_name === "undefined") {
    first_name = "";
  }
  
  // Handle last_name parameter
  if(typeof last_name === "undefined") {
    last_name = "";
  }
  
  // Post parameters
  var params = {
    "first_name": first_name,
    "last_name": last_name                          
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Delete an account
 *
 * @param {String} id Unique id of an account
 */
function account_delete(id) {
  var url = "https://api.context.io/2.0/accounts/" + id;

  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("DELETE")).getContentText());
  return response;
  //TODO: Handle errors 
}
