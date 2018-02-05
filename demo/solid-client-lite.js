var SolidClient =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	The MIT License (MIT)
	
	Copyright (c) 2015-2016 Solid
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	
	solid-client is a Javascript library for Solid applications.
	
	If you would like to know more about the solid Solid project, please see
	https://github.com/solid/solid
	*/
	'use strict';
	/**
	 * Provides a Solid client helper object (which exposes various static modules).
	 * @module solid-client
	 * @main solid-client
	 */
	
	var rdf = __webpack_require__(2);
	var ClientAuthOIDC = __webpack_require__(4);
	var auth = new ClientAuthOIDC();
	var webClient = __webpack_require__(60)(rdf, { auth: auth });
	var ClientAuthTLS = __webpack_require__(74);
	var tls = new ClientAuthTLS(webClient);
	var identity = __webpack_require__(76);
	var ns = __webpack_require__(82)(rdf);
	var acl = __webpack_require__(88);
	
	/**
	 * @class Solid
	 * @static
	 */
	var Solid = {
	  acl: acl,
	  AppRegistration: __webpack_require__(79),
	  appRegistry: __webpack_require__(78),
	  auth: auth,
	  tls: tls,
	  config: __webpack_require__(92),
	  currentUser: tls.currentUser.bind(tls),
	  identity: __webpack_require__(76),
	  login: tls.login.bind(tls),
	  meta: __webpack_require__(93),
	  rdflib: rdf,
	  signup: tls.signup.bind(tls),
	  status: __webpack_require__(95),
	  typeRegistry: __webpack_require__(86),
	  vocab: ns,
	  web: webClient
	};
	
	Solid.clearPermissions = function clearPermissions(uri) {
	  return acl.clearPermissions(uri, webClient);
	};
	Solid.discoverWebID = function discoverWebID(url) {
	  return identity.discoverWebID(url, webClient, ns);
	};
	Solid.getPermissions = function getPermissions(uri) {
	  return acl.getPermissions(uri, webClient, rdf);
	};
	Solid.getProfile = function getProfile(profileUrl, options) {
	  return identity.getProfile(profileUrl, options, webClient, rdf);
	};
	
	module.exports = Solid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Provides a generic wrapper around an RDF Parser library
	 * (currently only RDFLib)
	 *  @@ RDFLib is NOT JUST a parser library. It is a quadstore and a serializer library!
	 * @module rdf-parser
	 */
	
	var rdf;
	if (typeof $rdf !== 'undefined') {
	  rdf = $rdf; // FF extension
	} else if (typeof tabulator !== 'undefined') {
	  rdf = tabulator.rdf;
	} else if (true) {
	  // Running with a CommonJS module system
	  rdf = __webpack_require__(3);
	}
	module.exports = rdf;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = $rdf;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 The MIT License (MIT)
	
	 Copyright (c) 2016-17 Solid
	
	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:
	
	 The above copyright notice and this permission notice shall be included in all
	 copies or substantial portions of the Software.
	
	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 SOFTWARE.
	
	 If you would like to know more about the solid Solid project, please see
	 https://github.com/solid/solid
	 */
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RelyingParty = __webpack_require__(5);
	var providerSelectPopupSource = __webpack_require__(59);
	
	// URI parameter types
	var HASH = 'hash';
	var QUERY = 'query';
	
	// AuthenticationRequest sending methods
	var REDIRECT = 'redirect';
	
	var ClientAuthOIDC = function () {
	  /**
	   * @constructor
	   * @param [options={}]
	   * @param [options.window=Window] Optionally inject global browser window
	   * @param [options.store=localStorage] Optionally inject localStorage
	   */
	  function ClientAuthOIDC() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, ClientAuthOIDC);
	
	    this.window = options.window || global.window;
	    this.store = options.store || global.localStorage;
	
	    this.currentClient = null;
	    this.providerUri = null;
	    this.webId = null;
	    this.idToken = null;
	    this.accessToken = null;
	    this.method = REDIRECT; // only redirect is currently supported
	  }
	
	  _createClass(ClientAuthOIDC, [{
	    key: 'initEventListeners',
	    value: function initEventListeners(window) {
	      window.addEventListener('message', this.onMessage.bind(this));
	    }
	
	    /**
	     * Returns the current window's URI
	     *
	     * @return {string|null}
	     */
	
	  }, {
	    key: 'currentLocation',
	    value: function currentLocation() {
	      var window = this.window;
	
	      if (!window || !window.location) {
	        return null;
	      }
	
	      return window.location.href;
	    }
	
	    /**
	     * @return {Promise<string>} Resolves to current user's WebID URI
	     */
	
	  }, {
	    key: 'currentUser',
	    value: function currentUser() {
	      if (this.webId) {
	        return Promise.resolve(this.webId);
	      }
	
	      // Attempt to find a provider based on the 'state' param of the current URI
	      var providerUri = this.providerFromCurrentUri();
	
	      if (providerUri) {
	        return this.login(providerUri);
	      } else {
	        return Promise.resolve(null);
	      }
	    }
	
	    /**
	     * Returns the 'end session' api endpoint of the current RP client's provider
	     * (e.g. 'https://example.com/logout'), if one is available.
	     *
	     * @return {string|null}
	     */
	
	  }, {
	    key: 'providerEndSessionEndpoint',
	    value: function providerEndSessionEndpoint() {
	      var rp = this.currentClient;
	
	      if (!rp || !rp.provider || !rp.provider.configuration) {
	        return null;
	      }
	
	      var config = rp.provider.configuration;
	
	      if (!config.end_session_endpoint) {
	        return null;
	      }
	
	      return config.end_session_endpoint;
	    }
	
	    /**
	     * Extracts and returns the `state` query or hash fragment param from a uri
	     *
	     * @param uri {string}
	     * @param uriType {string} 'hash' or 'query'
	     *
	     * @return {string|null} Value of the `state` query or hash fragment param
	     */
	
	  }, {
	    key: 'extractState',
	    value: function extractState(uri) {
	      var uriType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : HASH;
	
	      if (!uri) {
	        return null;
	      }
	      var uriObj = new URL(uri);
	      var state = void 0;
	
	      if (uriType === HASH) {
	        var hash = uriObj.hash || '#';
	        var params = new URLSearchParams(hash.substr(1));
	        state = params.get('state');
	      }
	
	      if (uriType === QUERY) {
	        state = uriObj.searchParams.get('state');
	      }
	
	      return state;
	    }
	  }, {
	    key: 'keyByProvider',
	    value: function keyByProvider(providerUri) {
	      return 'oidc.rp.by-provider.' + providerUri;
	    }
	  }, {
	    key: 'keyByState',
	    value: function keyByState(state) {
	      if (!state) {
	        throw new TypeError('No state provided to keyByState()');
	      }
	      return 'oidc.rp.by-state.' + state;
	    }
	
	    /**
	     * @param providerUri {string}
	     *
	     * @return {Promise<RelyingParty>}
	     */
	
	  }, {
	    key: 'loadOrRegisterClient',
	    value: function loadOrRegisterClient(providerUri) {
	      var _this = this;
	
	      this.currentClient = null;
	
	      return this.loadClient(providerUri).then(function (loadedClient) {
	        if (loadedClient) {
	          _this.currentClient = loadedClient;
	          return loadedClient;
	        } else {
	          _this.currentClient = null;
	          return _this.registerClient(providerUri);
	        }
	      });
	    }
	
	    /**
	     * @param providerUri {string}
	     * @return {Promise<RelyingParty>}
	     */
	
	  }, {
	    key: 'loadClient',
	    value: function loadClient(providerUri) {
	      if (!providerUri) {
	        var error = new Error('Cannot load or register client, providerURI missing');
	        return Promise.reject(error);
	      }
	      if (this.currentClient && this.currentClient.provider.url === providerUri) {
	        // Client is cached, return it
	        return Promise.resolve(this.currentClient);
	      }
	
	      // Check for client config stored locally
	      var key = this.keyByProvider(providerUri);
	      var clientConfig = this.store.getItem(key);
	
	      if (clientConfig) {
	        clientConfig = JSON.parse(clientConfig);
	        return RelyingParty.from(clientConfig);
	      } else {
	        return Promise.resolve(null);
	      }
	    }
	
	    /**
	     * Loads a provider's URI from store, given a `state` uri param.
	     * @param state {string}
	     * @return {string}
	     */
	
	  }, {
	    key: 'loadProvider',
	    value: function loadProvider(state) {
	      var key = this.keyByState(state);
	      var providerUri = this.store.getItem(key);
	      return providerUri;
	    }
	
	    /**
	     * Resolves to the WebID URI of the current user. Intended to be triggered
	     * when the user initiates login explicitly (such as by pressing a Login
	     * button, etc).
	     *
	     * @param [providerUri] {string} Provider URI, result of a Provider Selection
	     *   operation (that the app developer has provided). If `null`, the
	     *   `selectProvider()` step will kick off its own UI for Provider Selection.
	     *
	     * @return {Promise<string>} Resolves to the logged in user's WebID URI
	     */
	
	  }, {
	    key: 'login',
	    value: function login(providerUri) {
	      var _this2 = this;
	
	      this.clearCurrentUser();
	
	      return Promise.resolve(providerUri).then(function (providerUri) {
	        return _this2.selectProvider(providerUri);
	      }).then(function (selectedProviderUri) {
	        if (selectedProviderUri) {
	          return _this2.loadOrRegisterClient(selectedProviderUri);
	        }
	      }).then(function (client) {
	        if (client) {
	          return _this2.validateOrSendAuthRequest(client);
	        }
	      });
	    }
	  }, {
	    key: 'clearCurrentUser',
	    value: function clearCurrentUser() {
	      this.webId = null;
	      this.accessToken = null;
	      this.idToken = null;
	    }
	
	    /**
	     * Clears the current user and tokens, and does a url redirect to the
	     * current RP client's provider's 'end session' endpoint.
	     * A redirect is done (instead of an ajax 'get') to enable the provider to
	     * clear any http-only session cookies.
	     */
	
	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.clearCurrentUser();
	
	      var logoutEndpoint = this.providerEndSessionEndpoint();
	
	      if (!logoutEndpoint) {
	        return;
	      }
	
	      var logoutUrl = new URL(logoutEndpoint);
	
	      logoutUrl.searchParams.set('returnToUrl', this.currentLocation());
	
	      this.redirectTo(logoutUrl.toString());
	    }
	
	    /**
	     * Resolves to the URI of an OIDC identity provider, from one of the following:
	     *
	     * 1. If a `providerUri` was passed in by the app developer (perhaps they
	     *   developed a custom 'Select Provider' UI), that value is returned.
	     * 2. The current `this.providerUri` cached on this auth client, if present
	     * 3. The `state` parameter of the current window URI (in case the user has
	     *   gone through the login workflow and this page is the redirect back).
	     * 3. Lastly, if none of the above worked, the clients opens its own
	     *   'Select Provider' UI popup window, and sets up an event listener (for
	     *   when a user makes a selection.
	     *
	     * @param [providerUri] {string} If the provider URI is already known to the
	     *   app developer, just pass it through, no need to take further action.
	     * @return {Promise<string>}
	     */
	
	  }, {
	    key: 'selectProvider',
	    value: function selectProvider(providerUri) {
	      if (providerUri) {
	        return Promise.resolve(providerUri);
	      }
	
	      // Attempt to find a provider based on the 'state' param of the current URI
	      providerUri = this.providerFromCurrentUri();
	      if (providerUri) {
	        return Promise.resolve(providerUri);
	      }
	
	      // Lastly, kick off a Select Provider popup window workflow
	      return this.providerFromUI();
	    }
	
	    /**
	     * Parses the current URI's `state` hash param and attempts to load a
	     * previously saved providerUri from it. If no `state` param is present, or if
	     * no providerUri has been saved, returns `null`.
	     *
	     * @return {string|null} Provider URI, if present
	     */
	
	  }, {
	    key: 'providerFromCurrentUri',
	    value: function providerFromCurrentUri() {
	      var currentUri = this.currentLocation();
	      var stateParam = this.extractState(currentUri, HASH);
	
	      if (stateParam) {
	        return this.loadProvider(stateParam);
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'providerFromUI',
	    value: function providerFromUI() {
	      console.log('Getting provider from default popup UI');
	      this.initEventListeners(this.window);
	
	      if (this.selectProviderWindow) {
	        // Popup has already been opened
	        this.selectProviderWindow.focus();
	      } else {
	        // Open a new Provider Select popup window
	        this.selectProviderWindow = this.window.open('', 'selectProviderWindow', 'menubar=no,resizable=yes,width=300,height=300');
	
	        this.selectProviderWindow.document.write(providerSelectPopupSource);
	        this.selectProviderWindow.document.close();
	      }
	    }
	
	    /**
	     * Tests whether the current URI is the result of an AuthenticationRequest
	     * return redirect.
	     * @return {boolean}
	     */
	
	  }, {
	    key: 'currentUriHasAuthResponse',
	    value: function currentUriHasAuthResponse() {
	      var currentUri = this.currentLocation();
	      var stateParam = this.extractState(currentUri, HASH);
	
	      return !!stateParam;
	    }
	
	    /**
	     * Redirects the current window to the given uri.
	     * @param uri {string}
	     */
	
	  }, {
	    key: 'redirectTo',
	    value: function redirectTo(uri) {
	      this.window.location.href = uri;
	
	      return false;
	    }
	
	    /**
	     * @private
	     * @param client {RelyingParty}
	     * @throws {Error}
	     * @return {Promise<null>}
	     */
	
	  }, {
	    key: 'sendAuthRequest',
	    value: function sendAuthRequest(client) {
	      var _this3 = this;
	
	      var options = {};
	      var providerUri = client.provider.url;
	
	      return client.createRequest(options, this.store).then(function (authUri) {
	        var state = _this3.extractState(authUri, QUERY);
	        if (!state) {
	          throw new Error('Invalid authentication request uri');
	        }
	        _this3.saveProviderByState(state, providerUri);
	        if (_this3.method === REDIRECT) {
	          return _this3.redirectTo(authUri);
	        }
	      });
	    }
	
	    /**
	     * @param client {RelyingParty}
	     * @throws {Error}
	     * @return {Promise<null|string>} Resolves to either an AuthenticationRequest
	     *   being sent (`null`), or to the webId of the current user (extracted
	     *   from the authentication response).
	     */
	
	  }, {
	    key: 'validateOrSendAuthRequest',
	    value: function validateOrSendAuthRequest(client) {
	      if (!client) {
	        var error = new Error('Could not load or register a RelyingParty client');
	        return Promise.reject(error);
	      }
	
	      if (this.currentUriHasAuthResponse()) {
	        return this.initUserFromResponse(client);
	      }
	
	      return this.sendAuthRequest(client);
	    }
	
	    /**
	     * Validates the auth response in the current uri, initializes the current
	     * user's ID Token and Access token, and returns the user's WebID
	     *
	     * @param client {RelyingParty}
	     *
	     * @throws {Error}
	     *
	     * @returns {Promise<string>} Current user's web id
	     */
	
	  }, {
	    key: 'initUserFromResponse',
	    value: function initUserFromResponse(client) {
	      var _this4 = this;
	
	      return client.validateResponse(this.currentLocation(), this.store).then(function (response) {
	        _this4.idToken = response.params.id_token;
	        _this4.accessToken = response.params.access_token;
	
	        _this4.clearAuthResponseFromUrl();
	
	        return _this4.extractAndValidateWebId(response.decoded);
	      }).catch(function (error) {
	        _this4.clearAuthResponseFromUrl();
	        if (error.message === 'Cannot resolve signing key for ID Token.') {
	          console.log('ID Token found, but could not validate. Provider likely has changed their public keys. Please retry login.');
	          return null;
	        } else {
	          throw error;
	        }
	      });
	    }
	
	    /**
	     * @param idToken {IDToken}
	     *
	     * @throws {Error}
	     *
	     * @return {string}
	     */
	
	  }, {
	    key: 'extractAndValidateWebId',
	    value: function extractAndValidateWebId(idToken) {
	      var webId = idToken.payload.sub;
	      this.webId = webId;
	      return webId;
	    }
	
	    /**
	     * Removes authentication response data (access token, id token etc) from
	     * the current url's hash fragment.
	     */
	
	  }, {
	    key: 'clearAuthResponseFromUrl',
	    value: function clearAuthResponseFromUrl() {
	      var clearedUrl = this.currentLocationNoHash();
	
	      this.replaceCurrentUrl(clearedUrl);
	    }
	  }, {
	    key: 'currentLocationNoHash',
	    value: function currentLocationNoHash() {
	      var currentLocation = this.currentLocation();
	      if (!currentLocation) {
	        return null;
	      }
	
	      var currentUrl = new URL(this.currentLocation());
	      currentUrl.hash = ''; // remove the hash fragment
	      var clearedUrl = currentUrl.toString();
	
	      return clearedUrl;
	    }
	  }, {
	    key: 'replaceCurrentUrl',
	    value: function replaceCurrentUrl(newUrl) {
	      var history = this.window.history;
	
	      if (!history) {
	        return;
	      }
	
	      history.replaceState(history.state, history.title, newUrl);
	    }
	
	    /**
	     * @param providerUri {string}
	     * @param [options={}]
	     * @param [options.redirectUri] {string} Defaults to window.location.href
	     * @param [options.scope='openid profile'] {string}
	     * @throws {TypeError} If providerUri is missing
	     * @return {Promise<RelyingParty>} Registered RelyingParty client instance
	     */
	
	  }, {
	    key: 'registerClient',
	    value: function registerClient(providerUri) {
	      var _this5 = this;
	
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      return this.registerPublicClient(providerUri, options).then(function (registeredClient) {
	        _this5.storeClient(registeredClient, providerUri);
	        return registeredClient;
	      });
	    }
	
	    /**
	     * @private
	     * @param providerUri {string}
	     * @param [options={}]
	     * @param [options.redirectUri] {string} Defaults to window.location.href
	     * @param [options.scope='openid profile'] {string}
	     * @throws {TypeError} If providerUri is missing
	     * @return {Promise<RelyingParty>} Registered RelyingParty client instance
	     */
	
	  }, {
	    key: 'registerPublicClient',
	    value: function registerPublicClient(providerUri) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      console.log('Registering public client...');
	      if (!providerUri) {
	        throw new TypeError('Cannot registerClient auth client, missing providerUri');
	      }
	      var redirectUri = options.redirectUri || this.currentLocation();
	      this.redirectUri = redirectUri;
	      var registration = {
	        issuer: providerUri,
	        grant_types: ['implicit'],
	        redirect_uris: [redirectUri],
	        response_types: ['id_token token'],
	        scope: options.scope || 'openid profile'
	      };
	      var rpOptions = {
	        defaults: {
	          authenticate: {
	            redirect_uri: redirectUri,
	            response_type: 'id_token token'
	          }
	        },
	        store: this.store
	      };
	      return RelyingParty.register(providerUri, registration, rpOptions);
	    }
	  }, {
	    key: 'onMessage',
	    value: function onMessage(event) {
	      console.log('Auth client received event: ', event);
	      if (!event || !event.data) {
	        return;
	      }
	      switch (event.data.event_type) {
	        case 'providerSelected':
	          var providerUri = event.data.value;
	          console.log('Provider selected: ', providerUri);
	          this.login(providerUri);
	          this.selectProviderWindow.close();
	          break;
	        default:
	          console.error('onMessage - unknown event type: ', event);
	          break;
	      }
	    }
	
	    /**
	     * @param state {string}
	     * @param providerUri {string}
	     * @throws {Error}
	     */
	
	  }, {
	    key: 'saveProviderByState',
	    value: function saveProviderByState(state, providerUri) {
	      if (!state) {
	        throw new Error('Cannot save providerUri - state not provided');
	      }
	      var key = this.keyByState(state);
	      this.store.setItem(key, providerUri);
	    }
	
	    /**
	     * Stores a RelyingParty client for a given provider in the local store.
	     * @param client {RelyingParty}
	     * @param providerUri {string}
	     */
	
	  }, {
	    key: 'storeClient',
	    value: function storeClient(client, providerUri) {
	      this.currentClient = client;
	      this.store.setItem(this.keyByProvider(providerUri), client.serialize());
	    }
	  }]);
	
	  return ClientAuthOIDC;
	}();
	
	module.exports = ClientAuthOIDC;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(6);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Dependencies
	 */
	var assert = __webpack_require__(7);
	var fetch = __webpack_require__(12);
	var Headers = fetch.Headers ? fetch.Headers : global.Headers;
	
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema,
	    JSONDocument = _require.JSONDocument;
	
	var _require2 = __webpack_require__(22),
	    JWKSet = _require2.JWKSet;
	
	var AuthenticationRequest = __webpack_require__(52);
	var AuthenticationResponse = __webpack_require__(55);
	var RelyingPartySchema = __webpack_require__(58);
	// const Session = require('./Session')
	
	/**
	 * RelyingParty
	 *
	 * @class
	 * Client interface for OpenID Connect Relying Party.
	 *
	 * @example
	 *  let client = RelyingParty({
	 *    provider: {
	 *      name: 'Anvil Research, Inc.',
	 *      url: 'https://forge.anvil.io'
	 *      // configuration
	 *      // jwks
	 *    },
	 *    authenticate: {
	 *      response_type: 'code',
	 *      display: 'popup',
	 *      scope: 'openid profile email'
	 *    },
	 *    register: {
	 *      client_name: 'Example',
	 *      client_uri: 'https://example.com',
	 *      logo_uri: 'https://example.com/assets/logo.png',
	 *      redirect_uris: ['https://app.example.com/callback'],
	 *      response_types: ['code', 'code id_token token'],
	 *      grant_types: ['authorization_code'],
	 *      default_max_age: 7200,
	 *      post_logout_redirect_uris: ['https://app.example.com']
	 *    },
	 *    registration: {
	 *      // if you have it saved somewhere
	 *    },
	 *    store: localStorage || req.session,
	 *    popup: { width: 400, height: 300 }
	 *  })
	 *
	 *  client.discover() => Promise
	 *  client.jwks() => Promise
	 *  client.authenticate()
	 *  client.authenticateUri()
	 *  client.validateResponse(uri) => Promise
	 *  client.userinfo() => Promise
	 *  client.logout()
	 */
	
	var RelyingParty = function (_JSONDocument) {
	  _inherits(RelyingParty, _JSONDocument);
	
	  function RelyingParty() {
	    _classCallCheck(this, RelyingParty);
	
	    return _possibleConstructorReturn(this, (RelyingParty.__proto__ || Object.getPrototypeOf(RelyingParty)).apply(this, arguments));
	  }
	
	  _createClass(RelyingParty, [{
	    key: 'discover',
	
	
	    /**
	     * Discover
	     *
	     * @description Fetches the issuer's OpenID Configuration.
	     *
	     * @returns {Promise<Object>} Resolves with the provider configuration response
	     */
	    value: function discover() {
	      var _this2 = this;
	
	      var issuer = void 0;
	
	      var endpoint = '.well-known/openid-configuration';
	
	      try {
	        assert(this.provider, 'RelyingParty requires a provider');
	
	        issuer = this.provider.url;
	
	        assert(issuer, 'RelyingParty provider must define "url"');
	      } catch (error) {
	        console.error('Error in rp.discover() setup:', error);
	        return Promise.reject(error);
	      }
	
	      return fetch(issuer + '/' + endpoint)
	      //.then(status(200))
	      .then(function (response) {
	        return response.json();
	      }).then(function (json) {
	        _this2.provider.configuration = json;
	
	        return json;
	      }).catch(function (error) {
	        console.error('Error in rp.discover() while fetching provider config');
	        throw error;
	      });
	    }
	
	    /**
	     * Register
	     *
	     * @description Registers a client with provider as a Relying Party
	     *
	     * @param options {Object}
	     * @returns {Promise<Object>} Resolves with the registration response object
	     */
	
	  }, {
	    key: 'register',
	    value: function register(options) {
	      var _this3 = this;
	
	      var uri = void 0,
	          method = void 0,
	          headers = void 0,
	          params = void 0,
	          body = void 0;
	
	      try {
	        var configuration = this.provider.configuration;
	
	        assert(configuration, 'OpenID Configuration is not initialized.');
	        assert(configuration.registration_endpoint, 'OpenID Configuration is missing registration_endpoint.');
	
	        uri = configuration.registration_endpoint;
	        console.log(configuration);
	
	        method = 'post';
	        headers = new Headers({ 'Content-Type': 'application/json' });
	        params = this.defaults.register;
	        body = JSON.stringify(Object.assign({}, params, options));
	      } catch (error) {
	        console.error('Error in rp.register() setup:', error);
	        return Promise.reject(error);
	      }
	
	      return fetch(uri, { method: method, headers: headers, body: body })
	      //.then(status)
	      .then(function (response) {
	        return response.json();
	      }).then(function (json) {
	        _this3.registration = json;
	        return json;
	      }).catch(function (error) {
	        console.error('Error in rp.register() during POST to registration endpoint');
	        throw error;
	      });
	    }
	
	    /**
	     * serialize
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'serialize',
	    value: function serialize() {
	      return JSON.stringify(this);
	    }
	
	    /**
	     * jwks
	     *
	     * @description Resolves with the issuer's JWK Set.
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'jwks',
	    value: function jwks() {
	      var _this4 = this;
	
	      var uri = void 0;
	
	      try {
	        var configuration = this.provider.configuration;
	
	        assert(configuration, 'OpenID Configuration is not initialized.');
	        assert(configuration.jwks_uri, 'OpenID Configuration is missing jwks_uri.');
	
	        uri = configuration.jwks_uri;
	      } catch (error) {
	        console.error('Error in rp.jwks() setup:', error);
	        return Promise.reject(error);
	      }
	
	      return fetch(uri)
	      //.then(status(200))
	      .then(function (response) {
	        return response.json();
	      }).then(function (json) {
	        return JWKSet.importKeys(json);
	      }).then(function (jwks) {
	        _this4.provider.jwks = jwks;
	        return jwks;
	      }).catch(function (error) {
	        console.error('Error in rp.jwks() while fetching ' + uri + ' :', error);
	        throw error;
	      });
	    }
	
	    /**
	     * createRequest
	     *
	     * @param options {Object} Authn request options hashmap
	     * @param options.redirect_uri {string}
	     * @param options.response_type {string} e.g. 'code' or 'id_token token'
	     * @param session {Session|Storage} req.session or localStorage
	     * @returns {Promise<string>} Authn request URL
	     */
	
	  }, {
	    key: 'createRequest',
	    value: function createRequest(options, session) {
	      return AuthenticationRequest.create(this, options, session || this.store).catch(function (error) {
	        console.error('Error in rp.createRequest(), options:', options);
	        throw error;
	      });
	    }
	
	    /**
	     * Validate Response
	     *
	     * @description
	     *
	     * @param response {string} req.query or req.body.text
	     * @param session {Session|Storage} req.session or localStorage or similar
	     *
	     * @returns {Promise<Object>} Custom response object, with `params` and
	     *   `mode` properties
	     */
	
	  }, {
	    key: 'validateResponse',
	    value: function validateResponse(response, session) {
	      session = session || this.store;
	
	      if (response.match(/^http(s?):\/\//)) {
	        response = { rp: this, redirect: response, session: session };
	      } else {
	        response = { rp: this, body: response, session: session };
	      }
	
	      return AuthenticationResponse.validateResponse(response).catch(function (error) {
	        console.error('Error in rp.validateResponse():', error);
	        throw error;
	      });
	    }
	
	    /**
	     * userinfo
	     *
	     * @description Promises the authenticated user's claims.
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'userinfo',
	    value: function userinfo() {
	      var uri = void 0,
	          headers = void 0;
	
	      try {
	        var configuration = this.provider.configuration;
	
	        assert(configuration, 'OpenID Configuration is not initialized.');
	        assert(configuration.registration_endpoint, 'OpenID Configuration is missing registration_endpoint.');
	
	        uri = configuration.userinfo_endpoint;
	        var access_token = this.session.access_token;
	
	        assert(access_token, 'Missing access token.');
	
	        headers = new Headers({
	          'Content-Type': 'application/json',
	          'Authorization': 'Bearer ' + access_token
	        });
	      } catch (error) {
	        console.error('Error in rp.userinfo() setup:', error);
	        return Promise.reject(error);
	      }
	
	      return fetch(uri, { headers: headers }).then(status(200)).then(function (response) {
	        return response.json();
	      }).catch(function (error) {
	        console.error('Error while fetching rp.userinfo():', error);
	        throw error;
	      });
	    }
	
	    /**
	     * Logout
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'logout',
	    value: function logout() {
	      var configuration = void 0;
	      try {
	        configuration = this.provider.configuration;
	        assert(configuration, 'OpenID Configuration is not initialized.');
	        assert(configuration.end_session_endpoint, 'OpenID Configuration is missing end_session_endpoint.');
	      } catch (error) {
	        console.error('Error in rp.logout() setup:', error);
	        return Promise.reject(error);
	      }
	
	      var uri = configuration.end_session_endpoint;
	      var method = 'get';
	
	      return fetch(uri, { method: method }).catch(function (error) {
	        console.error('Error in rp.logout() while GET /logout:', error);
	        throw error;
	      });
	
	      // TODO: Validate `frontchannel_logout_uri` if necessary
	      /**
	       * frontchannel_logout_uri - OPTIONAL. RP URL that will cause the RP to log
	       * itself out when rendered in an iframe by the OP.
	       *
	       * An `iss` (issuer) query parameter and a `sid`
	       * (session ID) query parameter MAY be included by the OP to enable the RP
	       * to validate the request and to determine which of the potentially
	       * multiple sessions is to be logged out. If a sid (session ID) query
	       * parameter is included, an iss (issuer) query parameter MUST also be
	       * included.
	       * @see https://openid.net/specs/openid-connect-frontchannel-1_0.html#RPLogout
	       */
	    }
	  }], [{
	    key: 'from',
	
	
	    /**
	     * from
	     *
	     * @description
	     * Create a RelyingParty instance from a previously registered client.
	     *
	     * @param {Object} data
	     * @returns {Promise<RelyingParty>}
	     */
	    value: function from(data) {
	      var rp = new RelyingParty(data);
	      var validation = rp.validate();
	
	      // schema validation
	      if (!validation.valid) {
	        return Promise.reject(validation);
	      }
	
	      var jwks = rp.provider.jwks;
	
	      // request the JWK Set if missing
	      if (!jwks) {
	        return rp.jwks().then(function () {
	          return rp;
	        });
	      }
	
	      // otherwise import the JWK Set to webcrypto
	      return JWKSet.importKeys(jwks).then(function (jwks) {
	        rp.provider.jwks = jwks;
	        return rp;
	      }).catch(function (error) {
	        console.error('Error in RelyingParty.from() while importing keys', error);
	        throw error;
	      });
	    }
	
	    /**
	     * register
	     *
	     * @param issuer {string} Provider URL
	     * @param registration {Object} Client dynamic registration options
	     * @param options {Object}
	     * @param options.defaults
	     * @param [options.store] {Session|Storage}
	     * @returns {Promise<RelyingParty>} RelyingParty instance, registered.
	     */
	
	  }, {
	    key: 'register',
	    value: function register(issuer, registration, options) {
	      var rp = new RelyingParty({
	        provider: { url: issuer },
	        defaults: Object.assign({}, options.defaults),
	        store: options.store
	      });
	
	      return Promise.resolve().then(function () {
	        return rp.discover();
	      }).then(function () {
	        return rp.jwks();
	      }).then(function () {
	        return rp.register(registration);
	      }).then(function () {
	        return rp;
	      }).catch(function (error) {
	        console.error('Error in RelyingParty.register():', error);
	      });
	    }
	  }, {
	    key: 'schema',
	
	
	    /**
	     * Schema
	     */
	    get: function get() {
	      return RelyingPartySchema;
	    }
	  }]);
	
	  return RelyingParty;
	}(JSONDocument);
	
	module.exports = RelyingParty;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(8);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(10);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(11);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = fetch;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  Formats: __webpack_require__(14),
	  Initializer: __webpack_require__(15),
	  JSONDocument: __webpack_require__(16),
	  JSONMapping: __webpack_require__(19),
	  JSONPatch: __webpack_require__(17),
	  JSONPointer: __webpack_require__(18),
	  JSONSchema: __webpack_require__(20),
	  Validator: __webpack_require__(21)
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * JSON Schema Formats
	 *
	 * TODO
	 * Is there a good way to express these over multiple lines with comments
	 * for easier debugging and auditing?
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DATETIME_REGEXP = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i;
	var URI_REGEXP = /^(?:[a-z][a-z0-9+-.]*)?(?:\:|\/)\/?[^\s]*$/i;
	var EMAIL_REGEXP = /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	var IPV4_REGEXP = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
	var IPV6_REGEXP = /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i;
	var HOSTNAME_REGEXP = /^[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?(\.[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?)*$/i;
	
	/**
	 * Formats
	 */
	
	var Formats = function () {
	  function Formats() {
	    _classCallCheck(this, Formats);
	  }
	
	  _createClass(Formats, [{
	    key: 'register',
	
	
	    /**
	     * Register
	     *
	     * @description
	     * Register a new mapping from named format to RegExp instance
	     *
	     * TODO
	     * We can do some extra validation of the RegExp to
	     * ensure it's the acceptable subset of RegExps allowed
	     * by JSON Schema.
	     *
	     * @param {string} name
	     * @param {RegExp} pattern
	     * @returns {RegExp}
	     */
	    value: function register(name, pattern) {
	      // verify name is a string
	      if (typeof name !== 'string') {
	        throw new Error('Format name must be a string');
	      }
	
	      // cast a string to RegExp
	      if (typeof pattern === 'string') {
	        pattern = new RegExp(pattern);
	      }
	
	      return this[name] = pattern;
	    }
	
	    /**
	     * Resolve
	     *
	     * @description
	     * Given a format name, return the corresponding registered validation. In the
	     * event a format is not registered, throw an error.
	     *
	     * @param {string} name
	     * @returns {RegExp}
	     */
	
	  }, {
	    key: 'resolve',
	    value: function resolve(name) {
	      var format = this[name];
	
	      if (!format) {
	        throw new Error('Unknown JSON Schema format.');
	      }
	
	      return format;
	    }
	
	    /**
	     * Test
	     *
	     * @description
	     * Test that a value conforms to a format.
	     *
	     * @param {string} name
	     * @param {string} value
	     * @returns {Boolean}
	     */
	
	  }, {
	    key: 'test',
	    value: function test(name, value) {
	      var format = this.resolve(name);
	      return format.test(value);
	    }
	  }], [{
	    key: 'initialize',
	
	
	    /**
	     * Initialize
	     *
	     * @description
	     * Create a new Formats instance and register default formats
	     *
	     * @returns {Formats}
	     */
	    value: function initialize() {
	      var formats = new Formats();
	      formats.register('date-time', DATETIME_REGEXP);
	      formats.register('uri', URI_REGEXP);
	      formats.register('email', EMAIL_REGEXP);
	      formats.register('ipv4', IPV4_REGEXP);
	      formats.register('ipv6', IPV6_REGEXP);
	      formats.register('hostname', HOSTNAME_REGEXP);
	      return formats;
	    }
	  }]);
	
	  return Formats;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = Formats.initialize();

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Initializer
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Initializer = function () {
	
	  /**
	   * constructor
	   */
	  function Initializer(schema, options) {
	    _classCallCheck(this, Initializer);
	
	    Object.assign(this, options || {});
	    this.root = this.root || this;
	
	    this.root.depth = this.root.depth || 1;
	
	    if (this.level > this.root.depth) {
	      this.root.depth = this.level;
	    }
	
	    this.level = this.level || 0;
	    this.schema = schema;
	  }
	
	  /**
	   * compile (static)
	   */
	
	
	  _createClass(Initializer, [{
	    key: 'compile',
	
	
	    /**
	     * compile
	     */
	    value: function compile() {
	      var root = this.root,
	          depth = this.depth,
	          level = this.level;
	
	      var declarations = '';
	      var body = '';
	
	      // traverse the schema and generate code
	      body += this.default();
	      body += this.properties();
	      //body += this.additionalProperties()
	      body += this.items();
	      //body += this.additionalItems()
	
	
	      // value
	      body += this.member();
	      body += this.item();
	
	      // after traversing the schema
	      // generate the variable declarations
	      if (root === this) {
	        for (var i = 1; i <= this.root.depth; i++) {
	          declarations += this.declaration(i);
	        }
	
	        return '\n        options = options || {}\n\n        if (options.filter === false) {\n          Object.assign(target, JSON.parse(JSON.stringify(source)))\n        }\n\n        ' + declarations + '\n        ' + body + '\n      ';
	      }
	
	      return body;
	    }
	
	    /**
	     * declaration
	     */
	
	  }, {
	    key: 'declaration',
	    value: function declaration(level) {
	      return '\n      var target' + level + '\n      var source' + level + '\n      var count' + level + '\n    ';
	    }
	
	    /**
	     * default
	     */
	
	  }, {
	    key: 'default',
	    value: function _default() {
	      var schema = this.schema,
	          level = this.level,
	          key = this.key,
	          index = this.index;
	      var value = schema.default; // rename default to value because it's a keyword and syntax highlighter breaks
	
	      var block = '';
	
	      if (schema.hasOwnProperty('default')) {
	
	        if (key) {
	          block += '\n          target' + level + '[\'' + key + '\'] = ' + JSON.stringify(value) + '\n        ';
	        }
	
	        if (index) {
	          block += '\n          target' + level + '[' + index + '] = ' + JSON.stringify(value) + '\n        ';
	        }
	
	        if (level > 1) {
	          block += '\n          count' + level + '++\n        ';
	        }
	
	        block = '\n        if (options.defaults !== false) {\n          ' + block + '\n        }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * member
	     */
	
	  }, {
	    key: 'member',
	    value: function member() {
	      var schema = this.schema,
	          root = this.root,
	          level = this.level,
	          key = this.key;
	      var properties = schema.properties,
	          additionalProperties = schema.additionalProperties,
	          items = schema.items,
	          additionalItems = schema.additionalItems;
	
	      var block = '';
	
	      // `key` tells us to treat this subschema as an object member vs an array item
	      // and the absence of the other values here indicates we are dealing with a
	      // primitive value
	      if (key && !properties && !additionalProperties && !items && !additionalItems) {
	
	        // first generate the assignment statement
	        block += '\n        target' + level + '[\'' + key + '\'] = source' + level + '[\'' + key + '\']\n      ';
	
	        // for nested container objects, add the counter incrementing statement
	        if (level > 1) {
	          block += '\n          count' + level + '++\n        ';
	        }
	
	        // wrap the foregoing in a check for presence on the source
	        block = '\n        if (source' + level + '.hasOwnProperty(\'' + key + '\')) {\n          ' + block + '\n        }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * item
	     */
	
	  }, {
	    key: 'item',
	    value: function item() {
	      var schema = this.schema,
	          root = this.root,
	          level = this.level,
	          index = this.index;
	      var properties = schema.properties,
	          additionalProperties = schema.additionalProperties,
	          items = schema.items,
	          additionalItems = schema.additionalItems;
	
	      var block = '';
	
	      if (index && !properties && !additionalProperties && !items && !additionalItems) {
	
	        block += '\n        target' + level + '[' + index + '] = source' + level + '[' + index + ']\n      ';
	
	        if (level > 1) {
	          block += '\n          count' + level + '++\n        ';
	        }
	
	        block = '\n        if (' + index + ' < len) {\n          ' + block + '\n        }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * properties
	     */
	
	  }, {
	    key: 'properties',
	    value: function properties() {
	      var schema = this.schema,
	          root = this.root,
	          level = this.level,
	          key = this.key,
	          index = this.index;
	      var properties = schema.properties;
	
	      var block = '';
	
	      if (properties) {
	        Object.keys(properties).forEach(function (key) {
	          var subschema = properties[key];
	          var initializer = new Initializer(subschema, { key: key, root: root, level: level + 1 });
	
	          block += initializer.compile();
	        });
	
	        // root-level properties boilerplate
	        if (root === this) {
	          block = '\n          if (typeof source === \'object\' && source !== null && !Array.isArray(source)) {\n            if (typeof target !== \'object\') {\n              throw new Error(\'?\')\n            }\n\n            source1 = source\n            target1 = target\n            count1 = 0\n\n            ' + block + '\n          }\n        ';
	
	          // nested properties boilerplate
	        } else {
	
	          if (index) {
	            block = '\n            if (' + index + ' < source' + level + '.length || typeof source' + level + '[' + index + '] === \'object\') {\n\n              source' + (level + 1) + ' = source' + level + '[' + index + '] || {}\n              count' + (level + 1) + ' = 0\n\n              if (' + index + ' < target' + level + '.length || typeof target' + level + '[' + index + '] !== \'object\') {\n                target' + (level + 1) + ' = {}\n                if (' + index + ' < source' + level + '.length) {\n                  count' + (level + 1) + '++\n                }\n              } else {\n                target' + (level + 1) + ' = target' + level + '[' + index + ']\n              }\n\n              ' + block + '\n\n              if (count' + (level + 1) + ' > 0) {\n                target' + level + '[' + index + '] = target' + (level + 1) + '\n                count' + level + '++\n              }\n\n            } else {\n              target' + level + '[' + index + '] = source' + level + '[' + index + ']\n              count' + level + '++\n            }\n          ';
	          }
	
	          if (key) {
	            block = '\n            if ((typeof source' + level + '[\'' + key + '\'] === \'object\'\n                  && source' + level + '[\'' + key + '\'] !== null\n                  && !Array.isArray(source' + level + '[\'' + key + '\']))\n                || !source' + level + '.hasOwnProperty(\'' + key + '\')) {\n\n              source' + (level + 1) + ' = source' + level + '[\'' + key + '\'] || {}\n              count' + (level + 1) + ' = 0\n\n              if (!target' + level + '.hasOwnProperty(\'' + key + '\')\n                  || typeof target' + level + '[\'' + key + '\'] !== \'object\'\n                  || target' + level + '[\'' + key + '\'] === null\n                  || Array.isArray(target' + level + '[\'' + key + '\'])) {\n                target' + (level + 1) + ' = {}\n                if (source' + level + '.hasOwnProperty(\'' + key + '\')) {\n                  count' + (level + 1) + '++\n                }\n              } else {\n                target' + (level + 1) + ' = target' + level + '[\'' + key + '\']\n                count' + (level + 1) + '++\n              }\n\n              ' + block + '\n\n              if (count' + (level + 1) + ' > 0) {\n                target' + level + '[\'' + key + '\'] = target' + (level + 1) + '\n                count' + level + '++\n              }\n\n            } else {\n              target' + level + '[\'' + key + '\'] = source' + level + '[\'' + key + '\']\n              count' + level + '++\n            }\n          ';
	          }
	        }
	      }
	
	      return block;
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'additionalProperties',
	    value: function additionalProperties() {}
	
	    /**
	     * items
	     */
	
	  }, {
	    key: 'items',
	    value: function items() {
	      var schema = this.schema,
	          root = this.root,
	          level = this.level,
	          key = this.key,
	          index = this.index;
	      var items = schema.items;
	
	      var block = '';
	
	      if (items) {
	
	        if (Array.isArray(items)) {
	          // TODO
	          //
	          //
	          //
	          //
	          //
	          // ...
	
	        } else if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null) {
	          var _index = 'i' + (level + 1);
	          var initializer = new Initializer(items, { index: _index, root: root, level: level + 1 });
	
	          block += '\n          var sLen = source' + (level + 1) + '.length || 0\n          var tLen = target' + (level + 1) + '.length || 0\n          var len = 0\n\n          if (sLen > len) { len = sLen }\n          // THIS IS WRONG, CAUSED SIMPLE ARRAY INIT TO FAIL (OVERWRITE\n          // EXISTING TARGET VALUES WITH UNDEFINED WHEN SOURCE IS SHORTER THAN\n          // TARGET). LEAVING HERE UNTIL WE FINISH TESTING AND SEE WHY IT MIGHT\n          // HAVE BEEN HERE IN THE FIRST PLACE.\n          //\n          // if (tLen > len) { len = tLen }\n\n          for (var ' + _index + ' = 0; ' + _index + ' < len; ' + _index + '++) {\n            ' + initializer.compile() + '\n          }\n        ';
	        }
	
	        // root-level properties boilerplate
	        if (root === this) {
	          block = '\n          if (Array.isArray(source)) {\n            if (!Array.isArray(target)) {\n              throw new Error(\'?\')\n            }\n\n            source1 = source\n            target1 = target\n\n            ' + block + '\n          }\n        ';
	
	          // nested properties boilerplate
	        } else {
	          block = '\n          if (Array.isArray(source' + level + '[\'' + key + '\']) || !source' + level + '.hasOwnProperty(\'' + key + '\')) {\n\n            source' + (level + 1) + ' = source' + level + '[\'' + key + '\'] || []\n            count' + (level + 1) + ' = 0\n\n            if (!target' + level + '.hasOwnProperty(\'' + key + '\') || !Array.isArray(target' + level + '[\'' + key + '\'])) {\n              target' + (level + 1) + ' = []\n                if (source' + level + '.hasOwnProperty(\'' + key + '\')) {\n                  count' + (level + 1) + '++\n                }\n\n            } else {\n              target' + (level + 1) + ' = target' + level + '[\'' + key + '\']\n              count' + (level + 1) + '++\n            }\n\n            ' + block + '\n\n            if (count' + (level + 1) + ' > 0) {\n              target' + level + '[\'' + key + '\'] = target' + (level + 1) + '\n              count' + level + '++\n            }\n\n          } else {\n            target' + level + '[\'' + key + '\'] = source' + level + '[\'' + key + '\']\n            count' + level + '++\n          }\n        ';
	        }
	      }
	
	      return block;
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'additionalItems',
	    value: function additionalItems() {}
	  }], [{
	    key: 'compile',
	    value: function compile(schema) {
	      var initializer = new Initializer(schema);
	      var block = initializer.compile();
	
	      //console.log(beautify(block))
	      try {
	        return new Function('target', 'source', 'options', block);
	      } catch (e) {
	        console.log(e, e.stack);
	      }
	    }
	  }]);
	
	  return Initializer;
	}();
	
	module.exports = Initializer;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Module dependencies
	 * @ignore
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSONPatch = __webpack_require__(17);
	
	/**
	 * JSONDocument
	 *
	 * @class
	 * JSONDocument is a high level interface that binds together all other features of
	 * this package and provides the principle method of data modeling.
	 */
	
	var JSONDocument = function () {
	  _createClass(JSONDocument, null, [{
	    key: 'schema',
	
	
	    /**
	     * Schema
	     */
	    get: function get() {
	      throw new Error('Schema must be defined by classes extending JSONDocument');
	    }
	
	    /**
	     * Constructor
	     *
	     * @param {Object} data
	     * @param {Object} options
	     */
	
	  }]);
	
	  function JSONDocument() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, JSONDocument);
	
	    this.initialize(data, options);
	  }
	
	  /**
	   * Initialize
	   *
	   * @param {Object} data
	   * @param {Object} options
	   */
	
	
	  _createClass(JSONDocument, [{
	    key: 'initialize',
	    value: function initialize() {
	      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var schema = this.constructor.schema;
	
	      schema.initialize(this, data, options);
	    }
	
	    /**
	     * Validate
	     *
	     * @param {JSONSchema} alternate - OPTIONAL alternate schema
	     * @returns {Object}
	     */
	
	  }, {
	    key: 'validate',
	    value: function validate(alternate) {
	      var schema = this.constructor.schema;
	
	      return (alternate || schema).validate(this);
	    }
	
	    /**
	     * Patch
	     *
	     * @param {Array} ops
	     */
	
	  }, {
	    key: 'patch',
	    value: function patch(ops) {
	      var patch = new JSONPatch(ops);
	      patch.apply(this);
	    }
	
	    /**
	     * Select
	     */
	
	  }, {
	    key: 'select',
	    value: function select() {}
	
	    /**
	     * Project
	     *
	     * @description
	     * Given a mapping, return an object projected from the current instance.
	     *
	     * @example
	     * let schema = new JSONSchema({
	     *   properties: {
	     *     foo: { type: 'Array' }
	     *   }
	     * })
	     *
	     * let mapping = new JSONMapping({
	     *   '/foo/0': '/bar/baz'
	     * })
	     *
	     * class FooTracker extends JSONDocument {
	     *   static get schema () { return schema }
	     * }
	     *
	     * let instance = new FooTracker({ foo: ['qux'] })
	     * instance.project(mapping)
	     * // => { bar: { baz: 'qux' } }
	     *
	     * @param {JSONMapping} mapping
	     * @return {Object}
	     */
	
	  }, {
	    key: 'project',
	    value: function project(mapping) {
	      return mapping.project(this);
	    }
	
	    /**
	     * Serialize
	     *
	     * @param {Object} object
	     * @returns {string}
	     */
	
	  }], [{
	    key: 'serialize',
	    value: function serialize(object) {
	      return JSON.stringify(object);
	    }
	
	    /**
	     * Deserialize
	     *
	     * @param {string} data
	     * @return {*}
	     */
	
	  }, {
	    key: 'deserialize',
	    value: function deserialize(data) {
	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        throw new Error('Failed to parse JSON');
	      }
	    }
	  }]);
	
	  return JSONDocument;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = JSONDocument;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Module dependencies
	 * @ignore
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JSONPointer = __webpack_require__(18);
	
	/**
	 * Modes
	 */
	var THROW = 0;
	var RECOVER = 1;
	var SILENT = 2;
	
	/**
	 * Operations list
	 */
	var OPERATIONS = ['add', 'remove', 'replace', 'move', 'copy', 'test'];
	
	/**
	 * Patch
	 *
	 * @class
	 * Implements RFC 6902: JavaScript Object Notation (JSON) Patch
	 * https://tools.ietf.org/html/rfc6902
	 */
	
	var JSONPatch = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Array} ops
	   */
	  function JSONPatch(ops) {
	    _classCallCheck(this, JSONPatch);
	
	    this.ops = ops || [];
	  }
	
	  /**
	   * Apply
	   *
	   * @todo handle errors/roll back
	   * @todo protect properties that are private in the schema
	   * @todo map JSON Pointers real property names
	   *
	   * @param {Object} target
	   */
	
	
	  _createClass(JSONPatch, [{
	    key: 'apply',
	    value: function apply(target) {
	      var _this = this;
	
	      this.ops.forEach(function (operation) {
	        var op = operation.op;
	
	        if (!op) {
	          throw new Error('Missing "op" in JSON Patch operation');
	        }
	
	        if (OPERATIONS.indexOf(op) === -1) {
	          throw new Error('Invalid "op" in JSON Patch operation');
	        }
	
	        if (!operation.path) {
	          throw new Error('Missing "path" in JSON Patch operation');
	        }
	
	        _this[op](operation, target);
	      });
	    }
	
	    /**
	     * Add
	     *
	     * @param {Object} op
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'add',
	    value: function add(op, target) {
	      if (op.value === undefined) {
	        throw new Error('Missing "value" in JSON Patch add operation');
	      }
	
	      var pointer = new JSONPointer(op.path, SILENT);
	      pointer.add(target, op.value);
	    }
	
	    /**
	     * Remove
	     *
	     * @param {Object} op
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(op, target) {
	      var pointer = new JSONPointer(op.path);
	      pointer.remove(target);
	    }
	
	    /**
	     * Replace
	     *
	     * @param {Object} op
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'replace',
	    value: function replace(op, target) {
	      if (op.value === undefined) {
	        throw new Error('Missing "value" in JSON Patch replace operation');
	      }
	
	      var pointer = new JSONPointer(op.path);
	      pointer.replace(target, op.value);
	    }
	
	    /**
	     * Move
	     *
	     * @param {Object} op
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'move',
	    value: function move(op, target) {
	      if (op.from === undefined) {
	        throw new Error('Missing "from" in JSON Patch move operation');
	      }
	
	      if (op.path.match(new RegExp('^' + op.from))) {
	        throw new Error('Invalid "from" in JSON Patch move operation');
	      }
	
	      var pointer = new JSONPointer(op.path);
	      var from = new JSONPointer(op.from);
	      var value = from.get(target);
	
	      from.remove(target);
	      pointer.add(target, value);
	    }
	
	    /**
	     * Copy
	     *
	     * @param {Object} op
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'copy',
	    value: function copy(op, target) {
	      if (op.from === undefined) {
	        throw new Error('Missing "from" in JSON Patch copy operation');
	      }
	
	      var pointer = new JSONPointer(op.path);
	      var from = new JSONPointer(op.from);
	      var value = from.get(target);
	
	      pointer.add(target, value);
	    }
	
	    /**
	     * Test
	     *
	     * @param {Object} op
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'test',
	    value: function test(op, target) {
	      if (op.value === undefined) {
	        throw new Error('Missing "value" in JSON Patch test operation');
	      }
	
	      var pointer = new JSONPointer(op.path);
	      var value = pointer.get(target);
	
	      switch (_typeof(op.value)) {
	        //case 'string':
	        //case 'number':
	        //case 'boolean':
	        //  if (value !== op.value) {
	        //    throw new Error('Mismatching JSON Patch test value')
	        //  }
	        default:
	          if (value !== op.value) {
	            throw new Error('Mismatching JSON Patch test value');
	          }
	      }
	    }
	  }]);
	
	  return JSONPatch;
	}();
	
	/**
	 * Exports
	 */
	
	
	module.exports = JSONPatch;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Mode enumeration
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var THROW = 0;
	var RECOVER = 1;
	var SILENT = 2;
	
	/**
	 * JSONPointer
	 *
	 * @class
	 * Implements RFC 6901: JavaScript Object Notation (JSON) Pointer
	 * https://tools.ietf.org/html/rfc6901
	 */
	
	var JSONPointer = function () {
	
	  /**
	   * Constructor
	   */
	  function JSONPointer(expr, mode) {
	    _classCallCheck(this, JSONPointer);
	
	    this.expr = expr;
	    this.mode = mode || THROW;
	    this.tokens = expr && expr.charAt(0) === '#' ? this.parseURIFragmentIdentifier(expr) : this.parseJSONString(expr);
	  }
	
	  /**
	   * Escape
	   */
	
	
	  _createClass(JSONPointer, [{
	    key: 'escape',
	    value: function escape(expr) {
	      return expr.replace(/~/g, '~0').replace(/\//g, '~1');
	    }
	
	    /**
	     * Unescape
	     */
	
	  }, {
	    key: 'unescape',
	    value: function unescape(expr) {
	      return expr.replace(/~1/g, '/').replace(/~0/g, '~');
	    }
	
	    /**
	     * Parse
	     */
	
	  }, {
	    key: 'parseJSONString',
	
	
	    /**
	     * Parse JSON String
	     *
	     * @description Parse an expression into a list of tokens
	     * @param {string} expr
	     * @returns {Array}
	     */
	    value: function parseJSONString(expr) {
	      if (typeof expr !== 'string') {
	        throw new Error('JSON Pointer must be a string');
	      }
	
	      if (expr === '') {
	        return [];
	      }
	
	      if (expr.charAt(0) !== '/') {
	        throw new Error('Invalid JSON Pointer');
	      }
	
	      if (expr === '/') {
	        return [''];
	      }
	
	      return expr.substr(1).split('/').map(this.unescape);
	    }
	
	    /**
	     * To JSON String
	     *
	     * @description Render a JSON string representation of a pointer
	     * @returns {string}
	     */
	
	  }, {
	    key: 'toJSONString',
	    value: function toJSONString() {
	      return '/' + this.tokens.map(this.escape).join('/');
	    }
	
	    /**
	     * Parse URI Fragment Identifer
	     */
	
	  }, {
	    key: 'parseURIFragmentIdentifier',
	    value: function parseURIFragmentIdentifier(expr) {
	      if (typeof expr !== 'string') {
	        throw new Error('JSON Pointer must be a string');
	      }
	
	      if (expr.charAt(0) !== '#') {
	        throw new Error('Invalid JSON Pointer URI Fragment Identifier');
	      }
	
	      return this.parseJSONString(decodeURIComponent(expr.substr(1)));
	    }
	
	    /**
	     * To URI Fragment Identifier
	     *
	     * @description Render a URI Fragment Identifier representation of a pointer
	     * @returns {string}
	     */
	
	  }, {
	    key: 'toURIFragmentIdentifier',
	    value: function toURIFragmentIdentifier() {
	      var _this = this;
	
	      var value = this.tokens.map(function (token) {
	        return encodeURIComponent(_this.escape(token));
	      }).join('/');
	
	      return '#/' + value;
	    }
	
	    /**
	     * Get
	     *
	     * @description Get a value from the source object referenced by the pointer
	     * @param {Object} source
	     * @returns {*}
	     */
	
	  }, {
	    key: 'get',
	    value: function get(source) {
	      var current = source;
	      var tokens = this.tokens;
	
	      for (var i = 0; i < tokens.length; i++) {
	        if (!current || current[tokens[i]] === undefined) {
	          if (this.mode !== THROW) {
	            return undefined;
	          } else {
	            throw new Error('Invalid JSON Pointer reference');
	          }
	        }
	
	        current = current[tokens[i]];
	      }
	
	      return current;
	    }
	
	    /**
	     * Add
	     *
	     * @description Set a value on a target object referenced by the pointer. Put
	     * will insert an array element. To change an existing array elemnent, use
	     * `pointer.set()`
	     * @param {Object} target
	     * @param {*} value
	     */
	
	  }, {
	    key: 'add',
	    value: function add(target, value) {
	      var tokens = this.tokens;
	      var current = target;
	
	      // iterate through the tokens
	      for (var i = 0; i < tokens.length; i++) {
	        var token = tokens[i];
	
	        // set the property on the target location
	        if (i === tokens.length - 1) {
	          if (token === '-') {
	            current.push(value);
	          } else if (Array.isArray(current)) {
	            current.splice(token, 0, value);
	          } else {
	            current[token] = value;
	          }
	
	          // handle missing target location based on "mode"
	        } else if (!current[token]) {
	          switch (this.mode) {
	            case THROW:
	              throw new Error('Invalid JSON Pointer reference');
	
	            case RECOVER:
	              current = current[token] = parseInt(token) ? [] : {};
	              break;
	
	            case SILENT:
	              return;
	
	            default:
	              throw new Error('Invalid pointer mode');
	          }
	
	          // reference the next object in the path
	        } else {
	          current = current[token];
	        }
	      }
	    }
	
	    /**
	     * Replace
	     *
	     * @description Set a value on a target object referenced by the pointer. Set will
	     * overwrite an existing array element at the target location.
	     * @param {Object} target
	     * @param {*} value
	     */
	
	  }, {
	    key: 'replace',
	    value: function replace(target, value) {
	      var tokens = this.tokens;
	      var current = target;
	
	      for (var i = 0; i < tokens.length; i++) {
	        var token = tokens[i];
	
	        if (i === tokens.length - 1) {
	          current[token] = value;
	        } else if (!current[token]) {
	          current = current[token] = parseInt(token) ? [] : {};
	        } else {
	          current = current[token];
	        }
	      }
	    }
	
	    /**
	     * Del
	     *
	     * - if this is an array it should splice the value out
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(target) {
	      var tokens = this.tokens;
	      var current = target;
	
	      for (var i = 0; i < tokens.length; i++) {
	        var token = tokens[i];
	
	        if (current === undefined || current[token] === undefined) {
	          return undefined;
	        } else if (Array.isArray(current)) {
	          current.splice(token, 1);
	          return undefined;
	        } else if (i === tokens.length - 1) {
	          delete current[token];
	        }
	
	        current = current[token];
	      }
	
	      // delete from the target
	    }
	  }], [{
	    key: 'parse',
	    value: function parse(expr) {
	      return new JSONPointer(expr);
	    }
	  }]);
	
	  return JSONPointer;
	}();
	
	/**
	 * Exports
	 */
	
	
	module.exports = JSONPointer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Module dependencies
	 * @ignore
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var JSONPointer = __webpack_require__(18);
	
	/**
	 * JSONPointer mode
	 */
	var RECOVER = 1;
	
	/**
	 * JSONMapping
	 *
	 * @class
	 * Defines a means to declaratively translate between object
	 * representations using JSON Pointer syntax.
	 */
	
	var JSONMapping = function (_Map) {
	  _inherits(JSONMapping, _Map);
	
	  /**
	   * Constructor
	   *
	   * @description Translate pointers from JSON Strings into Pointer objects
	   * @param {Object} mapping
	   */
	  function JSONMapping(mapping) {
	    _classCallCheck(this, JSONMapping);
	
	    var _this = _possibleConstructorReturn(this, (JSONMapping.__proto__ || Object.getPrototypeOf(JSONMapping)).call(this));
	
	    Object.keys(mapping).forEach(function (key) {
	      var value = mapping[key];
	      _this.set(new JSONPointer(key, RECOVER), new JSONPointer(value, RECOVER));
	    });
	    return _this;
	  }
	
	  /**
	   * Map
	   *
	   * @description Assign values from source to target by reading the mapping
	   * from right to left.
	   * @param {Object} target
	   * @param {Object} source
	   */
	
	
	  _createClass(JSONMapping, [{
	    key: 'map',
	    value: function map(target, source) {
	      this.forEach(function (right, left) {
	        left.add(target, right.get(source));
	      });
	    }
	
	    /**
	     * Project
	     *
	     * @description Assign values from source to target by reading the mapping
	     * from left to right.
	     * @param {Object} source
	     * @param {Object} target
	     */
	
	  }, {
	    key: 'project',
	    value: function project(source, target) {
	      this.forEach(function (right, left) {
	        right.add(target, left.get(source));
	      });
	    }
	  }]);
	
	  return JSONMapping;
	}(Map);
	
	/**
	 * Exports
	 */
	
	
	module.exports = JSONMapping;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Module dependencies
	 * @ignore
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Initializer = __webpack_require__(15);
	var Validator = __webpack_require__(21);
	
	/**
	 * JSONSchema
	 *
	 * @class
	 * Compiles JSON Schema documents to an object with object initialization
	 * and validation methods.
	 */
	
	var JSONSchema = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Object} schema
	   */
	  function JSONSchema(schema) {
	    _classCallCheck(this, JSONSchema);
	
	    // TODO: optionally parse JSON string?
	    Object.assign(this, schema);
	
	    // add schema-derived initialize and validate methods
	    Object.defineProperties(this, {
	      initialize: {
	        enumerable: false,
	        writeable: false,
	        value: Initializer.compile(schema)
	      },
	      validate: {
	        enumerable: false,
	        writeable: false,
	        value: Validator.compile(schema)
	      }
	    });
	  }
	
	  /**
	   * Extend
	   *
	   * @description
	   * ...
	   * Dear future,
	   *
	   * This function was meticulously plagiarized from some curious amalgam of
	   * stackoverflow posts whilst dozing off at my keyboard, too deprived of REM-
	   * sleep to recurse unassisted. If it sucks, you have only yourself to blame.
	   *
	   * Goodnight.
	   *
	   * @param {Object} schema
	   * @returns {JSONSchema}
	   */
	
	
	  _createClass(JSONSchema, [{
	    key: 'extend',
	    value: function extend(schema) {
	      function isObject(data) {
	        return data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null && !Array.isArray(data);
	      }
	
	      function extender(target, source) {
	        var result = Object.assign({}, target);
	        if (isObject(target) && isObject(source)) {
	          Object.keys(source).forEach(function (key) {
	            if (isObject(source[key])) {
	              if (!(key in target)) {
	                Object.assign(result, _defineProperty({}, key, source[key]));
	              } else {
	                result[key] = extender(target[key], source[key]);
	              }
	            } else {
	              Object.assign(result, _defineProperty({}, key, source[key]));
	            }
	          });
	        }
	        return result;
	      }
	
	      var descriptor = extender(this, schema);
	      return new JSONSchema(descriptor);
	    }
	  }]);
	
	  return JSONSchema;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = JSONSchema;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Module dependencies
	 * @ignore
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var formats = __webpack_require__(14);
	
	/**
	 * Validator
	 *
	 * Compile an object describing a JSON Schema into a validation function.
	 */
	
	var Validator = function () {
	  _createClass(Validator, null, [{
	    key: 'compile',
	
	
	    /**
	     * Compile (static)
	     *
	     * @description
	     * Compile an object describing a JSON Schema into a validation function.
	     *
	     * @param {Object} schema
	     * @returns {Function}
	     */
	    value: function compile(schema) {
	      var validator = new Validator(schema);
	
	      var body = '\n      // "cursor"\n      let value = data\n      let container\n      let stack = []\n      let top = -1\n\n      // error state\n      let valid = true\n      let errors = []\n\n      // complex schema state\n      let initialValidity\n      let anyValid\n      let notValid\n      let countOfValid\n      let initialErrorCount\n      let accumulatedErrorCount\n\n      // validation code\n      ' + validator.compile() + '\n\n      // validation result\n      return {\n        valid,\n        errors\n      }\n    ';
	
	      return new Function('data', body);
	    }
	
	    /**
	     * Constructor
	     *
	     * @param {Object} schema - object representation of a schema
	     * @param {string} options - compilation options
	     */
	
	  }]);
	
	  function Validator(schema) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Validator);
	
	    // assign schema to this
	    this.schema = schema;
	
	    // assign all options to this
	    Object.assign(this, options);
	
	    // ensure address is defined
	    if (!this.address) {
	      this.address = '';
	    }
	
	    // ensure require is boolean
	    if (this.require !== true) {
	      this.require = false;
	    }
	  }
	
	  /**
	   * Compile
	   *
	   * @description
	   * The instance compile method is "dumb". It only sequences invocation of
	   * more specific compilation methods. It generates code to
	   *
	   *  - read a value from input
	   *  - validate type(s) of input
	   *  - validate constraints described by various schema keywords
	   *
	   * Conditional logic related to code generation is pushed downsteam to
	   * type-specific methods.
	   */
	
	
	  _createClass(Validator, [{
	    key: 'compile',
	    value: function compile() {
	      var block = '';
	
	      if (this.require) {
	        block += this.required();
	      }
	
	      // type validation
	      block += this.type();
	
	      // type specific validation generators
	      // null and boolean are covered by this.type()
	      // integer should be covered by number and this.type()
	      block += this.array();
	      block += this.number();
	      block += this.object();
	      block += this.string();
	
	      // non-type-specific validation generators
	      block += this.enum();
	      block += this.anyOf();
	      block += this.allOf();
	      block += this.not();
	      block += this.oneOf();
	
	      return block;
	    }
	
	    /**
	     * push
	     */
	
	  }, {
	    key: 'push',
	    value: function push() {
	      return '\n      stack.push(value)\n      container = value\n      top++\n    ';
	    }
	
	    /**
	     * pop
	     */
	
	  }, {
	    key: 'pop',
	    value: function pop() {
	      return '\n      if (stack.length > 1) {\n        top--\n        stack.pop()\n      }\n\n      value = container = stack[top]\n    ';
	    }
	
	    /**
	     * type
	     *
	     * @description
	     * > An instance matches successfully if its primitive type is one of the
	     * > types defined by keyword. Recall: "number" includes "integer".
	     * > JSON Schema Validation Section 5.5.2
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'type',
	    value: function type() {
	      var type = this.schema.type,
	          address = this.address;
	
	      var block = '';
	
	      if (type) {
	        var types = Array.isArray(type) ? type : [type];
	        var conditions = types.map(function (type) {
	          // TODO: can we make a mapping object for this to clean it up?
	          if (type === 'array') return '!Array.isArray(value)';
	          if (type === 'boolean') return 'typeof value !== \'boolean\'';
	          if (type === 'integer') return '!Number.isInteger(value)';
	          if (type === 'null') return 'value !== null';
	          if (type === 'number') return 'typeof value !== \'number\'';
	          if (type === 'object') return '(typeof value !== \'object\' || Array.isArray(value) || value === null)';
	          if (type === 'string') return 'typeof value !== \'string\'';
	        }).join(' && ');
	
	        block += '\n      // ' + address + ' type checking\n      if (value !== undefined && ' + conditions + ') {\n        valid = false\n        errors.push({\n          keyword: \'type\',\n          message: \'invalid type\'\n        })\n      }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * Type-specific validations
	     *
	     * Type checking is optional in JSON Schema, and a schema can allow
	     * multiple types. Generated code needs to apply type-specific validations
	     * only to appropriate values, and ignore everything else. Type validation
	     * itself is handled separately from other validation keywords.
	     *
	     * The methods `array`, `number`, `object`, `string` generate type-specific
	     * validation code blocks, wrapped in a conditional such that they will
	     * only be applied to values of that type.
	     *
	     * For example, the `number` method, given the schema
	     *
	     *     { minimum: 3 }
	     *
	     * will generate
	     *
	     *     if (typeof value === 'number') {
	     *       if (value < 3) {
	     *         valid = false
	     *         errors.push({ message: '...' })
	     *       }
	     *     }
	     *
	     * Integer values are also numbers, and are validated the same as numbers
	     * other than the type validation itself. Therefore no `integer` method is
	     * needed.
	     */
	
	    /**
	     * array
	     *
	     * @description
	     * Invoke methods for array-specific keywords and wrap resulting code in
	     * type-checking conditional so that any resulting validations are only
	     * applied to array values.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'array',
	    value: function array() {
	      var keywords = ['additionalItems', 'items', 'minItems', 'maxItems', 'uniqueItems'];
	      var validations = this.validations(keywords);
	      var block = '';
	
	      if (validations.length > 0) {
	        block += '\n      /**\n       * Array validations\n       */\n      if (Array.isArray(value)) {\n      ' + validations + '\n      }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * number
	     *
	     * @description
	     * Invoke methods for number-specific keywords and wrap resulting code in
	     * type-checking conditional so that any resulting validations are only
	     * applied to number values.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'number',
	    value: function number() {
	      var keywords = ['minimum', 'maximum', 'multipleOf'];
	      var validations = this.validations(keywords);
	      var block = '';
	
	      if (validations.length > 0) {
	        block += '\n      /**\n       * Number validations\n       */\n      if (typeof value === \'number\') {\n      ' + validations + '\n      }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * object
	     *
	     * @description
	     * Invoke methods for object-specific keywords and wrap resulting code in
	     * type-checking conditional so that any resulting validations are only
	     * applied to object values.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'object',
	    value: function object() {
	      var keywords = ['maxProperties', 'minProperties', 'additionalProperties', 'properties', 'patternProperties', 'dependencies', 'schemaDependencies', 'propertyDependencies'];
	      var validations = this.validations(keywords);
	      var block = '';
	
	      if (validations.length > 0) {
	        block += '\n      /**\n       * Object validations\n       */\n      if (typeof value === \'object\' && value !== null && !Array.isArray(value)) {\n      ' + validations + '\n      }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * string
	     *
	     * @description
	     * Invoke methods for string-specific keywords and wrap resulting code in
	     * type-checking conditional so that any resulting validations are only
	     * applied to string values.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'string',
	    value: function string() {
	      var keywords = ['maxLength', 'minLength', 'pattern', 'format'];
	      var validations = this.validations(keywords);
	      var block = '';
	
	      if (validations.length > 0) {
	        block += '\n      /**\n       * String validations\n       */\n      if (typeof value === \'string\') {\n      ' + validations + '\n      }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * validations
	     *
	     * @description
	     * Iterate over an array of keywords and invoke code generator methods
	     * for each. Concatenate the results together and return. Used by "type"
	     * methods such as this.array() and this.string()
	     *
	     * @param {Array} keywords
	     * @returns {string}
	     */
	
	  }, {
	    key: 'validations',
	    value: function validations(keywords) {
	      var _this = this;
	
	      var schema = this.schema;
	
	      var block = '';
	
	      var constraints = Object.keys(schema).filter(function (key) {
	        return keywords.indexOf(key) !== -1;
	      });
	
	      constraints.forEach(function (keyword) {
	        block += _this[keyword]();
	      });
	
	      return block;
	    }
	
	    /**
	     * enum
	     *
	     * @description
	     * > An instance validates successfully against this keyword if its value
	     * > is equal to one of the elements in this keyword's array value.
	     * > JSON Schema Validation Section 5.5.1
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'enum',
	    value: function _enum() {
	      var enumerated = this.schema.enum,
	          address = this.address;
	
	      var conditions = ['value !== undefined'];
	      var block = '';
	
	      if (enumerated) {
	        enumerated.forEach(function (value) {
	          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
	            case 'boolean':
	              conditions.push('value !== ' + value);
	              break;
	
	            case 'number':
	              conditions.push('value !== ' + value);
	              break;
	
	            case 'string':
	              conditions.push('value !== "' + value + '"');
	              break;
	
	            case 'object':
	              if (value === null) {
	                conditions.push('value !== null');
	              } else {
	                conditions.push('\'' + JSON.stringify(value) + '\' !== JSON.stringify(value)');
	              }
	              break;
	
	            default:
	              throw new Error('Things are not well in the land of enum');
	
	          }
	        });
	
	        block += '\n      /**\n       * Validate "' + address + '" enum\n       */\n      if (' + conditions.join(' && ') + ') {\n        valid = false\n        errors.push({\n          keyword: \'enum\',\n          message: JSON.stringify(value) + \' is not an enumerated value\'\n        })\n      }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * anyOf
	     *
	     * @description
	     * > An instance validates successfully against this keyword if it
	     * > validates successfully against at least one schema defined by this
	     * > keyword's value.
	     * > JSON Schema Validation Section 5.5.4
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'anyOf',
	    value: function anyOf() {
	      var anyOf = this.schema.anyOf,
	          address = this.address;
	
	      var block = '';
	
	      if (Array.isArray(anyOf)) {
	        block += '\n        initialValidity = valid\n        initialErrorCount = errors.length\n        anyValid = false\n      ';
	
	        anyOf.forEach(function (subschema) {
	          var validator = new Validator(subschema, { address: address });
	          block += '\n        accumulatedErrorCount = errors.length\n        ' + validator.compile() + '\n        if (accumulatedErrorCount === errors.length) {\n          anyValid = true\n        }\n        ';
	        });
	
	        block += '\n          if (anyValid === true) {\n            valid = initialValidity\n            errors = errors.slice(0, initialErrorCount)\n          }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * allOf
	     *
	     * @description
	     * > An instance validates successfully against this keyword if it
	     * > validates successfully against all schemas defined by this keyword's
	     * > value.
	     * > JSON Schema Validation Section 5.5.3
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'allOf',
	    value: function allOf() {
	      var allOf = this.schema.allOf,
	          address = this.address;
	
	      var block = '';
	
	      if (Array.isArray(allOf)) {
	        allOf.forEach(function (subschema) {
	          var validator = new Validator(subschema, { address: address });
	          block += '\n        ' + validator.compile() + '\n        ';
	        });
	      }
	
	      return block;
	    }
	
	    /**
	     * oneOf
	     *
	     * @description
	     * > An instance validates successfully against this keyword if it
	     * > validates successfully against exactly one schema defined by this
	     * > keyword's value.
	     * > JSON Schema Validation Section 5.5.5
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'oneOf',
	    value: function oneOf() {
	      var oneOf = this.schema.oneOf,
	          address = this.address;
	
	      var block = '';
	
	      if (Array.isArray(oneOf)) {
	        block += '\n        /**\n         * Validate ' + address + ' oneOf\n         */\n        initialValidity = valid\n        initialErrorCount = errors.length\n        countOfValid = 0\n      ';
	
	        oneOf.forEach(function (subschema) {
	          var validator = new Validator(subschema, { address: address });
	          block += '\n        accumulatedErrorCount = errors.length\n        ' + validator.compile() + '\n        if (accumulatedErrorCount === errors.length) {\n          countOfValid += 1\n        }\n        ';
	        });
	
	        block += '\n          if (countOfValid === 1) {\n            valid = initialValidity\n            errors = errors.slice(0, initialErrorCount)\n          } else {\n            valid = false\n            errors.push({\n              keyword: \'oneOf\',\n              message: \'what is a reasonable error message for this case?\'\n            })\n          }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * not
	     *
	     * @description
	     * > An instance is valid against this keyword if it fails to validate
	     * > successfully against the schema defined by this keyword.
	     * > JSON Schema Validation Section 5.5.6
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'not',
	    value: function not() {
	      var not = this.schema.not,
	          address = this.address;
	
	      var block = '';
	
	      if ((typeof not === 'undefined' ? 'undefined' : _typeof(not)) === 'object' && not !== null && !Array.isArray(not)) {
	        var subschema = not;
	        var validator = new Validator(subschema, { address: address });
	
	        block += '\n        /**\n         * NOT\n         */\n        if (value !== undefined) {\n          initialValidity = valid\n          initialErrorCount = errors.length\n          notValid = true\n\n          accumulatedErrorCount = errors.length\n\n          ' + validator.compile() + '\n\n          if (accumulatedErrorCount === errors.length) {\n            notValid = false\n          }\n\n          if (notValid === true) {\n            valid = initialValidity\n            errors = errors.slice(0, initialErrorCount)\n          } else {\n            valid = false\n            errors = errors.slice(0, initialErrorCount)\n            errors.push({\n              keyword: \'not\',\n              message: \'hmm...\'\n            })\n          }\n        }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * properties
	     *
	     * @description
	     * Iterate over the `properties` schema property if it is an object. For each
	     * key, initialize a new Validator for the subschema represented by the property
	     * value and invoke compile. Append the result of compiling each subschema to
	     * the block of code being generated.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'properties',
	    value: function properties() {
	      var schema = this.schema,
	          address = this.address;
	      var properties = schema.properties,
	          required = schema.required;
	
	      var block = this.push();
	
	      // ensure the value of "required" schema property is an array
	      required = Array.isArray(required) ? required : [];
	
	      if ((typeof properties === 'undefined' ? 'undefined' : _typeof(properties)) === 'object') {
	        Object.keys(properties).forEach(function (key) {
	          var subschema = properties[key];
	          var isRequired = required.indexOf(key) !== -1;
	          // TODO
	          // how should we be calculating these things? should be json pointer?
	          // needs a separate function
	          var pointer = [address, key].filter(function (segment) {
	            return !!segment;
	          }).join('.');
	          var validation = new Validator(subschema, { address: pointer, require: isRequired });
	
	          // read the value
	          block += '\n        value = container[\'' + key + '\']\n        ';
	
	          block += validation.compile();
	        });
	      }
	
	      block += this.pop();
	
	      return block;
	    }
	
	    /**
	     * Other Properties
	     *
	     * @description
	     * This method is not for a keyword. It wraps validations for
	     * patternProperties and additionalProperties in a single iteration over
	     * an object-type value's properties.
	     *
	     * It should only be invoked once for a given subschema.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'otherProperties',
	    value: function otherProperties() {
	      return '\n      /**\n       * Validate Other Properties\n       */\n      ' + this.push() + '\n\n      for (let key in container) {\n        value = container[key]\n        matched = false\n\n        ' + this.patternValidations() + '\n        ' + this.additionalValidations() + '\n      }\n\n      ' + this.pop() + '\n    ';
	    }
	
	    /**
	     * Pattern Validations
	     *
	     * @description
	     * Generate validation code from a subschema for properties matching a
	     * regular expression.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'patternValidations',
	    value: function patternValidations() {
	      var patternProperties = this.schema.patternProperties;
	
	      var block = '';
	
	      if ((typeof patternProperties === 'undefined' ? 'undefined' : _typeof(patternProperties)) === 'object') {
	        Object.keys(patternProperties).forEach(function (pattern) {
	          var subschema = patternProperties[pattern];
	          var validator = new Validator(subschema);
	          block += '\n          if (key.match(\'' + pattern + '\')) {\n            matched = true\n            ' + validator.compile() + '\n          }\n        ';
	        });
	      }
	
	      return block;
	    }
	
	    /**
	     * Additional Validations
	     *
	     * @description
	     * Generate validation code, either from a subschema for properties not
	     * defined in the schema, or to disallow properties not defined in the
	     * schema.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'additionalValidations',
	    value: function additionalValidations() {
	      var _schema = this.schema,
	          properties = _schema.properties,
	          additionalProperties = _schema.additionalProperties,
	          address = this.address;
	
	      var validations = '';
	      var block = '';
	
	      // catch additional unmatched properties
	      var conditions = ['matched !== true'];
	
	      // ignore defined properties
	      Object.keys(properties || {}).forEach(function (key) {
	        conditions.push('key !== \'' + key + '\'');
	      });
	
	      // validate additional properties
	      if ((typeof additionalProperties === 'undefined' ? 'undefined' : _typeof(additionalProperties)) === 'object') {
	        var subschema = additionalProperties;
	        var validator = new Validator(subschema, { address: address + '[APKey]' });
	        block += '\n        // validate additional properties\n        if (' + conditions.join(' && ') + ') {\n          ' + validator.compile() + '\n        }\n      ';
	      }
	
	      // error for additional properties
	      if (additionalProperties === false) {
	        block += '\n        // validate non-presence of additional properties\n        if (' + conditions.join(' && ') + ') {\n          valid = false\n          errors.push({\n            keyword: \'additionalProperties\',\n            message: key + \' is not a defined property\'\n          })\n        }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * patternProperties
	     *
	     * @description
	     * Generate validation code for properties matching a pattern
	     * defined by the property name (key), which must be a string
	     * representing a valid regular expression.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'patternProperties',
	    value: function patternProperties() {
	      var block = '';
	
	      if (!this.otherPropertiesCalled) {
	        this.otherPropertiesCalled = true;
	        block += this.otherProperties();
	      }
	
	      return block;
	    }
	
	    /**
	     * additionalProperties
	     *
	     * @description
	     * Generate validation code for additional properties not defined
	     * in the schema, or disallow additional properties if the value of
	     * `additionalProperties` in the schema is `false`.
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'additionalProperties',
	    value: function additionalProperties() {
	      var block = '';
	
	      if (!this.otherPropertiesCalled) {
	        this.otherPropertiesCalled = true;
	        block += this.otherProperties();
	      }
	
	      return block;
	    }
	
	    /**
	     * minProperties
	     *
	     * @description
	     * > An object instance is valid against "minProperties" if its number of
	     * > properties is greater than, or equal to, the value of this keyword.
	     * > JSON Schema Validation Section 5.4.2
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'minProperties',
	    value: function minProperties() {
	      var minProperties = this.schema.minProperties,
	          address = this.address;
	
	
	      return '\n        // ' + address + ' min properties\n        if (Object.keys(value).length < ' + minProperties + ') {\n          valid = false\n          errors.push({\n            keyword: \'minProperties\',\n            message: \'too few properties\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * maxProperties
	     *
	     * @description
	     * > An object instance is valid against "maxProperties" if its number of
	     * > properties is less than, or equal to, the value of this keyword.
	     * > JSON Schema Validation Section 5.4.1
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'maxProperties',
	    value: function maxProperties() {
	      var maxProperties = this.schema.maxProperties,
	          address = this.address;
	
	
	      return '\n        // ' + address + ' max properties\n        if (Object.keys(value).length > ' + maxProperties + ') {\n          valid = false\n          errors.push({\n            keyword: \'maxProperties\',\n            message: \'too many properties\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * Dependencies
	     *
	     * @description
	     * > For all (name, schema) pair of schema dependencies, if the instance has
	     * > a property by this name, then it must also validate successfully against
	     * > the schema.
	     * >
	     * > Note that this is the instance itself which must validate successfully,
	     * > not the value associated with the property name.
	     * >
	     * > For each (name, propertyset) pair of property dependencies, if the
	     * > instance has a property by this name, then it must also have properties
	     * > with the same names as propertyset.
	     * > JSON Schema Validation Section 5.4.5.2
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'dependencies',
	    value: function dependencies() {
	      var dependencies = this.schema.dependencies,
	          address = this.address;
	
	
	      var block = this.push();
	
	      if ((typeof dependencies === 'undefined' ? 'undefined' : _typeof(dependencies)) === 'object') {
	        Object.keys(dependencies).forEach(function (key) {
	          var dependency = dependencies[key];
	          var conditions = [];
	
	          if (Array.isArray(dependency)) {
	            dependency.forEach(function (item) {
	              conditions.push('container[\'' + item + '\'] === undefined');
	            });
	
	            block += '\n            if (container[\'' + key + '\'] !== undefined && (' + conditions.join(' || ') + ')) {\n              valid = false\n              errors.push({\n                keyword: \'dependencies\',\n                message: \'unmet dependencies\'\n              })\n            }\n          ';
	          } else if ((typeof dependency === 'undefined' ? 'undefined' : _typeof(dependency)) === 'object') {
	            var subschema = dependency;
	            var validator = new Validator(subschema, { address: address });
	
	            block += '\n            if (container[\'' + key + '\'] !== undefined) {\n              ' + validator.compile() + '\n            }\n          ';
	          }
	        });
	      }
	
	      block += this.pop();
	
	      return block;
	    }
	
	    /**
	     * Required
	     *
	     * @description
	     * > An object instance is valid against this keyword if its property set
	     * > contains all elements in this keyword's array value.
	     * > JSON Schema Validation Section 5.4.3
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'required',
	    value: function required() {
	      var properties = this.schema.properties,
	          address = this.address;
	
	      var block = '';
	
	      block += '\n      // validate ' + address + ' presence\n      if (value === undefined) {\n        valid = false\n        errors.push({\n          keyword: \'required\',\n          message: \'is required\'\n        })\n      }\n    ';
	
	      return block;
	    }
	
	    /**
	     * additionalItems
	     *
	     * @description
	     * > Successful validation of an array instance with regards to these two
	     * > keywords is determined as follows: if "items" is not present, or its
	     * > value is an object, validation of the instance always succeeds,
	     * > regardless of the value of "additionalItems"; if the value of
	     * > "additionalItems" is boolean value true or an object, validation of
	     * > the instance always succeeds; if the value of "additionalItems" is
	     * > boolean value false and the value of "items" is an array, the
	     * > instance is valid if its size is less than, or equal to, the size
	     * > of "items".
	     * > JSON Schema Validation Section 5.3.1
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'additionalItems',
	    value: function additionalItems() {
	      var _schema2 = this.schema,
	          items = _schema2.items,
	          additionalItems = _schema2.additionalItems,
	          address = this.address;
	
	      var block = '';
	
	      if (additionalItems === false && Array.isArray(items)) {
	        block += '\n        // don\'t allow additional items\n        if (value.length > ' + items.length + ') {\n          valid = false\n          errors.push({\n            keyword: \'additionalItems\',\n            message: \'additional items not allowed\'\n          })\n        }\n      ';
	      }
	
	      if ((typeof additionalItems === 'undefined' ? 'undefined' : _typeof(additionalItems)) === 'object' && additionalItems !== null && Array.isArray(items)) {
	        var subschema = additionalItems;
	        var validator = new Validator(subschema);
	
	        block += '\n        // additional items\n        ' + this.push() + '\n\n        for (var i = ' + items.length + '; i <= container.length; i++) {\n          value = container[i]\n          ' + validator.compile() + '\n        }\n\n        ' + this.pop() + '\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * Items
	     *
	     * @description
	     * > Successful validation of an array instance with regards to these two
	     * > keywords is determined as follows: if "items" is not present, or its
	     * > value is an object, validation of the instance always succeeds,
	     * > regardless of the value of "additionalItems"; if the value of
	     * > "additionalItems" is boolean value true or an object, validation of
	     * > the instance always succeeds; if the value of "additionalItems" is
	     * > boolean value false and the value of "items" is an array, the
	     * > instance is valid if its size is less than, or equal to, the size
	     * > of "items".
	     * > JSON Schema Validation Section 5.3.1
	     *
	     * Code to generate
	     *
	     *     // this outer conditional is generated by this.array()
	     *     if (Array.isArray(value) {
	     *       let parent = value
	     *       for (let i = 0; i < parent.length; i++) {
	     *         value = parent[i]
	     *         // other validation code depending on value here
	     *       }
	     *       value = parent
	     *     }
	     *
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'items',
	    value: function items() {
	      var items = this.schema.items,
	          address = this.address;
	
	      var block = '';
	
	      // if items is an array
	      if (Array.isArray(items)) {
	        block += this.push();
	
	        items.forEach(function (item, index) {
	          var subschema = item;
	          var validator = new Validator(subschema, { address: address + '[' + index + ']' });
	
	          block += '\n          // item #' + index + '\n          value = container[' + index + ']\n          ' + validator.compile() + '\n        ';
	        });
	
	        block += this.pop();
	
	        // if items is an object
	      } else if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) === 'object' && items !== null) {
	        var subschema = items;
	        var validator = new Validator(subschema);
	
	        block += '\n        // items\n        ' + this.push() + '\n\n        for (var i = 0; i < container.length; i++) {\n          // read array element\n          value = container[i]\n          ' + validator.compile() + '\n        }\n\n        ' + this.pop() + '\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * minItems
	     *
	     * @description
	     * > An array instance is valid against "minItems" if its size is greater
	     * > than, or equal to, the value of this keyword.
	     * > JSON Schema Validation Section 5.3.3
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'minItems',
	    value: function minItems() {
	      var minItems = this.schema.minItems,
	          address = this.address;
	
	
	      return '\n        // ' + address + ' min items\n        if (value.length < ' + minItems + ') {\n          valid = false\n          errors.push({\n            keyword: \'minItems\',\n            message: \'too few properties\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * maxItems
	     *
	     * @description
	     * > An array instance is valid against "maxItems" if its size is less
	     * > than, or equal to, the value of this keyword.
	     * > JSON Schema Validation Section 5.3.2
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'maxItems',
	    value: function maxItems() {
	      var maxItems = this.schema.maxItems,
	          address = this.address;
	
	
	      return '\n        // ' + address + ' max items\n        if (value.length > ' + maxItems + ') {\n          valid = false\n          errors.push({\n            keyword: \'maxItems\',\n            message: \'too many properties\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * uniqueItems
	     *
	     * @description
	     * > If this keyword has boolean value false, the instance validates
	     * > successfully. If it has boolean value true, the instance validates
	     * > successfully if all of its elements are unique.
	     * > JSON Schema Validation Section 5.3.4
	     *
	     * TODO
	     * optimize
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'uniqueItems',
	    value: function uniqueItems() {
	      var uniqueItems = this.schema.uniqueItems,
	          address = this.address;
	
	      var block = '';
	
	      if (uniqueItems === true) {
	        block += '\n        // validate ' + address + ' unique items\n        let values = value.map(v => JSON.stringify(v)) // TODO: optimize\n        let set = new Set(values)\n        if (values.length !== set.size) {\n          valid = false\n          errors.push({\n            keyword: \'uniqueItems\',\n            message: \'items must be unique\'\n          })\n        }\n      ';
	      }
	
	      return block;
	    }
	
	    /**
	     * minLength
	     *
	     * @description
	     * > A string instance is valid against this keyword if its length is
	     * > greater than, or equal to, the value of this keyword. The length of
	     * > a string instance is defined as the number of its characters as
	     * > defined by RFC 4627 [RFC4627].
	     * > JSON Schema Validation Section 5.2.2
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'minLength',
	    value: function minLength() {
	      var minLength = this.schema.minLength,
	          address = this.address;
	
	
	      return '\n        // ' + address + ' validate minLength\n        if (Array.from(value).length < ' + minLength + ') {\n          valid = false\n          errors.push({\n            keyword: \'minLength\',\n            message: \'too short\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * maxLength
	     *
	     * @description
	     * > A string instance is valid against this keyword if its length is less
	     * > than, or equal to, the value of this keyword. The length of a string
	     * > instance is defined as the number of its characters as defined by
	     * > RFC 4627 [RFC4627].
	     * > JSON Schema Validation Section 5.2.1
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'maxLength',
	    value: function maxLength() {
	      var maxLength = this.schema.maxLength,
	          address = this.address;
	
	
	      return '\n        // ' + address + ' validate maxLength\n        if (Array.from(value).length > ' + maxLength + ') {\n          valid = false\n          errors.push({\n            keyword: \'maxLength\',\n            message: \'too long\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * Pattern
	     *
	     * @description
	     * > A string instance is considered valid if the regular expression
	     * > matches the instance successfully.
	     * > JSON Schema Validation Section 5.2.3
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'pattern',
	    value: function pattern() {
	      var pattern = this.schema.pattern,
	          address = this.address;
	
	
	      if (pattern) {
	        return '\n          // ' + address + ' validate pattern\n          if (!value.match(new RegExp(\'' + pattern + '\'))) {\n            valid = false\n            errors.push({\n              keyword: \'pattern\',\n              message: \'does not match the required pattern\'\n            })\n          }\n      ';
	      }
	    }
	
	    /**
	     * Format
	     *
	     * @description
	     * > Structural validation alone may be insufficient to validate that
	     * > an instance meets all the requirements of an application. The
	     * > "format" keyword is defined to allow interoperable semantic
	     * > validation for a fixed subset of values which are accurately
	     * > described by authoritative resources, be they RFCs or other
	     * > external specifications.
	     * > JSON Schema Validation Section 7.1
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'format',
	    value: function format() {
	      var format = this.schema.format,
	          address = this.address;
	
	      var matcher = formats.resolve(format);
	
	      if (matcher) {
	        return '\n      // ' + address + ' validate format\n      if (!value.match(' + matcher + ')) {\n        valid = false\n        errors.push({\n          keyword: \'format\',\n          message: \'is not "' + format + '" format\'\n        })\n      }\n      ';
	      }
	    }
	
	    /**
	     * Minimum
	     *
	     * @description
	     * > Successful validation depends on the presence and value of
	     * > "exclusiveMinimum": if "exclusiveMinimum" is not present, or has
	     * > boolean value false, then the instance is valid if it is greater
	     * > than, or equal to, the value of "minimum"; if "exclusiveMinimum" is
	     * > present and has boolean value true, the instance is valid if it is
	     * > strictly greater than the value of "minimum".
	     * > JSON Schema Validation Section 5.1.3
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'minimum',
	    value: function minimum() {
	      var _schema3 = this.schema,
	          minimum = _schema3.minimum,
	          exclusiveMinimum = _schema3.exclusiveMinimum,
	          address = this.address;
	
	      var operator = exclusiveMinimum === true ? '<=' : '<';
	
	      return '\n        // ' + address + ' validate minimum\n        if (value ' + operator + ' ' + minimum + ') {\n          valid = false\n          errors.push({\n            keyword: \'minimum\',\n            message: \'too small\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * Maximum
	     *
	     * @description
	     * > Successful validation depends on the presence and value of
	     * > "exclusiveMaximum": if "exclusiveMaximum" is not present, or has
	     * > boolean value false, then the instance is valid if it is lower than,
	     * > or equal to, the value of "maximum"; if "exclusiveMaximum" has
	     * > boolean value true, the instance is valid if it is strictly lower
	     * > than the value of "maximum".
	     * > JSON Schema Validation Section 5.1.2
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'maximum',
	    value: function maximum() {
	      var _schema4 = this.schema,
	          maximum = _schema4.maximum,
	          exclusiveMaximum = _schema4.exclusiveMaximum,
	          address = this.address;
	
	      var operator = exclusiveMaximum === true ? '>=' : '>';
	
	      return '\n        // ' + address + ' validate maximum\n        if (value ' + operator + ' ' + maximum + ') {\n          valid = false\n          errors.push({\n            keyword: \'maximum\',\n            message: \'too large\'\n          })\n        }\n    ';
	    }
	
	    /**
	     * multipleOf
	     *
	     * @description
	     * > A numeric instance is valid against "multipleOf" if the result of
	     * > the division of the instance by this keyword's value is an integer.
	     * > JSON Schema Validation Section 5.1.1
	     *
	     * @returns {string}
	     */
	
	  }, {
	    key: 'multipleOf',
	    value: function multipleOf() {
	      var multipleOf = this.schema.multipleOf;
	
	      var block = '';
	
	      if (typeof multipleOf === 'number') {
	        var length = multipleOf.toString().length;
	        var decimals = length - multipleOf.toFixed(0).length - 1;
	        var pow = decimals > 0 ? Math.pow(10, decimals) : 1;
	        var condition = void 0;
	
	        if (decimals > 0) {
	          condition = '(value * ' + pow + ') % ' + multipleOf * pow + ' !== 0';
	        } else {
	          condition = 'value % ' + multipleOf + ' !== 0';
	        }
	
	        block += '\n        if (' + condition + ') {\n          valid = false\n          errors.push({\n            keyword: \'multipleOf\',\n            message: \'must be a multiple of ' + multipleOf + '\'\n          })\n        }\n      ';
	      }
	
	      return block;
	    }
	  }]);
	
	  return Validator;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = Validator;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * @module JSON Object Signing and Encryption (JOSE)
	 */
	var JWA = __webpack_require__(23);
	var JWK = __webpack_require__(41);
	var JWKSet = __webpack_require__(44);
	var JWT = __webpack_require__(46);
	var JWS = __webpack_require__(51);
	var Base64URLSchema = __webpack_require__(48);
	var JOSEHeaderSchema = __webpack_require__(50);
	var JWKSchema = __webpack_require__(42);
	var JWKSetSchema = __webpack_require__(45);
	var JWTClaimsSetSchema = __webpack_require__(49);
	var JWTSchema = __webpack_require__(47);
	
	/**
	 * Export
	 */
	module.exports = {
	  JWA: JWA,
	  JWK: JWK,
	  JWKSet: JWKSet,
	  JWT: JWT,
	  JWS: JWS,
	  Base64URLSchema: Base64URLSchema,
	  JOSEHeaderSchema: JOSEHeaderSchema,
	  JWKSchema: JWKSchema,
	  JWKSetSchema: JWKSetSchema,
	  JWTClaimsSetSchema: JWTClaimsSetSchema,
	  JWTSchema: JWTSchema
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Dependencies
	 *
	 * TODO
	 * - switch between Node.js webcrypto package and browser implementation
	 */
	var base64url = __webpack_require__(24);
	var supportedAlgorithms = __webpack_require__(31);
	
	var _require = __webpack_require__(39),
	    NotSupportedError = _require.NotSupportedError;
	
	/**
	 * JWA
	 * https://tools.ietf.org/html/rfc7518
	 */
	
	
	var JWA = function () {
	  function JWA() {
	    _classCallCheck(this, JWA);
	  }
	
	  _createClass(JWA, null, [{
	    key: 'sign',
	
	
	    /**
	     * Sign
	     *
	     * @description
	     * Create a digital signature.
	     *
	     * @param {string} alg
	     * @param {CryptoKey} key
	     * @param {string|Buffer} data
	     *
	     * @return {Promise}
	     */
	    value: function sign(alg, key, data) {
	      // normalize the algorithm
	      var normalizedAlgorithm = supportedAlgorithms.normalize('sign', alg);
	
	      // validate algorithm is supported
	      if (normalizedAlgorithm instanceof Error) {
	        return Promise.reject(new NotSupportedError(alg));
	      }
	
	      // validate type of key
	      // TODO
	      //  - is the key suitable for the algorithm?
	      //  - does that get validated in webcrypto?
	      //if (key instanceof CryptoKey) {
	      //  return Promise.reject(new InvalidKeyError())
	      //}
	
	      // sign the data
	      return normalizedAlgorithm.sign(key, data);
	    }
	
	    /**
	     * Verify
	     *
	     * @description
	     * Verify a digital signature.
	     *
	     * @param {string} alg
	     * @param {CryptoKey} privateKey
	     * @param {string|Buffer} signature
	     * @param {string|Buffer} data
	     *
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'verify',
	    value: function verify(alg, key, signature, data) {
	      var normalizedAlgorithm = supportedAlgorithms.normalize('verify', alg);
	
	      if (normalizedAlgorithm instanceof Error) {
	        return Promise.reject(new NotSupportedError(alg));
	      }
	
	      // TODO
	      // validate publicKey
	
	      // verify the signature
	      return normalizedAlgorithm.verify(key, signature, data);
	    }
	
	    /**
	     * Encrypt
	     */
	
	    /**
	     * Decrypt
	     */
	
	    /**
	     * Import
	     */
	
	  }, {
	    key: 'importKey',
	    value: function importKey(key) {
	      var normalizedAlgorithm = supportedAlgorithms.normalize('importKey', key.alg);
	      return normalizedAlgorithm.importKey(key);
	    }
	  }]);
	
	  return JWA;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = JWA;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25).default;
	module.exports.default = module.exports;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";
	var pad_string_1 = __webpack_require__(30);
	function encode(input, encoding) {
	    if (encoding === void 0) { encoding = "utf8"; }
	    if (Buffer.isBuffer(input)) {
	        return fromBase64(input.toString("base64"));
	    }
	    return fromBase64(new Buffer(input, encoding).toString("base64"));
	}
	;
	function decode(base64url, encoding) {
	    if (encoding === void 0) { encoding = "utf8"; }
	    return new Buffer(toBase64(base64url), "base64").toString(encoding);
	}
	function toBase64(base64url) {
	    base64url = base64url.toString();
	    return pad_string_1.default(base64url)
	        .replace(/\-/g, "+")
	        .replace(/_/g, "/");
	}
	function fromBase64(base64) {
	    return base64
	        .replace(/=/g, "")
	        .replace(/\+/g, "-")
	        .replace(/\//g, "_");
	}
	function toBuffer(base64url) {
	    return new Buffer(toBase64(base64url), "base64");
	}
	var base64url = encode;
	base64url.encode = encode;
	base64url.decode = decode;
	base64url.toBase64 = toBase64;
	base64url.fromBase64 = fromBase64;
	base64url.toBuffer = toBuffer;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = base64url;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(27)
	var ieee754 = __webpack_require__(28)
	var isArray = __webpack_require__(29)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return (b64.length * 3 / 4) - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr((len * 3 / 4) - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0; i < l; i += 4) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";
	function padString(input) {
	    var segmentLength = 4;
	    var stringLength = input.length;
	    var diff = stringLength % segmentLength;
	    if (!diff) {
	        return input;
	    }
	    var position = stringLength;
	    var padLength = segmentLength - diff;
	    var paddedStringLength = stringLength + padLength;
	    var buffer = new Buffer(paddedStringLength);
	    buffer.write(input);
	    while (padLength--) {
	        buffer.write("=", position++);
	    }
	    return buffer.toString();
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = padString;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	var HMAC = __webpack_require__(32);
	var RSASSA_PKCS1_v1_5 = __webpack_require__(36);
	var SupportedAlgorithms = __webpack_require__(37);
	
	/**
	 * Register Supported Algorithms
	 */
	var supportedAlgorithms = new SupportedAlgorithms();
	
	/**
	 * Sign
	 */
	supportedAlgorithms.define('HS256', 'sign', new HMAC({
	  name: 'HMAC',
	  hash: {
	    name: 'SHA-256'
	  }
	}));
	
	supportedAlgorithms.define('HS384', 'sign', new HMAC({
	  name: 'HMAC',
	  hash: {
	    name: 'SHA-384'
	  }
	}));
	
	supportedAlgorithms.define('HS512', 'sign', new HMAC({
	  name: 'HMAC',
	  hash: {
	    name: 'SHA-512'
	  }
	}));
	
	supportedAlgorithms.define('RS256', 'sign', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-256'
	  }
	}));
	
	supportedAlgorithms.define('RS384', 'sign', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-384'
	  }
	}));
	
	supportedAlgorithms.define('RS512', 'sign', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-512'
	  }
	}));
	//supportedAlgorithms.define('ES256', 'sign', {})
	//supportedAlgorithms.define('ES384', 'sign', {})
	//supportedAlgorithms.define('ES512', 'sign', {})
	//supportedAlgorithms.define('PS256', 'sign', {})
	//supportedAlgorithms.define('PS384', 'sign', {})
	//supportedAlgorithms.define('PS512', 'sign', {})
	supportedAlgorithms.define('none', 'sign', {});
	
	/**
	 * Verify
	 */
	supportedAlgorithms.define('HS256', 'verify', new HMAC({
	  name: 'HMAC',
	  hash: {
	    name: 'SHA-256'
	  }
	}));
	
	supportedAlgorithms.define('HS384', 'verify', new HMAC({
	  name: 'HMAC',
	  hash: {
	    name: 'SHA-384'
	  }
	}));
	
	supportedAlgorithms.define('HS512', 'verify', new HMAC({
	  name: 'HMAC',
	  hash: {
	    name: 'SHA-512'
	  }
	}));
	
	supportedAlgorithms.define('RS256', 'verify', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-256'
	  }
	}));
	
	supportedAlgorithms.define('RS384', 'verify', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-384'
	  }
	}));
	
	supportedAlgorithms.define('RS512', 'verify', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-512'
	  }
	}));
	//supportedAlgorithms.define('ES256', 'verify', {})
	//supportedAlgorithms.define('ES384', 'verify', {})
	//supportedAlgorithms.define('ES512', 'verify', {})
	//supportedAlgorithms.define('PS256', 'verify', {})
	//supportedAlgorithms.define('PS384', 'verify', {})
	//supportedAlgorithms.define('PS512', 'verify', {})
	supportedAlgorithms.define('none', 'verify', {});
	
	supportedAlgorithms.define('RS256', 'importKey', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-256'
	  }
	}));
	
	supportedAlgorithms.define('RS384', 'importKey', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-384'
	  }
	}));
	
	supportedAlgorithms.define('RS512', 'importKey', new RSASSA_PKCS1_v1_5({
	  name: 'RSASSA-PKCS1-v1_5',
	  hash: {
	    name: 'SHA-512'
	  }
	}));
	
	/**
	 * Export
	 */
	module.exports = supportedAlgorithms;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	/**
	 * Dependencies
	 * @ignore
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var base64url = __webpack_require__(24);
	var crypto = __webpack_require__(33);
	var TextEncoder = __webpack_require__(34);
	
	/**
	 * HMAC with SHA-2 Functions
	 */
	
	var HMAC = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {string} bitlength
	   */
	  function HMAC(params) {
	    _classCallCheck(this, HMAC);
	
	    this.params = params;
	  }
	
	  /**
	   * Sign
	   *
	   * @description
	   * Generate a hash-based message authentication code for a
	   * given input and key. Enforce the key length is equal to
	   * or greater than the bitlength.
	   *
	   * @param {CryptoKey} key
	   * @param {string} data
	   *
	   * @returns {string}
	   */
	
	
	  _createClass(HMAC, [{
	    key: 'sign',
	    value: function sign(key, data) {
	      var algorithm = this.params;
	
	      // TODO: validate key length
	
	      data = new TextEncoder().encode(data);
	
	      return crypto.subtle.sign(algorithm, key, data).then(function (signature) {
	        return base64url(Buffer.from(signature));
	      });
	    }
	
	    /**
	     * Verify
	     *
	     * @description
	     * Verify a digital signature for a given input and private key.
	     *
	     * @param {CryptoKey} key
	     * @param {string} signature
	     * @param {string} data
	     *
	     * @returns {Boolean}
	     */
	
	  }, {
	    key: 'verify',
	    value: function verify(key, signature, data) {
	      var algorithm = this.params;
	
	      if (typeof signature === 'string') {
	        signature = Uint8Array.from(base64url.toBuffer(signature));
	      }
	
	      if (typeof data === 'string') {
	        data = new TextEncoder().encode(data);
	      }
	
	      return crypto.subtle.verify(algorithm, key, signature, data);
	    }
	
	    /**
	     * Assert Sufficient Key Length
	     *
	     * @description Assert that the key length is sufficient
	     * @param {string} key
	     */
	
	  }, {
	    key: 'assertSufficientKeyLength',
	    value: function assertSufficientKeyLength(key) {
	      if (key.length < this.bitlength) {
	        throw new Error('The key is too short.');
	      }
	    }
	  }]);
	
	  return HMAC;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = HMAC;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = crypto;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var TextEncoder = global.TextEncoder ? global.TextEncoder // browser
	: __webpack_require__(35).TextEncoder; // node shim
	module.exports = TextEncoder;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = TextEncoder;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	/**
	 * Dependencies
	 * @ignore
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var base64url = __webpack_require__(24);
	var crypto = __webpack_require__(33);
	var TextEncoder = __webpack_require__(34);
	
	/**
	 * RSASSA-PKCS1-v1_5
	 */
	
	var RSASSA_PKCS1_v1_5 = function () {
	
	  /**
	   * constructor
	   *
	   * @param {string} bitlength
	   */
	  function RSASSA_PKCS1_v1_5(params) {
	    _classCallCheck(this, RSASSA_PKCS1_v1_5);
	
	    this.params = params;
	  }
	
	  /**
	   * sign
	   *
	   * @description
	   * Generate a digital signature for a given input and private key.
	   *
	   * @param {CryptoKey} key
	   * @param {BufferSource} data
	   *
	   * @returns {Promise}
	   */
	
	
	  _createClass(RSASSA_PKCS1_v1_5, [{
	    key: 'sign',
	    value: function sign(key, data) {
	      var algorithm = this.params;
	
	      // TODO
	      //if (!this.sufficientKeySize()) {
	      //  return Promise.reject(
	      //    new Error(
	      //      'A key size of 2048 bits or larger must be used with RSASSA-PKCS1-v1_5'
	      //    )
	      //  )
	      //}
	
	      data = new TextEncoder().encode(data);
	
	      return crypto.subtle.sign(algorithm, key, data).then(function (signature) {
	        return base64url(Buffer.from(signature));
	      });
	    }
	
	    /**
	     * verify
	     *
	     * @description
	     * Verify a digital signature for a given input and private key.
	     *
	     * @param {CryptoKey} key
	     * @param {BufferSource} signature
	     * @param {BufferSource} data
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'verify',
	    value: function verify(key, signature, data) {
	      var algorithm = this.params;
	
	      if (typeof signature === 'string') {
	        signature = Uint8Array.from(base64url.toBuffer(signature));
	      }
	
	      if (typeof data === 'string') {
	        data = new TextEncoder().encode(data);
	      }
	      // ...
	
	      return crypto.subtle.verify(algorithm, key, signature, data);
	    }
	
	    /**
	     * importKey
	     *
	     * @param {JWK} key
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'importKey',
	    value: function importKey(key) {
	      var jwk = Object.assign({}, key);
	      var algorithm = this.params;
	      var usages = key['key_ops'] || [];
	
	      if (key.use === 'sig') {
	        usages.push('verify');
	      }
	
	      if (key.use === 'enc') {
	        // TODO: handle encryption keys
	        return Promise.resolve(key);
	      }
	
	      if (key.key_ops) {
	        usages = key.key_ops;
	      }
	
	      return crypto.subtle.importKey('jwk', jwk, algorithm, true, usages).then(function (cryptoKey) {
	        Object.defineProperty(jwk, 'cryptoKey', {
	          enumerable: false,
	          value: cryptoKey
	        });
	
	        return jwk;
	      });
	    }
	  }]);
	
	  return RSASSA_PKCS1_v1_5;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = RSASSA_PKCS1_v1_5;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Dependencies
	 */
	var NotSupportedError = __webpack_require__(38);
	
	/**
	 * Operations
	 */
	var operations = ['sign', 'verify', 'encrypt', 'decrypt', 'importKey'];
	
	/**
	 * SupportedAlgorithms
	 */
	
	var SupportedAlgorithms = function () {
	
	  /**
	   * constructor
	   */
	  function SupportedAlgorithms() {
	    var _this = this;
	
	    _classCallCheck(this, SupportedAlgorithms);
	
	    operations.forEach(function (op) {
	      _this[op] = {};
	    });
	  }
	
	  /**
	   * Supported Operations
	   */
	
	
	  _createClass(SupportedAlgorithms, [{
	    key: 'define',
	
	
	    /**
	     * define
	     *
	     * @description
	     * Register Web Crypto API algorithm parameter for an algorithm
	     * and operation.
	     *
	     * @param {string} alg
	     * @param {string} op
	     * @param {Object} argument
	     */
	    value: function define(alg, op, argument) {
	      var registeredAlgorithms = this[op];
	      registeredAlgorithms[alg] = argument;
	    }
	
	    /**
	     * normalize
	     *
	     * @description
	     * Map JWA alg name to Web Crypto API algorithm parameter
	     *
	     * @param {string} op
	     * @param {Object} alg
	     *
	     * @returns {Object}
	     */
	
	  }, {
	    key: 'normalize',
	    value: function normalize(op, alg) {
	      var registeredAlgorithms = this[op];
	
	      if (!registeredAlgorithms) {
	        return new SyntaxError(); // what kind of error should this be?
	      }
	
	      var argument = registeredAlgorithms[alg];
	
	      if (!argument) {
	        return new NotSupportedError(alg);
	      }
	
	      return argument;
	    }
	  }], [{
	    key: 'operations',
	    get: function get() {
	      return operations;
	    }
	  }]);
	
	  return SupportedAlgorithms;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = SupportedAlgorithms;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * NotSupportedError
	 */
	var NotSupportedError = function (_Error) {
	  _inherits(NotSupportedError, _Error);
	
	  function NotSupportedError(alg) {
	    _classCallCheck(this, NotSupportedError);
	
	    var _this = _possibleConstructorReturn(this, (NotSupportedError.__proto__ || Object.getPrototypeOf(NotSupportedError)).call(this));
	
	    _this.message = alg + " is not a supported algorithm";
	    return _this;
	  }
	
	  return NotSupportedError;
	}(Error);
	
	/**
	 * Export
	 */
	
	
	module.exports = NotSupportedError;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  DataError: __webpack_require__(40),
	  NotSupportedError: __webpack_require__(38)
	};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * DataError
	 */
	var DataError = function (_Error) {
	  _inherits(DataError, _Error);
	
	  function DataError(message) {
	    _classCallCheck(this, DataError);
	
	    return _possibleConstructorReturn(this, (DataError.__proto__ || Object.getPrototypeOf(DataError)).call(this, message));
	  }
	
	  return DataError;
	}(Error);
	
	/**
	 * Export
	 */
	
	
	module.exports = DataError;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 * @ignore
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _require = __webpack_require__(13),
	    JSONDocument = _require.JSONDocument;
	
	var JWKSchema = __webpack_require__(42);
	var JWA = __webpack_require__(23);
	
	/**
	 * JWK Class
	 */
	
	var JWK = function (_JSONDocument) {
	  _inherits(JWK, _JSONDocument);
	
	  function JWK() {
	    _classCallCheck(this, JWK);
	
	    return _possibleConstructorReturn(this, (JWK.__proto__ || Object.getPrototypeOf(JWK)).apply(this, arguments));
	  }
	
	  _createClass(JWK, null, [{
	    key: 'importKey',
	
	
	    /**
	     * importKey
	     *
	     * TODO:
	     * - should this be on JWA?
	     */
	    value: function importKey(jwk) {
	      return JWA.importKey(jwk);
	    }
	  }, {
	    key: 'schema',
	
	
	    /**
	     * Schema
	     */
	    get: function get() {
	      return JWKSchema;
	    }
	  }]);
	
	  return JWK;
	}(JSONDocument);
	
	/**
	 * Export
	 */
	
	
	module.exports = JWK;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 * @ignore
	 */
	
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	var _require2 = __webpack_require__(43),
	    BASE64_REGEXP = _require2.BASE64_REGEXP;
	
	/**
	 * JWK Schema
	 */
	
	
	var JWKSchema = new JSONSchema({
	  type: 'object',
	  properties: {
	
	    kty: {
	      type: 'string',
	      //format: 'case-sensitive',
	      enum: ['RSA', 'EC', 'oct'] // other values MAY be used
	    },
	
	    use: {
	      type: 'string',
	      //format: 'case-sensitive',
	      enum: ['sig', 'enc'] // other values MAY be used
	    },
	
	    key_ops: {
	      type: 'array',
	      //format: 'case-sensitive',
	      enum: ['sign', 'verify', 'encrypt', 'decrypt', 'wrapKey', 'unwrapKey', 'deriveKey', 'deriveBits'] // other values MAY be used
	    },
	
	    alg: {
	      type: 'string',
	      //format: 'case-sensitive',
	      enum: ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'PS256', 'PS384', 'PS512', 'none'] // other values MAY be used
	    },
	
	    kid: {
	      type: 'string'
	    },
	
	    x5u: {
	      type: 'string'
	    },
	
	    x5c: {
	      type: 'array'
	    },
	
	    x5t: {
	      type: 'string'
	    }
	
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = JWKSchema;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Package dependencies
	 */
	var _require = __webpack_require__(13),
	    Formats = _require.Formats;
	
	/**
	 * Format extensions
	 */
	
	
	Formats.register('StringOrURI', new RegExp());
	Formats.register('NumericDate', new RegExp());
	Formats.register('URI', new RegExp());
	Formats.register('url', new RegExp());
	Formats.register('base64', new RegExp());
	Formats.register('base64url', new RegExp());
	Formats.register('MediaType', new RegExp());

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _require = __webpack_require__(13),
	    JSONDocument = _require.JSONDocument;
	
	var JWKSetSchema = __webpack_require__(45);
	var JWK = __webpack_require__(41);
	
	/**
	 * JWKSet
	 *
	 * @class
	 * JWKSet represents a JSON Web Key Set as described in Section 5 of RFC 7517:
	 * https://tools.ietf.org/html/rfc7517#section-5
	 */
	
	var JWKSet = function (_JSONDocument) {
	  _inherits(JWKSet, _JSONDocument);
	
	  function JWKSet() {
	    _classCallCheck(this, JWKSet);
	
	    return _possibleConstructorReturn(this, (JWKSet.__proto__ || Object.getPrototypeOf(JWKSet)).apply(this, arguments));
	  }
	
	  _createClass(JWKSet, null, [{
	    key: 'importKeys',
	
	
	    /**
	     * importKeys
	     */
	    value: function importKeys(jwks) {
	      var _this2 = this;
	
	      var imported = void 0;
	
	      return Promise.resolve().then(function () {
	        var validation = _this2.schema.validate(jwks);
	
	        // TODO: fix
	        validation.valid = true;
	
	        if (!validation.valid) {
	          throw new Error('Invalid JWKSet: ' + JSON.stringify(validation, null, 2));
	        }
	
	        if (!jwks.keys) {
	          throw new Error('Cannot import JWKSet: keys property is empty');
	        }
	
	        imported = new JWKSet(jwks);
	        var importing = jwks.keys.map(function (key) {
	          return JWK.importKey(key);
	        });
	
	        return Promise.all(importing);
	      }).then(function (keys) {
	        imported.keys = keys;
	        return imported;
	      });
	    }
	  }, {
	    key: 'schema',
	
	
	    /**
	     * schema
	     */
	    get: function get() {
	      return JWKSetSchema;
	    }
	  }]);
	
	  return JWKSet;
	}(JSONDocument);
	
	/**
	 * Export
	 */
	
	
	module.exports = JWKSet;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	var JWKSchema = __webpack_require__(42);
	
	/**
	 * JWKSetSchema
	 */
	var JWKSetSchema = new JSONSchema({
	  type: 'object',
	  properties: {
	    keys: {
	      type: 'array',
	      items: JWKSchema
	    }
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = JWKSetSchema;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Dependencies
	 */
	var base64url = __webpack_require__(24);
	
	var _require = __webpack_require__(13),
	    JSONDocument = _require.JSONDocument;
	
	var JWTSchema = __webpack_require__(47);
	var JWS = __webpack_require__(51);
	var DataError = __webpack_require__(40);
	
	/**
	 * JWT
	 */
	
	var JWT = function (_JSONDocument) {
	  _inherits(JWT, _JSONDocument);
	
	  function JWT() {
	    _classCallCheck(this, JWT);
	
	    return _possibleConstructorReturn(this, (JWT.__proto__ || Object.getPrototypeOf(JWT)).apply(this, arguments));
	  }
	
	  _createClass(JWT, [{
	    key: 'isJWE',
	
	
	    /**
	     * isJWE
	     */
	    value: function isJWE() {
	      return !!this.header.enc;
	    }
	
	    /**
	     * resolveKeys
	     */
	
	  }, {
	    key: 'resolveKeys',
	    value: function resolveKeys(jwks) {
	      var kid = this.header.kid;
	      var keys = void 0,
	          match = void 0;
	
	      // treat an array as the "keys" property of a JWK Set
	      if (Array.isArray(jwks)) {
	        keys = jwks;
	      }
	
	      // presence of keys indicates object is a JWK Set
	      if (jwks.keys) {
	        keys = jwks.keys;
	      }
	
	      // wrap a plain object they is not a JWK Set in Array
	      if (!jwks.keys && (typeof jwks === 'undefined' ? 'undefined' : _typeof(jwks)) === 'object') {
	        keys = [jwks];
	      }
	
	      // ensure there are keys to search
	      if (!keys) {
	        throw new DataError('Invalid JWK argument');
	      }
	
	      // match by "kid" or "use" header
	      if (kid) {
	        match = keys.find(function (jwk) {
	          return jwk.kid === kid;
	        });
	      } else {
	        match = keys.find(function (jwk) {
	          return jwk.use === 'sig';
	        });
	      }
	
	      // assign matching key to JWT and return a boolean
	      if (match) {
	        this.key = match.cryptoKey;
	        return true;
	      } else {
	        return false;
	      }
	    }
	
	    /**
	     * encode
	     *
	     * @description
	     * Encode a JWT instance
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'encode',
	    value: function encode() {
	      // validate
	      var validation = this.validate();
	
	      if (!validation.valid) {
	        return Promise.reject(validation);
	      }
	
	      var token = this;
	
	      if (this.isJWE()) {
	        return JWE.encrypt(token);
	      } else {
	        return JWS.sign(token);
	      }
	    }
	
	    /**
	     * verify
	     *
	     * @description
	     * Verify a decoded JWT instance
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'verify',
	    value: function verify() {
	      var validation = this.validate();
	
	      if (!validation.valid) {
	        return Promise.reject(validation);
	      }
	
	      return JWS.verify(this);
	    }
	  }], [{
	    key: 'decode',
	
	
	    /**
	     * decode
	     *
	     * @description
	     * Decode a JSON Web Token
	     *
	     * @param {string} data
	     * @returns {JWT}
	     */
	    value: function decode(data) {
	      var ExtendedJWT = this;
	      var jwt = void 0;
	
	      if (typeof data !== 'string') {
	        throw new DataError('JWT must be a string');
	      }
	
	      // JSON of Flattened JSON Serialization
	      if (data.startsWith('{')) {
	        try {
	          data = JSON.parse(data, function () {});
	        } catch (error) {
	          throw new DataError('Invalid JWT serialization');
	        }
	
	        if (data.signatures || data.recipients) {
	          data.serialization = 'json';
	        } else {
	          data.serialization = 'flattened';
	        }
	
	        jwt = new ExtendedJWT(data);
	
	        // Compact Serialization
	      } else {
	        try {
	          var serialization = 'compact';
	          var segments = data.split('.');
	          var length = segments.length;
	
	          if (length !== 3 && length !== 5) {
	            throw new Error('Malformed JWT');
	          }
	
	          var header = JSON.parse(base64url.decode(segments[0]));
	
	          // JSON Web Signature
	          if (length === 3) {
	            var type = 'JWS';
	            var payload = JSON.parse(base64url.decode(segments[1]));
	            var signature = segments[2];
	
	            jwt = new ExtendedJWT({ type: type, segments: segments, header: header, payload: payload, signature: signature, serialization: serialization });
	          }
	
	          // JSON Web Encryption
	          if (length === 5) {
	            //let type = 'JWE'
	            //let [protected, encryption_key, iv, ciphertext, tag] = segments
	
	            //jwt = new ExtendedJWT({
	            //  type,
	            //  protected: base64url.decode(JSON.parse(protected)),
	            //  encryption_key,
	            //  iv,
	            //  ciphertext,
	            //  tag,
	            //  serialization
	            //})
	          }
	        } catch (error) {
	          throw new DataError('Invalid JWT compact serialization');
	        }
	      }
	
	      return jwt;
	    }
	
	    /**
	     * encode
	     *
	     * @description
	     * Encode a JSON Web Token
	     *
	     * @param {Object} header
	     * @param {Object} payload
	     * @param {CryptoKey} key
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'encode',
	    value: function encode(header, payload, key) {
	      var jwt = new JWT(header, payload);
	      return jwt.encode(key);
	    }
	
	    /**
	     * verify
	     *
	     * @description
	     *
	     * @param {CryptoKey} key
	     * @param {string} token
	     *
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'verify',
	    value: function verify(key, token) {
	      var jwt = JWT.decode(token);
	      jwt.key = key;
	      return jwt.verify().then(function (verified) {
	        return jwt;
	      });
	    }
	  }, {
	    key: 'schema',
	
	
	    /**
	     * schema
	     */
	    get: function get() {
	      return JWTSchema;
	    }
	  }]);
	
	  return JWT;
	}(JSONDocument);
	
	/**
	 * Export
	 */
	
	
	module.exports = JWT;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	var Base64URLSchema = __webpack_require__(48);
	var JWTClaimsSetSchema = __webpack_require__(49);
	var JOSEHeaderSchema = __webpack_require__(50);
	
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	/**
	 * JWTSchema
	 *
	 * @description
	 * This schema represents all the things a deserialized JWT can be, i.e.,
	 * either a JWS or JWE, and any serialization of them. Validation of well-
	 * formedness for a given serialization is accomplished at the time of
	 * encoding.
	 */
	
	
	var JWTSchema = new JSONSchema({
	  type: 'object',
	  properties: {
	
	    /**
	     * type
	     */
	    type: {
	      type: 'string',
	      enum: ['JWS', 'JWE']
	    },
	
	    /**
	     * segments
	     */
	    segments: {
	      type: 'array'
	    },
	
	    /**
	     * header
	     */
	    header: JOSEHeaderSchema,
	
	    /**
	     * protected
	     */
	    protected: JOSEHeaderSchema,
	
	    /**
	     * unprotected
	     */
	    unprotected: JOSEHeaderSchema,
	
	    /**
	     * iv
	     */
	    iv: Base64URLSchema,
	
	    /**
	     * aad
	     */
	    aad: Base64URLSchema,
	
	    /**
	     * ciphertext
	     */
	    ciphertext: Base64URLSchema,
	
	    /**
	     * tag
	     */
	    tag: Base64URLSchema,
	
	    /**
	     * recipients
	     */
	    recipients: {
	      type: 'array',
	      items: {
	        type: 'object',
	        properties: {
	          header: JOSEHeaderSchema,
	          encrypted_key: Base64URLSchema
	        }
	      }
	    },
	
	    /**
	     * payload
	     */
	    payload: JWTClaimsSetSchema,
	
	    /**
	     * signatures
	     */
	    signatures: {
	      type: 'array',
	      items: {
	        type: 'object',
	        properties: {
	          protected: JOSEHeaderSchema,
	          header: JOSEHeaderSchema,
	          signature: Base64URLSchema,
	          key: { type: 'object' }
	        }
	      }
	    },
	
	    /**
	     * signature
	     */
	    signature: Base64URLSchema,
	
	    /**
	     * verified
	     */
	    verified: {
	      type: 'boolean',
	      default: false
	    },
	
	    /**
	     * key
	     */
	    key: {
	      type: 'object'
	    },
	
	    /**
	     * serialization
	     */
	    serialization: {
	      type: 'string',
	      enum: ['compact', 'json', 'flattened'],
	      default: 'compact'
	    }
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = JWTSchema;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	/**
	 * Base64URLSchema
	 */
	
	
	var Base64URLSchema = new JSONSchema({
	  type: 'string',
	  format: 'base64url'
	});
	
	/**
	 * Export
	 */
	module.exports = Base64URLSchema;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	/**
	 * JWTClaimsSetSchema
	 *
	 * JSON Web Token (JWT)
	 * https://tools.ietf.org/html/rfc7519#section-4
	 *
	 * 4.  JWT Claims
	 *
	 *   The JWT Claims Set represents a JSON object whose members are the
	 *   claims conveyed by the JWT.  The Claim Names within a JWT Claims Set
	 *   MUST be unique; JWT parsers MUST either reject JWTs with duplicate
	 *   Claim Names or use a JSON parser that returns only the lexically last
	 *   duplicate member name, as specified in Section 15.12 ("The JSON
	 *   Object") of ECMAScript 5.1 [ECMAScript].
	 *
	 *   The set of claims that a JWT must contain to be considered valid is
	 *   context dependent and is outside the scope of this specification.
	 *   Specific applications of JWTs will require implementations to
	 *   understand and process some claims in particular ways.  However, in
	 *   the absence of such requirements, all claims that are not understood
	 *   by implementations MUST be ignored.
	 *
	 *   There are three classes of JWT Claim Names: Registered Claim Names,
	 *   Public Claim Names, and Private Claim Names.
	 */
	
	
	var JWTClaimsSetSchema = new JSONSchema({
	  properties: {
	
	    /**
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1
	     *
	     * 4.1.  Registered Claim Names
	     *
	     *   The following Claim Names are registered in the IANA "JSON Web Token
	     *   Claims" registry established by Section 10.1.  None of the claims
	     *   defined below are intended to be mandatory to use or implement in all
	     *   cases, but rather they provide a starting point for a set of useful,
	     *   interoperable claims.  Applications using JWTs should define which
	     *   specific claims they use and when they are required or optional.  All
	     *   the names are short because a core goal of JWTs is for the
	     *   representation to be compact.
	     */
	
	    /**
	     * iss
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.1
	     *
	     * 4.1.1.  "iss" (Issuer) Claim
	     *
	     *   The "iss" (issuer) claim identifies the principal that issued the
	     *   JWT.  The processing of this claim is generally application specific.
	     *   The "iss" value is a case-sensitive string containing a StringOrURI
	     *   value.  Use of this claim is OPTIONAL.
	     */
	    iss: {
	      type: 'string',
	      format: 'StringOrURI'
	    },
	
	    /**
	     * sub
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.2
	     *
	     * 4.1.2.  "sub" (Subject) Claim
	     *
	     *   The "sub" (subject) claim identifies the principal that is the
	     *   subject of the JWT.  The claims in a JWT are normally statements
	     *   about the subject.  The subject value MUST either be scoped to be
	     *   locally unique in the context of the issuer or be globally unique.
	     *   The processing of this claim is generally application specific.  The
	     *   "sub" value is a case-sensitive string containing a StringOrURI
	     *   value.  Use of this claim is OPTIONAL.
	     */
	    sub: {
	      type: 'string',
	      format: 'StringOrURI'
	    },
	
	    /**
	     * aud
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.3
	     *
	     * 4.1.3.  "aud" (Audience) Claim
	     *
	     *   The "aud" (audience) claim identifies the recipients that the JWT is
	     *   intended for.  Each principal intended to process the JWT MUST
	     *   identify itself with a value in the audience claim.  If the principal
	     *   processing the claim does not identify itself with a value in the
	     *   "aud" claim when this claim is present, then the JWT MUST be
	     *   rejected.  In the general case, the "aud" value is an array of case-
	     *   sensitive strings, each containing a StringOrURI value.  In the
	     *   special case when the JWT has one audience, the "aud" value MAY be a
	     *   single case-sensitive string containing a StringOrURI value.  The
	     *   interpretation of audience values is generally application specific.
	     *   Use of this claim is OPTIONAL.
	     */
	    aud: {
	      type: ['array', 'string'],
	      format: 'StringOrURI',
	      items: {
	        format: 'StringOrURI'
	      }
	    },
	
	    /**
	     * exp
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.4
	     *
	     * 4.1.4.  "exp" (Expiration Time) Claim
	     *
	     *   The "exp" (expiration time) claim identifies the expiration time on
	     *   or after which the JWT MUST NOT be accepted for processing.  The
	     *   processing of the "exp" claim requires that the current date/time
	     *   MUST be before the expiration date/time listed in the "exp" claim.
	     *
	     *   Implementers MAY provide for some small leeway, usually no more than
	     *   a few minutes, to account for clock skew.  Its value MUST be a number
	     *   containing a NumericDate value.  Use of this claim is OPTIONAL.
	     *
	     */
	    exp: {
	      type: 'number',
	      format: 'NumericDate'
	    },
	
	    /**
	     * nbf
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.5
	     *
	     * 4.1.5.  "nbf" (Not Before) Claim
	     *
	     *   The "nbf" (not before) claim identifies the time before which the JWT
	     *   MUST NOT be accepted for processing.  The processing of the "nbf"
	     *   claim requires that the current date/time MUST be after or equal to
	     *   the not-before date/time listed in the "nbf" claim.  Implementers MAY
	     *   provide for some small leeway, usually no more than a few minutes, to
	     *   account for clock skew.  Its value MUST be a number containing a
	     *   NumericDate value.  Use of this claim is OPTIONAL.
	     */
	    nbf: {
	      type: 'number',
	      format: 'NumericDate'
	    },
	
	    /**
	     * iat
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.6
	     *
	     * 4.1.6.  "iat" (Issued At) Claim
	     *
	     *   The "iat" (issued at) claim identifies the time at which the JWT was
	     *   issued.  This claim can be used to determine the age of the JWT.  Its
	     *   value MUST be a number containing a NumericDate value.  Use of this
	     *   claim is OPTIONAL.
	     */
	    iat: {
	      type: 'number',
	      format: 'NumericDate'
	    },
	
	    /**
	     * jti
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-4.1.7
	     *
	     * 4.1.7.  "jti" (JWT ID) Claim
	     *
	     *   The "jti" (JWT ID) claim provides a unique identifier for the JWT.
	     *   The identifier value MUST be assigned in a manner that ensures that
	     *   there is a negligible probability that the same value will be
	     *   accidentally assigned to a different data object; if the application
	     *   uses multiple issuers, collisions MUST be prevented among values
	     *   produced by different issuers as well.  The "jti" claim can be used
	     *   to prevent the JWT from being replayed.  The "jti" value is a case-
	     *   sensitive string.  Use of this claim is OPTIONAL.
	     */
	    jti: {
	      type: 'string'
	    }
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = JWTClaimsSetSchema;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	var JWKSchema = __webpack_require__(42);
	
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	/**
	 * JOSEHeaderSchema
	 *
	 * JSON Web Token (JWT)
	 * https://tools.ietf.org/html/rfc7519#section-5
	 *
	 * 5.  JOSE Header
	 *
	 *   For a JWT object, the members of the JSON object represented by the
	 *   JOSE Header describe the cryptographic operations applied to the JWT
	 *   and optionally, additional properties of the JWT.  Depending upon
	 *   whether the JWT is a JWS or JWE, the corresponding rules for the JOSE
	 *   Header values apply.
	 */
	
	
	var JOSEHeaderSchema = new JSONSchema({
	  type: 'object',
	  properties: {
	
	    /**
	     * typ
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-5.1
	     *
	     * 5.1.  "typ" (Type) Header Parameter
	     *
	     *   The "typ" (type) Header Parameter defined by [JWS] and [JWE] is used
	     *   by JWT applications to declare the media type [IANA.MediaTypes] of
	     *   this complete JWT.  This is intended for use by the JWT application
	     *   when values that are not JWTs could also be present in an application
	     *   data structure that can contain a JWT object; the application can use
	     *   this value to disambiguate among the different kinds of objects that
	     *   might be present.  It will typically not be used by applications when
	     *   it is already known that the object is a JWT.  This parameter is
	     *   ignored by JWT implementations; any processing of this parameter is
	     *   performed by the JWT application.  If present, it is RECOMMENDED that
	     *   its value be "JWT" to indicate that this object is a JWT.  While
	     *   media type names are not case sensitive, it is RECOMMENDED that "JWT"
	     *   always be spelled using uppercase characters for compatibility with
	     *   legacy implementations.  Use of this Header Parameter is OPTIONAL.
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.9
	     *
	     * 4.1.9.  "typ" (Type) Header Parameter
	     *
	     *   The "typ" (type) Header Parameter is used by JWS applications to
	     *   declare the media type [IANA.MediaTypes] of this complete JWS.  This
	     *   is intended for use by the application when more than one kind of
	     *   object could be present in an application data structure that can
	     *   contain a JWS; the application can use this value to disambiguate
	     *   among the different kinds of objects that might be present.  It will
	     *   typically not be used by applications when the kind of object is
	     *   already known.  This parameter is ignored by JWS implementations; any
	     *   processing of this parameter is performed by the JWS application.
	     *   Use of this Header Parameter is OPTIONAL.
	     *
	     *   Per RFC 2045 [RFC2045], all media type values, subtype values, and
	     *   parameter names are case insensitive.  However, parameter values are
	     *   case sensitive unless otherwise specified for the specific parameter.
	     *
	     *   To keep messages compact in common situations, it is RECOMMENDED that
	     *   producers omit an "application/" prefix of a media type value in a
	     *   "typ" Header Parameter when no other '/' appears in the media type
	     *   value.  A recipient using the media type value MUST treat it as if
	     *   "application/" were prepended to any "typ" value not containing a
	     *   '/'.  For instance, a "typ" value of "example" SHOULD be used to
	     *   represent the "application/example" media type, whereas the media
	     *   type "application/example;part="1/2"" cannot be shortened to
	     *   "example;part="1/2"".
	     *
	     *   The "typ" value "JOSE" can be used by applications to indicate that
	     *   this object is a JWS or JWE using the JWS Compact Serialization or
	     *   the JWE Compact Serialization.  The "typ" value "JOSE+JSON" can be
	     *   used by applications to indicate that this object is a JWS or JWE
	     *   using the JWS JSON Serialization or the JWE JSON Serialization.
	     *   Other type values can also be used by applications.
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.11
	     *
	     * 4.1.11.  "typ" (Type) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "typ" Header Parameter defined in Section 4.1.9 of [JWS], except
	     *   that the type is that of this complete JWE.
	     */
	    typ: {
	      type: 'string'
	    },
	
	    /**
	     * cty
	     *
	     * JSON Web Token (JWT)
	     * https://tools.ietf.org/html/rfc7519#section-5.2
	     *
	     * 5.2.  "cty" (Content Type) Header Parameter
	     *
	     *   The "cty" (content type) Header Parameter defined by [JWS] and [JWE]
	     *   is used by this specification to convey structural information about
	     *   the JWT.
	     *
	     *   In the normal case in which nested signing or encryption operations
	     *   are not employed, the use of this Header Parameter is NOT
	     *   RECOMMENDED.  In the case that nested signing or encryption is
	     *   employed, this Header Parameter MUST be present; in this case, the
	     *   value MUST be "JWT", to indicate that a Nested JWT is carried in this
	     *   JWT.  While media type names are not case sensitive, it is
	     *   RECOMMENDED that "JWT" always be spelled using uppercase characters
	     *   for compatibility with legacy implementations.  See Appendix A.2 for
	     *   an example of a Nested JWT.
	     *
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.10
	     *
	     * 4.1.10.  "cty" (Content Type) Header Parameter
	     *
	     *   The "cty" (content type) Header Parameter is used by JWS applications
	     *   to declare the media type [IANA.MediaTypes] of the secured content
	     *   (the payload).  This is intended for use by the application when more
	     *   than one kind of object could be present in the JWS Payload; the
	     *   application can use this value to disambiguate among the different
	     *   kinds of objects that might be present.  It will typically not be
	     *   used by applications when the kind of object is already known.  This
	     *   parameter is ignored by JWS implementations; any processing of this
	     *   parameter is performed by the JWS application.  Use of this Header
	     *   Parameter is OPTIONAL.
	     *
	     *   Per RFC 2045 [RFC2045], all media type values, subtype values, and
	     *   parameter names are case insensitive.  However, parameter values are
	     *   case sensitive unless otherwise specified for the specific parameter.
	     *
	     *   To keep messages compact in common situations, it is RECOMMENDED that
	     *   producers omit an "application/" prefix of a media type value in a
	     *   "cty" Header Parameter when no other '/' appears in the media type
	     *   value.  A recipient using the media type value MUST treat it as if
	     *   "application/" were prepended to any "cty" value not containing a
	     *   '/'.  For instance, a "cty" value of "example" SHOULD be used to
	     *   represent the "application/example" media type, whereas the media
	     *   type "application/example;part="1/2"" cannot be shortened to
	     *   "example;part="1/2"".
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.12
	     *
	     * 4.1.12.  "cty" (Content Type) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "cty" Header Parameter defined in Section 4.1.10 of [JWS], except
	     *   that the type is that of the secured content (the plaintext).
	     */
	    cty: {
	      type: 'string',
	      enum: ['JWT']
	    },
	
	    /**
	     * alg
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.1
	     *
	     * 4.1.1.  "alg" (Algorithm) Header Parameter
	     *
	     *   The "alg" (algorithm) Header Parameter identifies the cryptographic
	     *   algorithm used to secure the JWS.  The JWS Signature value is not
	     *   valid if the "alg" value does not represent a supported algorithm or
	     *   if there is not a key for use with that algorithm associated with the
	     *   party that digitally signed or MACed the content.  "alg" values
	     *   should either be registered in the IANA "JSON Web Signature and
	     *   Encryption Algorithms" registry established by [JWA] or be a value
	     *   that contains a Collision-Resistant Name.  The "alg" value is a case-
	     *   sensitive ASCII string containing a StringOrURI value.  This Header
	     *   Parameter MUST be present and MUST be understood and processed by
	     *   implementations.
	     *
	     *   A list of defined "alg" values for this use can be found in the IANA
	     *   "JSON Web Signature and Encryption Algorithms" registry established
	     *   by [JWA]; the initial contents of this registry are the values
	     *   defined in Section 3.1 of [JWA].
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.1
	     *
	     * 4.1.1.  "alg" (Algorithm) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "alg" Header Parameter defined in Section 4.1.1 of [JWS], except
	     *   that the Header Parameter identifies the cryptographic algorithm used
	     *   to encrypt or determine the value of the CEK.  The encrypted content
	     *   is not usable if the "alg" value does not represent a supported
	     *   algorithm, or if the recipient does not have a key that can be used
	     *   with that algorithm.
	     *
	     *   A list of defined "alg" values for this use can be found in the IANA
	     *   "JSON Web Signature and Encryption Algorithms" registry established
	     *   by [JWA]; the initial contents of this registry are the values
	     *   defined in Section 4.1 of [JWA].
	     */
	    alg: {
	      type: 'string',
	      format: 'StringOrURI'
	    },
	
	    /**
	     * jku
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.2
	     *
	     * 4.1.2.  "jku" (JWK Set URL) Header Parameter (JWS)
	     *
	     *   The "jku" (JWK Set URL) Header Parameter is a URI [RFC3986] that
	     *   refers to a resource for a set of JSON-encoded public keys, one of
	     *   which corresponds to the key used to digitally sign the JWS.  The
	     *   keys MUST be encoded as a JWK Set [JWK].  The protocol used to
	     *   acquire the resource MUST provide integrity protection; an HTTP GET
	     *   request to retrieve the JWK Set MUST use Transport Layer Security
	     *   (TLS) [RFC2818] [RFC5246]; and the identity of the server MUST be
	     *   validated, as per Section 6 of RFC 6125 [RFC6125].  Also, see
	     *   Section 8 on TLS requirements.  Use of this Header Parameter is
	     *   OPTIONAL.
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.4
	     *
	     * 4.1.4.  "jku" (JWK Set URL) Header Parameter (JWE)
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "jku" Header Parameter defined in Section 4.1.2 of [JWS], except
	     *   that the JWK Set resource contains the public key to which the JWE
	     *   was encrypted; this can be used to determine the private key needed
	     *   to decrypt the JWE.
	     */
	    jku: {
	      type: 'string',
	      format: 'URI'
	    },
	
	    /**
	     * jwk
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.3
	     *
	     * 4.1.3.  "jwk" (JSON Web Key) Header Parameter
	     *
	     *   The "jwk" (JSON Web Key) Header Parameter is the public key that
	     *   corresponds to the key used to digitally sign the JWS.  This key is
	     *   represented as a JSON Web Key [JWK].  Use of this Header Parameter is
	     *   OPTIONAL.
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.5
	     *
	     * 4.1.5.  "jwk" (JSON Web Key) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "jwk" Header Parameter defined in Section 4.1.3 of [JWS], except
	     *   that the key is the public key to which the JWE was encrypted; this
	     *   can be used to determine the private key needed to decrypt the JWE.
	     */
	    //jwk: JWKSchema,
	
	    /**
	     * kid
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.4
	     *
	     * 4.1.4.  "kid" (Key ID) Header Parameter
	     *
	     *   The "kid" (key ID) Header Parameter is a hint indicating which key
	     *   was used to secure the JWS.  This parameter allows originators to
	     *   explicitly signal a change of key to recipients.  The structure of
	     *   the "kid" value is unspecified.  Its value MUST be a case-sensitive
	     *   string.  Use of this Header Parameter is OPTIONAL.
	     *
	     *   When used with a JWK, the "kid" value is used to match a JWK "kid"
	     *   parameter value.
	     *
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.6
	     *
	     * 4.1.6.  "kid" (Key ID) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "kid" Header Parameter defined in Section 4.1.4 of [JWS], except
	     *   that the key hint references the public key to which the JWE was
	     *   encrypted; this can be used to determine the private key needed to
	     *   decrypt the JWE.  This parameter allows originators to explicitly
	     *   signal a change of key to JWE recipients.
	     */
	    kid: {
	      type: 'string'
	    },
	
	    /**
	     * x5u
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.5
	     *
	     * 4.1.5.  "x5u" (X.509 URL) Header Parameter
	     *
	     *   The "x5u" (X.509 URL) Header Parameter is a URI [RFC3986] that refers
	     *   to a resource for the X.509 public key certificate or certificate
	     *   chain [RFC5280] corresponding to the key used to digitally sign the
	     *   JWS.  The identified resource MUST provide a representation of the
	     *   certificate or certificate chain that conforms to RFC 5280 [RFC5280]
	     *   in PEM-encoded form, with each certificate delimited as specified in
	     *   Section 6.1 of RFC 4945 [RFC4945].  The certificate containing the
	     *   public key corresponding to the key used to digitally sign the JWS
	     *   MUST be the first certificate.  This MAY be followed by additional
	     *   certificates, with each subsequent certificate being the one used to
	     *   certify the previous one.  The protocol used to acquire the resource
	     *   MUST provide integrity protection; an HTTP GET request to retrieve
	     *   the certificate MUST use TLS [RFC2818] [RFC5246]; and the identity of
	     *   the server MUST be validated, as per Section 6 of RFC 6125 [RFC6125].
	     *   Also, see Section 8 on TLS requirements.  Use of this Header
	     *   Parameter is OPTIONAL.
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.7
	     *
	     * 4.1.7.  "x5u" (X.509 URL) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "x5u" Header Parameter defined in Section 4.1.5 of [JWS], except
	     *   that the X.509 public key certificate or certificate chain [RFC5280]
	     *   contains the public key to which the JWE was encrypted; this can be
	     *   used to determine the private key needed to decrypt the JWE.
	     */
	    x5u: {
	      type: 'string',
	      format: 'URI'
	    },
	
	    /**
	     * x5c
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.6
	     *
	     * 4.1.6.  "x5c" (X.509 Certificate Chain) Header Parameter
	     *
	     *   The "x5c" (X.509 certificate chain) Header Parameter contains the
	     *   X.509 public key certificate or certificate chain [RFC5280]
	     *   corresponding to the key used to digitally sign the JWS.  The
	     *   certificate or certificate chain is represented as a JSON array of
	     *   certificate value strings.  Each string in the array is a
	     *   base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER
	     *   [ITU.X690.2008] PKIX certificate value.  The certificate containing
	     *   the public key corresponding to the key used to digitally sign the
	     *   JWS MUST be the first certificate.  This MAY be followed by
	     *   additional certificates, with each subsequent certificate being the
	     *   one used to certify the previous one.  The recipient MUST validate
	     *   the certificate chain according to RFC 5280 [RFC5280] and consider
	     *   the certificate or certificate chain to be invalid if any validation
	     *   failure occurs.  Use of this Header Parameter is OPTIONAL.
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.8
	     *
	     * 4.1.8.  "x5c" (X.509 Certificate Chain) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "x5c" Header Parameter defined in Section 4.1.6 of [JWS], except
	     *   that the X.509 public key certificate or certificate chain [RFC5280]
	     *   contains the public key to which the JWE was encrypted; this can be
	     *   used to determine the private key needed to decrypt the JWE.
	     */
	    x5c: {
	      type: 'array',
	      items: {
	        type: 'string',
	        format: 'base64'
	      }
	    },
	
	    /**
	     * x5t
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.7
	     *
	     * 4.1.7.  "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter
	     *
	     *   The "x5t" (X.509 certificate SHA-1 thumbprint) Header Parameter is a
	     *   base64url-encoded SHA-1 thumbprint (a.k.a. digest) of the DER
	     *   encoding of the X.509 certificate [RFC5280] corresponding to the key
	     *   used to digitally sign the JWS.  Note that certificate thumbprints
	     *   are also sometimes known as certificate fingerprints.  Use of this
	     *   Header Parameter is OPTIONAL.
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.9
	     *
	     * 4.1.9.  "x5t" (X.509 Certificate SHA-1 Thumbprint) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "x5t" Header Parameter defined in Section 4.1.7 of [JWS], except
	     *   that the certificate referenced by the thumbprint contains the public
	     *   key to which the JWE was encrypted; this can be used to determine the
	     *   private key needed to decrypt the JWE.  Note that certificate
	     *   thumbprints are also sometimes known as certificate fingerprints.
	     */
	    x5t: {
	      type: 'string',
	      format: 'base64url'
	    },
	
	    /**
	     * x5t#S256
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.8
	     *
	     * 4.1.8.  "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Header
	     *         Parameter
	     *
	     *   The "x5t#S256" (X.509 certificate SHA-256 thumbprint) Header
	     *   Parameter is a base64url-encoded SHA-256 thumbprint (a.k.a. digest)
	     *   of the DER encoding of the X.509 certificate [RFC5280] corresponding
	     *   to the key used to digitally sign the JWS.  Note that certificate
	     *   thumbprints are also sometimes known as certificate fingerprints.
	     *   Use of this Header Parameter is OPTIONAL.
	     *
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.10
	     *
	     * 4.1.10.  "x5t#S256" (X.509 Certificate SHA-256 Thumbprint) Header
	     *          Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "x5t#S256" Header Parameter defined in Section 4.1.8 of [JWS],
	     *   except that the certificate referenced by the thumbprint contains the
	     *   public key to which the JWE was encrypted; this can be used to
	     *   determine the private key needed to decrypt the JWE.  Note that
	     *   certificate thumbprints are also sometimes known as certificate
	     *   fingerprints.
	     */
	    //'x5t#S256': {
	    //  type: 'string',
	    //  format: 'base64url'
	    //},
	
	    /**
	     * crit
	     *
	     * JSON Web Signature (JWS)
	     * https://tools.ietf.org/html/rfc7515#section-4.1.11
	     *
	     * 4.1.11.  "crit" (Critical) Header Parameter
	     *
	     *   The "crit" (critical) Header Parameter indicates that extensions to
	     *   this specification and/or [JWA] are being used that MUST be
	     *   understood and processed.  Its value is an array listing the Header
	     *   Parameter names present in the JOSE Header that use those extensions.
	     *   If any of the listed extension Header Parameters are not understood
	     *   and supported by the recipient, then the JWS is invalid.  Producers
	     *   MUST NOT include Header Parameter names defined by this specification
	     *   or [JWA] for use with JWS, duplicate names, or names that do not
	     *   occur as Header Parameter names within the JOSE Header in the "crit"
	     *   list.  Producers MUST NOT use the empty list "[]" as the "crit"
	     *   value.  Recipients MAY consider the JWS to be invalid if the critical
	     *   list contains any Header Parameter names defined by this
	     *   specification or [JWA] for use with JWS or if any other constraints
	     *   on its use are violated.  When used, this Header Parameter MUST be
	     *   integrity protected; therefore, it MUST occur only within the JWS
	     *   Protected Header.  Use of this Header Parameter is OPTIONAL.  This
	     *   Header Parameter MUST be understood and processed by implementations.
	     *
	     *   An example use, along with a hypothetical "exp" (expiration time)
	     *   field is:
	     *
	     *     {"alg":"ES256",
	     *     "crit":["exp"],
	     *     "exp":1363284000
	     *     }
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.13
	     *
	     *   4.1.13.  "crit" (Critical) Header Parameter
	     *
	     *   This parameter has the same meaning, syntax, and processing rules as
	     *   the "crit" Header Parameter defined in Section 4.1.11 of [JWS],
	     *   except that Header Parameters for a JWE are being referred to, rather
	     *   than Header Parameters for a JWS.
	     */
	    crit: {
	      type: 'array',
	      items: {
	        type: 'string'
	      },
	      minItems: 1
	    },
	
	    /**
	     * enc
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.2
	     *
	     * 4.1.2.  "enc" (Encryption Algorithm) Header Parameter
	     *
	     *   The "enc" (encryption algorithm) Header Parameter identifies the
	     *   content encryption algorithm used to perform authenticated encryption
	     *   on the plaintext to produce the ciphertext and the Authentication
	     *   Tag.  This algorithm MUST be an AEAD algorithm with a specified key
	     *   length.  The encrypted content is not usable if the "enc" value does
	     *   not represent a supported algorithm.  "enc" values should either be
	     *   registered in the IANA "JSON Web Signature and Encryption Algorithms"
	     *   registry established by [JWA] or be a value that contains a
	     *   Collision-Resistant Name.  The "enc" value is a case-sensitive ASCII
	     *   string containing a StringOrURI value.  This Header Parameter MUST be
	     *   present and MUST be understood and processed by implementations.
	     *
	     *   A list of defined "enc" values for this use can be found in the IANA
	     *   "JSON Web Signature and Encryption Algorithms" registry established
	     *   by [JWA]; the initial contents of this registry are the values
	     *   defined in Section 5.1 of [JWA].
	     */
	    enc: {
	      type: 'string',
	      format: 'StringOrURI'
	    },
	
	    /**
	     * zip
	     *
	     * JSON Web Encryption (JWE)
	     * https://tools.ietf.org/html/rfc7516#section-4.1.3
	     *
	     * 4.1.3.  "zip" (Compression Algorithm) Header Parameter
	     *
	     *   The "zip" (compression algorithm) applied to the plaintext before
	     *   encryption, if any.  The "zip" value defined by this specification
	     *   is:
	     *
	     *   o  "DEF" - Compression with the DEFLATE [RFC1951] algorithm
	     *
	     *   Other values MAY be used.  Compression algorithm values can be
	     *   registered in the IANA "JSON Web Encryption Compression Algorithms"
	     *   registry established by [JWA].  The "zip" value is a case-sensitive
	     *   string.  If no "zip" parameter is present, no compression is applied
	     *   to the plaintext before encryption.  When used, this Header Parameter
	     *   MUST be integrity protected; therefore, it MUST occur only within the
	     *   JWE Protected Header.  Use of this Header Parameter is OPTIONAL.
	     *   This Header Parameter MUST be understood and processed by
	     *   implementations.
	     */
	    zip: {
	      type: 'string'
	    }
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = JOSEHeaderSchema;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Dependencies
	 */
	var base64url = __webpack_require__(24);
	var JWA = __webpack_require__(23);
	
	var _require = __webpack_require__(39),
	    DataError = _require.DataError;
	
	/**
	 * JWS
	 */
	
	
	var JWS = function () {
	  function JWS() {
	    _classCallCheck(this, JWS);
	  }
	
	  _createClass(JWS, null, [{
	    key: 'sign',
	
	
	    /**
	     * sign
	     *
	     * @description
	     * Encode a JWT instance
	     *
	     * @param {Object} token
	     * @returns {Promise}
	     */
	    value: function sign(token) {
	      var payload = base64url(JSON.stringify(token.payload));
	
	      // compact serialization
	      if (token.serialization === 'compact') {
	        var key = token.key,
	            alg = token.header.alg;
	
	        var header = base64url(JSON.stringify(token.header));
	        var data = header + '.' + payload;
	
	        return JWA.sign(alg, key, data).then(function (signature) {
	          return data + '.' + signature;
	        });
	      }
	
	      // JSON serialization
	      if (token.serialization === 'json') {}
	
	      // Flattened serialization
	      if (token.serialization === 'flattened') {}
	
	      return Promise.reject(new DataError('Unsupported serialization'));
	    }
	
	    /**
	     * verify
	     */
	
	  }, {
	    key: 'verify',
	    value: function verify(jwt) {
	      // multiple signatures
	      if (jwt.signatures) {}
	      // ...
	
	
	      // one signature
	      if (jwt.signature) {
	        var _jwt$segments = _slicedToArray(jwt.segments, 2),
	            header = _jwt$segments[0],
	            payload = _jwt$segments[1];
	
	        var data = header + '.' + payload;
	        var key = jwt.key,
	            signature = jwt.signature,
	            alg = jwt.header.alg;
	
	
	        return JWA.verify(alg, key, signature, data).then(function (verified) {
	          jwt.verified = verified;
	          return verified;
	        });
	      }
	
	      // no signatures to verify
	      return Promise.reject(new DataError('Missing signature(s)'));
	    }
	  }]);
	
	  return JWS;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = JWS;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Dependencies
	 */
	var assert = __webpack_require__(7);
	var base64url = __webpack_require__(24);
	var crypto = __webpack_require__(33);
	var FormUrlEncoded = __webpack_require__(53);
	var URL = __webpack_require__(54);
	
	/**
	 * Authentication Request
	 */
	
	var AuthenticationRequest = function () {
	  function AuthenticationRequest() {
	    _classCallCheck(this, AuthenticationRequest);
	  }
	
	  _createClass(AuthenticationRequest, null, [{
	    key: 'create',
	
	
	    /**
	     * create
	     *
	     * @description
	     * Create a new authentication request with generated state and nonce,
	     * validate presence of required parameters, serialize the request data and
	     * persist it to the session, and return a promise for an authentication
	     * request URI.
	     *
	     * @param {RelyingParty} rp – instance of RelyingParty
	     * @param {Object} options - optional request parameters
	     * @param {Object} session – reference to localStorage or other session object
	     *
	     * @returns {Promise}
	     */
	    value: function create(rp, options, session) {
	      return new Promise(function (resolve, reject) {
	        var provider = rp.provider,
	            defaults = rp.defaults,
	            registration = rp.registration;
	
	        // validate presence of OP configuration, RP client registration,
	        // and default parameters
	
	        assert(provider.configuration, 'RelyingParty provider OpenID Configuration is missing');
	
	        assert(defaults.authenticate, 'RelyingParty default authentication parameters are missing');
	
	        assert(registration, 'RelyingParty client registration is missing');
	
	        // define basic elements of the request
	        var issuer = provider.configuration.issuer;
	        var endpoint = provider.configuration.authorization_endpoint;
	        var client = { client_id: registration.client_id };
	        var params = Object.assign(defaults.authenticate, client, options);
	
	        // validate presence of required configuration and parameters
	        assert(issuer, 'Missing issuer in provider OpenID Configuration');
	
	        assert(endpoint, 'Missing authorization_endpoint in provider OpenID Configuration');
	
	        assert(params.scope, 'Missing scope parameter in authentication request');
	
	        assert(params.response_type, 'Missing response_type parameter in authentication request');
	
	        assert(params.client_id, 'Missing client_id parameter in authentication request');
	
	        assert(params.redirect_uri, 'Missing redirect_uri parameter in authentication request');
	
	        // generate state and nonce random octets
	        params.state = Array.from(crypto.getRandomValues(new Uint8Array(16)));
	        params.nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)));
	
	        // hash the state and nonce parameter values
	        return Promise.all([crypto.subtle.digest({ name: 'SHA-256' }, new Uint8Array(params.state)), crypto.subtle.digest({ name: 'SHA-256' }, new Uint8Array(params.nonce))])
	
	        // serialize the request with original values, store in session by
	        // encoded state param, and replace state/nonce octets with encoded
	        // digests
	        .then(function (digests) {
	          var state = base64url(Buffer.from(digests[0]));
	          var nonce = base64url(Buffer.from(digests[1]));
	          var key = issuer + '/requestHistory/' + state;
	
	          // store the request params for response validation
	          // with serialized octet values for state and nonce
	          session[key] = JSON.stringify(params);
	
	          // replace state and nonce octets with base64url encoded digests
	          params.state = state;
	          params.nonce = nonce;
	        })
	
	        // optionally encode a JWT with the request parameters
	        .then(function () {
	          // TODO
	          // optionally encode the request parameters as a JWT
	          // and replace params with `{ request: <jwt> }`
	        })
	
	        // render the request URI and terminate the algorithm
	        .then(function () {
	          var url = new URL(endpoint);
	          url.search = FormUrlEncoded.encode(params);
	          resolve(url.href);
	        });
	      });
	    }
	  }]);
	
	  return AuthenticationRequest;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = AuthenticationRequest;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Dependencies
	 */
	
	/**
	 * FormUrlEncoded
	 */
	var FormUrlEncoded = function () {
	  function FormUrlEncoded() {
	    _classCallCheck(this, FormUrlEncoded);
	  }
	
	  _createClass(FormUrlEncoded, null, [{
	    key: 'encode',
	
	
	    /**
	     * Encode
	     *
	     * @description
	     * Represent an object as x-www-form-urlencoded string.
	     *
	     * @param {Object} data
	     * @returns {string}
	     */
	    value: function encode(data) {
	      var pairs = [];
	
	      Object.keys(data).forEach(function (key) {
	        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	      });
	
	      return pairs.join('&');
	    }
	
	    /**
	     * Decode
	     *
	     * @description
	     * Parse a x-www-form-urlencoded into an object.
	     *
	     * @param {string} data
	     * @returns {Object}
	     */
	
	  }, {
	    key: 'decode',
	    value: function decode(data) {
	      var obj = {};
	
	      data.split('&').forEach(function (property) {
	        var pair = property.split('=');
	        var key = decodeURIComponent(pair[0]);
	        var val = decodeURIComponent(pair[1]);
	
	        obj[key] = val;
	      });
	
	      return obj;
	    }
	  }]);
	
	  return FormUrlEncoded;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = FormUrlEncoded;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = URL;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Dependencies
	 */
	var URL = __webpack_require__(54);
	var assert = __webpack_require__(7);
	var crypto = __webpack_require__(33);
	var base64url = __webpack_require__(24);
	var fetch = __webpack_require__(12);
	var Headers = fetch.Headers ? fetch.Headers : global.Headers;
	var FormUrlEncoded = __webpack_require__(53);
	var IDToken = __webpack_require__(56);
	//const AccessToken = require('./AccessToken')
	
	/**
	 * AuthenticationResponse
	 */
	
	var AuthenticationResponse = function () {
	  function AuthenticationResponse() {
	    _classCallCheck(this, AuthenticationResponse);
	  }
	
	  _createClass(AuthenticationResponse, null, [{
	    key: 'validateResponse',
	
	
	    /**
	     * validateResponse
	     *
	     * @description
	     * Parses and validates the authentication response. If this is an
	     * Authorization Code workflow, this method also performs the exchange of
	     * the auth code for access and ID tokens.
	     *
	     * @param response {string|Object} A redirect URI or a request body
	     *
	     * @returns {Promise<Object>}
	     */
	    value: function validateResponse(response) {
	      return Promise.resolve(response).then(this.parseResponse).then(this.matchRequest).then(this.validateStateParam).then(this.errorResponse).then(this.validateResponseMode).then(this.validateResponseParams).then(this.exchangeAuthorizationCode).then(this.validateIDToken).then(function () {
	        // what kind of response object?
	        // instance of AuthenticationRequest?
	        return response;
	      });
	    }
	
	    /**
	     * parseResponse
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'parseResponse',
	    value: function parseResponse(response) {
	      var redirect = response.redirect,
	          body = response.body;
	
	      // response must be either a redirect uri or request body, but not both
	
	      if (redirect && body || !redirect && !body) {
	        throw new Error('Invalid response mode');
	      }
	
	      // parse redirect uri
	      if (redirect) {
	        var url = new URL(redirect);
	        var search = url.search,
	            hash = url.hash;
	
	
	        if (search && hash) {
	          throw new Error('Invalid response mode');
	        }
	
	        if (search) {
	          response.params = FormUrlEncoded.decode(search.substring(1));
	          response.mode = 'query';
	        }
	
	        if (hash) {
	          response.params = FormUrlEncoded.decode(hash.substring(1));
	          response.mode = 'fragment';
	        }
	      }
	
	      // parse request form body
	      if (body) {
	        response.params = FormUrlEncoded.decode(body);
	        response.mode = 'form_post';
	      }
	
	      return response;
	    }
	
	    /**
	     * matchRequest
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'matchRequest',
	    value: function matchRequest(response) {
	      var rp = response.rp,
	          params = response.params,
	          session = response.session;
	
	      var state = params.state;
	      var issuer = rp.provider.configuration.issuer;
	
	      if (!state) {
	        throw new Error('Missing state parameter in authentication response');
	      }
	
	      var key = issuer + '/requestHistory/' + state;
	      var request = session[key];
	
	      if (!request) {
	        throw new Error('Mismatching state parameter in authentication response');
	      }
	
	      response.request = JSON.parse(request);
	      return response;
	    }
	
	    /**
	     * validateStateParam
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateStateParam',
	    value: function validateStateParam(response) {
	      var octets = new Uint8Array(response.request.state);
	      var encoded = response.params.state;
	
	      return crypto.subtle.digest({ name: 'SHA-256' }, octets).then(function (digest) {
	        if (encoded !== base64url(Buffer.from(digest))) {
	          throw new Error('Mismatching state parameter in authentication response');
	        }
	
	        return response;
	      });
	    }
	
	    /**
	     * errorResponse
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'errorResponse',
	    value: function errorResponse(response) {
	      var error = response.params.error;
	
	      if (error) {
	        return Promise.reject(error);
	      }
	
	      return Promise.resolve(response);
	    }
	
	    /**
	     * validateResponseMode
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateResponseMode',
	    value: function validateResponseMode(response) {
	      if (response.request.response_type !== 'code' && response.mode === 'query') {
	        throw new Error('Invalid response mode');
	      }
	
	      return response;
	    }
	
	    /**
	     * validateResponseParams
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateResponseParams',
	    value: function validateResponseParams(response) {
	      var request = response.request,
	          params = response.params;
	
	      var expectedParams = request.response_type.split(' ');
	
	      if (expectedParams.includes('code')) {
	        assert(params.code, 'Missing authorization code in authentication response');
	        // TODO assert novelty of code
	      }
	
	      if (expectedParams.includes('id_token')) {
	        assert(params.id_token, 'Missing id_token in authentication response');
	      }
	
	      if (expectedParams.includes('token')) {
	        assert(params.access_token, 'Missing access_token in authentication response');
	
	        assert(params.token_type, 'Missing token_type in authentication response');
	      }
	
	      return response;
	    }
	
	    /**
	     * exchangeAuthorizationCode
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'exchangeAuthorizationCode',
	    value: function exchangeAuthorizationCode(response) {
	      var rp = response.rp,
	          params = response.params,
	          request = response.request;
	
	      var code = params.code;
	
	      // only exchange the authorization code when the response type is "code"
	      if (!code || request['response_type'] !== 'code') {
	        return Promise.resolve(response);
	      }
	
	      var provider = rp.provider,
	          registration = rp.registration;
	
	      var id = registration['client_id'];
	      var secret = registration['client_secret'];
	
	      // verify the client is not public
	      if (!secret) {
	        throw new AuthenticationError('Client cannot exchange authorization code because ' + 'it is not a confidential client');
	      }
	
	      // initialize token request arguments
	      var endpoint = provider.configuration.token_endpoint;
	      var method = 'POST';
	
	      // initialize headers
	      var headers = new Headers({
	        'Content-Type': 'application/x-www-form-urlencoded'
	      });
	
	      // initialize the token request parameters
	      var body = FormUrlEncoded.encode({
	        'grant_type': 'authorization_code',
	        'code': code,
	        'redirect_uri': request['redirect_uri']
	      });
	
	      // determine client authentication method
	      var authMethod = registration['token_endpoint_auth_method'] || 'client_secret_basic';
	
	      // client secret basic authentication
	      if (authMethod === 'client_secret_basic') {
	        var credentials = new Buffer(id + ':' + secret).toString('base64');
	        headers.set('Authorization', 'Basic ' + credentials);
	      }
	
	      // client secret post authentication
	      if (authMethod === 'client_secret_post') {
	        body['client_id'] = id;
	        body['client_secret'] = secret;
	      }
	
	      // TODO
	      // client_secret_jwt authentication
	      // private_key_jwt
	
	      // make the token request
	      return fetch(endpoint, { method: method, headers: headers, body: body }).then(function (tokenResponse) {
	        return tokenResponse.json();
	      }).then(function (tokenResponse) {
	        assert(tokenResponse['access_token'], 'Missing access_token in token response');
	
	        assert(tokenResponse['token_type'], 'Missing token_type in token response');
	
	        assert(tokenResponse['id_token'], 'Missing id_token in token response');
	
	        // anything else?
	
	        // IS THIS THE RIGHT THING TO DO HERE?
	        response.params = Object.assign(response.params, tokenResponse);
	        return response;
	      });
	    }
	
	    /**
	     * validateIDToken
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateIDToken',
	    value: function validateIDToken(response) {
	      var jwt = response.params.id_token;
	
	      // only validate the ID Token if present in the response
	      if (!jwt) {
	        return Promise.resolve(response);
	      }
	
	      var _response$rp = response.rp,
	          provider = _response$rp.provider,
	          registration = _response$rp.registration;
	      var configuration = provider.configuration,
	          jwks = provider.jwks;
	
	
	      return Promise.resolve(response).then(AuthenticationResponse.decryptIDToken).then(AuthenticationResponse.decodeIDToken).then(AuthenticationResponse.validateIssuer).then(AuthenticationResponse.validateAudience).then(AuthenticationResponse.resolveKeys).then(AuthenticationResponse.verifySignature).then(AuthenticationResponse.validateExpires).then(AuthenticationResponse.verifyNonce).then(AuthenticationResponse.validateACR).then(AuthenticationResponse.validateAuthTime).then(AuthenticationResponse.validateAccessTokenHash).then(AuthenticationResponse.validateCodeHash);
	    }
	
	    /**
	     * decryptIDToken
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'decryptIDToken',
	    value: function decryptIDToken(response) {
	      // TODO
	      return Promise.resolve(response);
	    }
	
	    /**
	     * decodeIDToken
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'decodeIDToken',
	    value: function decodeIDToken(response) {
	      var jwt = response.params.id_token;
	
	      if (jwt) {
	        response.decoded = IDToken.decode(jwt);
	      }
	
	      return response;
	    }
	
	    /**
	     * validateIssuer
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateIssuer',
	    value: function validateIssuer(response) {
	      var configuration = response.rp.provider.configuration;
	      var payload = response.decoded.payload;
	
	      // validate issuer of token matches this relying party's provider
	      if (payload.iss !== configuration.issuer) {
	        throw new Error('Mismatching issuer in ID Token');
	      }
	
	      return response;
	    }
	
	    /**
	     * validateAudience
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateAudience',
	    value: function validateAudience(response) {
	      var registration = response.rp.registration;
	      var _response$decoded$pay = response.decoded.payload,
	          aud = _response$decoded$pay.aud,
	          azp = _response$decoded$pay.azp;
	
	      // validate audience includes this relying party
	
	      if (typeof aud === 'string' && aud !== registration['client_id']) {
	        throw new Error('Mismatching audience in id_token');
	      }
	
	      // validate audience includes this relying party
	      if (Array.isArray(aud) && !aud.includes(registration['client_id'])) {
	        throw new Error('Mismatching audience in id_token');
	      }
	
	      // validate authorized party is present if required
	      if (Array.isArray(aud) && !azp) {
	        throw new Error('Missing azp claim in id_token');
	      }
	
	      // validate authorized party is this relying party
	      if (azp && azp !== registration['client_id']) {
	        throw new Error('Mismatching azp claim in id_token');
	      }
	
	      return response;
	    }
	
	    /**
	     * resolveKeys
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'resolveKeys',
	    value: function resolveKeys(response) {
	      var rp = response.rp;
	      var provider = rp.provider;
	      var jwks = provider.jwks;
	      var decoded = response.decoded;
	
	      //if (decoded.resolveKeys(jwks)) {
	      //  return Promise.resolve(response)
	      //}
	
	      return rp.jwks().then(function (jwks) {
	        if (decoded.resolveKeys(jwks)) {
	          return Promise.resolve(response);
	        } else {
	          throw new Error('Cannot resolve signing key for ID Token.');
	        }
	      });
	    }
	
	    /**
	     * verifySignature
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'verifySignature',
	    value: function verifySignature(response) {
	      var alg = response.decoded.header.alg;
	      var registration = response.rp.registration;
	      var expectedAlgorithm = registration['id_token_signed_response_alg'] || 'RS256';
	
	      // validate signing algorithm matches expectation
	      if (alg !== expectedAlgorithm) {
	        throw new Error('Expected ID Token to be signed with ' + expectedAlgorithm);
	      }
	
	      return response.decoded.verify().then(function (verified) {
	        if (!verified) {
	          throw new Error('Invalid ID Token signature');
	        }
	
	        return response;
	      });
	    }
	
	    /**
	     * validateExpires
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateExpires',
	    value: function validateExpires(response) {
	      var exp = response.decoded.payload.exp;
	
	      // validate expiration of token
	      if (exp <= Math.floor(Date.now() / 1000)) {
	        throw new Error('Expired ID Token');
	      }
	
	      return response;
	    }
	
	    /**
	     * verifyNonce
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'verifyNonce',
	    value: function verifyNonce(response) {
	      var octets = new Uint8Array(response.request.nonce);
	      var nonce = response.decoded.payload.nonce;
	
	      if (!nonce) {
	        throw new Error('Missing nonce in ID Token');
	      }
	
	      return crypto.subtle.digest({ name: 'SHA-256' }, octets).then(function (digest) {
	        if (nonce !== base64url(Buffer.from(digest))) {
	          throw new Error('Mismatching nonce in ID Token');
	        }
	
	        return response;
	      });
	    }
	
	    /**
	     * validateAcr
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateAcr',
	    value: function validateAcr(response) {
	      // TODO
	      return response;
	    }
	
	    /**
	     * validateAccessTokenHash
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateAccessTokenHash',
	    value: function validateAccessTokenHash(response) {
	      // TODO
	      return response;
	    }
	
	    /**
	     * validateAuthorizationCodeHash
	     *
	     * @param {Object} response
	     * @returns {Promise}
	     */
	
	  }, {
	    key: 'validateAuthorizationCodeHash',
	    value: function validateAuthorizationCodeHash(response) {
	      // TODO
	      return response;
	    }
	  }]);
	
	  return AuthenticationResponse;
	}();
	
	/**
	 * Export
	 */
	
	
	module.exports = AuthenticationResponse;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(26).Buffer))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Local dependencies
	 */
	var _require = __webpack_require__(22),
	    JWT = _require.JWT;
	
	var IDTokenSchema = __webpack_require__(57);
	
	/**
	 * IDToken
	 */
	
	var IDToken = function (_JWT) {
	  _inherits(IDToken, _JWT);
	
	  function IDToken() {
	    _classCallCheck(this, IDToken);
	
	    return _possibleConstructorReturn(this, (IDToken.__proto__ || Object.getPrototypeOf(IDToken)).apply(this, arguments));
	  }
	
	  _createClass(IDToken, null, [{
	    key: 'schema',
	
	
	    /**
	     * Schema
	     */
	    get: function get() {
	      return IDTokenSchema;
	    }
	  }]);
	
	  return IDToken;
	}(JWT);
	
	/**
	 * Export
	 */
	
	
	module.exports = IDToken;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	var _require = __webpack_require__(22),
	    JWTSchema = _require.JWTSchema;
	
	/**
	 * IDToken Schema
	 */
	
	
	var IDTokenSchema = JWTSchema.extend({
	  properties: {
	
	    /**
	     * header
	     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken
	     * ID Tokens SHOULD NOT use the JWS or JWE x5u, x5c, jku, or jwk Header
	     * Parameter fields. Instead, references to keys used are communicated in
	     * advance using Discovery and Registration parameters, per Section 10.
	     */
	    header: {
	      //not: { required: ['x5u', 'x5c', 'jku', 'jwk'] }
	    },
	
	    /**
	     * payload
	     */
	    payload: {
	      properties: {
	
	        /**
	         * iss
	         *
	         * REQUIRED. Issuer Identifier for the Issuer of the response.
	         * The iss value is a case sensitive URL using the https scheme
	         * that contains scheme, host, and optionally, port number and
	         * path components and no query or fragment components.
	         */
	        iss: { type: 'string', format: 'url' },
	
	        /**
	         * sub
	         *
	         * REQUIRED. Subject Identifier. A locally unique and never
	         * reassigned identifier within the Issuer for the End-User, which
	         * is intended to be consumed by the Client, e.g., 24400320 or
	         * AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4. It MUST NOT exceed 255
	         * ASCII characters in length. The sub value is a case sensitive
	         * string.
	         */
	        sub: { type: 'string', maxLength: 255 },
	
	        /**
	         * aud
	         *
	         * REQUIRED. Audience(s) that this ID Token is intended for. It
	         * MUST contain the OAuth 2.0 client_id of the Relying Party as an
	         * audience value. It MAY also contain identifiers for other audiences.
	         * In the general case, the aud value is an array of case sensitive
	         * strings. In the common special case when there is one audience,
	         * the aud value MAY be a single case sensitive string.
	         */
	        // inherited from JWTClaimsSetSchema
	
	        /**
	         * exp
	         *
	         * REQUIRED. Expiration time on or after which the ID Token MUST NOT
	         * be accepted for processing. The processing of this parameter
	         * requires that the current date/time MUST be before the expiration
	         * date/time listed in the value. Implementers MAY provide for some
	         * small leeway, usually no more than a few minutes, to account for
	         * clock skew. Its value is a JSON number representing the number of
	         * seconds from 1970-01-01T0:0:0Z as measured in UTC until the
	         * date/time. See RFC 3339 [RFC3339] for details regarding date/times
	         * in general and UTC in particular.
	         */
	        // inherited from JWTClaimsSetSchema
	
	        /**
	         * iat
	         *
	         * REQUIRED. Time at which the JWT was issued. Its value is a
	         * JSON number representing the number of seconds from
	         * 1970-01-01T0:0:0Z as measured in UTC until the date/time.
	         */
	        // inherited from JWTClaimsSetSchema
	
	        /**
	         * auth_time
	         *
	         * Time when the End-User authentication occurred. Its value is a
	         * JSON number representing the number of seconds from
	         * 1970-01-01T0:0:0Z as measured in UTC until the date/time. When a
	         * max_age request is made or when auth_time is requested as an
	         * Essential Claim, then this Claim is REQUIRED; otherwise, its
	         * inclusion is OPTIONAL. (The auth_time Claim semantically
	         * corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] auth_time
	         * response parameter.)
	         */
	        auth_time: { type: 'integer', format: 'NumericDate' },
	
	        /**
	         * nonce
	         *
	         * String value used to associate a Client session with an ID Token,
	         * and to mitigate replay attacks. The value is passed through
	         * unmodified from the Authentication Request to the ID Token. If
	         * present in the ID Token, Clients MUST verify that the nonce Claim
	         * Value is equal to the value of the nonce parameter sent in the
	         * Authentication Request. If present in the Authentication Request,
	         * Authorization Servers MUST include a nonce Claim in the ID Token
	         * with the Claim Value being the nonce value sent in the
	         * Authentication Request. Authorization Servers SHOULD perform no
	         * other processing on nonce values used. The nonce value is a case
	         * sensitive string.
	         */
	        nonce: { type: 'string' },
	
	        /**
	         * acr
	         *
	         * OPTIONAL. Authentication Context Class Reference. String
	         * specifying an Authentication Context Class Reference value that
	         * identifies the Authentication Context Class that the authentication
	         * performed satisfied. The value "0" indicates the End-User
	         * authentication did not meet the requirements of ISO/IEC 29115
	         * [ISO29115] level 1. Authentication using a long-lived browser
	         * cookie, for instance, is one example where the use of "level 0" is
	         * appropriate. Authentications with level 0 SHOULD NOT be used to
	         * authorize access to any resource of any monetary value. (This
	         * corresponds to the OpenID 2.0 PAPE [OpenID.PAPE] nist_auth_level
	         * 0.) An absolute URI or an RFC 6711 [RFC6711] registered name
	         * SHOULD be used as the acr value; registered names MUST NOT be used
	         * with a different meaning than that which is registered. Parties
	         * using this claim will need to agree upon the meanings of the
	         * values used, which may be context-specific. The acr value is a
	         * case sensitive string.
	         */
	        acr: { type: 'string' },
	
	        /**
	         * amr
	         * OPTIONAL. Authentication Methods References. JSON array of strings
	         * that are identifiers for authentication methods used in the
	         * authentication. For instance, values might indicate that both
	         * password and OTP authentication methods were used. The definition
	         * of particular values to be used in the amr Claim is beyond the
	         * scope of this specification. Parties using this claim will need to
	         * agree upon the meanings of the values used, which may be context-
	         * specific. The amr value is an array of case sensitive strings.
	         */
	        amr: { type: 'array', items: { type: 'string' } },
	
	        /**
	         * azp
	         * OPTIONAL. Authorized party - the party to which the ID Token was
	         * issued. If present, it MUST contain the OAuth 2.0 Client ID of this
	         * party. This Claim is only needed when the ID Token has a single
	         * audience value and that audience is different than the authorized
	         * party. It MAY be included even when the authorized party is the
	         * same as the sole audience. The azp value is a case sensitive string
	         * containing a StringOrURI value.
	         */
	        azp: { type: 'string', format: 'StringOrURI' }
	      },
	
	      /**
	       * Required Claims
	       */
	      required: ['iss', 'sub', 'aud', 'exp', 'iat']
	    }
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = IDTokenSchema;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Dependencies
	 */
	var _require = __webpack_require__(13),
	    JSONSchema = _require.JSONSchema;
	
	/**
	 * RelyingParty Schema
	 *
	 * This schema initializes and verifies Relying Party client configuration.
	 * RelyingParty objects can be persisted and rehydrated. By encapsulating this data in
	 * it's own class, it's possible to have multiple RP configurations running
	 * simultaneously.
	 */
	
	
	var RelyingPartySchema = new JSONSchema({
	  type: 'object',
	  properties: {
	
	    /**
	     * provider
	     *
	     * Information about the provider, including issuer URL, human readable name,
	     * and any configuration or provider metadata retrieved from the OP.
	     */
	    provider: {
	      type: 'object',
	      properties: {
	        name: { type: 'string' },
	        url: { type: 'string', format: 'uri' },
	        // NOTE:
	        // OpenID Configuration (discovery response) and JSON Web Keys Set for an
	        // issuer can be cached here. However the cache should not be persisted or
	        // relied upon.
	        //
	        configuration: {}, // .well-known/openid-configuration
	        jwks: {} // /jwks
	      },
	      required: ['url']
	    },
	
	    /**
	     * defaults
	     *
	     * Default request parameters for authentication and dynamic registration requests.
	     * These values can be extended or overridden via arguments to the respective
	     * request methods.
	     *
	     * These are part of the relying party client configuration and can be serialized
	     * and persisted.
	     */
	    defaults: {
	      type: 'object',
	      properties: {
	
	        /**
	         * Default authentication request parameters
	         */
	        authenticate: {
	          type: 'object',
	          properties: {
	            redirect_uri: {
	              type: 'string',
	              format: 'uri'
	            },
	            response_type: {
	              type: 'string',
	              default: 'id_token token', // browser detection
	              enum: ['code', 'token', 'id_token token', 'id_token token code']
	            },
	            display: {
	              type: 'string',
	              default: 'page',
	              enum: ['page', 'popup']
	            },
	            scope: {
	              type: ['string', 'array'],
	              default: ['openid']
	            }
	          }
	        },
	
	        /**
	         * Default client registration parameters
	         */
	        register: {}
	      }
	    },
	
	    /**
	     * registration
	     *
	     * This is the client registration response from dynamic registration. It should
	     * always reflect the client configuration on the openid provider. A client access
	     * token is stored here
	     */
	    registration: {}, // ClientMetadataSchema
	
	    /**
	     * store
	     */
	    store: {
	      type: 'object',
	      default: {}
	    }
	  }
	});
	
	/**
	 * Export
	 */
	module.exports = RelyingPartySchema;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="Content-type" content="text/html;charset=utf-8">\n  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />\n\n</head>\n<body>\n<div class="container">\n  <div class="row">\n    <div class="col-xs-12 text-center" style="margin-top: 3em;">\n      Login with:\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-xs-12 text-center" style="padding-top: 2em;">\n      <button type="button" class="btn btn-md btn-primary" id="testProvider">\n        solidtest.space\n      </button>\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-xs-12 text-center" style="padding-top: 2em;">\n      or custom:<br />\n      <input type="text" id="customProviderUri" value="https://" />\n      <button type="button" class="btn btn-md" id="customProvider">Go</button>\n    </div>\n  </div>\n</div>\n<script type="text/javascript">\n  window.addEventListener(\'load\', function () { init() });\n\n  function init () {\n    initEvents()\n  }\n\n  function initButton(id, action) {\n    document.getElementById(id).addEventListener(\'click\', action)\n  }\n\n  function initEvents () {\n    initButton(\'testProvider\',\n      function () { selectProvider(\'https://solidtest.space\') })\n    initButton(\'customProvider\',\n      function () {\n        var defaultValue = \'https://\'\n        var customUri = document.getElementById(\'customProviderUri\')\n        if (customUri && customUri.value !== defaultValue) {\n          selectProvider(customUri.value)\n        }\n      })\n  }\n\n  function selectProvider (providerUri) {\n    console.log(\'Provider selected: \', providerUri)\n    var message = {\n      event_type: \'providerSelected\',\n      value: providerUri\n    }\n    console.log(\'opener.window.location: \', opener.window.location.href)\n\n    opener.postMessage(message, opener.window.location.origin)\n  }\n</script>\n</body>\n</html>\n';

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Provides a Solid web client class for performing LDP CRUD operations.
	 * @module web
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_ACCEPT = 'text/turtle;q=0.8,*/*;q=0.5';
	var DEFAULT_MIME_TYPE = 'text/turtle';
	var defaultConfig = __webpack_require__(61);
	
	var composePatchQuery = __webpack_require__(62).composePatchQuery;
	var SolidResponse = __webpack_require__(63);
	var XMLHttpRequest = __webpack_require__(69);
	var HttpError = __webpack_require__(71);
	var vocab = __webpack_require__(66);
	
	/**
	 * Provides a collection of Solid/LDP web operations (CRUD)
	 * @class SolidWebClient
	 */
	
	var SolidWebClient = function () {
	  /**
	   * @constructor
	   * @param rdf {RDF} RDF library (like rdflib.js or rdf-ext) for parsing
	   * @param [config={}] {Object} Config hashmap
	   * @param [config.auth] {ClientAuthOIDC} Solid OIDC auth client instance
	   */
	  function SolidWebClient(rdf) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, SolidWebClient);
	
	    this.rdf = rdf;
	    this.vocab = vocab(rdf);
	    this.config = Object.assign({}, defaultConfig, config);
	    this.auth = config.auth;
	  }
	
	  /**
	   * Creates a Solid container with the specified name.
	   * Uses PUT instead of POST to guarantee the container name (and uses
	   * conditional HTTP headers to fail with a `409 Conflict` error if
	   * a container with that name already exists).
	   *
	   * @method createContainer
	   * @param parentUrl {string} Parent directory/container in which to create
	   * @param name {string} Container name (slug / URL fragment), no trailing
	   *   slash needed.
	   * @param [options] {Object} Options hashmap (optional, see `solidRequest()`)
	   * @param [data] {string} Optional RDF data payload (additional triples
	   *   that will be added to the container's metadata)
	   *
	   * @throws {HttpError} Throws an error if a resource or container with the
	   *   same name already exists
	   *
	   * @return {Promise<SolidResponse>}
	   */
	
	
	  _createClass(SolidWebClient, [{
	    key: 'createContainer',
	    value: function createContainer(parentUrl, name, options, data) {
	      return this.post(parentUrl, data, name, true);
	    }
	
	    /**
	     * Creates and returns the appropriate Solid wrapper for the XHR response.
	     *
	     * @method createResponse
	     * @param xhrResponse {XMLHttpRequest} XHR Response
	     * @param method {string} HTTP verb
	     *
	     * @return {SolidResponse} A SolidResponse
	     */
	
	  }, {
	    key: 'createResponse',
	    value: function createResponse(xhrResponse, method) {
	      return new SolidResponse(this.rdf, xhrResponse, method);
	    }
	
	    /**
	     * Returns the current window's location (for use with `needsProxy()`)
	     * if used in browser, or `null` if used from Node.
	     *
	     * @method currentUrl
	     *
	     * @return {string|null}
	     */
	
	  }, {
	    key: 'currentUrl',
	    value: function currentUrl() {
	      if (typeof window !== 'undefined') {
	        return window.location.href;
	      } else {
	        return null;
	      }
	    }
	
	    /**
	     * Deletes an existing resource or container.
	     *
	     * @method del
	     * @param url {string} URL of the resource or container to be deleted
	     *
	     * @return {Promise<SolidResponse>} Result of the HTTP Delete operation
	     *   (true on success, or an anonymous error object on failure)
	     */
	
	  }, {
	    key: 'del',
	    value: function del(url) {
	      return this.solidRequest(url, 'DELETE');
	    }
	
	    /**
	     * Retrieves a resource or container by making an HTTP GET call.
	     *
	     * @method get
	     * @param url {string} URL of the resource or container to fetch
	     * @param [options={}] {Object} Options hashmap (see `solidRequest()` docs)
	     *
	     * @return {Promise<SolidResponse>} Result of the HTTP
	     *   GET operation, or an error object
	     */
	
	  }, {
	    key: 'get',
	    value: function get(url) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      options.headers = options.headers || {};
	
	      // If no explicit Accept: header specified, set one
	      if (!options.headers['Accept']) {
	        options.headers['Accept'] = DEFAULT_ACCEPT;
	      }
	
	      return this.solidRequest(url, 'GET', options);
	    }
	
	    /**
	     * Checks to see if a Solid resource exists, and returns useful resource
	     *   metadata info.
	     *
	     * @method head
	     * @param url {string} URL of a resource or container
	     * @param [options] Options hashmap (see `solidRequest()` docs)
	     *
	     * @return {Promise} Result of an HTTP HEAD operation (returns a meta object)
	     */
	
	  }, {
	    key: 'head',
	    value: function head(url, options) {
	      return this.solidRequest(url, 'HEAD', options);
	    }
	
	    /**
	     * Loads a list of given RDF graphs via an async `Promise.all()`,
	     * which resolves to an array of uri/parsed-graph hashes.
	     *
	     * @method loadParsedGraphs
	     * @param locations {Array<string>} Array of graph URLs to load
	     * @param [options] Options hashmap (see `solidRequest()` docs)
	     *
	     * @return {Promise<Array<Object>>}
	     */
	
	  }, {
	    key: 'loadParsedGraphs',
	    value: function loadParsedGraphs(locations, options) {
	      var _this = this;
	
	      var loadPromises = locations.map(function (location) {
	        var responseUrl = void 0; // may differ from location if redirected
	
	        return _this.get(location, options).then(function (response) {
	          responseUrl = response.url;
	          return response.parsedGraph();
	        }).catch(function () {
	          // Suppress the error, no need to reject, just return null graph
	          return null;
	        }).then(function (parsedGraph) {
	          return {
	            uri: responseUrl,
	            value: parsedGraph
	          };
	        });
	      });
	
	      return Promise.all(loadPromises);
	    }
	
	    /**
	     * Determines whether the web client needs to fall back onto a Proxy url,
	     * to avoid being blocked by CORS
	     *
	     * @method needsProxy
	     * @param url {string}
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'needsProxy',
	    value: function needsProxy(url) {
	      var currentUrl = this.currentUrl();
	      var currentIsHttps = currentUrl && currentUrl.slice(0, 6) === 'https:';
	      var targetIsHttp = url && url.slice(0, 5) === 'http:';
	
	      return currentIsHttps && targetIsHttp;
	    }
	
	    /**
	     * Issues an HTTP OPTIONS request. Useful for discovering server capabilities
	     * (`Accept-Patch:`, `Updates-Via:` for websockets, etc).
	     * @method options
	     * @param url {string} URL of a resource or container
	     * @return {Promise<SolidResponse>} Result of an HTTP OPTIONS operation
	     */
	
	  }, {
	    key: 'options',
	    value: function options(url) {
	      return this.solidRequest(url, 'OPTIONS');
	    }
	
	    /**
	     * Partially edits an RDF-type resource by performing a PATCH operation.
	     *   Accepts arrays of individual statements (in Turtle format) as params.
	     *   For example:
	     *   [ '<a> <b> <c> .', '<d> <e> <f> .']
	     * @method patch
	     * @param url {string} URL of the resource to be edited
	     * @param toDel {Array<string>} Triples to remove from the resource
	     * @param toIns {Array<string>} Triples to insert into the resource
	     * @param [options] Options hashmap
	     * @return {Promise<SolidResponse>} Result of PATCH operation
	     */
	
	  }, {
	    key: 'patch',
	    value: function patch(url, toDel, toIns, options) {
	      var data = composePatchQuery(toDel, toIns);
	      var mimeType = 'application/sparql-update';
	      options = options || {};
	      options.headers = options.headers || {};
	      options.headers['Content-Type'] = mimeType;
	
	      return this.solidRequest(url, 'PATCH', options, data);
	    }
	
	    /**
	     * Creates a new resource by performing
	     *   a Solid/LDP POST operation to a specified container.
	     * @param url {string} URL of the container to post to
	     * @param data {Object} Data/payload of the resource to be created
	     * @param slug {string} Suggested URL fragment for the new resource
	     * @param isContainer {Boolean} Is the object being created a Container
	     *            or Resource?
	     * @param mimeType {string} Content Type of the data/payload
	     * @method post
	     * @return {Promise<SolidResponse>} Result of XHR POST (returns parsed response
	     *     meta object) or an anonymous error object with status code
	     */
	
	  }, {
	    key: 'post',
	    value: function post(url, data, slug, isContainer) {
	      var mimeType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_MIME_TYPE;
	
	      var resourceType = void 0;
	
	      if (isContainer) {
	        resourceType = this.vocab.ldp('BasicContainer');
	        // Force the right mime type for containers only
	        mimeType = 'text/turtle';
	      } else {
	        resourceType = this.vocab.ldp('Resource');
	      }
	
	      var options = {};
	      options.headers = {};
	      options.headers['Link'] = resourceType + '; rel="type"';
	      options.headers['Content-Type'] = mimeType;
	
	      if (slug && slug.length > 0) {
	        options.headers['Slug'] = slug;
	      }
	
	      return this.solidRequest(url, 'POST', options, data);
	    }
	
	    /**
	     * Turns a given URL into a proxied version, using a proxy template
	     * @method proxyUrl
	     * @param url {string} Intended URL
	     * @param proxyUrlTemplate {string}
	     * @return {string}
	     */
	
	  }, {
	    key: 'proxyUrl',
	    value: function proxyUrl(url, proxyUrlTemplate) {
	      proxyUrlTemplate = proxyUrlTemplate || this.config.proxyUrl;
	      return proxyUrlTemplate.replace('{uri}', encodeURIComponent(url));
	    }
	
	    /**
	     * Updates an existing resource or creates a new resource by performing
	     *   a Solid/LDP PUT operation to a specified container
	     * @method put
	     * @param url {string} URL of the resource to be updated/created
	     * @param data {Object} Data/payload of the resource to be created or updated
	     * @param [mimeType] {string} MIME Type of the resource to be created
	     * @param [options={}] Options hashmap, see docs for `solidResponse()`
	     * @return {Promise<SolidResponse>} Result of PUT operation (returns parsed
	     *     response meta object if successful, rejects with an anonymous error
	     *     status object if not successful)
	     */
	
	  }, {
	    key: 'put',
	    value: function put(url, data, mimeType) {
	      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	      options.headers = options.headers || {};
	      mimeType = mimeType || DEFAULT_MIME_TYPE;
	      options.headers['Content-Type'] = mimeType;
	
	      return this.solidRequest(url, 'PUT', options, data);
	    }
	
	    /**
	     * Sends a generic XHR request with the appropriate Solid headers,
	     * and returns a promise that resolves to a parsed response.
	     * @method solidRequest
	     * @param url {string} URL of the request
	     * @param method {string} HTTP Verb ('GET', 'PUT', etc)
	     * @param [options] Options hashmap
	     * @param [options.noCredentials=false] {Boolean} Don't use `withCredentials`
	     * @param [options.forceProxy=false] {Boolean} Enforce using proxy URL if true
	     * @param [options.headers={}] {Object} HTTP headers to send along
	     *          with request
	     * @param [options.proxyUrl=config.proxyUrl] {string} Proxy URL to use for
	     *          CORS Requests.
	     * @param [options.timeout=config.timeout] {Number} Request timeout in
	     *          milliseconds.
	     * @param [data] {Object} Optional data / payload
	     * @throws {HttpError} Rejects with `httpError.HttpError` of the appropriate
	     *   type
	     * @return {Promise<SolidResponse>}
	     */
	
	  }, {
	    key: 'solidRequest',
	    value: function solidRequest(url, method, options, data) {
	      options = options || {};
	      options.headers = options.headers || {};
	
	      if (this.auth && this.auth.accessToken) {
	        options.headers['Authorization'] = 'Bearer ' + this.auth.accessToken;
	      }
	
	      options.proxyUrl = options.proxyUrl || this.config.proxyUrl;
	      options.timeout = options.timeout || this.config.timeout;
	      if (this.needsProxy(url) || options.forceProxy) {
	        url = this.proxyUrl(url);
	      }
	
	      var client = this;
	
	      return new Promise(function (resolve, reject) {
	        var http = new XMLHttpRequest();
	
	        http.open(method, url);
	        if (!options.noCredentials) {
	          http.withCredentials = true;
	        }
	
	        for (var header in options.headers) {
	          // Add in optional headers
	          http.setRequestHeader(header, options.headers[header]);
	        }
	
	        if (options.timeout) {
	          http.timeout = options.timeout;
	        }
	
	        http.onload = function () {
	          if (this.status >= 200 && this.status < 300) {
	            resolve(client.createResponse(this, method));
	          } else {
	            reject(new HttpError(this.status, this.statusText, { xhr: this }));
	          }
	        };
	
	        http.onerror = function () {
	          reject(new HttpError(this.status, this.statusText, { xhr: this }));
	        };
	        if (typeof data === 'undefined' || !data) {
	          http.send();
	        } else {
	          http.send(data);
	        }
	      });
	    }
	  }]);
	
	  return SolidWebClient;
	}();
	
	/**
	 * Returns a web client instance (convenience constructor method).
	 * Usage:
	 *
	 *   ```
	 *   var rdf = require('rdflib')  // or other compatible library
	 *   var webClient = require('solid-web-client')(rdf)
	 *   ```
	 * @param rdf
	 * @param config
	 *
	 * @return {SolidWebClient}
	 */
	
	
	function getClient(rdf, config) {
	  return new SolidWebClient(rdf, config);
	}
	
	module.exports = getClient;
	module.exports.SolidWebClient = SolidWebClient;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	'use strict'
	/**
	 * Provides a simple configuration object for Solid web client
	 * @module config-default
	 */
	module.exports = {
	  /**
	   * Default proxy URL for servicing CORS requests
	   */
	  proxyUrl: 'https://databox.me/,proxy?uri={uri}',
	  /**
	   * Timeout for web/ajax operations, in milliseconds
	   */
	  timeout: 50000
	}


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Provides misc utility functions for the web client
	 * @module web-util
	 */
	
	module.exports.absoluteUrl = absoluteUrl;
	module.exports.composePatchQuery = composePatchQuery;
	module.exports.hostname = hostname;
	module.exports.parseAllowedMethods = parseAllowedMethods;
	module.exports.parseLinkHeader = parseLinkHeader;
	module.exports.statementToNT = statementToNT;
	
	/**
	 * Return an absolute URL
	 * @method absoluteUrl
	 *
	 * @param baseUrl {string} URL to be used as base
	 * @param pathUrl {string} Absolute or relative URL
	 *
	 * @return {string}
	 */
	function absoluteUrl(baseUrl, pathUrl) {
	  if (pathUrl && pathUrl.slice(0, 4) !== 'http') {
	    return [baseUrl, pathUrl].map(function (path) {
	      if (path[0] === '/') {
	        path = path.slice(1);
	      }
	      if (path[path.length - 1] === '/') {
	        path = path.slice(0, path.length - 1);
	      }
	      return path;
	    }).join('/');
	  }
	
	  return pathUrl;
	}
	
	/**
	 * Composes and returns a PATCH SPARQL query (for use with `web.patch()`)
	 * @method composePatchQuery
	 *
	 * @param toDel {Array<string|Statement>} List of triples to delete
	 * @param toIns {Array<string|Statement>} List of triples to insert
	 *
	 * @return {string} SPARQL query for use with PATCH
	 */
	function composePatchQuery(toDel, toIns) {
	  var query = '';
	  if (toDel && toDel.length > 0) {
	    toDel = toDel.map(function (st) {
	      return statementToNT(st);
	    });
	    query += 'DELETE DATA { ' + toDel.join(' ') + ' };\n';
	  }
	
	  if (toIns && toIns.length > 0) {
	    toIns = toIns.map(function (st) {
	      return statementToNT(st);
	    });
	    query += 'INSERT DATA { ' + toIns.join(' ') + ' };\n';
	  }
	
	  return query;
	}
	
	function hostname(url) {
	  var protocol = void 0,
	      hostname = void 0,
	      result = void 0,
	      pathSegments = void 0;
	  var fragments = url.split('//');
	
	  if (fragments.length === 2) {
	    protocol = fragments[0];
	    hostname = fragments[1];
	  } else {
	    hostname = url;
	  }
	
	  pathSegments = hostname.split('/');
	  if (protocol) {
	    result = protocol + '//' + pathSegments[0];
	  } else {
	    result = pathSegments[0];
	  }
	
	  if (url.startsWith('//')) {
	    result = '//' + result;
	  }
	
	  return result;
	}
	
	/**
	 * Extracts the allowed HTTP methods from the 'Allow' and 'Accept-Patch'
	 * headers, and returns a hashmap of verbs allowed by the server
	 * @method parseAllowedMethods
	 *
	 * @param allowMethodsHeader {string} `Access-Control-Allow-Methods` response
	 *   header
	 * @param acceptPatchHeader {string} `Accept-Patch` response header
	 *
	 * @return {Object} Hashmap of verbs (in lowercase) allowed by the server for
	 *   the current user. Example:
	 *   ```
	 *   {
	 *     'get': true,
	 *     'put': true
	 *   }
	 *   ```
	 */
	function parseAllowedMethods(allowMethodsHeader, acceptPatchHeader) {
	  var allowedMethods = {};
	
	  if (allowMethodsHeader) {
	    var verbs = allowMethodsHeader.split(',');
	    verbs.forEach(function (methodName) {
	      if (methodName && allowMethodsHeader.indexOf(methodName) >= 0) {
	        allowedMethods[methodName.trim().toLowerCase()] = true;
	      }
	    });
	  }
	
	  if (acceptPatchHeader && acceptPatchHeader.indexOf('application/sparql-update') >= 0) {
	    allowedMethods.patch = true;
	  }
	
	  return allowedMethods;
	}
	
	/**
	* Parses a Link header from an XHR HTTP Request.
	* @method parseLinkHeader
	 *
	* @param link {string} Contents of the Link response header
	*
	 * @return {Object}
	*/
	function parseLinkHeader(link) {
	  if (!link) {
	    return {};
	  }
	
	  var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
	  var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;
	  var matches = link.match(linkexp);
	  var rels = {};
	
	  for (var i = 0; i < matches.length; i++) {
	    var split = matches[i].split('>');
	    var href = split[0].substring(1);
	    var ps = split[1];
	    var s = ps.match(paramexp);
	
	    for (var j = 0; j < s.length; j++) {
	      var p = s[j];
	      var paramsplit = p.split('=');
	      // var name = paramsplit[0]
	      var rel = paramsplit[1].replace(/["']/g, '');
	
	      if (!rels[rel]) {
	        rels[rel] = [];
	      }
	
	      rels[rel].push(href);
	
	      if (rels[rel].length > 1) {
	        rels[rel].sort();
	      }
	    }
	  }
	
	  return rels;
	}
	
	/**
	 * Converts a statement to string (if it isn't already) and returns the statement.
	 * @method statementToNT
	 *
	 * @param statement {string|Triple} RDF Statement to be converted.
	 * @param [excludeDot=false] {Boolean} Optionally slice off ending period.
	 *
	 * @return {string}
	 */
	function statementToNT(statement) {
	  if (typeof statement !== 'string') {
	    // This is an RDF Statement. Convert to string
	    statement = statement.toCanonical();
	  }
	
	  return statement;
	}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module response
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var graphUtil = __webpack_require__(64); // Used by .parsedGraph()
	var SolidContainer = __webpack_require__(65);
	var SolidResource = __webpack_require__(68);
	var webUtil = __webpack_require__(62);
	
	/**
	 * Provides a wrapper around an XHR response object, and adds several
	 * Solid-specific parsed fields (link headers, allowed verbs, etc)
	 * @class SolidResponse
	 */
	
	var SolidResponse = function () {
	  /**
	   * @constructor
	   * @param rdf {RDF} RDF Library such as rdflib.js
	   * @param xhrResponse {XMLHttpRequest} Result of XHR operation
	   * @param method {string} HTTP verb for the original request. Passed in
	   *   separately because it's not actually stored in the XHR object.
	   */
	  function SolidResponse(rdf, xhrResponse, method) {
	    _classCallCheck(this, SolidResponse);
	
	    if (!xhrResponse) {
	      this.xhr = null;
	      this.user = '';
	      this.method = null;
	      this.types = [];
	      this.graph = null;
	      return;
	    }
	    /**
	     * RDF Library such as rdflib.js. Used by parsedGraph()
	     * @property rdf
	     * @type RDF
	     */
	    this.rdf = rdf;
	    /**
	     * Hashmap of parsed `Link:` headers. Example:
	     *
	     *   ```
	     *   {
	     *     acl: [ 'resourceName.acl' ],
	     *     describedBy: [ 'resourceName.meta' ],
	     *     type: [
	     *       'http://www.w3.org/ns/ldp#RDFResource',
	     *       'http://www.w3.org/ns/ldp#Resource'
	     *     ]
	     *   }
	     *   ```
	     * @property linkHeaders
	     * @type Object
	     */
	    var linkHeader = xhrResponse.getResponseHeader('Link');
	    this.linkHeaders = webUtil.parseLinkHeader(linkHeader) || {};
	
	    if (method) {
	      method = method.toLowerCase();
	    } else {
	      method = '';
	    }
	    /**
	     * HTTP verb for the original request (GET, PUT, etc)
	     * @property method
	     * @type string
	     */
	    this.method = method;
	
	    /**
	     * Name of the corresponding `.acl` resource
	     * @property acl
	     * @type string
	     */
	    this.acl = this.linkHeaders['acl'];
	    if (this.acl) {
	      this.acl = this.acl[0]; // Extract the single .acl link
	    }
	    /**
	     * Hashmap of HTTP methods/verbs allowed by the server.
	     * (If a verb is not allowed, it's not included.)
	     * Example:
	     *   ```
	     *   {
	     *     'get': true,
	     *     'put': true
	     *   }
	     *   ```
	     * @property allowedMethods
	     * @type Object
	     */
	    this.allowedMethods = this.parseAllowedMethods(xhrResponse, method);
	
	    /**
	     * Cache of the parsed graph of xhr.response,
	     * lazy-initialized when you call `response.parsedGraph()`
	     * @property graph
	     * @type {IndexedFormula}
	     */
	    this.graph = null;
	
	    /**
	     * Name of the corresponding `.meta` resource
	     * @property meta
	     * @type string
	     */
	    this.meta = this.linkHeaders['meta'] || this.linkHeaders['describedBy'];
	    if (this.meta) {
	      this.meta = this.meta[0]; // Extract the single .meta link
	    }
	    /**
	     * LDP Types for the resource.
	     * Example: [
	     *   'http://www.w3.org/ns/ldp#Resource',
	     *   'http://www.w3.org/ns/ldp#RDFResource'
	     * ]
	     * @property types
	     * @type Array<string>
	     */
	    this.types = this.typeLinkHeaders();
	    /**
	     * URL of the resource created or retrieved
	     * @property url
	     * @type string
	     */
	    this.url = xhrResponse.getResponseHeader('Location') ? webUtil.absoluteUrl(webUtil.hostname(xhrResponse.responseURL), xhrResponse.getResponseHeader('Location')) : xhrResponse.responseURL;
	    /**
	     * WebID URL of the currently authenticated user (empty string if none)
	     * @property user
	     * @type string
	     */
	    this.user = xhrResponse.getResponseHeader('User') || '';
	    /**
	     * URL of the corresponding websocket instance, for this resource
	     * Example: `wss://example.org/blog/hello-world`
	     * @property websocket
	     * @type string
	     */
	    this.websocket = xhrResponse.getResponseHeader('Updates-Via') || '';
	    /**
	     * Raw XHR response object
	     * @property xhr
	     * @type XMLHttpRequest
	     */
	    this.xhr = xhrResponse;
	
	    /**
	     * The resource which was returned by the XHR, if any.
	     */
	    this.resource = null;
	    if (this.method === 'get') {
	      this.resource = this.isContainer() ? new SolidContainer(this.rdf, this.url, this) : new SolidResource(this.rdf, this.url, this);
	    }
	  }
	
	  /**
	   * Returns the absolute URL of the ACL resource for this response.
	   * @method aclAbsoluteUrl
	   *
	   * @return {string}
	   */
	
	
	  _createClass(SolidResponse, [{
	    key: 'aclAbsoluteUrl',
	    value: function aclAbsoluteUrl() {
	      if (!this.acl) {
	        return null;
	      }
	
	      return this.resolveMetaOrAclUrl('acl');
	    }
	
	    /**
	     * Returns the Content-Type of the response (or null if no response
	     * is present)
	     * @method contentType
	     *
	     * @return {string|null}
	     */
	
	  }, {
	    key: 'contentType',
	    value: function contentType() {
	      if (this.xhr) {
	        return this.xhr.getResponseHeader('Content-Type').split(';')[0]; // remove parameter
	      } else {
	        return null;
	      }
	    }
	
	    /**
	     * Returns true if the resource exists (not a 404)
	     * @method exists
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'exists',
	    value: function exists() {
	      return this.xhr && this.xhr.status >= 200 && this.xhr.status < 400;
	    }
	
	    /**
	     * Is this a Container instance (vs a regular resource)
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isContainer',
	    value: function isContainer() {
	      return this.isType('http://www.w3.org/ns/ldp#Container') || this.isType('http://www.w3.org/ns/ldp#BasicContainer');
	    }
	
	    /**
	     * Returns true if the user is logged in with the server
	     * @method isLoggedIn
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isLoggedIn',
	    value: function isLoggedIn() {
	      return this.user; // && this.user.slice(0, 4) === 'http'
	    }
	
	    /**
	     * Returns true if this a given type matches this resource's types
	     * @method isType
	     *
	     * @param rdfClass {string}
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isType',
	    value: function isType(rdfClass) {
	      return this.types.indexOf(rdfClass) !== -1;
	    }
	
	    /**
	     * Returns the absolute URL of the .meta resource for this response.
	     * @method metaAbsoluteUrl
	     *
	     * @return {string}
	     */
	
	  }, {
	    key: 'metaAbsoluteUrl',
	    value: function metaAbsoluteUrl() {
	      if (!this.meta) {
	        return null;
	      }
	      return this.resolveMetaOrAclUrl('meta');
	    }
	
	    /**
	     * In case that this was preflight-type request (OPTIONS or POST, for example),
	     * parses and returns the allowed methods for the resource (for the current
	     * user).
	     * @method parseAllowedMethods
	     *
	     * @param xhrResponse {XMLHttpRequest}
	     * @param method {string} HTTP verb for the original request
	     *
	     * @return {Object} Hashmap of the allowed methods
	     */
	
	  }, {
	    key: 'parseAllowedMethods',
	    value: function parseAllowedMethods(xhrResponse, method) {
	      if (method === 'get') {
	        // Not a preflight request
	        return {};
	      } else {
	        return webUtil.parseAllowedMethods(xhrResponse.getResponseHeader('Allow'), xhrResponse.getResponseHeader('Accept-Patch'));
	      }
	    }
	
	    /**
	     * Returns the parsed graph of the response (lazy-initializes it if it's not
	     * present)
	     * @method parsedGraph
	     *
	     * @return {Graph}
	     */
	
	  }, {
	    key: 'parsedGraph',
	    value: function parsedGraph() {
	      if (!this.graph) {
	        this.graph = graphUtil.parseGraph(this.rdf, this.url, this.raw(), this.contentType());
	      }
	
	      return this.graph;
	    }
	
	    /**
	     * Returns the raw XHR response (or null if absent)
	     * @method raw
	     *
	     * @return {Object|null}
	     */
	
	  }, {
	    key: 'raw',
	    value: function raw() {
	      if (this.xhr) {
	        return this.xhr.response;
	      } else {
	        return null;
	      }
	    }
	
	    /**
	     * Returns the absolute url of a "related" resource (.acl or .meta)
	     *
	     * @param propertyName {string} Either 'acl' or 'meta'
	     *
	     * @return {string|null}
	     */
	
	  }, {
	    key: 'resolveMetaOrAclUrl',
	    value: function resolveMetaOrAclUrl(propertyName) {
	      if (!this.url) {
	        return null;
	      }
	
	      var metaOrAclUrl = this[propertyName];
	      // if url is https://example.com/resource, parent is https://example.com/
	      var parentUrl = this.url.slice(0, this.url.lastIndexOf('/') + 1);
	
	      return webUtil.absoluteUrl(parentUrl, metaOrAclUrl);
	    }
	
	    /**
	     * Returns a unique (de-duplicated) list of `rel="type"` Link headers.
	     *
	     * @return {Array<string>}
	     */
	
	  }, {
	    key: 'typeLinkHeaders',
	    value: function typeLinkHeaders() {
	      if (!Array.isArray(this.linkHeaders.type)) {
	        return [];
	      }
	      var types = new Set(this.linkHeaders.type || []);
	
	      return Array.from(types);
	    }
	  }]);
	
	  return SolidResponse;
	}();
	
	module.exports = SolidResponse;

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Provides convenience methods for graph manipulation.
	 * Currently depends on RDFLib
	 * @module graph-util
	 */
	
	module.exports.appendGraph = appendGraph;
	module.exports.parseGraph = parseGraph;
	module.exports.parseLinks = parseLinks;
	module.exports.serializeStatements = serializeStatements;
	module.exports.graphFromStatements = graphFromStatements;
	
	var ALL_STATEMENTS = null;
	
	/**
	 * Appends RDF statements from one graph object to another
	 * @method appendGraph
	 *
	 * @param toGraph {Graph} Graph object to append to
	 * @param fromGraph {Graph} Graph object to append from
	 * @param docURI {string} Document URI to use as source
	 */
	function appendGraph(toGraph, fromGraph, docURI) {
	  fromGraph.statementsMatching(ALL_STATEMENTS).forEach(function (st) {
	    toGraph.add(st.subject, st.predicate, st.object, st.why);
	  });
	}
	
	/**
	 * Converts a list of RDF statements into a Graph, and returns
	 * it.
	 * @method graphFromStatements
	 *
	 * @param rdf {RDF} RDF library such as rdflib.js
	 * @param statements {Array<Statement>}
	 *
	 * @return {Graph}
	 */
	function graphFromStatements(rdf, statements) {
	  var graph = rdf.graph();
	
	  statements.forEach(function (st) {
	    graph.addStatement(st);
	  });
	
	  return graph;
	}
	
	/**
	 * Parses a given graph, from text rdfSource, as a given content type.
	 * Returns parsed graph.
	 *
	 * @method parseGraph
	 * @param rdf {RDF} RDF library such as rdflib.js
	 * @param baseUrl {string}
	 * @param rdfSource {string} Text source code
	 * @param contentType {string} Mime Type (determines which parser to use)
	 *
	 * @return {Graph}
	 */
	function parseGraph(rdf, baseUrl, rdfSource, contentType) {
	  var parsedGraph = rdf.graph();
	
	  rdf.parse(rdfSource, parsedGraph, baseUrl, contentType);
	
	  return parsedGraph;
	}
	
	/**
	 * Extracts the URIs from a parsed graph that match parameters.
	 * The URIs are a set (duplicates are removed)
	 * @method parseLinks
	 *
	 * @param graph {Graph}
	 * @param subject {NamedNode}
	 * @param predicate {NamedNode}
	 * @param object {NamedNode}
	 * @param source {NamedNode}
	 *
	 * @return {Array<string>} Array of link URIs that match the parameters
	 */
	function parseLinks(graph, subject, predicate, object, source) {
	  var links = {};
	  var matches = graph.statementsMatching(subject, predicate, object, source);
	  matches.forEach(function (match) {
	    links[match.object.uri] = true;
	  });
	  return Object.keys(links);
	}
	
	/**
	 * Serializes an array of RDF statements into a simple N-Triples format
	 * suitable for writing to a solid server.
	 * @method serializeStatements
	 *
	 * @param statements {Array<Statement>} List of RDF statements
	 *
	 * @return {string}
	 */
	function serializeStatements(statements) {
	  var source = statements.map(function (st) {
	    return st.toNT();
	  });
	  source = source.join('\n');
	  return source;
	}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module container
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var graphUtil = __webpack_require__(64);
	var parseLinks = graphUtil.parseLinks;
	var vocab = __webpack_require__(66);
	var SolidResource = __webpack_require__(68);
	
	/**
	 * @class SolidContainer
	 * @extends SolidResource
	 * @constructor
	 * @param rdf {RDF} RDF Library (such as rdflib.js) to inject
	 * @param uri {string}
	 * @param response {SolidResponse}
	 */
	
	var SolidContainer = function (_SolidResource) {
	  _inherits(SolidContainer, _SolidResource);
	
	  function SolidContainer(rdf, uri, response) {
	    _classCallCheck(this, SolidContainer);
	
	    /**
	     * Hashmap of Containers within this container, keyed by absolute uri
	     * @property containers
	     * @type Object
	     */
	    var _this = _possibleConstructorReturn(this, (SolidContainer.__proto__ || Object.getPrototypeOf(SolidContainer)).call(this, rdf, uri, response));
	
	    _this.containers = {};
	    /**
	     * List of URIs of all contents (containers and resources)
	     * @property contentsUris
	     * @type Array<string>
	     */
	    _this.contentsUris = [];
	    /**
	     * Hashmap of Contents that are just resources (not containers),
	     * keyed by absolute uri
	     * @property resources
	     * @type Object
	     */
	    _this.resources = {};
	
	    /**
	     * Hashmap of common RDF ontology namespaces
	     * @type Object
	     */
	    _this.vocab = vocab(rdf);
	
	    if (_this.parsedGraph) {
	      _this.appendFromGraph(_this.parsedGraph, _this.uri);
	    }
	    return _this;
	  }
	
	  /**
	   * Extracts the contents (resources and sub-containers)
	   * of the given graph and adds them to this container
	   *
	   * @method appendFromGraph
	   * @param parsedGraph {Graph}
	   * @param graphUri {string}
	   */
	
	
	  _createClass(SolidContainer, [{
	    key: 'appendFromGraph',
	    value: function appendFromGraph(parsedGraph, graphUri) {
	      var _this2 = this;
	
	      // Set this container's types
	      var ns = this.vocab;
	      var uriNode = this.rdf.namedNode(this.uri);
	      this.types = Object.keys(parsedGraph.findTypeURIs(uriNode));
	
	      // Extract all the contents links (resources and containers)
	      var contentsUris = parseLinks(parsedGraph, null, ns.ldp('contains'));
	      this.contentsUris = this.contentsUris.concat(contentsUris.sort());
	
	      // Extract links that are just containers
	      var containersLinks = parsedGraph.each(null, null, ns.ldp('Container'));
	
	      var container = void 0;
	      containersLinks.forEach(function (containerLink) {
	        // Filter out . (the link to this directory)
	        if (containerLink.uri !== _this2.uri) {
	          container = new SolidContainer(_this2.rdf, containerLink.uri);
	          container.types = Object.keys(parsedGraph.findTypeURIs(containerLink));
	          _this2.containers[container.uri] = container;
	        }
	      });
	
	      // Now that containers are defined, all the rest are non-container resources
	      var isResource = void 0,
	          isContainer = void 0;
	      var resource = void 0,
	          linkNode = void 0;
	      contentsUris.forEach(function (link) {
	        isContainer = link in _this2.containers;
	        isResource = link !== _this2.uri && !isContainer;
	        if (isResource) {
	          resource = new SolidResource(_this2.rdf, link);
	          linkNode = _this2.rdf.namedNode(link);
	          resource.types = Object.keys(parsedGraph.findTypeURIs(linkNode));
	          _this2.resources[link] = resource;
	        }
	      });
	    }
	
	    /**
	     * Returns a list of SolidResource or SolidContainer instances that match
	     * a given type.
	     * @method findByType
	     * @param rdfClass {string}
	     * @return {Array<SolidResource|SolidContainer>}
	     */
	
	  }, {
	    key: 'findByType',
	    value: function findByType(rdfClass) {
	      var matches = [];
	      var key = void 0,
	          container = void 0;
	
	      for (key in this.containers) {
	        container = this.containers[key];
	        if (container.isType(rdfClass)) {
	          matches.push(container);
	        }
	      }
	
	      var resource = void 0;
	      for (key in this.resources) {
	        resource = this.resources[key];
	        if (resource.isType(rdfClass)) {
	          matches.push(resource);
	        }
	      }
	
	      return matches;
	    }
	
	    /**
	     * Is this a Container instance (vs a regular resource).
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isContainer',
	    value: function isContainer() {
	      return true;
	    }
	
	    /**
	     * Returns true if there are no resources or containers inside this container.
	     * @method isEmpty
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.contentsUris.length === 0;
	    }
	  }]);
	
	  return SolidContainer;
	}(SolidResource);
	
	module.exports = SolidContainer;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	/**
	 * Provides a hashmap of relevant vocabs / namespaces.
	 * Usage:
	 *
	 *   ```
	 *   var rdf = require('rdflib')  // optional
	 *   var vocab = require('solid-vocab')(rdf)  // or require('solid-vocab')()
	 *   console.log(vocab.foaf('name'))  // -> <http://xmlns.com/foaf/0.1/name>
	 *   ```
	 * @module vocab
	 */
	
	/**
	 * @param [rdf] {RDF} Optional RDF Library (such as rdflib.js or rdf-ext) to
	 *   inject
	 */
	function vocab (rdf) {
	  var ns = __webpack_require__(67)(rdf)
	  var vocabMap = {
	    'acl': ns.base('http://www.w3.org/ns/auth/acl#'),
	    'app': ns.base('http://www.w3.org/ns/solid/app#'),
	    'dct': ns.base('http://purl.org/dc/terms/'),
	    'foaf': ns.base('http://xmlns.com/foaf/0.1/'),
	    'ldp': ns.base('http://www.w3.org/ns/ldp#'),
	    'owl': ns.base('http://www.w3.org/2002/07/owl#'),
	    'pim': ns.base('http://www.w3.org/ns/pim/space#'),
	    'rdf': ns.base('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
	    'rdfs': ns.base('http://www.w3.org/2000/01/rdf-schema#'),
	    'schema': ns.base('http://schema.org/'),
	    'sioc': ns.base('http://rdfs.org/sioc/ns#'),
	    'solid': ns.base('http://www.w3.org/ns/solid/terms#'),
	    'vcard': ns.base('http://www.w3.org/2006/vcard/ns#'),
	    'xsd': ns.base('http://www.w3.org/2001/XMLSchema#')
	  }
	  return vocabMap
	}
	
	module.exports = vocab


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	'use strict'
	
	module.exports = rdfNamespace
	
	/**
	 * Usage:
	 *
	 *   ```
	 *   var rdf = require('rdflib')
	 *   var ns = require('rdf-ns')(rdf)
	 *
	 *   var rdfs = ns.base('http://www.w3.org/2000/01/rdf-schema#')
	 *   var seeAlso = rdfs('seeAlso')
	 *   console.log(seeAlso)
	 *   // -> NamedNode(<http://www.w3.org/2000/01/rdf-schema#seeAlso>)
	 *   ```
	 *
	 * @class Namespace
	 * @constructor
	 * @param rdf {RDF} RDF library such as rdflib.js or rdf-ext (for dep injection)
	 */
	function Namespace (rdf) {
	  this.rdf = rdf
	}
	
	/**
	 * @param namespaceIri {String} Namespace IRI
	 * @return {Function}
	 */
	Namespace.prototype.base = function base (namespaceIri) {
	  var self = this
	  /**
	   * @param term {String} IRI fragment
	   * @return {String|NamedNode}
	   */
	  return function fullIri (term) {
	    if (self.rdf) {
	      return self.rdf.namedNode(namespaceIri + term)
	    } else {
	      return namespaceIri + term
	    }
	  }
	}
	
	function rdfNamespace (rdf) {
	  return new Namespace(rdf)
	}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module resource
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var graphUtil = __webpack_require__(64);
	
	/**
	 * Represents a Solid / LDP Resource (currently used when listing
	 * SolidContainer resources)
	 * @class SolidResource
	 */
	
	var SolidResource = function () {
	  /**
	   * @constructor
	   * @param rdf {RDF}
	   * @param uri {string}
	   * @param response {SolidResponse}
	   */
	  function SolidResource(rdf, uri, response) {
	    _classCallCheck(this, SolidResource);
	
	    /**
	     * Short name (page/filename part of the resource path),
	     * derived from the URI
	     * @property name
	     * @type string
	     */
	    this.name = null;
	    /**
	     * Parsed graph of the contents of the resource
	     * @property parsedGraph
	     * @type Graph
	     */
	    this.parsedGraph = null;
	    /**
	     * Optional SolidResponse object from which this resource was initialized
	     * @property response
	     * @type SolidResponse
	     */
	    this.response = response;
	    /**
	     * List of RDF Types (classes) to which this resource belongs
	     * @property types
	     * @type Array<string>
	     */
	    this.types = [];
	    /**
	     * Absolute url of the resource
	     * @property url
	     * @type string
	     */
	    this.uri = uri;
	
	    /**
	     * RDF Library (such as rdflib.js) to inject (used for parsing contents)
	     * @type RDF
	     */
	    this.rdf = rdf;
	
	    if (response) {
	      if (response.url !== uri) {
	        // Override the given url (which may be relative) with that of the
	        // response object (which will be absolute)
	        this.uri = response.url;
	      }
	      this.initFromResponse(response);
	    }
	    this.initName();
	  }
	
	  /**
	   * Initializes the short name from the url
	   * @method initName
	   */
	
	
	  _createClass(SolidResource, [{
	    key: 'initName',
	    value: function initName() {
	      if (!this.uri) {
	        return;
	      }
	
	      // Split on '/', use the last fragment
	      var fragments = this.uri.split('/');
	      this.name = fragments.pop();
	
	      if (!this.name && fragments.length > 0) {
	        // URI ended in a '/'. Try again.
	        this.name = fragments.pop();
	      }
	    }
	
	    /**
	     * @method initFromResponse
	     * @param response {SolidResponse}
	     */
	
	  }, {
	    key: 'initFromResponse',
	    value: function initFromResponse(response) {
	      var contentType = response.contentType();
	      if (!contentType) {
	        throw new Error('Cannot parse container without a Content-Type: header');
	      }
	
	      var parsedGraph = graphUtil.parseGraph(this.rdf, this.uri, response.raw(), contentType);
	      this.parsedGraph = parsedGraph;
	
	      this.types = Object.keys(parsedGraph.findTypeURIs(this.rdf.namedNode(this.uri)));
	    }
	
	    /**
	     * Is this a Container instance (vs a regular resource).
	     * (Is overridden in the subclass, `SolidContainer`)
	     *
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isContainer',
	    value: function isContainer() {
	      return false;
	    }
	
	    /**
	     * Returns true if this a given type matches this resource's types
	     * @method isType
	     * @param rdfClass {string}
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isType',
	    value: function isType(rdfClass) {
	      return this.types.indexOf(rdfClass) !== -1;
	    }
	  }]);
	
	  return SolidResource;
	}();
	
	module.exports = SolidResource;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/* global Components */
	/**
	 * Provides a generic wrapper around the XMLHttpRequest object, to make it
	 * usable both in the browser and firefox extension and in Node.js
	 * @module xhr
	 */
	
	var XMLHttpRequest;
	if (typeof tabulator !== 'undefined' && tabulator.isExtension) {
	  // Running inside the Tabulator Firefox extension
	  // Cannot use XMLHttpRequest natively, must request it through SDK
	  XMLHttpRequest = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1'].createInstance().QueryInterface(Components.interfaces.nsIXMLHttpRequest);
	} else if (typeof window !== 'undefined' && 'XMLHttpRequest' in window) {
	  // Running inside the browser
	  XMLHttpRequest = window.XMLHttpRequest;
	} else {
	  // in Node.js
	  XMLHttpRequest = __webpack_require__(70);
	}
	module.exports = XMLHttpRequest;

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = XMLHttpRequest;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = HttpError
	var StandardError = __webpack_require__(72)
	var STATUS_CODE_TO_NAME = __webpack_require__(73)
	var STATUS_NAME_TO_CODE = exports
	
	function HttpError(code, msg, props) {
	  if (typeof code == "string") code = STATUS_NAME_TO_CODE[code]
	  if (typeof code != "number") throw new TypeError("Non-numeric HTTP code")
	  if (typeof msg == "object" && msg != null) { props = msg; msg = null }
	  StandardError.call(this, msg || STATUS_CODE_TO_NAME[code], props)
	  this.code = code
	}
	
	HttpError.prototype = Object.create(StandardError.prototype, {
	  constructor: {value: HttpError, configurable: true, writable: true}
	})
	
	// Set name explicitly for when the code gets minified.
	HttpError.prototype.name = "HttpError"
	
	Object.defineProperties(HttpError.prototype, {
	  statusCode: alias("code"),
	  statusMessage: alias("message"),
	
	  status: {
	    configurable: true,
	    get: function() { return this.code },
	    set: function(value) {
	      Object.defineProperty(this, "status", {
	        value: value, configurable: true, enumerable: true, writable: true
	      })
	    }
	  }
	})
	
	HttpError.prototype.toString = function() {
	  return this.name + ": " + this.code + " " + this.message
	}
	
	for (var code in STATUS_CODE_TO_NAME) {
	  var name = STATUS_CODE_TO_NAME[code]
	  exports[name.replace("'", "").replace(/[- ]/g, "_").toUpperCase()] = +code
	}
	
	function alias(name) {
	  return {
	    configurable: true,
	    get: function() { return this[name] },
	    set: function(value) { return this[name] = value }
	  }
	}


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	var has = Object.hasOwnProperty
	var proto = Object.getPrototypeOf
	var trace = Error.captureStackTrace
	module.exports = StandardError
	
	function StandardError(msg, props) {
	  // Let all properties be enumerable for easier serialization.
	  if (msg && typeof msg == "object") props = msg, msg = undefined
	  else this.message = msg
	
	  // Name has to be an own property (or on the prototype a single step up) for
	  // the stack to be printed with the correct name.
	  if (props) for (var key in props) this[key] = props[key]
	  if (!has.call(this, "name"))
	    this.name = has.call(proto(this), "name")? this.name : this.constructor.name
	
	  if (trace && !("stack" in this)) trace(this, this.constructor)
	}
	
	StandardError.prototype = Object.create(Error.prototype, {
	  constructor: {value: StandardError, configurable: true, writable: true}
	})
	
	// Set name explicitly for when the code gets minified.
	StandardError.prototype.name = "StandardError"


/***/ }),
/* 73 */
/***/ (function(module, exports) {

	module.exports = {"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 The MIT License (MIT)
	
	 Copyright (c) 2015-2016 Solid
	
	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:
	
	 The above copyright notice and this permission notice shall be included in all
	 copies or substantial portions of the Software.
	
	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 SOFTWARE.
	
	 solid-client is a Javascript library for Solid applications. This library
	 currently depends on rdflib.js. Please make sure to load the rdflib.js script
	 before loading solid-client
	
	 If you would like to know more about the solid Solid project, please see
	 https://github.com/solid/
	 */
	'use strict'
	/**
	 * Provides Solid methods for WebID authentication and signup
	 * @module auth
	 */
	module.exports = ClientAuthTLS
	
	var defaultConfig = __webpack_require__(75)
	
	function ClientAuthTLS (webClient, config) {
	  this.webClient = webClient
	  this.config = config || defaultConfig
	}
	
	/**
	 * Returns the WebID of the current user (by doing a login()/HEAD request to
	 * the current page). Convenience method, useful for standalone apps that aren't
	 * wrapping any resource.
	 * @method currentUser
	 * @return {String} WebID of the current user or `null` if none detected
	 */
	ClientAuthTLS.prototype.currentUser = function currentUser () {
	  if (typeof window === 'undefined') {
	    return null  // only works in the browser
	  }
	  var currentPageUrl = window.location.href
	  return this.login(currentPageUrl)
	    .catch(function (reason) {
	      console.log('Detecting current user failed: %o', reason)
	      return null
	    })
	}
	
	/**
	 * Sets up an event listener to monitor login messages from child window/iframe
	 * @method listen
	 * @return {Promise<String>} Event listener promise, resolves to user's WebID
	 */
	ClientAuthTLS.prototype.listen = function listen () {
	  var promise = new Promise(function (resolve, reject) {
	    var eventMethod = window.addEventListener
	      ? 'addEventListener'
	      : 'attachEvent'
	    var eventListener = window[eventMethod]
	    var messageEvent = eventMethod === 'attachEvent'
	      ? 'onmessage'
	      : 'message'
	    eventListener(messageEvent, function (e) {
	      var u = e.data
	      if (u.slice(0, 5) === 'User:') {
	        var user = u.slice(5, u.length)
	        if (user && user.length > 0 && user.slice(0, 4) === 'http') {
	          return resolve(user)
	        } else {
	          return reject(user)
	        }
	      }
	    }, true)
	  })
	  return promise
	}
	
	/**
	 * Performs a Solid login() via an XHR HEAD operation.
	 * (Attempts to find the current user's WebID from the User header, if
	 *   already authenticated.)
	 * @method login
	 * @static
	 * @param [url] {String} Location of a Solid server or container at which the
	 *   user might be authenticated.
	 *   Defaults to: current page location
	 * @param [alternateAuthUrl] {String} URL of an alternate/default auth endpoint.
	 *   Defaults to `config.authEndpoint`
	 * @return {Promise<String>} XHR HEAD operation promise, resolves to user's WebID
	 */
	ClientAuthTLS.prototype.login = function login (url, alternateAuthUrl) {
	  var defaultAuthEndpoint = this.config.authEndpoint
	  url = url || window.location.origin + window.location.pathname
	  alternateAuthUrl = alternateAuthUrl || defaultAuthEndpoint
	  var webClient = this.webClient
	  // First, see if user is already logged in (do a quick HEAD request)
	  return webClient.head(url)
	    .then(function (solidResponse) {
	      if (solidResponse.isLoggedIn()) {
	        return solidResponse.user
	      } else {
	        // If not logged in, try logging in at an alternate endpoint
	        return webClient.head(alternateAuthUrl)
	          .then(function (solidResponse) {
	            // Will return an empty string is this login also fails
	            return solidResponse.user
	          })
	      }
	    })
	}
	
	/**
	 * Opens a signup popup window, sets up `listen()`.
	 * @method signup
	 * @static
	 * @param signupUrl {String} Location of a Solid server for user signup.
	 * @return {Promise<String>} Returns a listener promise, resolves with signed
	 *   up user's WebID.
	 */
	ClientAuthTLS.prototype.signup = function signup (signupUrl) {
	  signupUrl = signupUrl || this.config.signupEndpoint
	  var width = this.config.signupWindowWidth
	  var height = this.config.signupWindowHeight
	  // set borders
	  var leftPosition = (window.screen.width / 2) - ((width / 2) + 10)
	  // set title and status bars
	  var topPosition = (window.screen.height / 2) - ((height / 2) + 50)
	  var windowTitle = 'Solid signup'
	  var windowUrl = signupUrl + '?origin=' +
	    encodeURIComponent(window.location.origin)
	  var windowSpecs = 'resizable,scrollbars,status,width=' + width + ',height=' +
	    height + ',left=' + leftPosition + ',top=' + topPosition
	  window.open(windowUrl, windowTitle, windowSpecs)
	  var self = this
	  return new Promise(function (resolve) {
	    self.listen()
	      .then(function (webid) {
	        return resolve(webid)
	      })
	  })
	}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

	'use strict'
	/**
	 * Provides a simple configuration object for Solid web client and other
	 * modules.
	 * @module config
	 */
	module.exports = {
	  /**
	   * Default authentication endpoint
	   */
	  authEndpoint: 'https://databox.me/',
	
	  /**
	   * Default signup endpoints (list of identity providers)
	   */
	  signupEndpoint: 'https://solid.github.io/solid-idps/',
	
	  /**
	   * Default height of the Signup popup window, in pixels
	   */
	  signupWindowHeight: 600,
	
	  /**
	   * Default width of the Signup popup window, in pixels
	   */
	  signupWindowWidth: 1024
	}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Provides Solid helper functions involved with parsing a user's WebId profile.
	 * @module identity
	 */
	
	module.exports.discoverWebID = discoverWebID;
	module.exports.getProfile = getProfile;
	module.exports.loadExtendedProfile = loadExtendedProfile;
	
	var SolidProfile = __webpack_require__(77);
	
	/**
	 * Discovers a user's WebId (URL) starting from the account/domain URL.
	 * Usage:
	 *
	 *   ```
	 *   solid.discoverWebID(url)
	 *     .then(function (webId) {
	 *       console.log('Web ID is: ' + webId)
	 *     })
	 *     .catch(function (err) {
	 *       console.log('Could not discover web id: ' + err)
	 *     })
	 *   ```
	 * @method discoverWebID
	 * @param url {String} Location of a user's account or domain.
	 * @throw {Error} Reason why the WebID could not be discovered
	 * @return {Promise<String>}
	 */
	function discoverWebID(url, webClient, ns) {
	  return webClient.options(url).then(function (response) {
	    var metaUrl = response.metaAbsoluteUrl();
	    if (!metaUrl) {
	      throw new Error('Could not find a meta URL in the Link header');
	    }
	    return webClient.get(metaUrl);
	  }).then(function (response) {
	    var graph = response.parsedGraph();
	    var webId = graph.any(undefined, ns.solid('account'));
	    if (!webId || !webId.uri) {
	      throw new Error('Could not find a WebID matching the domain ' + url);
	    }
	    return webId;
	  });
	}
	
	/**
	 * Fetches a user's WebId profile, optionally follows `sameAs` etc links,
	 *   and return a promise with a parsed SolidProfile instance.
	 * @method getProfile
	 * @param webId {String} WebId
	 * @param [options={}] Options hashmap (see solid.web.solidRequest()
	 *   function docs)
	 * @param [options.ignoreExtended=false] Do not load extended profile if true.
	 * @param webClient {SolidWebClient}
	 * @param rdf {RDF} RDF Library
	 * @return {Promise<SolidProfile>}
	 */
	function getProfile(webId, options, webClient, rdf) {
	  options = options || {};
	  // Politely ask for Turtle formatted profiles
	  options.headers = options.headers || {
	    'Accept': 'text/turtle'
	  };
	  options.noCredentials = true; // profiles are always public
	  // Load main profile
	  return webClient.get(webId, options).then(function (response) {
	    var parsedProfile = response.parsedGraph();
	    var profile = new SolidProfile(response.url, parsedProfile, rdf, webClient, response);
	    profile.isLoaded = true;
	    if (options.ignoreExtended) {
	      return profile;
	    } else {
	      return loadExtendedProfile(profile, options, webClient);
	    }
	  });
	}
	
	/**
	 * Loads the related external profile resources (all the `sameAs` and `seeAlso`
	 * links, as well as Preferences), and appends them to the profile's
	 * `parsedGraph`. Returns the profile instance.
	 * @method loadExtendedProfile
	 * @private
	 * @param profile {SolidProfile}
	 * @param [options] Options hashmap (see solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>}
	 */
	function loadExtendedProfile(profile, options, webClient) {
	  var links = profile.relatedProfilesLinks();
	  return webClient.loadParsedGraphs(links, options).then(function (loadedGraphs) {
	    loadedGraphs.forEach(function (graph) {
	      if (graph && graph.value) {
	        profile.appendFromGraph(graph.value, graph.uri);
	      }
	    });
	    return profile;
	  });
	}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module profile
	 */
	
	module.exports = SolidProfile;
	
	var appRegistry = __webpack_require__(78);
	var vocab = __webpack_require__(82);
	var registry = __webpack_require__(83);
	var typeRegistry = __webpack_require__(86);
	var graphUtil = __webpack_require__(84);
	var parseLinks = graphUtil.parseLinks;
	
	var PREFERENCES_DEFAULT_URI = '/settings/prefs.ttl';
	var PROFILE_CONTAINER_DEFAULT_URI = '/profile/';
	
	/**
	 * Provides convenience methods for a WebID Profile.
	 * Used by `identity.getProfile()`
	 * @class SolidProfile
	 * @constructor
	 */
	function SolidProfile(profileUrl, parsedProfile, rdf, webClient, response) {
	  /**
	   * Listed (public) App Registry (link and parsed graph)
	   * @property appRegistryListed
	   * @type Object
	   */
	  this.appRegistryListed = {
	    uri: null,
	    graph: null
	    /**
	     * Unlisted (private) App Registry (link and parsed graph)
	     * @property appRegistryUnlisted
	     * @type Object
	     */
	  };this.appRegistryUnlisted = {
	    uri: null,
	    graph: null
	    /**
	     * Main Inbox resource for this profile (link and parsed graph)
	     * @property inbox
	     * @type Object
	     */
	  };this.inbox = {
	    uri: null,
	    graph: null
	    /**
	     * Has this profile been loaded? (Set in `identity.getProfile()`)
	     * @property isLoaded
	     * @type Boolean
	     */
	  };this.isLoaded = false;
	  /**
	   * Profile owner's avatar / icon url. (Initialized in .appendFromGraph())
	   * @type String
	   */
	  this.picture = null;
	  /**
	   * Profile owner's name. (Initialized in .appendFromGraph())
	   * @property name
	   * @type String
	   */
	  this.name = null;
	  /**
	   * RDF Library used by find(), parsedGraph(), etc.
	   * @property rdf
	   * @type RDF
	   */
	  this.rdf = rdf;
	  /**
	   * Links to root storage containers (read/write dataspaces for this profile)
	   * @property storage
	   * @type Array<String>
	   */
	  this.storage = [];
	  /**
	   * Listed (public) Type registry index (link and parsed graph)
	   * @property typeIndexListed
	   * @type Object
	   */
	  this.typeIndexListed = {
	    uri: null,
	    graph: null
	    /**
	     * Unlisted (private) Type registry index (link and parsed graph)
	     * @property typeIndexUnlisted
	     * @type Object
	     */
	  };this.typeIndexUnlisted = {
	    uri: null,
	    graph: null
	    /**
	     * Parsed graph of the extended WebID Profile document.
	     * Included the WebID profile, preferences, and related profile graphs
	     * @property parsedGraph
	     * @type Graph
	     */
	  };this.parsedGraph = null;
	  /**
	   * Profile preferences object (link and parsed graph).
	   * Currently used as a 'Private Profile', and is part of the Extended Profile.
	   * @property preferences
	   * @type Object
	   */
	  this.preferences = {
	    uri: null,
	    graph: null
	    /**
	     * SolidResponse instance from which this profile object was created.
	     * Contains the raw profile source, the XHR object, etc.
	     * @property response
	     * @type SolidResponse
	     */
	  };this.response = response;
	  /**
	   * Links to "see also" profile documents. Typically loaded immediately
	   * after retrieving the initial WebID Profile document.
	   * @property relatedProfiles
	   * @type Object
	   */
	  this.relatedProfiles = {
	    sameAs: [],
	    seeAlso: []
	    /**
	     * WebId URL (the `foaf:primaryTopic` of the profile document)
	     * @property webId
	     * @type String
	     */
	  };this.webId = null;
	  /**
	   * Web client (for use with loadProfile() etc)
	   * @type SolidWebClient
	   */
	  this.webClient = webClient;
	
	  if (!profileUrl) {
	    return;
	  }
	  /**
	   * Location of the base WebID Profile document (minus the hash fragment).
	   * @property baseProfileUrl
	   * @type String
	   */
	  this.baseProfileUrl = profileUrl.indexOf('#') >= 0 ? profileUrl.slice(0, profileUrl.indexOf('#')) : profileUrl;
	
	  if (parsedProfile) {
	    this.initWebId(parsedProfile);
	    this.appendFromGraph(parsedProfile, this.baseProfileUrl);
	  }
	}
	
	/**
	 * Update the profile based on a parsed graph, which can be either the
	 * initial WebID profile, or the various extended profile graphs
	 * (such as the seeAlso, sameAs and preferences links)
	 * @method appendFromGraph
	 * @private
	 * @param parsedProfile {Graph} RDFLib-parsed user profile
	 * @param profileUrl {String} URL of this particular parsed graph
	 */
	SolidProfile.prototype.appendFromGraph = function appendFromGraph(parsedProfile, profileUrl) {
	  if (!parsedProfile) {
	    return;
	  }
	  var rdf = this.rdf;
	  var ns = vocab(rdf);
	  this.parsedGraph = this.parsedGraph || rdf.graph(); // initialize if null
	  // Add the graph of this parsedProfile to the existing graph
	  graphUtil.appendGraph(this.parsedGraph, parsedProfile, profileUrl);
	
	  var webId = rdf.namedNode(this.webId);
	  var links;
	
	  // Load the profile owner's name and avatar/icon url
	  if (!this.name) {
	    this.name = this.find(ns.foaf('name'));
	  }
	  if (!this.picture) {
	    this.picture = this.find(ns.foaf('img'));
	  }
	  // Add sameAs and seeAlso
	  links = parseLinks(parsedProfile, null, ns.owl('sameAs'));
	  this.relatedProfiles.sameAs = this.relatedProfiles.sameAs.concat(links);
	
	  links = parseLinks(parsedProfile, null, ns.rdfs('seeAlso'));
	  this.relatedProfiles.seeAlso = this.relatedProfiles.seeAlso.concat(links);
	
	  // Add preferencesFile link (singular). Note that preferencesFile has
	  // Write-Once semantics -- it's initialized from public profile, but
	  // cannot be overwritten by related profiles
	  if (!this.preferences.uri) {
	    this.preferences.uri = parseLink(parsedProfile, webId, ns.pim('preferencesFile'));
	  }
	  // Init inbox (singular). Note that inbox has
	  // Write-Once semantics -- it's initialized from public profile, but
	  // cannot be overwritten by related profiles
	  if (!this.inbox.uri) {
	    this.inbox.uri = parseLink(parsedProfile, webId, ns.solid('inbox'));
	  }
	
	  // Add storage
	  links = parseLinks(parsedProfile, webId, ns.pim('storage'));
	  this.storage = this.storage.concat(links);
	
	  // Add links to Listed and Unlisted Type Indexes.
	  // Note: these are just the links.
	  // The actual index files will be loaded and parsed
	  //   in `profile.loadTypeRegistry()`)
	  if (!this.typeIndexListed.uri) {
	    this.typeIndexListed.uri = parseLink(parsedProfile, webId, ns.solid('publicTypeIndex'));
	  }
	  if (!this.typeIndexUnlisted.uri) {
	    this.typeIndexUnlisted.uri = parseLink(parsedProfile, webId, ns.solid('privateTypeIndex'));
	  }
	
	  // Add links to Listed and Unlisted App Registry resources.
	  // Note: these are just the links.
	  // The actual index files will be loaded and parsed
	  //   in `profile.loadAppRegistry()`)
	  if (!this.appRegistryListed.uri) {
	    this.appRegistryListed.uri = parseLink(parsedProfile, webId, ns.solid('publicAppRegistry'));
	  }
	  if (!this.appRegistryUnlisted.uri) {
	    this.appRegistryUnlisted.uri = parseLink(parsedProfile, webId, ns.solid('privateAppRegistry'));
	  }
	};
	
	/**
	 * Returns the default location of the container in which the App Registry
	 * resources will reside. (Uses the same container as the profile
	 * document.)
	 * @method appRegistryDefaultContainer
	 * @return {String}
	 */
	SolidProfile.prototype.appRegistryDefaultContainer = function appRegistryDefaultContainer() {
	  var profileUri = this.webId || this.baseProfileUrl;
	  var baseContainer;
	  if (profileUri) {
	    baseContainer = profileUri.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') + '/';
	  } else {
	    baseContainer = PROFILE_CONTAINER_DEFAULT_URI;
	  }
	  return baseContainer;
	};
	
	/**
	 * Returns a list of registry entries for a given RDF Class.
	 * @method appsForType
	 * @param type {NamedNode} RDF Class
	 * @return {Array<AppRegistration>}
	 */
	SolidProfile.prototype.appsForType = function appsForType(type) {
	  return appRegistry.appsForType(this, type, this.rdf);
	};
	
	/**
	 * Returns the value of a given "field" (predicate) from the profile's parsed
	 * graph. If there are more than one matches for this predicate, .find()
	 * returns the first one. If there are no matches, `null` is returned.
	 * Usage:
	 *
	 *   ```
	 *   var inboxUrl = profile.find(ns.solid('inbox'))
	 *   if (inboxUrl) {
	 *     console.log('Inbox is located at:', inboxUrl)
	 *   }
	 *   ```
	 * @method find
	 * @param predicate {NamedNode} RDF named node of the predicate
	 * @return {String|Null} String value (or uri)
	 */
	SolidProfile.prototype.find = function find(predicate) {
	  if (!this.parsedGraph) {
	    throw new Error('Profile graph not yet loaded.');
	  }
	  var subject = this.rdf.namedNode(this.webId);
	  var result = this.parsedGraph.any(subject, predicate);
	  if (!result) {
	    return result;
	  }
	  return result.value || result.uri;
	};
	
	/**
	 * Returns all values of a given "field" (predicate) from the profile's parsed
	 * graph.
	 * Usage:
	 *
	 *   ```
	 *   var related = profile.findAll(vocab.owl('sameAs'))
	 *   ```
	 * @method findAll
	 * @param predicate {NamedNode} RDF named node of the predicate
	 * @return {Array<String>} Array of string values/uris
	 */
	SolidProfile.prototype.findAll = function findAll(predicate) {
	  if (!this.parsedGraph) {
	    throw new Error('Profile graph not yet loaded.');
	  }
	  var subject = this.rdf.namedNode(this.webId);
	  var matches = this.parsedGraph.statementsMatching(subject, predicate);
	  matches = matches.map(function (ea) {
	    return ea.object.value || ea.object.uri;
	  });
	  return matches.sort();
	};
	
	/**
	 * Extracts the WebID from a parsed profile graph and initializes it.
	 * Should only be done once (when creating a new SolidProfile instance)
	 * @method initWebId
	 * @param parsedProfile {Graph} RDFLib-parsed user profile
	 */
	SolidProfile.prototype.initWebId = function initWebId(parsedProfile) {
	  if (!parsedProfile) {
	    return;
	  }
	  try {
	    this.webId = extractWebId(this.baseProfileUrl, parsedProfile, this.rdf).uri;
	  } catch (e) {
	    throw new Error('Unable to parse WebID from profile: ' + e);
	  }
	};
	
	/**
	 * Returns an array of related external profile links (sameAs and seeAlso and
	 * Preferences files)
	 * @method relatedProfilesLinks
	 * @return {Array<String>}
	 */
	SolidProfile.prototype.relatedProfilesLinks = function relatedProfilesLinks() {
	  var links = [];
	  links = links.concat(this.relatedProfiles.sameAs).concat(this.relatedProfiles.seeAlso);
	  if (this.preferences.uri) {
	    links = links.concat(this.preferences.uri);
	  }
	  return links;
	};
	
	/**
	 * Returns whether or not the profile has a private (unlisted) App Registry
	 * associated with it (linked to from the profile document).
	 * @method hasAppRegistryPrivate
	 * @throws {Error} If the profile has not been loaded (via getProfile()).
	 * @return {Boolean} Returns truthy value if the private (unlisted) app registry
	 *   exists (that is, has a link in the profile).
	 */
	SolidProfile.prototype.hasAppRegistryPrivate = function hasAppRegistryPrivate() {
	  if (!this.isLoaded) {
	    throw new Error('Must load profile before checking if registry exists.');
	  }
	  return this.appRegistryUnlisted.uri;
	};
	
	/**
	 * Returns whether or not the profile has a public (listed) App Registry
	 * associated with it (linked to from the profile document).
	 * @method hasAppRegistryPublic
	 * @throws {Error} If the profile has not been loaded (via getProfile()).
	 * @return {Boolean} Returns truthy value if the public (listed) app registry
	 *   exists (that is, has a link in the profile).
	 */
	SolidProfile.prototype.hasAppRegistryPublic = function hasAppRegistryPublic() {
	  if (!this.isLoaded) {
	    throw new Error('Must load profile before checking if registry exists.');
	  }
	  return this.appRegistryListed.uri;
	};
	
	/**
	 * Returns true if the profile has any links to root storage
	 * @method hasStorage
	 * @return {Boolean}
	 */
	SolidProfile.prototype.hasStorage = function hasStorage() {
	  return this.storage && this.storage.length > 0;
	};
	
	/**
	 * Returns whether or not the profile has a private (unlisted) Type Index
	 * Registry associated with it (linked to from the profile document).
	 * @method hasTypeRegistryPrivate
	 * @throws {Error} If the profile has not been loaded (via getProfile()).
	 * @return {Boolean} Returns truthy value if the private (unlisted) type index
	 *   registry exists (that is, has a link in the profile).
	 */
	SolidProfile.prototype.hasTypeRegistryPrivate = function hasTypeRegistryPrivate() {
	  if (!this.isLoaded) {
	    throw new Error('Must load profile before checking if registry exists.');
	  }
	  return this.typeIndexUnlisted.uri;
	};
	
	/**
	 * Returns whether or not the profile has a public (listed) Type Index Registry
	 * associated with it (linked to from the profile document).
	 * @method hasTypeRegistryPublic
	 * @throws {Error} If the profile has not been loaded (via getProfile()).
	 * @return {Boolean} Returns truthy value if the public (listed) type index
	 *   registry exists (that is, has a link in the profile).
	 */
	SolidProfile.prototype.hasTypeRegistryPublic = function hasTypeRegistryPublic() {
	  if (!this.isLoaded) {
	    throw new Error('Must load profile before checking if registry exists.');
	  }
	  return this.typeIndexListed.uri;
	};
	
	/**
	 * Convenience method to load the app registry. Usage:
	 *
	 *   ```
	 *   Solid.getProfile(url, options)
	 *     .then(function (profile) {
	 *       return profile.loadAppRegistry(webClient, options)
	 *     })
	 *   ```
	 * @method loadAppRegistry
	 * @param [options] Options hashmap (see Solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>}
	 */
	SolidProfile.prototype.loadAppRegistry = function loadAppRegistry(webClient, options) {
	  webClient = webClient || this.webClient;
	  return appRegistry.loadAppRegistry(this, webClient, options);
	};
	
	/**
	 * Convenience method to load the type index registry. Usage:
	 *
	 *   ```
	 *   Solid.getProfile(url, options)
	 *     .then(function (profile) {
	 *       return profile.loadTypeRegistry(options)
	 *     })
	 *   ```
	 * @method loadTypeRegistry
	 * @param webClient {SolidWebClient}
	 * @param [options] Options hashmap (see Solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>}
	 */
	SolidProfile.prototype.loadTypeRegistry = function loadTypeRegistry(webClient, options) {
	  webClient = webClient || this.webClient;
	  return typeRegistry.loadTypeRegistry(this, webClient, options);
	};
	
	/**
	 * Adds a parsed app registry graph to the appropriate registry (public
	 *   or private). (Used when parsing the extended profile).
	 * @method addAppRegistry
	 * @private
	 * @param graph {Graph} Parsed graph (loaded from an app registry resource)
	 * @param uri {String} Location of the app registry document
	 */
	SolidProfile.prototype.addAppRegistry = function addAppRegistry(graph, uri) {
	  // Is this a public app registry?
	  if (registry.isListed(graph, this.rdf)) {
	    if (!this.appRegistryListed.graph) {
	      // only initialize once
	      this.appRegistryListed.uri = uri;
	      this.appRegistryListed.graph = graph;
	    }
	  } else if (registry.isUnlisted(graph, this.rdf)) {
	    if (!this.appRegistryUnlisted.graph) {
	      this.appRegistryUnlisted.uri = uri;
	      this.appRegistryUnlisted.graph = graph;
	    }
	  } else {
	    console.log(graph);
	    throw new Error('Attempting to add an invalid app registry resource');
	  }
	};
	
	/**
	 * Adds a parsed type index graph to the appropriate type registry (public
	 *   or private). (Used when parsing the extended profile).
	 * @method addTypeRegistry
	 * @private
	 * @param graph {Graph} Parsed graph (loaded from a type index
	 *   resource)
	 * @param uri {String} Location of the type registry index document
	 */
	SolidProfile.prototype.addTypeRegistry = function addTypeRegistry(graph, uri) {
	  // Is this a public type registry?
	  if (registry.isListed(graph, this.rdf)) {
	    if (!this.typeIndexListed.graph) {
	      // only initialize once
	      this.typeIndexListed.uri = uri;
	      this.typeIndexListed.graph = graph;
	    }
	  } else if (registry.isUnlisted(graph, this.rdf)) {
	    if (!this.typeIndexUnlisted.graph) {
	      this.typeIndexUnlisted.uri = uri;
	      this.typeIndexUnlisted.graph = graph;
	    }
	  } else {
	    throw new Error('Attempting to add an invalid type registry index');
	  }
	};
	
	/**
	 * Reloads the contents of the profile's App Registry resources.
	 * @method reloadAppRegistry
	 * @return {Promise<SolidProfile>}
	 */
	SolidProfile.prototype.reloadAppRegistry = function reloadAppRegistry(webClient) {
	  this.resetAppRegistry();
	  return this.loadAppRegistry(webClient);
	};
	
	/**
	 * Reloads the contents of the profile's Type Index registries.
	 * @method reloadTypeRegistry
	 * @return {Promise<SolidProfile>}
	 */
	SolidProfile.prototype.reloadTypeRegistry = function reloadTypeRegistry(webClient) {
	  this.resetTypeRegistry();
	  return this.loadTypeRegistry(webClient);
	};
	
	/**
	 * Resets the contents (graphs) of the profile's App Registry resources to null.
	 * Used internally by `reloadAppRegistry()`.
	 * @method resetAppRegistry
	 * @private
	 */
	SolidProfile.prototype.resetAppRegistry = function resetAppRegistry() {
	  this.appRegistryListed.graph = null;
	  this.appRegistryUnlisted.graph = null;
	};
	
	/**
	 * Resets the contents (graphs) of the profile's Type Index registries to null.
	 * Used internally by `reloadTypeRegistry()`.
	 * @method resetTypeRegistry
	 * @private
	 */
	SolidProfile.prototype.resetTypeRegistry = function resetTypeRegistry() {
	  this.typeIndexListed.graph = null;
	  this.typeIndexUnlisted.graph = null;
	};
	
	/**
	 * Returns lists of registry entries for a given RDF Class.
	 * @method typeRegistryForClass
	 * @param rdfClass {rdf.NamedNode} RDF Class symbol
	 * @return {Array<IndexRegistration>}
	 */
	SolidProfile.prototype.typeRegistryForClass = function typeRegistryForClass(rdfClass) {
	  return typeRegistry.typeRegistryForClass(this, rdfClass, this.rdf);
	};
	
	/**
	 * Returns the default location of the container in which the Type Registry
	 * Index resources will reside. (Uses the same container as the profile
	 * document.)
	 * @method typeRegistryDefaultContainer
	 * @return {String}
	 */
	SolidProfile.prototype.typeRegistryDefaultContainer = function typeRegistryDefaultContainer() {
	  var profileUri = this.webId || this.baseProfileUrl;
	  var baseContainer;
	  if (profileUri) {
	    baseContainer = profileUri.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '') + '/';
	  } else {
	    baseContainer = PROFILE_CONTAINER_DEFAULT_URI;
	  }
	  return baseContainer;
	};
	
	/**
	 * Returns the relative URL of the private profile (preferences) resource.
	 * @method privateProfileUri
	 * @return {String}
	 */
	SolidProfile.prototype.privateProfileUri = function privateProfileUri() {
	  if (this.preferences && this.preferences.uri) {
	    return this.preferences.uri;
	  } else {
	    return PREFERENCES_DEFAULT_URI;
	  }
	};
	
	/**
	 * Registers a given entry in the app registry.
	 * @method registerApp
	 * @param app {AppRegistration}
	 * @return {Promise<SolidProfile>} Returns updated profile.
	 */
	SolidProfile.prototype.registerApp = function registerApp(app, webClient) {
	  webClient = webClient || this.webClient;
	  return appRegistry.registerApp(this, app, webClient);
	};
	
	/**
	 * Registers a given RDF class in the user's type index registries, so that
	 * other applications can discover it.
	 * @method registerType
	 * @param rdfClass {rdf.NamedNode} Type to register in the index.
	 * @param location {String} Absolute URI to the location you want the class
	 *   registered to. (Example: Registering Address books in
	 *   `https://example.com/contacts/`)
	 * @param [locationType='container'] {String} Either 'instance' or 'container',
	 *   defaults to 'container'
	 * @param [isListed=false] {Boolean} Whether to register in a listed or unlisted
	 *   index). Defaults to `false` (unlisted).
	 * @return {Promise<SolidProfile>}
	 */
	SolidProfile.prototype.registerType = function registerType(rdfClass, location, locationType, isListed) {
	  return typeRegistry.registerType(this, rdfClass, location, locationType, isListed, this.webClient);
	};
	
	/**
	 * Removes a given RDF class from the user's type index registry
	 * @method unregisterType
	 * @param rdfClass {NamedNode} Type to register in the index.
	 * @param [isListed=false] {Boolean} Whether to register in a listed or unlisted
	 *   index). Defaults to `false` (unlisted).
	 * @param [location] {String} If present, only unregister the class from this
	 *   location (absolute URI).
	 * @return {Promise<SolidProfile>}
	 */
	SolidProfile.prototype.unregisterType = function unregisterType(rdfClass, isListed, location) {
	  return typeRegistry.unregisterType(this, rdfClass, isListed, location, this.webClient);
	};
	
	/**
	 * Extracts the WebID symbol from a parsed profile graph.
	 * @method extractWebId
	 * @param baseProfileUrl {String} Profile URL, with no hash fragment
	 * @param parsedProfile {Graph} RDFLib-parsed user profile
	 * @return {NamedNode} WebID symbol
	 */
	function extractWebId(baseProfileUrl, parsedProfile, rdf) {
	  var ns = vocab(rdf);
	  var subj = rdf.namedNode(baseProfileUrl);
	  var pred = ns.foaf('primaryTopic');
	  var match = parsedProfile.any(subj, pred);
	  return match;
	}
	
	/**
	 * Extracts the first URI from a parsed graph that matches parameters
	 * @method parseLinks
	 * @param graph {Graph}
	 * @param subject {NamedNode}
	 * @param predicate {NamedNode}
	 * @param object {NamedNode}
	 * @param source {NamedNode}
	 * @return {String} URI that matches the parameters
	 */
	function parseLink(graph, subject, predicate, object, source) {
	  var first = graph.any(subject, predicate, object, source);
	  if (first) {
	    return first.uri;
	  } else {
	    return null;
	  }
	}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Provides Solid helper functions involved with initializing, reading and
	 * writing the App Registry resources.
	 * @module app-registry
	 */
	
	module.exports.addToAppRegistry = addToAppRegistry;
	module.exports.blankPrivateAppRegistry = blankPrivateAppRegistry;
	module.exports.blankPublicAppRegistry = blankPublicAppRegistry;
	module.exports.initAppRegistryPrivate = initAppRegistryPrivate;
	module.exports.initAppRegistryPublic = initAppRegistryPublic;
	module.exports.loadAppRegistry = loadAppRegistry;
	module.exports.appsForType = appsForType;
	module.exports.registerApp = registerApp;
	module.exports.registrationsFromGraph = registrationsFromGraph;
	
	var AppRegistration = __webpack_require__(79);
	var graphUtil = __webpack_require__(84);
	var util = __webpack_require__(85);
	var vocab = __webpack_require__(82);
	var webUtil = __webpack_require__(85);
	
	/**
	 * Adds an RDF class to a user's app registry, and returns the
	 * profile (with the appropriate registry graph updated).
	 * Called by `registerApp()`, which does all the argument validation.
	 * @method addToAppRegistry
	 * @param profile {SolidProfile}
	 * @param app {AppRegistration}
	 * @param webClient {SolidWebClient}
	 * @return {Promise<SolidProfile>} Returns updated profile
	 */
	function addToAppRegistry(profile, app, webClient) {
	  // TODO: Check to see if a registry entry for this type already exists.
	  var registryUri;
	  var registryGraph;
	  if (app.isListed) {
	    registryUri = profile.appRegistryListed.uri;
	    registryGraph = profile.appRegistryListed.graph;
	  } else {
	    registryUri = profile.appRegistryUnlisted.uri;
	    registryGraph = profile.appRegistryUnlisted.graph;
	  }
	  if (!registryUri) {
	    throw new Error('Cannot register app, registry URL missing');
	  }
	  var rdf = profile.rdf;
	  // triples to delete (none for the moment)
	  var toDel = [];
	  // Create the list of triples to add in the PATCH operation
	  var toAdd = app.rdfStatements(rdf);
	  return webClient.patch(registryUri, toDel, toAdd).then(function (response) {
	    // Update the profile object with the new registry without reloading
	    var newRegistration = graphUtil.graphFromStatements(toAdd, rdf);
	    if (registryGraph) {
	      graphUtil.appendGraph(registryGraph, newRegistration);
	    } else {
	      profile[app.isListed ? 'appRegistryListed' : 'appRegistryUnlisted'].graph = newRegistration;
	    }
	    return profile;
	  });
	}
	
	/**
	 * Returns a list of registry entries for a profile and a given RDF Class.
	 * @method appsForType
	 * @param profile {SolidProfile}
	 * @param type {NamedNode} RDF Class
	 * @param rdf {RDF} RDF Library
	 * @return {Array<AppRegistration>}
	 */
	function appsForType(profile, type, rdf) {
	  var registrations = [];
	  return registrations.concat(
	  // Public/listed registrations
	  registrationsFromGraph(profile.appRegistryListed.graph, type, rdf)).concat(
	  // Private/unlisted registrations
	  registrationsFromGraph(profile.appRegistryUnlisted.graph, type, rdf));
	}
	
	/**
	 * Returns a blank private app registry option.
	 * For use with `initAppRegistry()`.
	 * @method blankPrivateAppRegistry
	 * @private
	 * @return {Object} Blank app registry object
	 */
	function blankPrivateAppRegistry(rdf) {
	  var ns = vocab(rdf);
	  var thisDoc = rdf.namedNode('');
	  var registryStatements = [rdf.triple(thisDoc, ns.rdf('type'), ns.solid('AppRegistry')), rdf.triple(thisDoc, ns.rdf('type'), ns.solid('UnlistedDocument'))];
	  var registry = {
	    data: graphUtil.serializeStatements(registryStatements),
	    graph: graphUtil.graphFromStatements(registryStatements, rdf),
	    slug: 'privateAppRegistry.ttl',
	    uri: null // actual url not yet known
	  };
	  return registry;
	}
	
	/**
	 * Returns a blank public app registry option.
	 * For use with `initAppRegistry()`.
	 * @method blankPublicAppRegistry
	 * @private
	 * @return {Object} Blank app registry object
	 */
	function blankPublicAppRegistry(rdf) {
	  var ns = vocab(rdf);
	  var thisDoc = rdf.namedNode('');
	  var registryStatements = [rdf.triple(thisDoc, ns.rdf('type'), ns.solid('AppRegistry')), rdf.triple(thisDoc, ns.rdf('type'), ns.solid('ListedDocument'))];
	  var registry = {
	    data: graphUtil.serializeStatements(registryStatements),
	    graph: graphUtil.graphFromStatements(registryStatements, rdf),
	    slug: 'publicAppRegistry.ttl',
	    uri: null // actual url not yet known
	  };
	  return registry;
	}
	
	/**
	 * Initializes the private App Registry resource, updates
	 * the profile with the initialized registry, and returns the updated profile.
	 * @method initAppRegistryPrivate
	 * @param profile {SolidProfile} User's WebID profile
	 * @param [options={}] Options hashmap (see solid.web.solidRequest()
	 *   function docs)
	 * @return {Promise<SolidProfile>} Resolves with the updated profile instance.
	 */
	function initAppRegistryPrivate(profile, webClient, options) {
	  options = options || {};
	  var rdf = profile.rdf;
	  var ns = vocab(rdf);
	  var registryContainerUri = profile.appRegistryDefaultContainer();
	  var webId = rdf.namedNode(profile.webId);
	  var registry = blankPrivateAppRegistry(rdf);
	  // First, create the private App Registry resource
	  return webClient.post(registryContainerUri, registry.data, registry.slug).catch(function (err) {
	    throw new Error('Could not create private registry document:', err);
	  }).then(function (response) {
	    // Private registry resource created.
	    // Update the private profile (preferences) to link to it.
	    registry.uri = util.absoluteUrl(webUtil.hostname(registryContainerUri), response.url);
	    var toAdd = [rdf.triple(webId, ns.solid('privateAppRegistry'), rdf.namedNode(registry.uri))];
	    var toDel = [];
	    // Note: this PATCH will actually create a private profile if it doesn't
	    // already exist.
	    return webClient.patch(profile.privateProfileUri(), toDel, toAdd, options);
	  }).catch(function (err) {
	    throw new Error('Could not update profile with private registry:' + err);
	  }).then(function (response) {
	    // Profile successfully patched with a link to the created private registry
	    // It's safe to update this instance of profile
	    profile.appRegistryUnlisted = registry;
	    // Finally, return the updated profile with registry loaded
	    return profile;
	  });
	}
	
	/**
	 * Initializes the public App Registry resource, updates
	 * the profile with the initialized registry, and returns the updated profile.
	 * @method initAppRegistryPublic
	 * @param profile {SolidProfile} User's WebID profile
	 * @param [options] Options hashmap (see solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>} Resolves with the updated profile instance.
	 */
	function initAppRegistryPublic(profile, webClient, options) {
	  options = options || {};
	  var rdf = profile.rdf;
	  var ns = vocab(rdf);
	  var registryContainerUri = profile.appRegistryDefaultContainer();
	  var webId = rdf.namedNode(profile.webId);
	  var registry = blankPublicAppRegistry(rdf);
	  // First, create the public registry Registry resource
	  return webClient.post(registryContainerUri, registry.data, registry.slug).catch(function (err) {
	    throw new Error('Could not create public registry document:', err);
	  }).then(function (response) {
	    // Public registry resource created. Update the profile to link to it.
	    registry.uri = util.absoluteUrl(webUtil.hostname(registryContainerUri), response.url);
	    var toAdd = [rdf.triple(webId, ns.solid('publicAppRegistry'), rdf.namedNode(registry.uri))];
	    var toDel = [];
	    return webClient.patch(profile.webId, toDel, toAdd, options);
	  }).catch(function (err) {
	    throw new Error('Could not update profile with public registry:', err);
	  }).then(function (response) {
	    // Profile successfully patched with a link to the created public registry
	    // It's safe to update this instance of profile
	    profile.appRegistryListed = registry;
	    // Finally, return the updated profile with registry loaded
	    return profile;
	  });
	}
	
	/**
	 * Loads the public and private app registry resources, adds them
	 * to the profile, and returns the profile.
	 * Called by the profile.loadAppRegistry() alias method.
	 * Usage:
	 *
	 *   ```
	 * var profile = solid.getProfile(url, options)
	 *   .then(function (profile) {
	 *     return profile.loadAppRegistry(options)
	 *   })
	 *   ```
	 * @method loadAppRegistry
	 * @param profile {SolidProfile}
	 * @param webClient {SolidWebClient}
	 * @param [options={}] Options hashmap (see solid.web.solidRequest()
	 *   function docs)
	 * @return {Promise<SolidProfile>}
	 */
	function loadAppRegistry(profile, webClient, options) {
	  options = options || {};
	  options.headers = options.headers || {};
	  // Politely ask for Turtle format
	  if (!options.headers['Accept']) {
	    options.headers['Accept'] = 'text/turtle';
	  }
	  // load public and private registry resources
	  var links = [];
	  if (profile.appRegistryListed.uri) {
	    links.push(profile.appRegistryListed.uri);
	  }
	  if (profile.appRegistryUnlisted.uri) {
	    links.push(profile.appRegistryUnlisted.uri);
	  }
	  return webClient.loadParsedGraphs(links, options).then(function (loadedGraphs) {
	    loadedGraphs.forEach(function (graph) {
	      // For each registry resource loaded, add it to `profile.appRegistryListed`
	      //  or `profile.appRegistryUnlisted` as appropriate
	      if (graph && graph.value) {
	        profile.addAppRegistry(graph.value, graph.uri);
	      }
	    });
	    return profile;
	  });
	}
	
	/**
	 * Registers a given entry in the app registry.
	 * @method registerApp
	 * @param profile {SolidProfile}
	 * @param app {AppRegistration}
	 * @param webClient {SolidWebClient}
	 * @return {Promise<SolidProfile>} Returns updated profile.
	 */
	function registerApp(profile, app, webClient) {
	  if (!profile) {
	    throw new Error('No profile provided');
	  }
	  if (!profile.isLoaded) {
	    throw new Error('Profile is not loaded');
	  }
	  if (!app || !app.isValid()) {
	    throw new Error('Invalid app registration');
	  }
	  // make sure app registry is loaded
	  return loadAppRegistry(profile, webClient).then(function (profile) {
	    if (app.isListed && !profile.hasAppRegistryPublic()) {
	      // Public App registry is needed, but doesn't exist. Create it.
	      return initAppRegistryPublic(profile, webClient);
	    }
	    if (!app.isListed && !profile.hasAppRegistryPrivate()) {
	      // Private App registry is needed, but doesn't exist. Create it.
	      return initAppRegistryPrivate(profile, webClient);
	    }
	    // Relevant App registry exists, proceed
	    return profile;
	  }).then(function (profile) {
	    // Made sure the relevant app registry exists, and can now add to it
	    return addToAppRegistry(profile, app, webClient);
	  });
	}
	
	/**
	 * Returns a list of registry entries from a given parsed type index graph.
	 * @method registrationsFromGraph
	 * @param graph {Graph} Parsed type index graph
	 * @param type {NamedNode} RDF Class
	 * @param rdf {RDF} RDF Library
	 * @return {Array<AppRegistration>}
	 */
	function registrationsFromGraph(graph, type, rdf) {
	  var entrySubject;
	  var ns = vocab(rdf);
	  var registrations = [];
	  if (!graph) {
	    return registrations;
	  }
	  graph.statementsMatching(null, ns.app('commonType'), type).forEach(function (entry) {
	    entrySubject = entry.subject;
	    var app = new AppRegistration();
	    app.initFromGraph(entrySubject, graph, rdf);
	    registrations.push(app);
	  });
	  return registrations;
	}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module app-registration
	 */
	
	module.exports = AppRegistration;
	
	var hash = __webpack_require__(80);
	var vocab = __webpack_require__(82);
	var registry = __webpack_require__(83);
	
	/**
	 * Represents a Solid App Registry registration (an entry in the App Registry).
	 * Returned in a list by `profile.appForType()`
	 * @class AppRegistration
	 * @constructor
	 * @param [options={}] {Object} Hashmap of app registration options.
	 * @param [options.name] {String} App name (required for valid registration)
	 * @param [options.shortdesc] {String}
	 * @param [options.redirectTemplateUri] {String}
	 * @param types {Array<String>|Array<NamedNode>} List of types / RDF classes for
	 *   which this app is registered. This app will be used to open those types
	 *   by Solid servers that support this functionality.
	 * @param [isListed=false] {Boolean} Register in a listed or unlisted registry.
	 */
	function AppRegistration(options, types, isListed) {
	  options = options || {};
	  /**
	   * Is this registered in a listed or unlisted registry
	   * @property isListed
	   * @type Boolean
	   */
	  this.isListed = isListed;
	  /**
	   * App name
	   * @property name
	   * @type String
	   */
	  this.name = options.name;
	  /**
	   * URI template that will be redirected to if the server gets a request
	   * for one of the registered types. For example:
	   * 'https://solid.github.io/contacts/?uri={uri}'
	   * @property redirectTemplateUri
	   * @type String
	   */
	  this.redirectTemplateUri = options.redirectTemplateUri;
	  /**
	   * Absolute URI (with fragment identifier) of the registration.
	   * This is only set when this instance is created as a result of querying
	   * the app registry.
	   * @property registrationUri
	   * @type String
	   */
	  this.registrationUri = null;
	  /**
	   * Short description of the app
	   * @property shortdesc
	   * @type String
	   */
	  this.shortdesc = options.shortdesc;
	  /**
	   * List of types / RDF classes for which this app is registered.
	   * This app will be used to open those types by Solid servers that support
	   * this functionality.
	   * @property types
	   * @type {Array<String>|Array<NamedNode>}
	   */
	  this.types = types || [];
	}
	
	/**
	 * Returns a unique hash fragment identifier for this registration (a hash of
	 * the `redirectTemplateUri` property).
	 * @method hashFragment
	 * @return {String}
	 */
	AppRegistration.prototype.hashFragment = function hashFragment() {
	  var fragmentId = hash.unique(this.redirectTemplateUri);
	  return fragmentId;
	};
	
	/**
	 * Initializes the registration details from a parsed registry graph.
	 * @method initFromGraph
	 * @param subject {NamedNode} Hash fragment uri of the registration
	 * @param graph {Graph} Parsed registry graph
	 * @param rdf {RDF} RDF Library
	 */
	AppRegistration.prototype.initFromGraph = function initFromGraph(subject, graph, rdf) {
	  this.registrationUri = subject.uri;
	  this.isListed = !!registry.isListed(graph, rdf);
	  this.types = [];
	  var self = this;
	  var ns = vocab(rdf);
	  // Load the types
	  graph.statementsMatching(subject, ns.app('commonType')).forEach(function (typeStatement) {
	    self.types.push(typeStatement.object.uri);
	  });
	  var match;
	  match = graph.any(subject, ns.app('name'));
	  if (match) {
	    this.name = match.value;
	  }
	  match = graph.any(subject, ns.app('shortdesc'));
	  if (match) {
	    this.shortdesc = match.value;
	  }
	  match = graph.any(subject, ns.app('redirectTemplateUri'));
	  if (match) {
	    this.redirectTemplateUri = match.value;
	  }
	};
	
	/**
	 * Is this a valid app registration entry that can be added to the registry?
	 * (A registration is considered valid if it has a name, at least one type,
	 * and a redirectUri)
	 * @method isValid
	 * @return {Boolean}
	 */
	AppRegistration.prototype.isValid = function isValid() {
	  return this.name && this.redirectTemplateUri && this.types.length > 0;
	};
	
	/**
	 * Returns an array of RDF statements representing this app registration.
	 * @method rdfStatements
	 * @return {Array<Statement>} List of RDF statements representing registration,
	 *   or an empty array if this registration is invalid.
	 */
	AppRegistration.prototype.rdfStatements = function rdfStatements(rdf) {
	  var hashFragment = rdf.namedNode('#' + this.hashFragment());
	  var statements = [];
	  var ns = vocab(rdf);
	  // example: '<#ab09fd> a solid:AppRegistration;'
	  statements.push(rdf.triple(hashFragment, ns.rdf('type'), ns.solid('AppRegistration')), rdf.triple(hashFragment, ns.app('name'), this.name), rdf.triple(hashFragment, ns.app('shortdesc'), this.shortdesc), rdf.triple(hashFragment, ns.app('redirectTemplateUri'), this.redirectTemplateUri));
	  this.types.forEach(function (type) {
	    statements.push(rdf.triple(hashFragment, ns.app('commonType'), type));
	  });
	
	  return statements;
	};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(81);

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	
	/*
		shorthash
		(c) 2013 Bibig
		
		https://github.com/bibig/node-shorthash
		shorthash may be freely distributed under the MIT license.
	*/
	
	exports.bitwise = bitwise;
	exports.binaryTransfer = binaryTransfer;
	exports.unique = unique;
	exports.random = random;
	
	// refer to: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
	function bitwise(str){
		var hash = 0;
		if (str.length == 0) return hash;
		for (var i = 0; i < str.length; i++) {
			var ch = str.charCodeAt(i);
			hash = ((hash<<5)-hash) + ch;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}
	
	// 10进制转化成62进制以内的进制
	// convert 10 binary to customized binary, max is 62
	function binaryTransfer(integer, binary) {
		binary = binary || 62;
		var stack = [];
		var num;
		var result = '';
		var sign = integer < 0 ? '-' : '';
		
		function table (num) {
			var t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			return t[num];
		}
		
		integer = Math.abs(integer);
		
		while (integer >= binary) {
			num = integer % binary;
			integer = Math.floor(integer / binary);
			stack.push(table(num));
		}
		
		if (integer > 0) {
			stack.push(table(integer));
		}
		
		for (var i = stack.length - 1; i >= 0; i--) {
			result += stack[i];
		} 
		
		return sign + result;
	}
	
	
	/**
	 * why choose 61 binary, because we need the last element char to replace the minus sign
	 * eg: -aGtzd will be ZaGtzd
	 */
	function unique (text) {
		var id = binaryTransfer(bitwise(text), 61);
		return id.replace('-', 'Z');
	}
	
	function random (_len) {
		/*
		var len = _len || 8 ;
		return require('crypto').randomBytes(len).toString('hex');
		*/
		
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var rs = '';
		var len = _len || 8 ;
		for (var i=0; i< len; i++) {
			var pos = Math.floor( Math.random() * chars.length);
			rs += chars.substring(pos, pos + 1);
		}
		return rs;
	}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict'
	/**
	 * Provides a hashmap of relevant vocabs / namespaces.
	 * Usage:
	 *
	 *   ```
	 *   var rdf = require('rdflib')  // optional
	 *   var vocab = require('solid-vocab')(rdf)  // or require('solid-vocab')()
	 *   console.log(vocab.foaf('name'))  // -> <http://xmlns.com/foaf/0.1/name>
	 *   ```
	 * @module vocab
	 */
	
	/**
	 * @param [rdf] {RDF} Optional RDF Library (such as rdflib.js or rdf-ext) to
	 *   inject
	 */
	function vocab (rdf) {
	  var ns = __webpack_require__(67)(rdf)
	  var vocabMap = {
	    'acl': ns.base('http://www.w3.org/ns/auth/acl#'),
	    'app': ns.base('http://www.w3.org/ns/solid/app#'),
	    'cert': ns.base('http://www.w3.org/ns/auth/cert#'),
	    'dct': ns.base('http://purl.org/dc/terms/'),
	    'foaf': ns.base('http://xmlns.com/foaf/0.1/'),
	    'ldp': ns.base('http://www.w3.org/ns/ldp#'),
	    'owl': ns.base('http://www.w3.org/2002/07/owl#'),
	    'pim': ns.base('http://www.w3.org/ns/pim/space#'),
	    'rdf': ns.base('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
	    'rdfs': ns.base('http://www.w3.org/2000/01/rdf-schema#'),
	    'schema': ns.base('http://schema.org/'),
	    'sioc': ns.base('http://rdfs.org/sioc/ns#'),
	    'solid': ns.base('http://www.w3.org/ns/solid/terms#'),
	    'stat': ns.base('http://www.w3.org/ns/posix/stat#'),
	    'vcard': ns.base('http://www.w3.org/2006/vcard/ns#'),
	    'xsd': ns.base('http://www.w3.org/2001/XMLSchema#')
	  }
	  return vocabMap
	}
	
	module.exports = vocab


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module registry
	 */
	
	module.exports.isListed = isListed;
	module.exports.isUnlisted = isUnlisted;
	
	var vocab = __webpack_require__(82);
	
	/**
	 * Returns true if the parsed graph is a `solid:UnlistedDocument` document.
	 * @method isUnlisted
	 * @param graph {Graph} Parsed graph (loaded from a registry-like resource)
	 * @return {Boolean}
	 */
	function isUnlisted(graph, rdf) {
	  var ns = vocab(rdf);
	  return graph.any(graph.uri, ns.rdf('type'), ns.solid('UnlistedDocument'), graph.uri);
	}
	
	/**
	 * Returns true if the parsed graph is a `solid:ListedDocument` document.
	 * @method isListed
	 * @param graph {Graph} Parsed graph (loaded from a registry-like resource)
	 * @return {Boolean}
	 */
	function isListed(graph, rdf) {
	  var ns = vocab(rdf);
	  return graph.any(graph.uri, ns.rdf('type'), ns.solid('ListedDocument'), graph.uri);
	}

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Provides convenience methods for graph manipulation.
	 * Currently depends on RDFLib
	 * @module graph-util
	 */
	
	module.exports.appendGraph = appendGraph;
	module.exports.parseGraph = parseGraph;
	module.exports.parseLinks = parseLinks;
	module.exports.serializeStatements = serializeStatements;
	module.exports.graphFromStatements = graphFromStatements;
	module.exports.statementToNT = statementToNT;
	
	var ALL_STATEMENTS = null;
	
	/**
	 * Appends RDF statements from one graph object to another
	 * @method appendGraph
	 * @param toGraph {Graph} Graph object to append to
	 * @param fromGraph {Graph} Graph object to append from
	 */
	function appendGraph(toGraph, fromGraph) {
	  // var source = (docURI) ? rdf.sym(docURI) : undefined
	  fromGraph.statementsMatching(ALL_STATEMENTS).forEach(function (st) {
	    toGraph.add(st.subject, st.predicate, st.object, st.why);
	  });
	}
	
	/**
	 * Converts a statement to string (if it isn't already), optionally slices off
	 * the period at the end, and returns the statement.
	 * @method statementToNT
	 * @param statement {String|Statement} RDF Statement to be converted.
	 * @param [excludeDot=false] {Boolean} Optionally slice off ending period.
	 * @return {String}
	 */
	function statementToNT(statement, excludeDot) {
	  if (typeof statement !== 'string') {
	    // This is an RDF Statement. Convert to string
	    statement = statement.toNT();
	  }
	  if (excludeDot && statement.endsWith('.')) {
	    statement = statement.slice(0, -1);
	  }
	  return statement;
	}
	
	/**
	 * Converts a list of RDF statements into an rdflib Graph (Formula), and returns
	 * it.
	 * @method graphFromStatements
	 * @param statements {Array<Statement>}
	 * @return {Graph}
	 */
	function graphFromStatements(statements, rdf) {
	  var graph = rdf.graph();
	  statements.forEach(function (st) {
	    graph.add(st);
	  });
	  return graph;
	}
	
	/**
	 * Parses a given graph, from text rdfSource, as a given content type.
	 * Returns parsed graph.
	 * @method parseGraph
	 * @param baseUrl {String}
	 * @param rdfSource {String} Text source code
	 * @param contentType {String} Mime Type (determines which parser to use)
	 * @return {Graph}
	 */
	function parseGraph(baseUrl, rdfSource, contentType, rdf) {
	  var parsedGraph = rdf.graph();
	  rdf.parse(rdfSource, parsedGraph, baseUrl, contentType);
	  return parsedGraph;
	}
	
	/**
	 * Extracts the URIs from a parsed graph that match parameters.
	 * The URIs are a set (duplicates are removed)
	 * @method parseLinks+
	 * @param graph {Graph}
	 * @param subject {Symbol}
	 * @param predicate {Symbol}
	 * @param object {Symbol}
	 * @param source {Symbol}
	 * @return {Array<String>} Array of link URIs that match the parameters
	 */
	function parseLinks(graph, subject, predicate, object, source) {
	  var links = {};
	  var matches = graph.statementsMatching(subject, predicate, object, source);
	  matches.forEach(function (match) {
	    links[match.object.uri] = true;
	  });
	  return Object.keys(links);
	}
	
	/**
	 * Serializes an array of RDF statements into a simple N-Triples format
	 * suitable for writing to a solid server.
	 * @method serializeStatements
	 * @param statements {Array<Statement>} List of RDF statements
	 * @return {String}
	 */
	function serializeStatements(statements) {
	  var source = statements.map(function (st) {
	    return st.toNT();
	  });
	  source = source.join('\n');
	  return source;
	}

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Provides misc utility functions for the web client
	 * @module web-util
	 */
	
	module.exports.parseAllowedMethods = parseAllowedMethods;
	module.exports.parseLinkHeader = parseLinkHeader;
	module.exports.absoluteUrl = absoluteUrl;
	module.exports.hostname = hostname;
	
	/**
	 * Extracts the allowed HTTP methods from the 'Allow' and 'Accept-Patch'
	 * headers, and returns a hashmap of verbs allowed by the server
	 * @method parseAllowedMethods
	 * @param allowMethodsHeader {String} `Access-Control-Allow-Methods` response
	 *   header
	 * @param acceptPatchHeader {String} `Accept-Patch` response header
	 * @return {Object} Hashmap of verbs (in lowercase) allowed by the server for
	 *   the current user. Example:
	 *   ```
	 *   {
	 *     'get': true,
	 *     'put': true
	 *   }
	 *   ```
	 */
	function parseAllowedMethods(allowMethodsHeader, acceptPatchHeader) {
	  var allowedMethods = {};
	  if (allowMethodsHeader) {
	    var verbs = allowMethodsHeader.split(',');
	    verbs.forEach(function (methodName) {
	      if (methodName && allowMethodsHeader.indexOf(methodName) >= 0) {
	        allowedMethods[methodName.trim().toLowerCase()] = true;
	      }
	    });
	  }
	  if (acceptPatchHeader && acceptPatchHeader.indexOf('application/sparql-update') >= 0) {
	    allowedMethods.patch = true;
	  }
	  return allowedMethods;
	}
	
	/**
	* Parses a Link header from an XHR HTTP Request.
	* @method parseLinkHeader
	* @param link {String} Contents of the Link response header
	* @return {Object}
	*/
	function parseLinkHeader(link) {
	  if (!link) {
	    return {};
	  }
	  var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
	  var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;
	  var matches = link.match(linkexp);
	  var rels = {};
	  for (var i = 0; i < matches.length; i++) {
	    var split = matches[i].split('>');
	    var href = split[0].substring(1);
	    var ps = split[1];
	    var s = ps.match(paramexp);
	
	    for (var j = 0; j < s.length; j++) {
	      var p = s[j];
	      var paramsplit = p.split('=');
	      // var name = paramsplit[0]
	      var rel = paramsplit[1].replace(/["']/g, '');
	      if (!rels[rel]) {
	        rels[rel] = [];
	      }
	      rels[rel].push(href);
	      if (rels[rel].length > 1) {
	        rels[rel].sort();
	      }
	    }
	  }
	  return rels;
	}
	
	function hostname(url) {
	  var protocol, hostname, result, pathSegments;
	  var fragments = url.split('//');
	  if (fragments.length === 2) {
	    protocol = fragments[0];
	    hostname = fragments[1];
	  } else {
	    hostname = url;
	  }
	  pathSegments = hostname.split('/');
	  if (protocol) {
	    result = protocol + '//' + pathSegments[0];
	  } else {
	    result = pathSegments[0];
	  }
	  if (url.startsWith('//')) {
	    result = '//' + result;
	  }
	  return result;
	}
	
	/**
	* Return an absolute URL
	* @method absoluteUrl
	* @param baseUrl {String} URL to be used as base
	* @param pathUrl {String} Absolute or relative URL
	* @return {String}
	*/
	function absoluteUrl(baseUrl, pathUrl) {
	  if (pathUrl && pathUrl.slice(0, 4) !== 'http') {
	    return [baseUrl, pathUrl].map(function (path) {
	      if (path[0] === '/') {
	        path = path.slice(1);
	      }
	      if (path[path.length - 1] === '/') {
	        path = path.slice(0, path.length - 1);
	      }
	      return path;
	    }).join('/');
	  }
	  return pathUrl;
	}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Provides Solid helper functions involved with loading the Type Index
	 * Registry files, and with registering resources with them.
	 * @module type-registry
	 */
	
	module.exports.addToTypeIndex = addToTypeIndex;
	module.exports.blankPrivateTypeIndex = blankPrivateTypeIndex;
	module.exports.blankPublicTypeIndex = blankPublicTypeIndex;
	module.exports.initTypeRegistryPrivate = initTypeRegistryPrivate;
	module.exports.initTypeRegistryPublic = initTypeRegistryPublic;
	module.exports.loadTypeRegistry = loadTypeRegistry;
	module.exports.registerType = registerType;
	module.exports.typeRegistryForClass = typeRegistryForClass;
	module.exports.unregisterType = unregisterType;
	
	var IndexRegistration = __webpack_require__(87);
	var util = __webpack_require__(85);
	var graphUtil = __webpack_require__(84);
	var webUtil = __webpack_require__(85);
	var vocab = __webpack_require__(82);
	
	/**
	 * Returns a blank private type index registry option.
	 * For use with `initTypeRegistry()`.
	 * @method blankPrivateTypeIndex
	 * @private
	 * @return {Object} Blank type index registry object
	 */
	function blankPrivateTypeIndex(rdf) {
	  var thisDoc = rdf.namedNode('');
	  var ns = vocab(rdf);
	  var indexStatements = [rdf.triple(thisDoc, ns.rdf('type'), ns.solid('TypeIndex')), rdf.triple(thisDoc, ns.rdf('type'), ns.solid('UnlistedDocument'))];
	  var privateIndex = {
	    data: graphUtil.serializeStatements(indexStatements),
	    graph: graphUtil.graphFromStatements(indexStatements, rdf),
	    slug: 'privateTypeIndex.ttl',
	    uri: null // actual url not yet known
	  };
	  return privateIndex;
	}
	
	/**
	 * Returns a blank public type index registry option.
	 * For use with `initTypeRegistry()`.
	 * @method blankPublicTypeIndex
	 * @private
	 * @return {Object} Blank type index registry object
	 */
	function blankPublicTypeIndex(rdf) {
	  var thisDoc = rdf.namedNode('');
	  var ns = vocab(rdf);
	  var indexStatements = [rdf.triple(thisDoc, ns.rdf('type'), ns.solid('TypeIndex')), rdf.triple(thisDoc, ns.rdf('type'), ns.solid('ListedDocument'))];
	  var publicIndex = {
	    data: graphUtil.serializeStatements(indexStatements),
	    graph: graphUtil.graphFromStatements(indexStatements, rdf),
	    slug: 'publicTypeIndex.ttl',
	    uri: null // actual url not yet known
	  };
	  return publicIndex;
	}
	
	/**
	 * Initializes the private Type Index Registry resource, updates
	 * the profile with the initialized index, and returns the updated profile.
	 * @method initTypeRegistryPrivate
	 * @param profile {SolidProfile} User's WebID profile
	 * @param [options] Options hashmap (see solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>} Resolves with the updated profile instance.
	 */
	function initTypeRegistryPrivate(profile, webClient, options) {
	  options = options || {};
	  var rdf = webClient.rdf;
	  var ns = vocab(rdf);
	  var registryContainerUri = profile.typeRegistryDefaultContainer();
	  var webId = rdf.namedNode(profile.webId);
	  var privateIndex = blankPrivateTypeIndex(rdf);
	  // First, create the private Type Index Registry resource
	  return webClient.post(registryContainerUri, privateIndex.data, privateIndex.slug).catch(function (err) {
	    throw new Error('Could not create privateIndex document:', err);
	  }).then(function (response) {
	    // Private type index resource created.
	    // Update the private profile (preferences) to link to it.
	    privateIndex.uri = util.absoluteUrl(webUtil.hostname(registryContainerUri), response.url);
	    var toAdd = [rdf.triple(webId, ns.solid('privateTypeIndex'), rdf.namedNode(privateIndex.uri))];
	    var toDel = [];
	    // Note: this PATCH will actually create a private profile if it doesn't
	    // already exist.
	    return webClient.patch(profile.privateProfileUri(), toDel, toAdd, options);
	  }).catch(function (err) {
	    throw new Error('Could not update profile with private index:' + err);
	  }).then(function (response) {
	    // Profile successfully patched with a link to the created private index
	    // It's safe to update this instance of profile
	    profile.typeIndexUnlisted = privateIndex;
	    // Finally, return the updated profile with type index loaded
	    return profile;
	  });
	}
	
	/**
	 * Initializes the public Type Index Registry resource, updates
	 * the profile with the initialized index, and returns the updated profile.
	 * @method initTypeRegistryPublic
	 * @param profile {SolidProfile} User's WebID profile
	 * @param webClient {SolidWebClient}
	 * @param [options] Options hashmap (see solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>} Resolves with the updated profile instance.
	 */
	function initTypeRegistryPublic(profile, webClient, options) {
	  options = options || {};
	  var rdf = webClient.rdf;
	  var ns = vocab(rdf);
	  var registryContainerUri = profile.typeRegistryDefaultContainer();
	  var webId = rdf.namedNode(profile.webId);
	  var publicIndex = blankPublicTypeIndex(rdf);
	  // First, create the public Type Index Registry resource
	  return webClient.post(registryContainerUri, publicIndex.data, publicIndex.slug).catch(function (err) {
	    throw new Error('Could not create publicIndex document:', err);
	  }).then(function (response) {
	    // Public type index resource created. Update the profile to link to it.
	    publicIndex.uri = util.absoluteUrl(webUtil.hostname(registryContainerUri), response.url);
	    var toAdd = [rdf.triple(webId, ns.solid('publicTypeIndex'), rdf.namedNode(publicIndex.uri))];
	    var toDel = [];
	    return webClient.patch(profile.webId, toDel, toAdd, options);
	  }).catch(function (err) {
	    console.log(err);
	    throw new Error('Could not update profile with public index:', err);
	  }).then(function (response) {
	    // Profile successfully patched with a link to the created public index
	    // It's safe to update this instance of profile
	    profile.typeIndexListed = publicIndex;
	    // Finally, return the updated profile with type index loaded
	    return profile;
	  });
	}
	
	/**
	 * Adds an RDF class to a user's type index registry, and returns the
	 * profile (with the appropriate type registry index updated).
	 * Called by `registerTypeIndex()`, which does all the argument validation.
	 * @method addToTypeIndex
	 * @param profile {SolidProfile} User's WebID profile
	 * @param rdfClass {NamedNode} RDF type to register in the index.
	 * @param location {String} Absolute URI to the location you want the class
	 *   registered to.
	 * @param locationType {String} Either 'instance' or 'container'
	 * @param isListed {Boolean} Whether to register in a listed or unlisted index).
	 * @return {Promise<SolidProfile>}
	 */
	function addToTypeIndex(profile, rdfClass, location, webClient, locationType, isListed) {
	  // TODO: Check to see if a registry entry for this type already exists.
	  // Generate a fragment identifier for the new registration
	  var hash = __webpack_require__(80);
	  var rdf = webClient.rdf;
	  var ns = vocab(rdf);
	  var fragmentId = hash.unique(rdfClass.uri);
	  var registryUri;
	  var registryGraph;
	  if (isListed) {
	    registryUri = profile.typeIndexListed.uri;
	    registryGraph = profile.typeIndexListed.graph;
	  } else {
	    registryUri = profile.typeIndexUnlisted.uri;
	    registryGraph = profile.typeIndexUnlisted.graph;
	  }
	  if (!registryUri) {
	    throw new Error('Cannot register type, registry URL missing');
	  }
	  var registrationUri = rdf.namedNode(registryUri + '#' + fragmentId);
	  // Set the class for the location type
	  var locationTypeClass;
	  if (locationType === 'instance') {
	    locationTypeClass = ns.solid('instance');
	  } else {
	    locationTypeClass = ns.solid('instanceContainer');
	    // Add trailing slash if it's missing and is a container
	    if (location.lastIndexOf('/') !== location.length - 1) {
	      location += '/';
	    }
	  }
	  // triples to delete (none for the moment)
	  var toDel = [];
	  // Create the list of triples to add in the PATCH operation
	  var toAdd = [
	  // example: '<#ab09fd> a solid:TypeRegistration;'
	  rdf.triple(registrationUri, ns.rdf('type'), ns.solid('TypeRegistration')),
	  // example: 'solid:forClass sioc:Post;'
	  rdf.triple(registrationUri, ns.solid('forClass'), rdfClass),
	  // example: 'solid:instanceContainer </posts/>.'
	  rdf.triple(registrationUri, locationTypeClass, rdf.namedNode(location))];
	  return webClient.patch(registryUri, toDel, toAdd).then(function (response) {
	    // Update the profile object with the new registry without reloading
	    var newRegistration = graphUtil.graphFromStatements(toAdd, rdf);
	    if (registryGraph) {
	      graphUtil.appendGraph(registryGraph, newRegistration);
	    } else {
	      profile[isListed ? 'typeIndexListed' : 'typeIndexUnlisted'].graph = newRegistration;
	    }
	    return profile;
	  });
	}
	
	/**
	 * Loads the public and private type registry index resources, adds them
	 * to the profile, and returns the profile.
	 * Called by the profile.loadTypeRegistry() alias method.
	 * Usage:
	 *
	 *   ```
	 * var profile = solid.getProfile(url, options)
	 *   .then(function (profile) {
	 *     return profile.loadTypeRegistry(options)
	 *   })
	 *   ```
	 * @method loadTypeRegistry
	 * @param profile {SolidProfile}
	 * @param webClient {SolidWebClient}
	 * @param [options] Options hashmap (see solid.web.solidRequest() function docs)
	 * @return {Promise<SolidProfile>}
	 */
	function loadTypeRegistry(profile, webClient, options) {
	  options = options || {};
	  options.headers = options.headers || {};
	  // Politely ask for Turtle format
	  if (!options.headers['Accept']) {
	    options.headers['Accept'] = 'text/turtle';
	  }
	  // load public and private index resources
	  var links = [];
	  if (profile.typeIndexListed.uri) {
	    links.push(profile.typeIndexListed.uri);
	  }
	  if (profile.typeIndexUnlisted.uri) {
	    links.push(profile.typeIndexUnlisted.uri);
	  }
	  return webClient.loadParsedGraphs(links, options).then(function (loadedGraphs) {
	    var allFailed = loadedGraphs.length && loadedGraphs.reduce(function (acc, cur) {
	      return acc && !cur.value;
	    }, true);
	    if (allFailed) {
	      throw new Error('Could not load any type index');
	    }
	    loadedGraphs.forEach(function (graph) {
	      // For each index resource loaded, add it to `profile.typeIndexListed`
	      //  or `profile.typeIndexUnlisted` as appropriate
	      if (graph && graph.value) {
	        profile.addTypeRegistry(graph.value, graph.uri);
	      }
	    });
	    return profile;
	  });
	}
	
	/**
	 * Registers a given RDF class in the user's type index registries, so that
	 * other applications can discover it.
	 * Note: If the relevant type index registry does not exist, it will be created.
	 * @method registerType
	 * @param profile {SolidProfile} Loaded WebID profile
	 * @param rdfClass {rdf.NamedNode} Type to register in the index.
	 * @param location {String} Absolute URI to the location you want the class
	 *   registered to. (Example: Registering Address books in
	 *   `https://example.com/contacts/`)
	 * @param [locationType='container'] {String} Either 'instance' or 'container',
	 *   defaults to 'container'
	 * @param [isListed=false] {Boolean} Whether to register in a listed or unlisted
	 *   index). Defaults to `false` (unlisted).
	 * @param webClient {SolidWebClient}
	 * @return {Promise<SolidProfile>} Resolves with the updated profile.
	 */
	function registerType(profile, rdfClass, location, locationType, isListed, webClient) {
	  if (!profile) {
	    throw new Error('No profile provided');
	  }
	  if (!profile.isLoaded) {
	    throw new Error('Profile is not loaded');
	  }
	  if (!rdfClass || !location) {
	    throw new Error('Type registration requires type class and location');
	  }
	  locationType = locationType || 'container';
	  if (locationType !== 'container' && locationType !== 'instance') {
	    throw new Error('Invalid location type');
	  }
	  // make sure type registry is loaded
	  return loadTypeRegistry(profile, webClient).then(function (profile) {
	    if (isListed && !profile.hasTypeRegistryPublic()) {
	      // Public type registry is needed, but doesn't exist. Create it.
	      return initTypeRegistryPublic(profile, webClient);
	    }
	    if (!isListed && !profile.hasTypeRegistryPrivate()) {
	      // Private type registry is needed, but doesn't exist. Create it.
	      return initTypeRegistryPrivate(profile, webClient);
	    }
	    // Relevant type registry exists, proceed
	    return profile;
	  }).then(function (profile) {
	    // Made sure the relevant type registry exists, and can now add to it
	    return addToTypeIndex(profile, rdfClass, location, webClient, locationType, isListed);
	  });
	}
	
	/**
	 * Returns lists of registry entries for a profile and a given RDF Class.
	 * @method typeRegistryForClass
	 * @param profile {SolidProfile}
	 * @param rdfClass {rdf.NamedNode} RDF Class
	 * @return {Array<IndexRegistration>}
	 */
	function typeRegistryForClass(profile, rdfClass, rdf) {
	  var registrations = [];
	  var isListed = true;
	
	  return registrations.concat(
	  // Public/listed registrations
	  registrationsFromGraph(profile.typeIndexListed.graph, rdfClass, isListed, rdf)).concat(
	  // Private/unlisted registrations
	  registrationsFromGraph(profile.typeIndexUnlisted.graph, rdfClass, !isListed, rdf));
	}
	
	/**
	 * Returns a list of registry entries from a given parsed type index graph.
	 * @method registrationsFromGraph
	 * @param graph {Graph} Parsed type index graph
	 * @param rdfClass {NamedNode} RDF Class
	 * @param isListed {Boolean} Whether to register in a listed or unlisted index
	 * @return {Array<IndexRegistration>}
	 */
	function registrationsFromGraph(graph, rdfClass, isListed, rdf) {
	  var entrySubject, instanceMatches, containerMatches;
	  var ns = vocab(rdf);
	  var registrations = [];
	  if (!graph) {
	    return registrations;
	  }
	  var matches = graph.statementsMatching(null, null, rdfClass);
	  matches.forEach(function (match) {
	    entrySubject = match.subject;
	    // Have the hash fragment of the registration, now need to determine
	    // location type, and the actual location.
	    instanceMatches = graph.statementsMatching(entrySubject, ns.solid('instance'));
	    instanceMatches.forEach(function (location) {
	      registrations.push(new IndexRegistration(entrySubject.uri, rdfClass, 'instance', location.object.uri, isListed));
	    });
	    // Now try to find solid:instanceContainer matches
	    containerMatches = graph.statementsMatching(entrySubject, ns.solid('instanceContainer'));
	    containerMatches.forEach(function (location) {
	      registrations.push(new IndexRegistration(entrySubject.uri, rdfClass, 'container', location.object.uri, isListed));
	    });
	  });
	  return registrations;
	}
	
	/**
	 * Removes an RDF class from a user's type index registry.
	 * Called by `unregisterTypeIndex()`, which does all the argument validation.
	 * @param profile {SolidProfile} User's WebID profile
	 * @param rdfClass {NamedNode} Type to remove from the registry
	 * @param webClient {SolidWebClient}
	 * @param [isListed=false] {Boolean} Whether to remove from a listed or
	 *   unlisted index
	 * @param [location] {String} If present, only unregister the class from this
	 *   location (absolute URI).
	 * @return {Promise<SolidProfile>}
	 */
	function removeFromTypeIndex(profile, rdfClass, webClient, isListed, location) {
	  var rdf = webClient.rdf;
	  var registryUri;
	  var registryGraph;
	  if (isListed) {
	    registryUri = profile.typeIndexListed.uri;
	    registryGraph = profile.typeIndexListed.graph;
	  } else {
	    registryUri = profile.typeIndexUnlisted.uri;
	    registryGraph = profile.typeIndexUnlisted.graph;
	  }
	  if (!registryUri) {
	    throw new Error('Cannot unregister type, registry URL missing');
	  }
	  // Get the existing registrations
	  var registrations = registrationsFromGraph(registryGraph, rdfClass, isListed, rdf);
	  if (registrations.length === 0) {
	    // No existing registrations, no need to do anything, just return profile
	    return Promise.resolve(profile);
	  }
	  if (location) {
	    // If location is present, filter the to-remove list only to registrations
	    // that are in that location.
	    registrations = registrations.filter(function (registration) {
	      return registration.locationUri === location;
	    });
	  }
	  // Generate triples to delete
	  var toDel = [];
	  registrations.forEach(function (registration) {
	    registryGraph.statementsMatching(rdf.namedNode(registration.registrationUri)).forEach(function (statement) {
	      toDel.push(statement);
	    });
	  });
	  // Nothing to add
	  var toAdd = [];
	  return webClient.patch(registryUri, toDel, toAdd).then(function (result) {
	    // Update the registry, to reflect new state
	    return profile.reloadTypeRegistry(webClient);
	  });
	}
	
	/**
	 * Removes a given RDF class from a user's type index registry, so that
	 * other applications can discover it.
	 * @method unregisterType
	 * @param profile {SolidProfile} Loaded WebID profile
	 * @param rdfClass {NamedNode} Type to register in the index.
	 * @param [isListed=false] {Boolean} Whether to remove from a listed or unlisted
	 *   index). Defaults to `false` (unlisted).
	 * @param [location] {String} If present, only unregister the class from this
	 *   location (absolute URI).
	 * @param webClient {SolidWebClient}
	 * @throws {Error}
	 * @return {Promise<SolidProfile>}
	 */
	function unregisterType(profile, rdfClass, isListed, location, webClient) {
	  if (!profile) {
	    throw new Error('No profile provided');
	  }
	  if (!profile.isLoaded) {
	    throw new Error('Profile is not loaded');
	  }
	  if (!rdfClass) {
	    throw new Error('Unregistering a type requires type class');
	  }
	  // make sure type registry is loaded
	  return loadTypeRegistry(profile, webClient).then(function (profile) {
	    if (isListed && !profile.typeIndexListed.graph) {
	      throw new Error('Profile has no Listed type index');
	    }
	    if (!isListed && !profile.typeIndexUnlisted.graph) {
	      throw new Error('Profile has no Unlisted type index');
	    }
	    return removeFromTypeIndex(profile, rdfClass, webClient, isListed, location);
	  });
	}

/***/ }),
/* 87 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * @module index-registration
	 */
	
	module.exports = IndexRegistration;
	
	/**
	 * Represents a Solid Index registration (an entry in the Type Index Registry).
	 * Returned in a list by `profile.typeRegistryForClass()`
	 * @class IndexRegistration
	 * @constructor
	 * @param registrationUri {String} Absolute URI (with fragment identifier) of
	 *   the registration (its location in the type index)
	 * @param rdfClass {rdf.NamedNode} RDF Class for this registration
	 * @param locationType {String} One of 'instance' or 'container'
	 * @param locationUri {String} URI of the location containing resources of this
	 *   type
	 * @param isListed {Boolean} Is this registration in a listed or unlisted index
	 */
	function IndexRegistration(registrationUri, rdfClass, locationType, locationUri, isListed) {
	  /**
	   * Is this a listed or unlisted registration
	   * @property isListed
	   * @type Boolean
	   */
	  this.isListed = isListed;
	  /**
	   * Location type, one of 'instance' or 'container'
	   * @property locationType
	   * @type String
	   */
	  this.locationType = locationType;
	  /**
	   * URI of the solid instance or container that holds resources of this type
	   * @property locationUri
	   * @type String
	   */
	  this.locationUri = locationUri;
	  /**
	   * RDF Class for this registration
	   * @property rdfClass
	   * @type rdf.NamedNode
	   */
	  this.rdfClass = rdfClass;
	  /**
	   * Absolute URI (with fragment identifier) of the registration
	   * @property registrationUri
	   * @type String
	   */
	  this.registrationUri = registrationUri;
	}
	
	/**
	 * Convenience method, returns true if this registration is of type
	 * `solid:instanceContainer`
	 * @method isContainer
	 * @return {Boolean}
	 */
	IndexRegistration.prototype.isContainer = function isInstance() {
	  return this.locationType === 'container';
	};
	
	/**
	 * Convenience method, returns true if this registration is of type
	 * `solid:instance`
	 * @method isInstance
	 * @return {Boolean}
	 */
	IndexRegistration.prototype.isInstance = function isInstance() {
	  return this.locationType === 'instance';
	};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module permissions
	 */
	
	var PermissionSet = __webpack_require__(89);
	var Authorization = __webpack_require__(90);
	var aclModes = __webpack_require__(91);
	
	/**
	 * Clears (deletes) an ACL resource for a given resource url.
	 * Usage:
	 *
	 *   ```
	 *   solid.clearPermissions('https://alice.example.com/docs/file1')
	 *     .then(function (result) {
	 *       // Now the ACL resource at file1.acl is deleted
	 *     })
	 *   ```
	 * @method clearPermissions
	 * @param resourceUrl {String} URL of a resource (not its ACL)
	 * @return {Promise<PermissionSet>}
	 */
	function clearPermissions(resourceUrl, webClient) {
	  var aclResourceUrl;
	  return webClient.head(resourceUrl).then(function (response) {
	    aclResourceUrl = response.aclAbsoluteUrl();
	    if (!aclResourceUrl) {
	      throw new Error('ACL URL not found for resource.');
	    }
	    return webClient.del(aclResourceUrl);
	  });
	}
	
	/**
	 * Fetches and returns a PermissionSet initialized from an ACL resource.
	 * Usage:
	 *
	 *   ```
	 *   solid.getPermissions('https://alice.example.com/docs/file1')
	 *     .then(function (permissionSet) {
	 *       // loads the PermissionSet instance, parsed from file1.acl for example
	 *       // now you can edit it and save it
	 *       return permissionSet
	 *         .addPermission(aliceWebId, [solid.acl.READ, solid.acl.WRITE])
	 *         .addPermission(aliceWebId, solid.acl.CONTROL)
	 *         .addPermission(solid.acl.EVERYONE, solid.acl.READ)
	 *         .save()
	 *     })
	 *   ```
	 * @method getPermissions
	 * @param resourceUrl {String} URL of a resource (not its ACL)
	 * @return {Promise<PermissionSet>}
	 */
	function getPermissions(resourceUrl, webClient, rdf) {
	  var aclResourceUrl;
	  var permissions;
	  return webClient.head(resourceUrl).then(function (response) {
	    aclResourceUrl = response.aclAbsoluteUrl();
	    if (!aclResourceUrl) {
	      throw new Error('ACL URL not found for resource.');
	    }
	    permissions = new PermissionSet(resourceUrl, aclResourceUrl, response.isContainer(), { rdf: rdf, webClient: webClient });
	    return webClient.get(aclResourceUrl).then(function (response) {
	      return response.parsedGraph();
	    });
	  }).then(function (aclGraph) {
	    permissions.initFromGraph(aclGraph);
	    return permissions;
	  });
	}
	
	module.exports.clearPermissions = clearPermissions;
	module.exports.getPermissions = getPermissions;
	module.exports.PermissionSet = PermissionSet;
	module.exports.Authorization = Authorization;
	
	// Export all the acl-related constants and modes at the top (index) level
	Object.assign(module.exports, aclModes.acl);

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @module permission-set
	 * Models the set of Authorizations in a given .acl resource.
	 * @see https://github.com/solid/web-access-control-spec for details.
	 * The working assumptions here are:
	 *   - Model the various permissions in an ACL resource as a set of unique
	 *     authorizations, with one agent (or one group), and only
	 *     one resource (acl:accessTo or acl:default) per authorization.
	 *   - If the source RDF of the ACL resource has multiple agents or multiple
	 *     resources in one authorization, separate them into multiple separate
	 *     Authorization objects (with one agent/group and one resourceUrl each)
	 *   - A single Authorization object can grant access to multiple modes (read,
	 *     write, control, etc)
	 *   - By default, all the authorizations in a container's ACL will be marked
	 *     as 'to be inherited', that is will have `acl:default` set.
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Authorization = __webpack_require__(90);
	
	var _require = __webpack_require__(91);
	
	var acl = _require.acl;
	
	var ns = __webpack_require__(82);
	
	var DEFAULT_ACL_SUFFIX = '.acl';
	var DEFAULT_CONTENT_TYPE = 'text/turtle';
	/**
	 * Resource types, used by PermissionSet objects
	 */
	var RESOURCE = 'resource';
	var CONTAINER = 'container';
	
	/**
	 * Agent type index names (used by findAuthByAgent() etc)
	 */
	var AGENT_INDEX = 'agents';
	var GROUP_INDEX = 'groups';
	
	/**
	 * @class PermissionSet
	 * @param resourceUrl {String} URL of the resource to which this PS applies
	 * @param aclUrl {String} URL of the ACL corresponding to the resource
	 * @param isContainer {Boolean} Is the resource a container? (Affects usage of
	 *   inherit semantics / acl:default)
	 * @param [options={}] {Object} Options hashmap
	 * @param [options.graph] {Graph} Parsed RDF graph of the ACL resource
	 * @param [options.rdf] {RDF} RDF Library
	 * @param [options.strictOrigin] {Boolean} Enforce strict origin?
	 * @param [options.host] {String} Actual request uri
	 * @param [options.origin] {String} Origin URI to enforce, relevant
	 *   if strictOrigin is set to true
	 * @param [options.webClient] {SolidWebClient} Used for save() and clear()
	 * @param [options.isAcl] {Function}
	 * @param [options.aclUrlFor] {Function}
	 * @constructor
	 */
	
	var PermissionSet = function () {
	  function PermissionSet(resourceUrl, aclUrl, isContainer) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    _classCallCheck(this, PermissionSet);
	
	    /**
	     * Hashmap of all Authorizations in this permission set, keyed by a hashed
	     * combination of an agent's/group's webId and the resourceUrl.
	     * @property authorizations
	     * @type {Object}
	     */
	    this.authorizations = {};
	    /**
	     * The URL of the corresponding ACL resource, at which these permissions will
	     * be saved.
	     * @property aclUrl
	     * @type {String}
	     */
	    this.aclUrl = aclUrl;
	    /**
	     * Optional request host (used by checkOrigin())
	     * @property host
	     * @type {String}
	     */
	    this.host = options.host;
	    /**
	     * Initialize the agents / groups / resources indexes.
	     * @property index
	     * @type {Object}
	     */
	    this.index = {
	      'agents': {},
	      'groups': {} // Also includes Public permissions
	    };
	    /**
	     * RDF Library (optionally injected)
	     * @property rdf
	     * @type {RDF}
	     */
	    this.rdf = options.rdf;
	    /**
	     * Whether this permission set is for a 'container' or a 'resource'.
	     * Determines whether or not the inherit/'acl:default' attribute is set on
	     * all its Authorizations.
	     * @property resourceType
	     * @type {String}
	     */
	    this.resourceType = isContainer ? CONTAINER : RESOURCE;
	    /**
	     * The URL of the resource for which these permissions apply.
	     * @property resourceUrl
	     * @type {String}
	     */
	    this.resourceUrl = resourceUrl;
	    /**
	     * Should this permission set enforce "strict origin" policy?
	     * (If true, uses `options.origin` parameter)
	     * @property strictOrigin
	     * @type {Boolean}
	     */
	    this.strictOrigin = options.strictOrigin;
	    /**
	     * Contents of the request's `Origin:` header.
	     * (used only if `strictOrigin` parameter is set to true)
	     * @property origin
	     * @type {String}
	     */
	    this.origin = options.origin;
	    /**
	     * Solid REST client (optionally injected), used by save() and clear().
	     * @type {SolidWebClient}
	     */
	    this.webClient = options.webClient;
	
	    // Init the functions for deriving an ACL url for a given resource
	    this.aclUrlFor = options.aclUrlFor ? options.aclUrlFor : defaultAclUrlFor;
	    this.aclUrlFor.bind(this);
	    this.isAcl = options.isAcl ? options.isAcl : defaultIsAcl;
	    this.isAcl.bind(this);
	
	    // Optionally initialize from a given parsed graph
	    if (options.graph) {
	      this.initFromGraph(options.graph);
	    }
	  }
	
	  /**
	   * Adds a given Authorization instance to the permission set.
	   * Low-level function, clients should use `addPermission()` instead, in most
	   * cases.
	   * @method addAuthorization
	   * @private
	   * @param auth {Authorization}
	   * @return {PermissionSet} Returns self (chainable)
	   */
	
	
	  _createClass(PermissionSet, [{
	    key: 'addAuthorization',
	    value: function addAuthorization(auth) {
	      var hashFragment = auth.hashFragment();
	      if (hashFragment in this.authorizations) {
	        // An authorization for this agent and resource combination already exists
	        // Merge the incoming access modes with its existing ones
	        this.authorizations[hashFragment].mergeWith(auth);
	      } else {
	        this.authorizations[hashFragment] = auth;
	      }
	      if (!auth.virtual && auth.allowsControl()) {
	        // If acl:Control is involved, ensure implicit rules for the .acl resource
	        this.addControlPermissionsFor(auth);
	      }
	      // Create the appropriate indexes
	      this.addToAgentIndex(auth.webId(), auth.accessType, auth.resourceUrl, auth);
	      if (auth.isPublic()) {
	        this.addToPublicIndex(auth.resourceUrl, auth.accessType, auth);
	      }
	      return this;
	    }
	
	    /**
	     * Creates an Authorization with the given parameters, and passes it on to
	     * `addAuthorization()` to be added to this PermissionSet.
	     * Essentially a convenience factory method.
	     * @method addAuthorizationFor
	     * @private
	     * @param resourceUrl {String}
	     * @param inherit {Boolean}
	     * @param agent {String|Quad} Agent URL (or `acl:agent` RDF triple).
	     * @param accessModes {String} 'READ'/'WRITE' etc.
	     * @param [origins=[]] {Array<String>} List of origins that are allowed access
	     * @param [mailTos=[]] {Array<String>}
	     * @return {Authorization}
	     */
	
	  }, {
	    key: 'addAuthorizationFor',
	    value: function addAuthorizationFor(resourceUrl, inherit, agent, accessModes) {
	      var origins = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	      var mailTos = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	
	      var auth = new Authorization(resourceUrl, inherit);
	      auth.setAgent(agent);
	      auth.addMode(accessModes);
	      auth.addOrigin(origins);
	      mailTos.forEach(function (mailTo) {
	        auth.addMailTo(mailTo);
	      });
	      this.addAuthorization(auth);
	      return auth;
	    }
	
	    /**
	     * Adds a virtual (will not be serialized to RDF) authorization giving
	     * Read/Write/Control access to the corresponding ACL resource if acl:Control
	     * is encountered in the actual source ACL.
	     * @method addControlPermissionsFor
	     * @private
	     * @param auth {Authorization} Authorization containing an acl:Control access
	     *   mode.
	     */
	
	  }, {
	    key: 'addControlPermissionsFor',
	    value: function addControlPermissionsFor(auth) {
	      var impliedAuth = auth.clone();
	      impliedAuth.resourceUrl = this.aclUrlFor(auth.resourceUrl);
	      impliedAuth.virtual = true;
	      impliedAuth.addMode(acl.ALL_MODES);
	      this.addAuthorization(impliedAuth);
	    }
	
	    /**
	     * Adds a group permission for the given access mode and group web id.
	     * @method addGroupPermission
	     * @param webId {String}
	     * @param accessMode {String|Array<String>}
	     * @return {PermissionSet} Returns self (chainable)
	     */
	
	  }, {
	    key: 'addGroupPermission',
	    value: function addGroupPermission(webId, accessMode) {
	      var auth = new Authorization(this.resourceUrl, this.isAuthInherited());
	      auth.setGroup(webId);
	      auth.addMode(accessMode);
	      this.addAuthorization(auth);
	      return this;
	    }
	
	    /**
	     * Adds a permission for the given access mode and agent id.
	     * @method addPermission
	     * @param webId {String} URL of an agent for which this permission applies
	     * @param accessMode {String|Array<String>} One or more access modes
	     * @param [origin] {String|Array<String>} One or more allowed origins (optional)
	     * @return {PermissionSet} Returns self (chainable)
	     */
	
	  }, {
	    key: 'addPermission',
	    value: function addPermission(webId, accessMode, origin) {
	      if (!webId) {
	        throw new Error('addPermission() requires a valid webId');
	      }
	      if (!accessMode) {
	        throw new Error('addPermission() requires a valid accessMode');
	      }
	      var auth = new Authorization(this.resourceUrl, this.isAuthInherited());
	      auth.setAgent(webId);
	      auth.addMode(accessMode);
	      if (origin) {
	        auth.addOrigin(origin);
	      }
	      this.addAuthorization(auth);
	      return this;
	    }
	
	    /**
	     * Adds a given authorization to the "lookup by agent id" index.
	     * Enables lookups via `findAuthByAgent()`.
	     * @method addToAgentIndex
	     * @private
	     * @param webId {String} Agent's Web ID
	     * @param accessType {String} Either `accessTo` or `default`
	     * @param resourceUrl {String}
	     * @param authorization {Authorization}
	     */
	
	  }, {
	    key: 'addToAgentIndex',
	    value: function addToAgentIndex(webId, accessType, resourceUrl, authorization) {
	      var agents = this.index.agents;
	      if (!agents[webId]) {
	        agents[webId] = {};
	      }
	      if (!agents[webId][accessType]) {
	        agents[webId][accessType] = {};
	      }
	      if (!agents[webId][accessType][resourceUrl]) {
	        agents[webId][accessType][resourceUrl] = authorization;
	      } else {
	        agents[webId][accessType][resourceUrl].mergeWith(authorization);
	      }
	    }
	
	    /**
	     * Adds a given authorization to the "lookup by group id" index.
	     * Enables lookups via `findAuthByAgent()`.
	     * @method addToGroupIndex
	     * @private
	     * @param webId {String} Group's Web ID
	     * @param accessType {String} Either `accessTo` or `default`
	     * @param resourceUrl {String}
	     * @param authorization {Authorization}
	     */
	
	  }, {
	    key: 'addToGroupIndex',
	    value: function addToGroupIndex(webId, accessType, resourceUrl, authorization) {
	      var groups = this.index.groups;
	      if (!groups[webId]) {
	        groups[webId] = {};
	      }
	      if (!groups[webId][accessType]) {
	        groups[webId][accessType] = {};
	      }
	      if (!groups[webId][accessType][resourceUrl]) {
	        groups[webId][accessType][resourceUrl] = authorization;
	      } else {
	        groups[webId][accessType][resourceUrl].mergeWith(authorization);
	      }
	    }
	
	    /**
	     * Adds a given authorization to the "lookup by group id" index.
	     * Alias for `addToGroupIndex()`.
	     * Enables lookups via `findAuthByAgent()`.
	     * @method addToPublicIndex
	     * @private
	     * @param resourceUrl {String}
	     * @param accessType {String} Either `accessTo` or `default`
	     * @param authorization {Authorization}
	     */
	
	  }, {
	    key: 'addToPublicIndex',
	    value: function addToPublicIndex(resourceUrl, accessType, auth) {
	      this.addToGroupIndex(acl.EVERYONE, accessType, resourceUrl, auth);
	    }
	
	    /**
	     * Returns a list of all the Authorizations that belong to this permission set.
	     * Mostly for internal use.
	     * @method allAuthorizations
	     * @return {Array<Authorization>}
	     */
	
	  }, {
	    key: 'allAuthorizations',
	    value: function allAuthorizations() {
	      var _this = this;
	
	      var authList = [];
	      var auth;
	      Object.keys(this.authorizations).forEach(function (authKey) {
	        auth = _this.authorizations[authKey];
	        authList.push(auth);
	      });
	      return authList;
	    }
	
	    /**
	     * Tests whether this PermissionSet gives Public (acl:agentClass foaf:Agent)
	     * access to a given uri.
	     * @method allowsPublic
	     * @param mode {String|NamedNode} Access mode (read/write/control etc)
	     * @param resourceUrl {String}
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsPublic',
	    value: function allowsPublic(mode, resourceUrl) {
	      resourceUrl = resourceUrl || this.resourceUrl;
	      var publicAuth = this.findPublicAuth(resourceUrl);
	      if (!publicAuth) {
	        return false;
	      }
	      return publicAuth.allowsMode(mode);
	    }
	
	    /**
	     * Returns an RDF graph representation of this permission set and all its
	     * Authorizations. Used by `save()`.
	     * @method buildGraph
	     * @private
	     * @param rdf {RDF} RDF Library
	     * @return {Graph}
	     */
	
	  }, {
	    key: 'buildGraph',
	    value: function buildGraph(rdf) {
	      var graph = rdf.graph();
	      this.allAuthorizations().forEach(function (auth) {
	        graph.add(auth.rdfStatements(rdf));
	      });
	      return graph;
	    }
	
	    /**
	     * Tests whether the given agent has the specified access to a resource.
	     * This is one of the main use cases for this solid-permissions library.
	     * Optionally performs strict origin checking (if `strictOrigin` is enabled
	     * in the constructor's options).
	     * Returns a promise; async since checking permissions may involve requesting
	     * multiple ACL resources (group listings, etc).
	     * @method checkAccess
	     * @param resourceUrl {String}
	     * @param agentId {String}
	     * @param accessMode {String} Access mode (read/write/control)
	     * @return {Promise<Boolean>}
	     */
	
	  }, {
	    key: 'checkAccess',
	    value: function checkAccess(resourceUrl, agentId, accessMode) {
	      var result = void 0;
	      if (this.allowsPublic(accessMode, resourceUrl)) {
	        result = true;
	      } else {
	        var auth = this.findAuthByAgent(agentId, resourceUrl);
	        result = auth && this.checkOrigin(auth) && auth.allowsMode(accessMode);
	      }
	      return Promise.resolve(result);
	    }
	
	    /**
	     * Tests whether a given authorization allows operations from the current
	     * request's `Origin` header. (The current request's origin and host are
	     * passed in as options to the PermissionSet's constructor.)
	     * @param authorization {Authorization}
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'checkOrigin',
	    value: function checkOrigin(authorization) {
	      if (!this.strictOrigin || // Enforcement turned off in server config
	      !this.origin || // No origin - not a script, do not enforce origin
	      this.origin === this.host) {
	        // same origin is trusted
	        return true;
	      }
	      // If not same origin, check that the origin is in the explicit ACL list
	      return authorization.allowsOrigin(this.origin);
	    }
	
	    /**
	     * Sends a delete request to a particular ACL resource. Intended to be used for
	     * an existing loaded PermissionSet, but you can also specify a particular
	     * URL to delete.
	     * Usage:
	     *
	     *   ```
	     *   // If you have an existing PermissionSet as a result of `getPermissions()`:
	     *   solid.getPermissions('https://www.example.com/file1')
	     *     .then(function (permissionSet) {
	     *       // do stuff
	     *       return permissionSet.clear()  // deletes that permissionSet
	     *     })
	     *   // Otherwise, use the helper function
	     *   //   solid.clearPermissions(resourceUrl) instead
	     *   solid.clearPermissions('https://www.example.com/file1')
	     *     .then(function (response) {
	     *       // file1.acl is now deleted
	     *     })
	     *   ```
	     * @method clear
	     * @param [webClient] {SolidWebClient}
	     * @throws {Error} Rejects with an error if it doesn't know where to delete, or
	     *   with any XHR errors that crop up.
	     * @return {Promise<Request>}
	     */
	
	  }, {
	    key: 'clear',
	    value: function clear(webClient) {
	      webClient = webClient || this.webClient;
	      if (!webClient) {
	        return Promise.reject(new Error('Cannot clear - no web client'));
	      }
	      var aclUrl = this.aclUrl;
	      if (!aclUrl) {
	        return Promise.reject(new Error('Cannot clear - unknown target url'));
	      }
	      return webClient.del(aclUrl);
	    }
	
	    /**
	     * Returns the number of Authorizations in this permission set.
	     * @method count
	     * @return {Number}
	     */
	
	  }, {
	    key: 'equals',
	
	
	    /**
	     * Returns whether or not this permission set is equal to another one.
	     * A PermissionSet is considered equal to another one iff:
	     * - It has the same number of authorizations, and each of those authorizations
	     *   has a corresponding one in the other set
	     * - They are both intended for the same resource (have the same resourceUrl)
	     * - They are both intended to be saved at the same aclUrl
	     * @method equals
	     * @param ps {PermissionSet} The other permission set to compare to
	     * @return {Boolean}
	     */
	    value: function equals(ps) {
	      var _this2 = this;
	
	      var sameUrl = this.resourceUrl === ps.resourceUrl;
	      var sameAclUrl = this.aclUrl === ps.aclUrl;
	      var sameResourceType = this.resourceType === ps.resourceType;
	      var myAuthKeys = Object.keys(this.authorizations);
	      var otherAuthKeys = Object.keys(ps.authorizations);
	      if (myAuthKeys.length !== otherAuthKeys.length) {
	        return false;
	      }
	      var sameAuths = true;
	      var myAuth, otherAuth;
	      myAuthKeys.forEach(function (authKey) {
	        myAuth = _this2.authorizations[authKey];
	        otherAuth = ps.authorizations[authKey];
	        if (!otherAuth) {
	          sameAuths = false;
	        }
	        if (!myAuth.equals(otherAuth)) {
	          sameAuths = false;
	        }
	      });
	      return sameUrl && sameAclUrl && sameResourceType && sameAuths;
	    }
	
	    /**
	     * Finds and returns an authorization (stored in the 'find by agent' index)
	     * for a given agent (web id) and resource.
	     * @method findAuthByAgent
	     * @private
	     * @param webId {String}
	     * @param resourceUrl {String}
	     * @param indexType {String} Either 'default' or 'accessTo'
	     * @return {Authorization}
	     */
	
	  }, {
	    key: 'findAuthByAgent',
	    value: function findAuthByAgent(webId, resourceUrl) {
	      var indexType = arguments.length <= 2 || arguments[2] === undefined ? AGENT_INDEX : arguments[2];
	
	      var index = this.index[indexType];
	      if (!index[webId]) {
	        // There are no permissions at all for this agent
	        return false;
	      }
	      // first check the accessTo type
	      var accessToAuths = index[webId][acl.ACCESS_TO];
	      var accessToMatch = void 0;
	      if (accessToAuths) {
	        accessToMatch = accessToAuths[resourceUrl];
	      }
	      if (accessToMatch) {
	        return accessToMatch;
	      }
	      // then check the default/inherited type permissions
	      var defaultAuths = index[webId][acl.DEFAULT];
	      var defaultMatch = void 0;
	      if (defaultAuths) {
	        // First try an exact match (resource matches the acl:default object)
	        defaultMatch = defaultAuths[resourceUrl];
	        if (!defaultMatch) {
	          // Next check to see if resource is in any of the relevant containers
	          var containers = Object.keys(defaultAuths).sort().reverse();
	          // Loop through the container URLs, sorted in reverse alpha
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;
	
	          try {
	            for (var _iterator = containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var containerUrl = _step.value;
	
	              if (resourceUrl.startsWith(containerUrl)) {
	                defaultMatch = defaultAuths[containerUrl];
	                break;
	              }
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	        }
	      }
	      return defaultMatch;
	    }
	
	    /**
	     * Finds and returns an authorization (stored in the 'find by group' index)
	     * for the "Everyone" group (acl:agentClass foaf:Agent), for a given resource.
	     * @method findAuthByAgent
	     * @private
	     * @param resourceUrl {String}
	     * @return {Authorization}
	     */
	
	  }, {
	    key: 'findPublicAuth',
	    value: function findPublicAuth(resourceUrl) {
	      return this.findAuthByAgent(acl.EVERYONE, resourceUrl, GROUP_INDEX);
	    }
	
	    /**
	     * Iterates over all the authorizations in this permission set.
	     * Convenience method.
	     * Usage:
	     *
	     *   ```
	     *   solid.getPermissions(resourceUrl)
	     *     .then(function (permissionSet) {
	     *       permissionSet.forEach(function (auth) {
	     *         // do stuff with auth
	     *       })
	     *     })
	     *   ```
	     * @method forEach
	     * @param callback {Function} Function to apply to each authorization
	     */
	
	  }, {
	    key: 'forEach',
	    value: function forEach(callback) {
	      var _this3 = this;
	
	      this.allAuthorizations().forEach(function (auth) {
	        callback.call(_this3, auth);
	      });
	    }
	
	    /**
	     * Creates and loads all the authorizations from a given RDF graph.
	     * Used by `getPermissions()` and by the constructor (optionally).
	     * Usage:
	     *
	     *   ```
	     *   var acls = new PermissionSet(resourceUri, aclUri, isContainer, {rdf: rdf})
	     *   acls.initFromGraph(graph)
	     *   ```
	     * @method initFromGraph
	     * @param graph {Dataset} RDF Graph (parsed from the source ACL)
	     */
	
	  }, {
	    key: 'initFromGraph',
	    value: function initFromGraph(graph) {
	      var _this4 = this;
	
	      var vocab = ns(this.rdf);
	      var authSections = graph.match(null, null, vocab.acl('Authorization'));
	      if (authSections.length) {
	        authSections = authSections.map(function (match) {
	          return match.subject;
	        });
	      } else {
	        (function () {
	          // Attempt to deal with an ACL with no acl:Authorization types present.
	          var subjects = {};
	          authSections = graph.match(null, vocab.acl('mode'));
	          authSections.forEach(function (match) {
	            subjects[match.subject.value] = match.subject;
	          });
	          authSections = Object.keys(subjects).map(function (section) {
	            return subjects[section];
	          });
	        })();
	      }
	      // Iterate through each grouping of authorizations in the .acl graph
	      authSections.forEach(function (fragment) {
	        // Extract the access modes
	        var accessModes = graph.match(fragment, vocab.acl('mode'));
	        // Extract allowed origins
	        var origins = graph.match(fragment, vocab.acl('origin'));
	
	        // Extract all the authorized agents
	        var agentMatches = graph.match(fragment, vocab.acl('agent'));
	        // Mailtos only apply to agents (not groups)
	        var mailTos = agentMatches.filter(isMailTo);
	        // Now filter out mailtos
	        agentMatches = agentMatches.filter(function (ea) {
	          return !isMailTo(ea);
	        });
	        // Extract all 'Public' matches (agentClass foaf:Agent)
	        var publicMatches = graph.match(fragment, vocab.acl('agentClass'), vocab.foaf('Agent'));
	        // Extract all acl:agentGroup matches
	        var groupMatches = graph.match(fragment, vocab.acl('agentGroup'));
	        // Create an Authorization object for each group (accessTo and default)
	        var allAgents = agentMatches.concat(publicMatches).concat(groupMatches);
	        // Create an Authorization object for each agent or group
	        //   (both individual (acl:accessTo) and inherited (acl:default))
	        allAgents.forEach(function (agentMatch) {
	          // Extract the acl:accessTo statements.
	          var accessToMatches = graph.match(fragment, vocab.acl('accessTo'));
	          accessToMatches.forEach(function (resourceMatch) {
	            var resourceUrl = resourceMatch.object.value;
	            _this4.addAuthorizationFor(resourceUrl, acl.NOT_INHERIT, agentMatch, accessModes, origins, mailTos);
	          });
	          // Extract inherited / acl:default statements
	          var inheritedMatches = graph.match(fragment, vocab.acl('default')).concat(graph.match(fragment, vocab.acl('defaultForNew')));
	          inheritedMatches.forEach(function (containerMatch) {
	            var containerUrl = containerMatch.object.value;
	            _this4.addAuthorizationFor(containerUrl, acl.INHERIT, agentMatch, accessModes, origins, mailTos);
	          });
	        });
	      });
	    }
	
	    /**
	     * Returns whether or not authorizations added to this permission set be
	     * inherited, by default? (That is, should they have acl:default set on them).
	     * @method isAuthInherited
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isAuthInherited',
	    value: function isAuthInherited() {
	      return this.resourceType === CONTAINER;
	    }
	
	    /**
	     * Returns whether or not this permission set has any Authorizations added to it
	     * @method isEmpty
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.count === 0;
	    }
	
	    /**
	     * Returns the corresponding Authorization for a given agent/group webId (and
	     * for a given resourceUrl, although it assumes by default that it's the same
	     * resourceUrl as the PermissionSet).
	     * @method permissionFor
	     * @param webId {String} URL of the agent or group
	     * @param [resourceUrl] {String}
	     * @return {Authorization} Returns the corresponding Authorization, or `null`
	     *   if no webId is given, or if no such authorization exists.
	     */
	
	  }, {
	    key: 'permissionFor',
	    value: function permissionFor(webId, resourceUrl) {
	      if (!webId) {
	        return null;
	      }
	      resourceUrl = resourceUrl || this.resourceUrl;
	      var hashFragment = Authorization.hashFragmentFor(webId, resourceUrl);
	      return this.authorizations[hashFragment];
	    }
	
	    /**
	     * Deletes a given Authorization instance from the permission set.
	     * Low-level function, clients should use `removePermission()` instead, in most
	     * cases.
	     * @method removeAuthorization
	     * @param auth {Authorization}
	     * @return {PermissionSet} Returns self (chainable)
	     */
	
	  }, {
	    key: 'removeAuthorization',
	    value: function removeAuthorization(auth) {
	      var hashFragment = auth.hashFragment();
	      delete this.authorizations[hashFragment];
	      return this;
	    }
	
	    /**
	     * Removes one or more access modes from an authorization in this permission set
	     * (defined by a unique combination of agent/group id (webId) and a resourceUrl).
	     * If no more access modes remain for that authorization, it's deleted from the
	     * permission set.
	     * @method removePermission
	     * @param webId
	     * @param accessMode {String|Array<String>}
	     * @return {PermissionSet} Returns self (via a chainable function)
	     */
	
	  }, {
	    key: 'removePermission',
	    value: function removePermission(webId, accessMode) {
	      var auth = this.permissionFor(webId, this.resourceUrl);
	      if (!auth) {
	        // No authorization for this webId + resourceUrl exists. Bail.
	        return this;
	      }
	      // Authorization exists, remove the accessMode from it
	      auth.removeMode(accessMode);
	      if (auth.isEmpty()) {
	        // If no more access modes remain, after removing, delete it from this
	        // permission set
	        this.removeAuthorization(auth);
	      }
	      return this;
	    }
	
	    /**
	     * @method save
	     * @param [options={}] {Object} Options hashmap
	     * @param [options.aclUrl] {String} Optional URL to save the .ACL resource to.
	     *   Defaults to its pre-set `aclUrl`, if not explicitly passed in.
	     * @param [options.contentType] {string} Optional content type to serialize as
	     * @throws {Error} Rejects with an error if it doesn't know where to save, or
	     *   with any XHR errors that crop up.
	     * @return {Promise<SolidResponse>}
	     */
	
	  }, {
	    key: 'save',
	    value: function save() {
	      var _this5 = this;
	
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var aclUrl = options.aclUrl || this.aclUrl;
	      var contentType = options.contentType || DEFAULT_CONTENT_TYPE;
	      if (!aclUrl) {
	        return Promise.reject(new Error('Cannot save - unknown target url'));
	      }
	      if (!this.webClient) {
	        return Promise.reject(new Error('Cannot save - no web client'));
	      }
	      return this.serialize({ contentType: contentType }).then(function (graph) {
	        return _this5.webClient.put(aclUrl, graph, contentType);
	      });
	    }
	
	    /**
	     * Serializes this permission set (and all its Authorizations) to a string RDF
	     * representation (Turtle by default).
	     * Note: invalid authorizations (ones that don't have at least one agent/group,
	     * at least one resourceUrl and at least one access mode) do not get serialized,
	     * and are instead skipped.
	     * @method serialize
	     * @param [options={}] {Object} Options hashmap
	     * @param [options.contentType='text/turtle'] {string}
	     * @param [options.rdf] {RDF} RDF Library to serialize with
	     * @throws {Error} Rejects with an error if one is encountered during RDF
	     *   serialization.
	     * @return {Promise<String>} Graph serialized to contentType RDF syntax
	     */
	
	  }, {
	    key: 'serialize',
	    value: function serialize() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var contentType = options.contentType || DEFAULT_CONTENT_TYPE;
	      var rdf = options.rdf || this.rdf;
	      if (!rdf) {
	        return Promise.reject(new Error('Cannot save - no rdf library'));
	      }
	      var graph = this.buildGraph(rdf);
	      var target = null;
	      var base = null;
	      return new Promise(function (resolve, reject) {
	        rdf.serialize(target, graph, base, contentType, function (err, result) {
	          if (err) {
	            return reject(err);
	          }
	          if (!result) {
	            return reject(new Error('Error serializing the graph to ' + contentType));
	          }
	          resolve(result);
	        });
	      });
	    }
	  }, {
	    key: 'count',
	    get: function get() {
	      return Object.keys(this.authorizations).length;
	    }
	  }]);
	
	  return PermissionSet;
	}();
	
	/**
	 * Returns the corresponding ACL uri, for a given resource.
	 * This is the default template for the `aclUrlFor()` method that's used by
	 * PermissionSet instances, unless it's overridden in options.
	 * @param resourceUri {String}
	 * @return {String} ACL uri
	 */
	
	
	function defaultAclUrlFor(resourceUri) {
	  if (defaultIsAcl(resourceUri)) {
	    return resourceUri; // .acl resources are their own ACLs
	  } else {
	    return resourceUri + DEFAULT_ACL_SUFFIX;
	  }
	}
	
	/**
	 * Tests whether a given uri is for an ACL resource.
	 * This is the default template for the `isAcl()` method that's used by
	 * PermissionSet instances, unless it's overridden in options.
	 * @method defaultIsAcl
	 * @param uri {String}
	 * @return {Boolean}
	 */
	function defaultIsAcl(uri) {
	  return uri.endsWith(DEFAULT_ACL_SUFFIX);
	}
	
	/**
	 * Returns whether or not a given agent webId is actually a `mailto:` link.
	 * Standalone helper function.
	 * @param agent {String|Statement} URL string (or RDF `acl:agent` triple)
	 * @return {Boolean}
	 */
	function isMailTo(agent) {
	  if (typeof agent === 'string') {
	    return agent.startsWith('mailto:');
	  } else {
	    return agent.object.value.startsWith('mailto:');
	  }
	}
	
	PermissionSet.RESOURCE = RESOURCE;
	PermissionSet.CONTAINER = CONTAINER;
	module.exports = PermissionSet;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Models a single Authorization, as part of a PermissionSet.
	 * @see https://github.com/solid/web-access-control-spec for details.
	 * @module authorization
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var vocab = __webpack_require__(82);
	
	var _require = __webpack_require__(91);
	
	var acl = _require.acl;
	
	/**
	 * Returns a set of convenience constants, for use with `addPermission()` etc.
	 * Exported as `Authorization.acl`.
	 */
	
	/**
	 * Models an individual authorization object, for a single resource and for
	 * a single webId (either agent or agentClass). See the comments at the top
	 * of the PermissionSet module for design assumptions.
	 * Low-level, not really meant to be instantiated directly. Use
	 * `permissionSet.addPermission()` instead.
	 * @class Authorization
	 */
	
	var Authorization = function () {
	  /**
	   * @param resourceUrl {String} URL of the resource (`acl:accessTo`) for which
	   *   this authorization is intended.
	   * @param [inherited] {Boolean} Should this authorization be inherited (contain
	   *   `acl:default`). Used for container ACLs. Defaults to null/false.
	   * @constructor
	   */
	  function Authorization(resourceUrl, inherited) {
	    _classCallCheck(this, Authorization);
	
	    /**
	     * Hashmap of all of the access modes (`acl:Write` etc) granted to an agent
	     * or group in this authorization. Modified via `addMode()` and `removeMode()`
	     * @property accessModes
	     * @type {Object}
	     */
	    this.accessModes = {};
	    /**
	     * Type of authorization, either for a specific resource ('accessTo'),
	     * or to be inherited by all downstream resources ('default')
	     * @property accessType
	     * @type {String} Either 'accessTo' or 'default'
	     */
	    this.accessType = inherited ? acl.DEFAULT : acl.ACCESS_TO;
	    /**
	     * URL of an agent's WebID (`acl:agent`). Inside an authorization, mutually
	     * exclusive with the `group` property. Set via `setAgent()`.
	     * @property agent
	     * @type {String}
	     */
	    this.agent = null;
	    /**
	     * URL of a group resource (`acl:agentClass`). Inside an authorization,
	     * mutually exclusive with the `agent` property. Set via `setGroup()`.
	     * @property group
	     * @type {String}
	     */
	    this.group = null;
	    /**
	     * Does this authorization apply to the contents of a container?
	     * (`acl:default`). Not used with non-container resources.
	     * @property inherited
	     * @type {Boolean}
	     */
	    this.inherited = inherited;
	    /**
	     * Stores the `mailto:` aliases for a given agent. Semi-unofficial
	     * functionality, used to store a user's email in the root storage .acl,
	     * to use for account recovery etc.
	     * @property mailTo
	     * @type {Array<String>}
	     */
	    this.mailTo = [];
	    /**
	     * Hashmap of which origins (http Origin: header) are allowed access to this
	     * resource.
	     * @property originsAllowed
	     * @type {Object}
	     */
	    this.originsAllowed = {};
	    /**
	     * URL of the resource for which this authorization applies. (`acl:accessTo`)
	     * @property resourceUrl
	     * @type {String}
	     */
	    this.resourceUrl = resourceUrl;
	    /**
	     * Should this authorization be serialized? (When writing back to an ACL
	     * resource, for example.) Used for implied (rather than explicit)
	     * authorization, such as ones that are derived from acl:Control statements.
	     * @property virtual
	     * @type {Boolean}
	     */
	    this.virtual = false;
	  }
	
	  /**
	   * Adds a given `mailto:` alias to this authorization.
	   * @method addMailTo
	   * @param agent {String|Statement} Agent URL (or RDF `acl:agent` statement).
	   */
	
	
	  _createClass(Authorization, [{
	    key: 'addMailTo',
	    value: function addMailTo(agent) {
	      if (typeof agent !== 'string') {
	        agent = agent.object.value;
	      }
	      if (agent.startsWith('mailto:')) {
	        agent = agent.split(':')[1];
	      }
	      this.mailTo.push(agent);
	      this.mailTo.sort();
	    }
	
	    /**
	     * Adds one or more access modes (`acl:mode` statements) to this authorization.
	     * @method addMode
	     * @param accessMode {String|Statement|Array<String>|Array<Statement>} One or
	     *   more access modes, each as either a uri, or an RDF statement.
	     * @return {Authorization} Returns self, chainable.
	     */
	
	  }, {
	    key: 'addMode',
	    value: function addMode(accessMode) {
	      var _this = this;
	
	      if (Array.isArray(accessMode)) {
	        accessMode.forEach(function (ea) {
	          _this.addModeSingle(ea);
	        });
	      } else {
	        this.addModeSingle(accessMode);
	      }
	      return this;
	    }
	
	    /**
	     * Adds a single access mode. Internal function, used by `addMode()`.
	     * @method addModeSingle
	     * @private
	     * @param accessMode {String|Statement} Access mode as either a uri, or an RDF
	     *   statement.
	     */
	
	  }, {
	    key: 'addModeSingle',
	    value: function addModeSingle(accessMode) {
	      if (typeof accessMode !== 'string') {
	        accessMode = accessMode.object.value;
	      }
	      this.accessModes[accessMode] = true;
	      return this;
	    }
	
	    /**
	     * Adds one or more allowed origins (`acl:origin` statements) to this
	     * authorization.
	     * @method addOrigin
	     * @param origin {String|Statement|Array<String>|Array<Statement>} One or
	     *   more origins, each as either a uri, or an RDF statement.
	     * @return {Authorization} Returns self, chainable.
	     */
	
	  }, {
	    key: 'addOrigin',
	    value: function addOrigin(origin) {
	      var _this2 = this;
	
	      if (Array.isArray(origin)) {
	        origin.forEach(function (ea) {
	          _this2.addOriginSingle(ea);
	        });
	      } else {
	        this.addOriginSingle(origin);
	      }
	      return this;
	    }
	
	    /**
	     * Adds a single allowed origin. Internal function, used by `addOrigin()`.
	     * @method addOriginSingle
	     * @private
	     * @param origin {String|Statement} Allowed origin as either a uri, or an RDF
	     *   statement.
	     */
	
	  }, {
	    key: 'addOriginSingle',
	    value: function addOriginSingle(origin) {
	      if (typeof origin !== 'string') {
	        origin = origin.object.value;
	      }
	      this.originsAllowed[origin] = true;
	      return this;
	    }
	
	    /**
	     * Returns a list of all access modes for this authorization.
	     * @method allModes
	     * @return {Array<String>}
	     */
	
	  }, {
	    key: 'allModes',
	    value: function allModes() {
	      return Object.keys(this.accessModes);
	    }
	
	    /**
	     * Returns a list of all allowed origins for this authorization.
	     * @method allOrigins
	     * @return {Array<String>}
	     */
	
	  }, {
	    key: 'allOrigins',
	    value: function allOrigins() {
	      return Object.keys(this.originsAllowed);
	    }
	
	    /**
	     * Tests whether this authorization grant the specified access mode
	     * @param accessMode {String|NamedNode} Either a named node for the access
	     *   mode or a string key ('write', 'read' etc) that maps to that mode.
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsMode',
	    value: function allowsMode(accessMode) {
	      // Normalize the access mode
	      accessMode = acl[accessMode.toUpperCase()] || accessMode;
	      if (accessMode === acl.APPEND) {
	        return this.allowsAppend(); // Handle the Append special case
	      }
	      return this.accessModes[accessMode];
	    }
	    /**
	     * Does this authorization grant access to requests coming from given origin?
	     * @method allowsOrigin
	     * @param origin {String}
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsOrigin',
	    value: function allowsOrigin(origin) {
	      return origin in this.originsAllowed;
	    }
	
	    /**
	     * Does this authorization grant `acl:Read` access mode?
	     * @method allowsRead
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsRead',
	    value: function allowsRead() {
	      return this.accessModes[acl.READ];
	    }
	
	    /**
	     * Does this authorization grant `acl:Write` access mode?
	     * @method allowsWrite
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsWrite',
	    value: function allowsWrite() {
	      return this.accessModes[acl.WRITE];
	    }
	
	    /**
	     * Does this authorization grant `acl:Append` access mode?
	     * @method allowsAppend
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsAppend',
	    value: function allowsAppend() {
	      return this.accessModes[acl.APPEND] || this.accessModes[acl.WRITE];
	    }
	
	    /**
	     * Does this authorization grant `acl:Control` access mode?
	     * @method allowsControl
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'allowsControl',
	    value: function allowsControl() {
	      return this.accessModes[acl.CONTROL];
	    }
	
	    /**
	     * Returns a deep copy of this authorization.
	     * @return {Authorization}
	     */
	
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var auth = new Authorization();
	      Object.assign(auth, JSON.parse(JSON.stringify(this)));
	      return auth;
	    }
	
	    /**
	     * Compares this authorization with another one.
	     * Authorizations are equal iff they:
	     *   - Are for the same agent or group
	     *   - Are intended for the same resourceUrl
	     *   - Grant the same access modes
	     *   - Have the same `inherit`/`acl:default` flag
	     *   - Contain the same `mailto:` agent aliases.
	     *   - Has the same allowed origins
	     * @method equals
	     * @param auth {Authorization}
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'equals',
	    value: function equals(auth) {
	      var sameAgent = this.agent === auth.agent;
	      var sameGroup = this.group === auth.group;
	      var sameUrl = this.resourceUrl === auth.resourceUrl;
	      var myModeKeys = Object.keys(this.accessModes);
	      var authModeKeys = Object.keys(auth.accessModes);
	      var sameNumberModes = myModeKeys.length === authModeKeys.length;
	      var sameInherit = JSON.stringify(this.inherited) === JSON.stringify(auth.inherited);
	      var sameModes = true;
	      myModeKeys.forEach(function (key) {
	        if (!auth.accessModes[key]) {
	          sameModes = false;
	        }
	      });
	      var sameMailTos = JSON.stringify(this.mailTo) === JSON.stringify(auth.mailTo);
	      var sameOrigins = JSON.stringify(this.originsAllowed) === JSON.stringify(auth.originsAllowed);
	      return sameAgent && sameGroup && sameUrl && sameNumberModes && sameModes && sameInherit && sameMailTos && sameOrigins;
	    }
	
	    /**
	     * Returns a hashed combination of agent/group webId and resourceUrl. Used
	     * internally as a key to store this authorization in a PermissionSet.
	     * @method hashFragment
	     * @private
	     * @throws {Error} Errors if either the webId or the resourceUrl are not set.
	     * @return {String} hash({webId}-{resourceUrl})
	     */
	
	  }, {
	    key: 'hashFragment',
	    value: function hashFragment() {
	      if (!this.webId || !this.resourceUrl) {
	        throw new Error('Cannot call hashFragment() on an incomplete authorization');
	      }
	      var hashFragment = hashFragmentFor(this.webId(), this.resourceUrl, this.accessType);
	      return hashFragment;
	    }
	
	    /**
	     * Returns whether or not this authorization is for an agent (vs a group).
	     * @method isAgent
	     * @return {Boolean} Truthy value if agent is set
	     */
	
	  }, {
	    key: 'isAgent',
	    value: function isAgent() {
	      return this.agent;
	    }
	
	    /**
	     * Returns whether or not this authorization is empty (that is, whether it has
	     * any access modes like Read, Write, etc, set on it)
	     * @method isEmpty
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return Object.keys(this.accessModes).length === 0;
	    }
	
	    /**
	     * Is this authorization intended for the foaf:Agent group (that is, everyone)?
	     * @method isPublic
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isPublic',
	    value: function isPublic() {
	      return this.group === acl.EVERYONE;
	    }
	
	    /**
	     * Returns whether or not this authorization is for a group (vs an agent).
	     * @method isGroup
	     * @return {Boolean} Truthy value if group is set
	     */
	
	  }, {
	    key: 'isGroup',
	    value: function isGroup() {
	      return this.group;
	    }
	
	    /**
	     * Returns whether this authorization is for a container and should be inherited
	     * (that is, contain `acl:default`).
	     * This is a helper function (instead of the raw attribute) to match the rest
	     * of the api.
	     * @method isInherited
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isInherited',
	    value: function isInherited() {
	      return this.inherited;
	    }
	
	    /**
	     * Returns whether this authorization is valid (ready to be serialized into
	     * an RDF graph ACL resource). This requires all three of the following:
	     *   1. Either an agent or an agentClass/group (returned by `webId()`)
	     *   2. A resource URL (`acl:accessTo`)
	     *   3. At least one access mode (read, write, etc) (returned by `isEmpty()`)
	     * @method isValid
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'isValid',
	    value: function isValid() {
	      return this.webId() && this.resourceUrl && !this.isEmpty();
	    }
	
	    /**
	     * Merges the access modes of a given authorization with the access modes of
	     * this one (Set union).
	     * @method mergeWith
	     * @param auth
	     * @throws {Error} Error if the other authorization is for a different webId
	     *   or resourceUrl (`acl:accessTo`)
	     */
	
	  }, {
	    key: 'mergeWith',
	    value: function mergeWith(auth) {
	      if (this.hashFragment() !== auth.hashFragment()) {
	        throw new Error('Cannot merge authorizations with different agent id or resource url (accessTo)');
	      }
	      for (var accessMode in auth.accessModes) {
	        this.addMode(accessMode);
	      }
	    }
	
	    /**
	     * Returns an array of RDF statements representing this authorization.
	     * Used by `PermissionSet.serialize()`.
	     * @method rdfStatements
	     * @return {Array<Statement>} List of RDF statements representing this Auth,
	     *   or an empty array if this authorization is invalid.
	     */
	
	  }, {
	    key: 'rdfStatements',
	    value: function rdfStatements(rdf) {
	      // Make sure the authorization has at least one agent/group and `accessTo`
	      if (!this.webId() || !this.resourceUrl) {
	        return []; // This Authorization is invalid, return empty array
	      }
	      // Virtual / implied authorizations are not serialized
	      if (this.virtual) {
	        return [];
	      }
	      var statement;
	      var fragment = rdf.namedNode('#' + this.hashFragment());
	      var ns = vocab(rdf);
	      var statements = [rdf.triple(fragment, ns.rdf('type'), ns.acl('Authorization'))];
	      if (this.agent) {
	        statement = rdf.triple(fragment, ns.acl('agent'), rdf.namedNode(this.agent));
	        statements.push(statement);
	      }
	      if (this.mailTo.length > 0) {
	        this.mailTo.forEach(function (agentMailto) {
	          statement = rdf.triple(fragment, ns.acl('agent'), rdf.namedNode('mailto:' + agentMailto));
	          statements.push(statement);
	        });
	      }
	      if (this.group) {
	        statement = rdf.triple(fragment, ns.acl('agentClass'), rdf.namedNode(this.group));
	        statements.push(statement);
	      }
	      statement = rdf.triple(fragment, ns.acl('accessTo'), rdf.namedNode(this.resourceUrl));
	      statements.push(statement);
	      var modes = Object.keys(this.accessModes);
	      modes.forEach(function (accessMode) {
	        statement = rdf.triple(fragment, ns.acl('mode'), rdf.namedNode(accessMode));
	        statements.push(statement);
	      });
	      if (this.inherited) {
	        statement = rdf.triple(fragment, ns.acl('defaultForNew'), rdf.namedNode(this.resourceUrl));
	        statements.push(statement);
	      }
	      this.allOrigins().forEach(function (origin) {
	        statement = rdf.triple(fragment, ns.acl('origin'), rdf.namedNode(origin));
	        statements.push(statement);
	      });
	      return statements;
	    }
	
	    /**
	     * Removes one or more access modes from this authorization.
	     * @method removeMode
	     * @param accessMode {String|Statement|Array<String>|Array<Statement>} URL
	     *   representation of the access mode, or an RDF `acl:mode` triple.
	     * @returns {removeMode}
	     */
	
	  }, {
	    key: 'removeMode',
	    value: function removeMode(accessMode) {
	      var _this3 = this;
	
	      if (Array.isArray(accessMode)) {
	        accessMode.forEach(function (ea) {
	          _this3.removeModeSingle(ea);
	        });
	      } else {
	        this.removeModeSingle(accessMode);
	      }
	      return this;
	    }
	
	    /**
	     * Removes a single access mode from this authorization. Internal use only
	     * (used by `removeMode()`).
	     * @method removeModeSingle
	     * @private
	     * @param accessMode {String|Statement} URI or RDF statement
	     */
	
	  }, {
	    key: 'removeModeSingle',
	    value: function removeModeSingle(accessMode) {
	      if (typeof accessMode !== 'string') {
	        accessMode = accessMode.object.value;
	      }
	      delete this.accessModes[accessMode];
	    }
	
	    /**
	     * Removes one or more allowed origins from this authorization.
	     * @method removeOrigin
	     * @param origin {String|Statement|Array<String>|Array<Statement>} URL
	     *   representation of the access mode, or an RDF `acl:mode` triple.
	     * @returns {removeMode}
	     */
	
	  }, {
	    key: 'removeOrigin',
	    value: function removeOrigin(accessMode) {
	      var _this4 = this;
	
	      if (Array.isArray(accessMode)) {
	        accessMode.forEach(function (ea) {
	          _this4.removeOriginSingle(ea);
	        });
	      } else {
	        this.removeOriginSingle(accessMode);
	      }
	      return this;
	    }
	
	    /**
	     * Removes a single allowed origin from this authorization. Internal use only
	     * (used by `removeOrigin()`).
	     * @method removeOriginSingle
	     * @private
	     * @param origin {String|Statement} URI or RDF statement
	     */
	
	  }, {
	    key: 'removeOriginSingle',
	    value: function removeOriginSingle(origin) {
	      if (typeof origin !== 'string') {
	        origin = origin.object.value;
	      }
	      delete this.originsAllowed[origin];
	    }
	
	    /**
	     * Sets the agent WebID for this authorization. Implemented as `setAgent()`
	     * setter method to enforce mutual exclusivity with `group` property, until
	     * ES6 setter methods become available.
	     * @method setAgent
	     * @param agent {String|Quad} Agent URL (or `acl:agent` RDF triple).
	     */
	
	  }, {
	    key: 'setAgent',
	    value: function setAgent(agent) {
	      if (typeof agent !== 'string') {
	        // This is an RDF statement
	        agent = agent.object.value;
	      }
	      if (agent === acl.EVERYONE) {
	        this.setPublic();
	      } else if (this.group) {
	        throw new Error('Cannot set agent, authorization already has a group set');
	      }
	      if (agent.startsWith('mailto:')) {
	        this.addMailTo(agent);
	      } else {
	        this.agent = agent;
	      }
	    }
	
	    /**
	     * Sets the group WebID for this authorization. Implemented as `setGroup()`
	     * setter method to enforce mutual exclusivity with `agent` property, until
	     * ES6 setter methods become available.
	     * @method setGroup
	     * @param agentClass {String|Statement} Group URL (or `acl:agentClass` RDF
	     *   triple).
	     */
	
	  }, {
	    key: 'setGroup',
	    value: function setGroup(agentClass) {
	      if (typeof agentClass !== 'string') {
	        // This is an RDF statement
	        agentClass = agentClass.object.value;
	      }
	      if (this.agent) {
	        throw new Error('Cannot set group, authorization already has an agent set');
	      }
	      this.group = agentClass;
	    }
	
	    /**
	     * Sets the authorization's group to `foaf:Agent`. Convenience method.
	     * @method setPublic
	     */
	
	  }, {
	    key: 'setPublic',
	    value: function setPublic() {
	      this.setGroup(acl.EVERYONE);
	    }
	
	    /**
	     * Returns the agent or group's WebID for this authorization.
	     * @method webId
	     * @return {String}
	     */
	
	  }, {
	    key: 'webId',
	    value: function webId() {
	      return this.agent || this.group;
	    }
	  }]);
	
	  return Authorization;
	}();
	// --- Standalone (non-instance) functions --
	/**
	 * Utility method that creates a hash fragment key for this authorization.
	 * Used with graph serialization to RDF, and as a key to store authorizations
	 * in a PermissionSet. Exported (mainly for use in PermissionSet).
	 * @method hashFragmentFor
	 * @param webId {String} Agent or group web id
	 * @param resourceUrl {String} Resource or container URL for this authorization
	 * @param [authType='accessTo'] {String} Either 'accessTo' or 'default'
	 * @return {String}
	 */
	
	
	function hashFragmentFor(webId, resourceUrl) {
	  var authType = arguments.length <= 2 || arguments[2] === undefined ? acl.ACCESS_TO : arguments[2];
	
	  var hashKey = webId + '-' + resourceUrl + '-' + authType;
	  return hashKey;
	}
	
	Authorization.hashFragmentFor = hashFragmentFor;
	
	module.exports = Authorization;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Exports acl-related constants
	 * @module modes
	 */
	
	var vocab = __webpack_require__(82);
	var ns = vocab();
	
	// ACL access modes
	var READ = ns.acl('Read');
	var WRITE = ns.acl('Write');
	var APPEND = ns.acl('Append');
	var CONTROL = ns.acl('Control');
	var EVERYONE = ns.foaf('Agent');
	var ALL_MODES = [READ, WRITE, CONTROL];
	
	// ACL-related convenience constants
	var INHERIT = true;
	var NOT_INHERIT = !INHERIT;
	var ACCESS_TO = 'accessTo';
	var DEFAULT = 'default';
	
	module.exports.acl = {
	  ALL_MODES: ALL_MODES,
	  READ: READ,
	  WRITE: WRITE,
	  APPEND: APPEND,
	  CONTROL: CONTROL,
	  EVERYONE: EVERYONE,
	  INHERIT: INHERIT,
	  NOT_INHERIT: NOT_INHERIT,
	  ACCESS_TO: ACCESS_TO,
	  DEFAULT: DEFAULT
	};

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Provides a simple configuration object for Solid web client and other
	 * modules.
	 * @module config
	 */
	
	module.exports = {
	  /**
	   * Default authentication endpoint
	   */
	  authEndpoint: 'https://databox.me/',
	
	  /**
	   * Default signup endpoints (list of identity providers)
	   */
	  signupEndpoint: 'https://solid.github.io/solid-idps/',
	
	  /**
	   * Default height of the Signup popup window, in pixels
	   */
	  signupWindowHeight: 600,
	
	  /**
	   * Default width of the Signup popup window, in pixels
	   */
	  signupWindowWidth: 1024
	};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * Provides miscelaneous meta functions (such as library version)
	 * @module meta
	 */
	
	var lib = __webpack_require__(94);
	
	/**
	 * Returns solid-client library version (read from `package.json`)
	 * @return {String} Lib version
	 */
	module.exports.version = function version() {
	  return lib.version;
	};

/***/ }),
/* 94 */
/***/ (function(module, exports) {

	module.exports = {"name":"solid-client","version":"0.24.3","description":"Common library for writing Solid read-write-web applications","main":"./lib/index.js","files":["config.js","lib","dist"],"scripts":{"build-lib":"babel src -d lib","build-full":"webpack --progress --config webpack.config.js --output-filename solid-client-full.js","build-with-rdflib":"webpack --progress --colors --optimize-occurrence-order --optimize-dedupe --config webpack.config.js","build-without-rdflib":"webpack --progress --colors --optimize-occurrence-order --optimize-dedupe --config webpack-no-rdflib.config.js","build-qunit-resources":"npm run clean && mkdir -p dist/resources && npm run build-full && browserify -r ./test/resources/profile-minimal.js:test-minimal-profile -o dist/resources/test-minimal-profile.js && browserify -r ./test/resources/profile-private.js:test-minimal-prefs -o dist/resources/test-minimal-prefs.js","build":"npm run clean && mkdir dist && npm run build-lib && npm run build-with-rdflib && npm run build-without-rdflib","clean":"rm -rf dist/","standard":"standard src/*","tape":"tape test/unit/*.js","test":"npm run standard && npm run tape","qunit":"npm run build-qunit-resources && open test/integration/index.html","preversion":"npm test","postversion":"git push --follow-tags","prepublish":"npm run test && npm run build"},"repository":{"type":"git","url":"https://github.com/solid/solid-client"},"keywords":["solid","decentralized","web","rdf","ldp","linked","data"],"author":"Andrei Sambra <andrei@fcns.eu>","maintainers":[{"name":"Dmitri Zagidulin","url":"https://github.com/dmitrizagidulin/"}],"license":"MIT","bugs":{"url":"https://github.com/solid/solid-client/issues"},"homepage":"https://github.com/solid/solid-client","dependencies":{"babel-core":"^6.26.0","babel-install":"^2.1.0","rdflib":"^0.13.0","shorthash":"0.0.2","solid-auth-oidc":"^0.1.2","solid-auth-tls":"0.0.4","solid-namespace":"^0.1.0","solid-permissions":"^0.5.1","solid-web-client":"^0.3.2"},"devDependencies":{"babel-cli":"^6.26.0","babel-loader":"^6.2.10","babel-preset-es2015":"^6.24.1","json-loader":"^0.5.4","nock":"^9.0.2","qunit":"^0.9.0","sinon":"^2.1.0","standard":"^5.4.1","tape":"^4.4.0","webpack":"^1.15.0"},"standard":{"globals":["$rdf","SolidClient","tabulator","QUnit"]}}

/***/ }),
/* 95 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * Provides Web API helpers dealing with a user's online / offline status.
	 * @module status
	 */
	
	module.exports.isOnline = isOnline;
	module.exports.onOffline = onOffline;
	module.exports.onOnline = onOnline;
	
	/**
	 * Returns a user's online status (true if user is on line)
	 * @method isOnline
	 * @static
	 * @return {Boolean}
	 */
	function isOnline() {
	  return window.navigator.onLine;
	}
	
	/**
	 * Adds an even listener to trigger when the user goes offline.
	 * @method onOffline
	 * @static
	 * @param callback {Function} Callback to invoke when user goes offline.
	 */
	function onOffline(callback) {
	  window.addEventListener('offline', callback, false);
	}
	
	/**
	 * Adds an even listener to trigger when the user comes online.
	 * @method onOnline
	 * @static
	 * @param callback {Function} Callback to invoke when user comes online
	 */
	function onOnline(callback) {
	  window.addEventListener('online', callback, false);
	}

/***/ })
/******/ ]);
//# sourceMappingURL=solid-client-lite.js.map