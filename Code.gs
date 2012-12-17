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
 * Consumer key and secret to be used connecting to context.io services
 */
var consumer = {
   key: "",
   secret: ""
};

/**
 * The project application name
 */
var APPNAME = "context.io";

/**
 * Initialize the API
 * 
 * @param {String} consumerKey The consumer key provided by Context.IO
 * @param {String} consumerSecret The consumer secret provided by Context.IO 
 */
function init(consumerKey, consumerSecret) {
  consumer.key = consumerKey;
  consumer.secret = consumerSecret;
}

/**
 * Context.IO authentication loader
 * @param {String} method the HTTP method to use for the UrlFetch operation, possible values are: GET, POST, PUT, DELETE
 * @param {String} payload the payload to use if needed
 * @return {Object} configuration options for UrlFetch, including oAuth parameters
 */
function contextIOOAuth_(method, payload) {
  // Shared configuration for all methods
  var oauthConfig = UrlFetchApp.addOAuthService(APPNAME);
  oauthConfig.setConsumerKey(consumer.key);
  oauthConfig.setConsumerSecret(consumer.secret);

  // Detect the required method
  switch(method) {
    case "GET":
      return {oAuthServiceName:APPNAME, validateHttpsCertificates: false, oAuthUseToken:'never'};
      break;
    case "POST":
      return {oAuthServiceName:APPNAME, validateHttpsCertificates: false, oAuthUseToken:'never', payload: payload, method: "POST"};
      break;
    case "PUT":
      return {oAuthServiceName:APPNAME, validateHttpsCertificates: false, oAuthUseToken:'never', payload: payload, method: "PUT"};
      break;
    case "PUTJSON":
      return {oAuthServiceName:APPNAME, validateHttpsCertificates: false, oAuthUseToken:'never', payload: payload, contentType: 'application/json', method: "PUT"};
      break;      
    case "DELETE":
      return {oAuthServiceName:APPNAME, validateHttpsCertificates: false, oAuthUseToken:'never', method: "DELETE"};
      break;
    default:
      return {oAuthServiceName:APPNAME, validateHttpsCertificates: false, oAuthUseToken:'never'};
      break;
  }
}
