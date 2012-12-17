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
 * Listings of email messages for an account
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
 * @param {Integer} date_before Optional only include files attached to messages sent before a given 
 *                              timestamp. The value this filter is applied to is the Date: header of 
 *                              the message which refers to the time the message is sent from the origin
 * @param {Integer} date_after Optional only include files attached to messages sent after a given 
 *                             timestamp. The value this filter is applied to is the Date: header of the 
 *                             message which refers to the time the message is sent from the origin
 * @param {Integer} indexed_before Optional only include files attached to messages indexed before a given 
 *                                 timestamp. This is not the same as the date of the email, it is the 
 *                                 time Context.IO indexed this message
 * @param {Integer} indexed_after Optional only include files attached to messages indexed after a given 
 *                                timestamp. This is not the same as the date of the email, it is the time 
 *                                Context.IO indexed this message.
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
 * @param {String} sort_order Optional the sort order of the returned results. Possible values are asc and desc
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based). 
 */
function account_messages(id, subject, email, to, from, cc, bcc, folder, date_before, date_after, indexed_before, indexed_after, include_body, include_headers, include_flags, body_type, sort_order, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages";
    
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
  
  // Handle date_before parameter
  if(typeof date_before !== "undefined" && date_before != "") {
    parametersArray.push("date_before="+encodeURIComponent(date_before));
  }

  // Handle date_after parameter
  if(typeof date_after !== "undefined" && date_after != "") {
    parametersArray.push("date_after="+encodeURIComponent(date_after));
  }
  
  // Handle indexed_before parameter
  if(typeof indexed_before !== "undefined" && indexed_before != "") {
    parametersArray.push("indexed_before="+encodeURIComponent(indexed_before));
  } 
  
  // Handle indexed_after parameter
  if(typeof indexed_after !== "undefined" && indexed_after != "") {
    parametersArray.push("indexed_after="+encodeURIComponent(indexed_after));
  } 
  
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
  
  // Handle sort_order parameter
  if(typeof sort_order !== "undefined" && sort_order != "") {
    parametersArray.push("sort_order="+encodeURIComponent(sort_order));
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
 * Add a message in a given folder
 *
 * @param {String} id Unique id of an account
 * @param {String} dst_source Label of the source you want the message copied to
 * @param {String} dst_folder The folder within dst_source the message should be copied to
 * @param {File} message raw RFC-822 message data. If you use the "view message source" 
 *                       function of your email client, what you'll see there is what we 
 *                       expect to receive here
 */
function account_messages_create(id, dst_source, dst_folder, message) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages";
  
  // Post parameters
  var params = {
    "dst_source": dst_source,
    "dst_folder": dst_folder,
    "message": message
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * File, contact and other information about a given email message
 *
 * @param {String} id Unique id of an account
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 * @param {Integer} include_body Optional set to 1 to include the message body in the result. 
 *                               Since the body must be retrieved from the IMAP server, expect 
 *                               a performance hit when setting this parameter
 * @param {Mixed} include_headers Optional Can be set to 0 (default), 1 or raw. If set to 1, 
 *                                complete message headers, parsed into an array, are included in 
 *                                the results. If set to raw, the headers are also included but as a 
 *                                raw unparsed string. Since full original headers bodies must be retrieved 
 *                                from the IMAP server, expect a performance hit when setting this parameter
 * @param {Integer} include_flags Optional set to 1 to include IMAP flags of messages in the result. Since 
 *                                message flags must be retrieved from the IMAP server, expect a performance 
 *                                hit when setting this parameter
 * @param {String} body_type Optional Used when include_body is set to get only body parts of a given MIME-type 
 *                           (for example text/html)
 */
function account_messages_message_id(id, message_id, include_body, include_headers, include_flags, body_type) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id);

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
 * Copy or move a message
 *
 * @param {String} id Unique id of an account
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 * @param {String} dst_folder The folder within dst_source the message should be copied to
 * @param {String} dst_source Optional label of the source you want the message copied to. 
 *                            This field is required if you're moving a message that already exists 
 *                            in one source of the account to another source of that account. If you 
 *                            only want to move the message to a different folder within the same source, 
 *                            dst_folder is sufficient
 * @param {Integer} move Optional by default, this calls copies the original message in the destination. 
 *                       Set this parameter to 1 to move instead of copy
 * @TODO: test!
 */
function account_messages_message_id_copymove(id, message_id, dst_folder, dst_source, move) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id);
  
  // Handle first_name parameter
  if(typeof dst_source === "undefined") {
    dst_source = "";
  }
  
  // Handle last_name parameter
  if(typeof move === "undefined") {
    move = "";
  }
  
  // Post parameters
  var params = {
    "dst_folder": dst_folder,
    "dst_source": dst_source,
    "move": move
  };
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors  
}

