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
 * List of IMAP sources assigned for an account
 * @param {String} id Unique id of an account
 * @param {String} status Optional status of the account to lookup possible values are:
 *                        INVALID_CREDENTIALS, CONNECTION_IMPOSSIBLE, NO_ACCESS_TO_ALL_MAIL,
 *                        OK, TEMP_DISABLED, DISABLED
 * @param {Integer} status_ok Optional set to 0 to get all accounts with sources that are not 
 *                                     working correctly. Set to 1 for the opposite.
 */
function account_sources(id, status, status_ok) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources";
  
  // Call args
  var parametersArray = new Array();

  // Handle status parameter
  if(typeof status !== "undefined" && status != "") {
    parametersArray.push("status="+encodeURIComponent(status));
  }
  
  // Handle status_ok parameter
  if(typeof status_ok !== "undefined" && status_ok != "") {
    parametersArray.push("status_ok="+encodeURIComponent(status_ok));
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
 * Add a mailbox to a given account
 *
 * @param {String} id Unique id of an account
 * @param {String} email the primary email address used to receive emails in this account
 * @param {String} server name of IP of the IMAP server, eg. imap.gmail.com
 * @param {String} username the username used to authentify an IMAP connection. On some servers, 
 *                          this is the same thing as the primary email address
 * @param {Integer} use_ssl set to 1 if you want SSL encryption to be used when opening connections 
 *                          to the IMAP server. Any other value will be considered as "do not use SSL"
 * @param {Integer} port port number to connect to on the server. Keep in mind that most IMAP servers 
 *                       will have one port for standard connection and another one for encrypted 
 *                       connection (see use-ssl parameter above)
 * @param {String} type currently, the only supported type is IMAP
 * @param {String} service_level Optional sets the service level for the source to be created. 
 *                               Possible values are PRO and BASIC
 * @param {String} sync_period Optional sets the period at which the Context.IO index for this source 
 *                                      is synced with the origin email account on the IMAP server. 
 *                                      Possible values are 1h, 4h, 12h and 24h (default) Only available 
 *                                      on sources with service_level set to PRO
 * @param {Integer} sync_all_folders Optional by default, we filter out some filders like 'Deleted Items' 
 *                                   and 'Drafts'. Set this parameter to 1 to turn off this filtering and 
 *                                   show every single folder
 * @param {Integer} sync_flags Optional by default, we don't synchronize IMAP flags. Set this parameter 
 *                             to 1 to turn on IMAP flag syncing for the 'seen' and 'flagged' flags
 * @param {Integer} raw_file_list Optional by default, we filter out files like signature images or 
 *                                those winmail.dat files form the files list. Set this parameter to 1 to 
 *                                turn off this filtering and show every single file attachments
 * @param {String} password Optional password for authentication on the IMAP server. Ignored if any of the 
 *                          provider_* parameters are set below
 * @param {String} provider_refresh_token Optional an OAuth2 refresh token obtained from the IMAP account 
 *                                        provider to be used to authentify on this email account
 * @param {String} provider_token Optional an OAuth1 token obtained from the IMAP account provider to be 
 *                                used to authentify on this email account
 * @param {String} provider_token_secret Optional an OAuth1 token secret obtained from the IMAP account 
 *                                       provider to be used to authentify on this email account
 * @param {String} provider_consumer_key Optional the OAuth2 Client ID or OAuth1 consumer key used to 
 *                                       obtain the the token and token secret above for that account. 
 *                                       That consumer key and secret must be configured in your Context.IO 
 *                                       account
 * @param {String} callback_url Optional if specified, we'll make a POST request to this URL when the initial 
 *                              sync is completed
 */
function account_sources_create(id, email, server, username, use_ssl, port, type, service_level, sync_period, sync_all_folders, sync_flags, raw_file_list, password, provider_refresh_token, provider_token, provider_token_secret, provider_consumer_key, callback_url) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources";
  
  // Handle service_level parameter
  if(typeof service_level === "undefined") {
    service_level = "";
  }
  
  // Handle sync_period parameter
  if(typeof sync_period === "undefined") {
    sync_period = "";
  }

  // Handle sync_all_folders parameter
  if(typeof sync_all_folders === "undefined") {
    sync_all_folders = "";
  }
  
  // Handle sync_flags parameter
  if(typeof sync_flags === "undefined") {
    sync_flags = "";
  }
  
  // Handle raw_file_list parameter
  if(typeof raw_file_list === "undefined") {
    raw_file_list = "";
  }
  
  // Handle password parameter
  if(typeof password === "undefined") {
    password = "";
  }
  
  // Handle provider_refresh_token parameter
  if(typeof provider_refresh_token === "undefined") {
    provider_refresh_token = "";
  } 

  // Handle provider_token parameter
  if(typeof provider_token === "undefined") {
    provider_token = "";
  }
  
  // Handle provider_token_secret parameter
  if(typeof provider_token_secret === "undefined") {
    provider_token_secret = "";
  }

  // Handle provider_consumer_key parameter
  if(typeof provider_consumer_key === "undefined") {
    provider_consumer_key = "";
  }
  
  // Handle callback_url parameter
  if(typeof callback_url === "undefined") {
    callback_url = "";
  }
  
  // Post parameters
  var params = {
    "email": email,
    "server": server,
    "username": username,
    "use_ssl": use_ssl,
    "port": port,
    "type": type,
    "service_level": service_level,
    "sync_period": sync_period,
    "sync_all_folders": sync_all_folders,
    "sync_flags": sync_flags,
    "raw_file_list": raw_file_list,
    "password": password,
    "provider_refresh_token": provider_refresh_token,
    "provider_token": provider_token,
    "provider_token_secret": provider_token_secret,
    "provider_consumer_key": provider_consumer_key,
    "callback_url": callback_url
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Parameters and status for an IMAP source
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 */
function account_sources_label(id, label){
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Modify a data source on a given account
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {Integer} status Optional if the status of the source is TEMP_DISABLED or DISABLED. 
 *                         You can do a POST/PUT with status set to 1 to reset it
 * @param {String} sync_period Optional sets the period at which the Context.IO index for this source 
 *                                      is synced with the origin email account on the IMAP server. 
 *                                      Possible values are 1h, 4h, 12h and 24h (default) Only available 
 *                                      on sources with service_level set to PRO 
 * @param {String} service_level Optional sets the service level for the source to be created. 
 *                               Possible values are PRO and BASIC
 * @param {String} password Optional password for authentication on the IMAP server. Ignored if any of the 
 *                          provider_* parameters are set below
 * @param {String} provider_refresh_token Optional an OAuth2 refresh token obtained from the IMAP account 
 *                                        provider to be used to authentify on this email account
 * @param {String} provider_token Optional an OAuth1 token obtained from the IMAP account provider to be 
 *                                used to authentify on this email account
 * @param {String} provider_token_secret Optional an OAuth1 token secret obtained from the IMAP account 
 *                                       provider to be used to authentify on this email account
 * @param {String} provider_consumer_key Optional the OAuth2 Client ID or OAuth1 consumer key used to 
 *                                       obtain the the token and token secret above for that account. 
 *                                       That consumer key and secret must be configured in your Context.IO 
 *                                       account 
 */
function account_sources_label_edit(id, label, status, sync_period, service_level, password, provider_refresh_token, provider_token, provider_token_secret, provider_consumer_key){
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label);
  
  // Handle status parameter
  if(typeof status === "undefined") {
    status = "";
  }
  
  // Handle sync_period parameter
  if(typeof sync_period === "undefined") {
    sync_period = "";
  }
  
  // Handle service_level parameter
  if(typeof service_level === "undefined") {
    service_level = "";
  } 
  
  // Handle password parameter
  if(typeof password === "undefined") {
    password = "";
  }
  
  // Handle provider_refresh_token parameter
  if(typeof provider_refresh_token === "undefined") {
    provider_refresh_token = "";
  } 

  // Handle provider_token parameter
  if(typeof provider_token === "undefined") {
    provider_token = "";
  }
  
  // Handle provider_token_secret parameter
  if(typeof provider_token_secret === "undefined") {
    provider_token_secret = "";
  }

  // Handle provider_consumer_key parameter
  if(typeof provider_consumer_key === "undefined") {
    provider_consumer_key = "";
  }
  
  
  // Post parameters
  var params = {
    "status": status,
    "service_level": service_level,
    "sync_period": sync_period,
    "password": password,
    "provider_refresh_token": provider_refresh_token,
    "provider_token": provider_token,
    "provider_token_secret": provider_token_secret,
    "provider_consumer_key": provider_consumer_key
  };

  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Delete a data source of an account
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 */
function account_sources_label_delete(id, label) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("DELETE")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * List folders in an IMAP source
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {Integer} include_extended_counts Optional set to 1 to include extended counts in the 
 *                                          result (for now, the only extended count supported is number 
 *                                          of unseen messages). Since counts must be retrieved from the 
 *                                          IMAP server, expect a performance hit when setting this parameter
 */
function account_sources_label_folders(id, label, include_extended_counts) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/folders";
  
  // Call args
  var parametersArray = new Array();

  // Handle include_extended_counts parameter
  if(typeof include_extended_counts !== "undefined" && include_extended_counts != "") {
    parametersArray.push("include_extended_counts="+encodeURIComponent(include_extended_counts));
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
 * Create a folder on an IMAP source
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {String} folder the full folder path using / as the path hierarchy delimiter
 * @param {String} delim Optional if / isn't fancy enough as a hierarchy delimiter when specifying 
 *                       the folder you want to create, you're free to use what you want, just make 
 *                       sure you set this delim parameter to tell us what you're using
 */
function account_sources_label_folders_create(id, label, folder, delim) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/folders/" + encodeURIComponent(folder);
  
  // Handle delim parameter
  if(typeof delim === "undefined") {
    delim = "";
  }
  
  // Put parameters
  var params = {
    "delim": delim,
  };
  
  params = Utilities.jsonStringify(params);
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("PUTJSON", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Expunge a folder on an IMAP source
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {String} folder the full folder path using / as the path hierarchy delimiter 
 */
function account_sources_label_folders_expunge(id, label, folder) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/folders/" + encodeURIComponent(folder);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST")).getContentText());
  return response;
  //TODO: Handle errors 
}

/**
 * Listings of email messages in a given folder
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {String} folder the full folder path using / as the path hierarchy delimiter
 * @param {Integer} include_body Optional set to 1 to include message bodies in the result. Since message 
 *                               bodies must be retrieved from the IMAP server, expect a performance hit 
 *                               when setting this parameter
 * @param {String} body_type Optional Used when include_body is set to get only body parts of a given MIME-type 
 *                           (for example text/html)
 * @param {Mixed} include_headers Optional can be set to 0 (default), 1 or raw. If set to 1, complete message 
 *                                headers, parsed into an array, are included in the results. If set to raw, 
 *                                the headers are also included but as a raw unparsed string. Since full 
 *                                original headers bodies must be retrieved from the IMAP server, expect a 
 *                                performance hit when setting this parameter
 * @param {Integer} include_flags Optional set to 1 to include IMAP flags of messages in the result. Since 
 *                                message flags must be retrieved from the IMAP server, expect a performance 
 *                                hit when setting this parameter
 * @param {Integer} flag_seen Optional set to 1 to restrict list to messages having the \Seen flag set, set 
 *                            to 0 to have the messages with that flag unset (ie. list unread messages in the 
 *                            folder) 
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based). 
 * @param {Integer} async Optional set to 1 to run job asynchronously
 */
function account_sources_label_folders_messages(id, label, folder, include_body, body_type, include_headers, include_flags, flag_seen, limit, offset, async) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/folders/" + encodeURIComponent(folder) + "/messages";
  
  // Call args
  var parametersArray = new Array();
  
  // Handle include_body parameter
  if(typeof include_body !== "undefined" && include_body != "") {
    parametersArray.push("include_body="+encodeURIComponent(include_body));
  }
  
  // Handle body_type parameter
  if(typeof body_type !== "undefined" && body_type != "") {
    parametersArray.push("body_type="+encodeURIComponent(body_type));
  }  
  
  // Handle include_headers parameter
  if(typeof include_headers !== "undefined" && include_headers != "") {
    parametersArray.push("include_headers="+encodeURIComponent(include_headers));
  } 
  
  // Handle include_flags parameter
  if(typeof include_flags !== "undefined" && include_flags != "") {
    parametersArray.push("include_flags="+encodeURIComponent(include_flags));
  } 

  // Handle flag_seen parameter
  if(typeof flag_seen !== "undefined" && flag_seen != "") {
    parametersArray.push("flag_seen="+encodeURIComponent(flag_seen));
  }  
  
  // Handle limit parameter
  if(typeof limit !== "undefined" && limit != "") {
    parametersArray.push("limit="+encodeURIComponent(limit));
  }
  
  // Handle offset parameter
  if(typeof offset !== "undefined" && offset != "") {
    parametersArray.push("offset="+encodeURIComponent(offset));
  }
  
  // Handle async parameter
  if(typeof async !== "undefined" && async != "") {
    parametersArray.push("async="+encodeURIComponent(async));
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
 * Listings of email messages in a given folder (Async)
 * @TODO Explain exactly
 * 
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {String} folder the full folder path using / as the path hierarchy delimiter
 * @param {String} async_job_id the job ID of the asynchronous job currently running
 */
function account_sources_label_folders_messages_async(id, label, folder, async_job_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/folders/" + encodeURIComponent(folder) + "/messages/" + encodeURIComponent(async_job_id);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Sync status of a data source
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {String} folder Optional the full folder path using / as the path hierarchy delimiter 
 */
function account_sources_sync(id, label, folder) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/sync";
  
  // Call args
  var parametersArray = new Array();

  // Handle folder parameter
  if(typeof folder !== "undefined" && folder != "") {
    parametersArray.push("folder="+encodeURIComponent(folder));
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
 * Trigger a sync of a data source
 *
 * @param {String} id Unique id of an account
 * @param {String} label the label property of the source instance. You can use 0 as an alias 
 *                       for the first source of an account
 * @param {String} priority_folder Optional specifies the folder which should be synced first  
 */
function account_sources_sync_trigger(id, label, priority_folder) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/sources/" + encodeURIComponent(label) + "/sync";
  
  // Handle priority_folder parameter
  if(typeof priority_folder === "undefined") {
    priority_folder = "";
  }  
  
  // Post parameters
  var params = {
    "priority_folder": priority_folder
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors    
}
