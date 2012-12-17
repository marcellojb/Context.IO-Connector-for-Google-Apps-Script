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
 * List of threads on an account
 *
 * @param {String} id Unique id of an account
 * @param {String} subject Optional get messages whose subject matches this search string. To use 
 *                         regular expressions instead of simple string matching, make sure the 
 *                         string starts and ends with /
 * @param {String} email Optional email address of the contact for whom you want the latest files 
 *                       exchanged with. By "exchanged with contact X" we mean any email received 
 *                       from contact X, sent to contact X or sent by anyone to both contact X and 
 *                       the source owner.
 * @param {String} to Optional email address of a contact files have been sent to
 * @param {String} from Optional email address of a contact files have been received from
 * @param {String} cc Optional mail address of a contact CC'ed on the messages
 * @param {String} bcc Optional mail address of a contact BCC'ed on the messages
 * @param {String} folder Optional filter messages by the folder (or Gmail label). This parameter 
 *                        can be the complete folder name with the appropriate hierarchy delimiter 
 *                        for the mail server being queried (eg. Inbox/My folder) or the "symbolic name" 
 *                        of the folder (eg. \Starred). The symbolic name refers to attributes used to 
 *                        refer to special use folders in a language-independant way. 
 *                        See http://code.google.com/apis/gmail/imap/#xlist (Gmail specific) and RFC-6154
 * @param {Integer} indexed_before Optional only include files attached to messages indexed before a given 
 *                                 timestamp. This is not the same as the date of the email, it is the 
 *                                 time Context.IO indexed this message
 * @param {Integer} indexed_after Optional only include files attached to messages indexed after a given 
 *                                timestamp. This is not the same as the date of the email, it is the time 
 *                                Context.IO indexed this message.
 * @param {Integer} active_before Optional Get threads with at least one message dated before this timestamp. 
 *                                The value this filter is applied to is the Date: header of the message which 
 *                                refers to the time the message is sent from the origin
 * @param {Integer} active_after Optional get threads with at least one message dated after this timestamp. 
 *                               The value this filter is applied to is the Date: header of the message which 
 *                               refers to the time the message is sent from the origin
 * @param {Integer} started_before Optional get threads whose first message is dated before this timestamp. 
 *                                 The value this filter is applied to is the Date: header of the message which 
 *                                 refers to the time the message is sent from the origin
 * @param {Integer} started_after Optional get threads whose first message is dated after this timestamp. The 
 *                                value this filter is applied to is the Date: header of the message which refers 
 *                                to the time the message is sent from the origin
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based).  
 */
function account_threads(id, subject, email, to, from, cc, bcc, folder, indexed_before, indexed_after, active_before, active_after, started_before, started_after, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/threads";
  
  // Call args
  var parametersArray = new Array();

  // Handle subject parameter
  if(typeof subject !== "undefined" && subject != "") {
    parametersArray.push("subject="+encodeURIComponent(subject));
  }
  
  // Handle email parameter
  if(typeof email !== "undefined" && email != "") {
    parametersArray.push("email="+encodeURIComponent(email));
  }
  
  // Handle to parameter
  if(typeof to !== "undefined" && to != "") {
    parametersArray.push("to="+encodeURIComponent(to));
  }
  
  // Handle from parameter
  if(typeof from !== "undefined" && from != "") {
    parametersArray.push("from="+encodeURIComponent(from));
  }
  
  // Handle cc parameter
  if(typeof cc !== "undefined" && cc != "") {
    parametersArray.push("cc="+encodeURIComponent(cc));
  }
  
  // Handle bcc parameter
  if(typeof bcc !== "undefined" && bcc != "") {
    parametersArray.push("bcc="+encodeURIComponent(bcc));
  }
  
  // Handle folder parameter
  if(typeof folder !== "undefined" && folder != "") {
    parametersArray.push("folder="+encodeURIComponent(folder));
  }

  // Handle indexed_before parameter
  if(typeof indexed_before !== "undefined" && indexed_before != "") {
    parametersArray.push("indexed_before="+encodeURIComponent(indexed_before));
  } 
  
  // Handle indexed_after parameter
  if(typeof indexed_after !== "undefined" && indexed_after != "") {
    parametersArray.push("indexed_after="+encodeURIComponent(indexed_after));
  } 

  // Handle active_before parameter
  if(typeof active_before !== "undefined" && active_before != "") {
    parametersArray.push("active_before="+encodeURIComponent(active_before));
  }   
  
  // Handle active_after parameter
  if(typeof active_after !== "undefined" && active_after != "") {
    parametersArray.push("active_after="+encodeURIComponent(active_after));
  }  
  
  // Handle started_before parameter
  if(typeof started_before !== "undefined" && started_before != "") {
    parametersArray.push("started_before="+encodeURIComponent(started_before));
  }    

  // Handle started_after parameter
  if(typeof started_after !== "undefined" && started_after != "") {
    parametersArray.push("started_after="+encodeURIComponent(started_after));
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
 * Returns files, contacts and messages on a given thread
 *
 * @param {String} id Unique id of an account
 * @param {String} thread_id a gmail_thread_id prefixed with gm-
 * @param {Integer} include_body Optional set to 1 to include message bodies in the result. Since message 
 *                               bodies must be retrieved from the IMAP server, expect a performance hit 
 *                               when setting this parameter
 * @param {Mixed} include_headers Optional can be set to 0 (default), 1 or raw. If set to 1, complete message 
 *                                headers, parsed into an array, are included in the results. If set to raw, 
 *                                the headers are also included but as a raw unparsed string. Since full 
 *                                original headers bodies must be retrieved from the IMAP server, expect a 
 *                                performance hit when setting this parameter
 * @param {Integer} include_flags Optional set to 1 to include IMAP flags of messages in the result. Since 
 *                                message flags must be retrieved from the IMAP server, expect a performance 
 *                                hit when setting this parameter
 * @param {String} body_type Optional Used when include_body is set to get only body parts of a given MIME-type 
 *                           (for example text/html) 
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based). 
 */
function account_threads_thread_id(id, thread_id, include_body, include_headers, include_flags, body_type, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/threads/" + encodeURIComponent(thread_id);
  
  // Call args
  var parametersArray = new Array();
  
  // Handle include_body parameter
  if(typeof include_body !== "undefined" && include_body != "") {
    parametersArray.push("include_body="+encodeURIComponent(include_body));
  }

  // Handle include_headers parameter
  if(typeof include_headers !== "undefined" && include_headers != "") {
    parametersArray.push("include_headers="+encodeURIComponent(include_headers));
  } 
  
  // Handle include_flags parameter
  if(typeof include_flags !== "undefined" && include_flags != "") {
    parametersArray.push("include_flags="+encodeURIComponent(include_flags));
  } 
  
  // Handle body_type parameter
  if(typeof body_type !== "undefined" && body_type != "") {
    parametersArray.push("body_type="+encodeURIComponent(body_type));
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
