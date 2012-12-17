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
 * Listing of WebHook configured for an account
 *
 * @param {String} id Unique id of an account 
 */
function account_webhooks(id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/webhooks";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Create a new WebHook on an account
 *
 * @param {String} id Unique id of an account 
 * @param {String} callback_url a valid URL Context.IO calls when a matching message is found
 * @param {String} failure_notif_url a valid URL Context.IO calls if the WebHooks fails and will 
 *                                   no longer be active. That may happen if, for example, the server 
 *                                   becomes unreachable or if it closes an IDLE connection and we 
 *                                   can't re-establish it
 * @param {String} filter_to Optional check for new messages sent to a given name or email address
 * @param {String} filter_from Optional check for new messages received from a given name or email address
 * @param {String} filter_cc Optional check for new messages where a given name or email address is cc'ed
 * @param {String} filter_subject Optional check for new messages with a subject matching a given string 
 *                                or regular expresion
 * @param {String} filter_thread Optional check for new messages in a given thread. Value can be a 
 *                               gmail_thread_id or the email_message_id or message_id of an existing 
 *                               message currently in the thread
 * @param {String} filter_new_important Optional check for new messages automatically tagged as important 
 *                                      by the Gmail Priority Inbox algorithm
 * @param {String} filter_file_name Optional check for new messages where a file whose name matches the 
 *                                  given string is attached. Supports wildcards and regular expressions 
 *                                  like the file_name parameter of the files list call
 * @param {String} filter_file_revisions Optional check for new message where a new revision of a given 
 *                                       file is attached. The value should be a file_id, see getting file 
 *                                       revisions for more info
 * @param {String} filter_folder_added Optional check for messages filed in a given folder. On Gmail, this 
 *                                     is equivalent to having a label applied to a message. The value should 
 *                                     be the complete name (including parents if applicable) of the folder 
 *                                     you want to track
 * @param {String} filter_folder_removed Optional heck for messages removed from a given folder. On Gmail, 
 *                                       this is equivalent to having a label removed from a message. The 
 *                                       value should be the complete name (including parents if applicable) 
 *                                       of the folder you want to track
 * @param {String} sync_period Optional  Desired maximum delay between the moment the email comes in the user's 
 *                                       mailbox and the time we call the callback_url. To have your callback_url 
 *                                       called as soon as possible (typically, this means within a minute after 
 *                                       the event occurred in the mailbox), set this parameter to immediate or 0. 
 *                                       Other possible values are 30m, 1h, 4h, 12h and 24h (default) meaning 30 
 *                                       minutes, 1 hour, 4 hours, 12 hours and 24 hours respectively
 */
function account_webhooks_create(id, callback_url, failure_notif_url, filter_to, filter_from, filter_cc, filter_subject, filter_thread, filter_new_important, filter_file_name, filter_file_revisions, filter_folder_added, filter_folder_removed, sync_period) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/webhooks";
  
  // Handle filter_to parameter
  if(typeof filter_to === "undefined") {
    filter_to = "";
  }
  
  // Handle filter_from parameter
  if(typeof filter_from === "undefined") {
    filter_from = "";
  }

  // Handle filter_cc parameter
  if(typeof filter_cc === "undefined") {
    filter_cc = "";
  }
  
  // Handle filter_subject parameter
  if(typeof filter_subject === "undefined") {
    filter_subject = "";
  }
  
  // Handle filter_thread parameter
  if(typeof filter_thread === "undefined") {
    filter_thread = "";
  }
  
  // Handle filter_new_important parameter
  if(typeof filter_new_important === "undefined") {
    filter_new_important = "";
  }
  
  // Handle filter_file_name parameter
  if(typeof filter_file_name === "undefined") {
    filter_file_name = "";
  } 

  // Handle filter_file_revisions parameter
  if(typeof filter_file_revisions === "undefined") {
    filter_file_revisions = "";
  }
  
  // Handle filter_folder_added parameter
  if(typeof filter_folder_added === "undefined") {
    filter_folder_added = "";
  }

  // Handle filter_folder_removed parameter
  if(typeof filter_folder_removed === "undefined") {
    filter_folder_removed = "";
  }
  
  // Handle sync_period parameter
  if(typeof sync_period === "undefined") {
    sync_period = "";
  }
  
  // Post parameters
  var params = {
    "callback_url": callback_url,
    "failure_notif_url": failure_notif_url,
    "filter_to": filter_to,
    "filter_from": filter_from,
    "filter_cc": filter_cc,
    "filter_subject": filter_subject,
    "filter_thread": filter_thread,
    "filter_new_important": filter_new_important,
    "filter_file_name": filter_file_name,
    "filter_file_revisions": filter_file_revisions,
    "filter_folder_added": filter_folder_added,
    "filter_folder_removed": filter_folder_removed,
    "sync_period": sync_period
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors     
}

/**
 * Properties of a given WebHook
 *
 * @param {String} id Unique id of an account 
 * @param {String} webhook_id Unique id of the webhook instance 
 */
function account_webhooks_webhook_id(id, webhook_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/webhooks/" + encodeURIComponent(webhook_id);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Change properties of a given WebHook
 *
 * @param {String} id Unique id of an account 
 * @param {String} webhook_id Unique id of the webhook instance
 * @param {Integer} active Optional the active property of a WebHook allows you to pause 
 *                         (set to 0) or resume (set to 1) it 
 */
function account_webhooks_webhook_id_edit(id, webhook_id, active) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/webhooks/" + encodeURIComponent(webhook_id);
  
  // Handle active parameter
  if(typeof active === "undefined") {
    active = "";
  } 
  
  // Post parameters
  var params = {
    "active": active
  };  
   
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * Delete a WebHook
 *
 * @param {String} id Unique id of an account 
 * @param {String} webhook_id Unique id of the webhook instance 
 */
function account_webhooks_webhook_id_delete(id, webhook_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/webhooks/" + encodeURIComponent(webhook_id);
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("DELETE")).getContentText());
  return response;
  //TODO: Handle errors  
}
