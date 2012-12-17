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
 * Listings of files found as email attachments
 *
 * @param {String} id Unique id of an account
 * @param {String} file_name Optional search for files based on their name. You can filter names 
 *                           using typical shell wildcards such as *, ? and [] or regular expressions 
 *                           by enclosing the search expression in a leading / and trailing /. 
 *                           For example, *.pdf would give you all PDF files while /\.jpe?g$/ would 
 *                           return all files whose name ends with .jpg or .jpeg
 * @param {String} email Optional email address of the contact for whom you want the latest files 
 *                       exchanged with. By "exchanged with contact X" we mean any email received 
 *                       from contact X, sent to contact X or sent by anyone to both contact X and 
 *                       the source owner.
 * @param {String} to Optional email address of a contact files have been sent to
 * @param {String} from Optional email address of a contact files have been received from
 * @param {String} cc Optional mail address of a contact CC'ed on the messages
 * @param {String} bcc Optional mail address of a contact BCC'ed on the messages
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
 * @param {Integer} group_by_revisions Optional if set to 1, the list will do an intelligent grouping of 
 *                                     files to reflect occurrences of the same document. The grouping 
 *                                     algorithm is exactly the same as the one used to get file revisions 
 *                                     but only the occurrences matching the filters applied to the list 
 *                                     will be included in the results.
 * @param {String} sort_order Optional the sort order of the returned results. Possible values are asc and desc
 * @param {Integer} limit Optional The maximum number of results to return.
 * @param {Integer} offset Optional Start the list at this offset (zero-based). 
 */
function account_files(id, file_name, email, to, from, cc, bcc, date_before, date_after, indexed_before, indexed_after, group_by_revisions, sort_order, limit, offset) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/files";
    
  // Call args
  var parametersArray = new Array();
  
  // Handle file_name parameter
  if(typeof file_name !== "undefined" && file_name != "") {
    parametersArray.push("file_name="+encodeURIComponent(file_name));
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
  
  // Handle group_by_revisions parameter
  if(typeof group_by_revisions !== "undefined" && group_by_revisions != "") {
    parametersArray.push("group_by_revisions="+encodeURIComponent(group_by_revisions));
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
 * Details for a given file
 * @param {String} id Unique id of an account
 * @param {String} file_id the unique file id
 */
function account_files_file_id(id, file_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/files/" + encodeURIComponent(file_id);
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors

}

/**
 * Listing of files that can be compared with a given file
 * @param {String} id Unique id of an account
 * @param {String} file_id the unique file id
 * @TODO Doesn't work even in the official simulator
 */
function account_files_file_id_changes(id, file_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/files/" + encodeURIComponent(file_id) + "/changes";
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors

}

/**
 * Download a given file
 * @param {String} id Unique id of an account
 * @param {String} file_id the unique file id
 * @param {Integer} as_link Optional set this parameter to 1 to get a tokenized public link 
 *                          to download the file rather than the content itself. This is an 
 *                          alternative to setting Accept: text/uri-list in the request headers 
 *                          and will return the exact same response
 */
function account_files_file_id_content(id, file_id, as_link) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/files/" + encodeURIComponent(file_id) + "/content";
  
  // Call args
  var parametersArray = new Array();
  
  // Handle as_link parameter
  if(typeof as_link !== "undefined" && as_link != "") {
    url += "?as_link="+encodeURIComponent(as_link);
  }
  
  var response = UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText();
  return response;
  //TODO: Handle errors
}

/**
 * List of other files related to a given file
 *
 * @param {String} id Unique id of an account
 * @param {String} file_id the unique file id
 */
function account_files_file_id_related(id, file_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/files/" + encodeURIComponent(file_id) + "/related";
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors

}

/**
 * List of other revisions of a given file
 *
 * @param {String} id Unique id of an account
 * @param {String} file_id the unique file id
 */
function account_files_file_id_revisions(id, file_id) {
  var url = "https://api.context.io/2.0/accounts/" + id + "/files/" + encodeURIComponent(file_id) + "/revisions";
  
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}
