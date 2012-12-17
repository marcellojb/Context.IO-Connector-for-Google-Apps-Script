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
 * List of connect tokens created with your API key
 *
 */
function connect_tokens() {
  var url = "https://api.context.io/2.0/connect_tokens";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Obtain a new connect_token
 * 
 * @param {String} callback_url when the user's mailbox is connected to your API key, the browser 
 *                              will call this url (GET). This call will have a parameter called 
 *                              contextio_token indicating the connect_token related to this callback. 
 *                              You can then do a get on this connect_token to obtain details about 
 *                              the account and source created through that token and save that account 
 *                              id in your own user data
 * @param {String} service_level Optional sets the service level of the account's source to be created. 
 *                               Possible values are PRO and BASIC
 * @param {String} email Optional the email address of the account to be added. If specified, the first 
 *                       step of the connect UI where users are prompted for their email address, first 
 *                       name and last name is skipped
 * @param {String} first_name Optional First name of the account holder
 * @param {String} last_name Optional Last name of the account holder
 * @param {String} source_callback_url Optional if specified, we'll make a POST request to this URL when 
 *                                     the initial sync is completed
 * @param {Integer} source_sync_all_folders Optional by default, we filter out some filders like 'Deleted 
 *                                          Items' and 'Drafts'. Set this parameter to 1 to turn off this 
 *                                          filtering and show every single folder
 * @param {Integer} source_sync_flags Optional by default, we don't synchronize IMAP flags. Set this 
 *                                    parameter to 1 to turn on IMAP flag syncing for the 'seen' and 
 *                                    'flagged' flags
 * @param {Integer} source_raw_file_list Optional by default, we filter out files like signature images or 
 *                                       those winmail.dat files form the files list. Set this parameter to 
 *                                       1 to turn off this filtering and show every single file attachments
 */
function connect_tokens_create(callback_url, service_level, email, first_name, last_name, source_callback_url, source_sync_all_folders, source_sync_flags, source_raw_file_list) {
  var url = "https://api.context.io/2.0/connect_tokens";

  // Handle service_level parameter
  if(typeof service_level === "undefined") {
    service_level = "";
  }  
  
  // Handle email parameter
  if(typeof email === "undefined") {
    email = "";
  } 
  
  // Handle first_name parameter
  if(typeof first_name === "undefined") {
    first_name = "";
  }  
  
  // Handle last_name parameter
  if(typeof last_name === "undefined") {
    last_name = "";
  }
  
  // Handle source_callback_url parameter
  if(typeof source_callback_url === "undefined") {
    source_callback_url = "";
  }
  
  // Handle source_sync_all_folders parameter
  if(typeof source_sync_all_folders === "undefined") {
    source_sync_all_folders = "";
  }
  
  // Handle source_sync_flags parameter
  if(typeof source_sync_flags === "undefined") {
    source_sync_flags = "";
  }
  
  // Handle source_raw_file_list parameter
  if(typeof source_raw_file_list === "undefined") {
    source_raw_file_list = "";
  }
  
  // Post parameters
  var params = {
    "callback_url": callback_url,
    "service_level": service_level,
    "email": email,
    "first_name": first_name,
    "last_name": last_name,
    "source_callback_url": source_callback_url,
    "source_sync_all_folders": source_sync_all_folders,
    "source_sync_flags": source_sync_flags,
    "source_raw_file_list": source_raw_file_list
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Information about a given connect token
 *
 * @param {String} token the unique random token used for the graphical account creation process
 */
function connect_tokens_token(token) {
  var url = "https://api.context.io/2.0/connect_tokens/" + encodeURIComponent(token);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Remove a given connect token
 *
 * @param {String} token the unique random token used for the graphical account creation process
 */
function connect_tokens_token_delete(token) {
  var url = "https://api.context.io/2.0/connect_tokens/" + encodeURIComponent(token);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("DELETE")).getContentText());
  return response;
  //TODO: Handle errors  
}
