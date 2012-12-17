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
 * Get contacts for an account
 *
 * @param {String} id Unique id of an account
 * @param {String} search Optional string identifying the name or the email address of the 
 *                        contact(s) you are looking for
 * @param {Integer} active_before Optional only include contacts included in at least one email 
 *                                dated before a given time. This parameter should be a standard 
 *                                unix timestamp
 * @param {Integer} active_after Optional only include contacts included in at least one email 
 *                               dated after a given time. This parameter should be a standard 
 *                               unix timestamp
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based). 
 */
function account_contacts(id, search, active_before, active_after, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/contacts";

  // Call args
  var parametersArray = new Array();
  
  // Handle search parameter
  if(typeof search !== "undefined" && search != "") {
    parametersArray.push("search="+encodeURIComponent(search));
  }
  
  // Handle active_before parameter
  if(typeof active_before !== "undefined" && active_before != "") {
    parametersArray.push("active_before="+encodeURIComponent(active_before));
  }
  
  // Handle active_after parameter
  if(typeof active_after !== "undefined" && active_after != "") {
    parametersArray.push("active_after="+encodeURIComponent(active_after));
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
 * Get informations about a given contact
 *
 * @param {String} id Unique id of an account
 * @param {String} email the email address of the contact
 */
function account_contacts_email(id, email) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/contacts/" + encodeURIComponent(email);
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * List files exchanged with a contact
 *
 * @param {String} id Unique id of an account
 * @param {String} email the email address of the contact
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based).  
 */
function account_contacts_email_files(id, email, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/contacts/" + encodeURIComponent(email) + "/files";
    
  // Call args
  var parametersArray = new Array();
  
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
 * List messages exchanged with a contact
 *
 * @param {String} id Unique id of an account
 * @param {String} email the email address of the contact
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based).  
 */
function account_contacts_email_messages(id, email, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/contacts/" + encodeURIComponent(email) + "/messages";
    
  // Call args
  var parametersArray = new Array();
  
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
 * List threads exchanged with a contact
 *
 * @param {String} id Unique id of an account
 * @param {String} email the email address of the contact
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based).  
 */
function account_contacts_email_threads(id, email, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/contacts/" + encodeURIComponent(email) + "/threads";
    
  // Call args
  var parametersArray = new Array();
  
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

