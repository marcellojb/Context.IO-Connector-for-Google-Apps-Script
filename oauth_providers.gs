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
 * List of oauth providers configured
 *
 */
function oauth_providers() {
  var url = "https://api.context.io/2.0/oauth_providers";
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("GET")).getContentText());
  return response;
  //TODO: Handle errors
}

/**
 * Add a new OAuth provider
 *
 * @param {String} type Identification of the OAuth provider. Possible values are GMAIL, GMAIL_OAUTH2 
 *                      and GOOGLEAPPSMARKETPLACE
 * @param {String} provider_consumer_key the OAuth2 Client ID or OAuth1 Consumer Key
 * @param {String} provider_consumer_secret the OAuth2 Client Secret or OAuth1 Consumer Secret
 */
function oauth_providers_create(type, provider_consumer_key, provider_consumer_secret) {
  var url = "https://api.context.io/2.0/oauth_providers";
  
  // Post parameters
  var params = {
    "type": type,
    "provider_consumer_key": provider_consumer_key,
    "provider_consumer_secret": provider_consumer_secret
  };
   
  var response = JSON.parse(UrlFetchApp.fetch(url,contextIOOAuth_("POST", params)).getContentText());
  return response;
  //TODO: Handle errors   
}