/**
 * Delete email message from an account
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 */
function account_messages_message_id_delete(id, message_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id);

  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("DELETE")).getContentText());
  return response;
  //TODO: Handle errors 
}

/**
 * Fetch the message body of a given email
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 * @param {String} type Optional many emails are sent with both rich text and plain text versions 
 *                      in the message body and by default, the response of this call will include both. 
 *                      It is possible to only get either the plain or rich text version by setting the 
 *                      type parameter to text/plain or text/html respectively.
 */
function account_messages_message_id_body(id, message_id, type) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/body";

  // Call args
  var parametersArray = new Array();
  
  // Handle type parameter
  if(typeof type !== "undefined" && type != "") {
    parametersArray.push("type="+encodeURIComponent(type));
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
 * Message flags of a given email
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 */
function account_messages_message_id_flags(id, message_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/flags";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors 
}

/**
 * Set message flags for a given email
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 * @param {Integer} seen Optional message has been read. Set this parameter to 1 to set the flag, 0 to unset it
 * @param {Integer} answered Optional message has been answered. Set this parameter to 1 to set the flag, 0 to unset it
 * @param {Integer} flagged Optional message is "flagged" for urgent/special attention. Set this parameter 
 *                          to 1 to set the flag, 0 to unset it
 * @param {Integer} deleted Optional message is "deleted" for later removal. An alternative way of deleting messages
 *                          is to move it to the Trash folder. Set this parameter to 1 to set the flag, 0 to unset it
 * @param {Integer} draft Optional message has not completed composition (marked as a draft). Set this parameter 
 *                        to 1 to set the flag, 0 to unset it
 */
function account_messages_message_id_flags_set(id, message_id, seen, answered, flagged, deleted, draft) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/flags";
  
  // Handle seen parameter
  if(typeof seen === "undefined") {
    seen = "";
  }
  
  // Handle answered parameter
  if(typeof answered === "undefined") {
    answered = "";
  }

  // Handle flagged parameter
  if(typeof flagged === "undefined") {
    flagged = "";
  }
  
  // Handle deleted parameter
  if(typeof deleted === "undefined") {
    deleted = "";
  }
  
  // Handle draft parameter
  if(typeof draft === "undefined") {
    draft = "";
  }
  
  // Post parameters
  var params = {
    "seen": seen,
    "answered": answered,
    "flagged": flagged,
    "deleted": deleted,
    "draft": draft
  };
   
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}

/**
 * List of folder a message is in
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 */
function account_messages_message_id_folders(id, message_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/folders";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors 

}

/**
 * Edit folders a message should appear in
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 * @param {String} add Optional new folder this message should appear in
 * @param {String} remove Optional folder this message should be removed from
 */
function account_messages_message_id_folders_edit(id, message_id, add, remove) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/folders";
  
  // Handle add parameter
  if(typeof add === "undefined") {
    add = "";
  }
  
  // Handle remove parameter
  if(typeof remove === "undefined") {
    remove = "";
  }

  // Post parameters
  var params = {
    "add": add,
    "remove": remove
  };
   
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors     
}

/**
 * Set folders a message should appear in
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used 
 * @param {application/json} body Optional sets the folders (or Gmail labels) that should be 
 *                                applied to this message. Unlike the POST call which allows you 
 *                                to remove the message from a given folder or add it to another 
 *                                without impacting other folders, this overwrites current folder 
 *                                assignation of the message with what you set
 */
function account_messages_message_id_folders_set(id, message_id, body) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/folders";
  
  // Handle body parameter
  if(typeof body === "undefined") {
    body = "";
  }
  
  // Put parameters
  var params = body;
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("PUTJSON", params)).getContentText());
  return response;
  //TODO: Handle errors 
}

/**
 * Complete headers of a given email message
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
 * @param {Integer} raw Optional by default, this returns messages headers parsed into an array. 
 *                      Set this parameter to 1 to get raw unparsed headers
 */
function account_messages_message_id_headers(id, message_id, raw) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/headers";
  
  // Call args
  var parametersArray = new Array();
  
  // Handle raw parameter
  if(typeof raw !== "undefined" && raw != "") {
    parametersArray.push("raw="+encodeURIComponent(raw));
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
 * Fetch the message source
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used 
 */
function account_messages_message_id_source(id, message_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/source";
  var response = UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText();
  return response;
  //TODO: Handle errors   
}

/**
 * List other messages in the same thread as a given message
 *
 * @param {String} id Unique id of an account 
 * @param {String} message_id unique id of a message. This can be the message_id or 
 *                            email_message_id property of the message. The gmail_message_id 
 *                            (prefixed with gm-) can also be used
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
function account_messages_message_id_thread(id, message_id, include_body, include_headers, include_flags, body_type, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/messages/" + encodeURIComponent(message_id) + "/thread";
  
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
  
  var response = UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText();
  return response;
  //TODO: Handle errors   
}
