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
 * List of email addressed used by an account
 *
 * @param {String} id Unique id of an account  
 */
function account_email_addresses(id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/email_addresses";
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Create an email address for the specified account
 *
 * @param {String} id Unique id of an account 
 * @param {String} email_address email address to create
 */
function account_email_addresses_create(id, email_address) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/email_addresses";
  
    // Post parameters
  var params = {
    "email_address": email_address                      
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Set primary email address for the specified account
 *
 * @param {String} id Unique id of an account 
 * @param {String} email_address email address of the account
 * @param {Integer} primary Set to 1 to make this email address the primary one for the account
 */
function account_email_addresses_set_primary(id, email_address, primary) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/email_addresses/" + encodeURIComponent(email_address);
  
  // Post parameters
  var params = {
    "primary": primary                      
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Delete email address from an account
 *
 * @param {String} id Unique id of an account 
 * @param {String} email email address of the account
 */
function account_email_addresses_delete(id, email) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/email_addresses/" + encodeURIComponent(email);

  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("DELETE")).getContentText());
  return response;
  //TODO: Handle errors 
}
