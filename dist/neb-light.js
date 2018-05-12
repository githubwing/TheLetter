require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

"use strict";

var utils = require('./utils/utils.js');

/**
 * Admin API constructor.
 * Class encapsulate methods for admin APIs commands.
 * @see [Admin API documentation:]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md}.
 * @constructor
 *
 * @param {Neb} neb - Instance of Neb library.
 *
 * @example
 * var admin = new Admin( new Neb() );
 * // or just
 * var admin = new Neb().admin;
 */
var Admin = function (neb) {
    this._setRequest(neb._request);
};

/**
 * @private
 * @param {Request} request - transport wrapper.
 */
Admin.prototype._setRequest = function (request) {
    this._request = request;
    this._path = '/admin';
};

/**
 * Method get info about nodes in Nebulas Network.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#nodeinfo}
 *
 * @return [nodeInfoObject]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#nodeinfo}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.nodeInfo().then(function(info) {
 * //code
 * });
 */
Admin.prototype.nodeInfo = function () {
    return this._sendRequest("get", "/nodeinfo", null);
};

/**
 * Method get list of available addresses.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#accounts}
 *
 * @return [accountsList]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#accounts}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.accounts().then(function(accounts) {
 * //code
 * });
 */
Admin.prototype.accounts = function () {
    return this._sendRequest("get", "/accounts", null);
};

/**
 * Method create a new account in Nebulas network with provided passphrase.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#newaccount}
 *
 * @param {Object} options
 * @param {Password} options.passphrase
 *
 * @return [address]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#newaccount}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.newAccount({passphrase: "passphrase"}).then(function(address) {
 * //code
 * });
 */
Admin.prototype.newAccount = function (options) {
    options = utils.argumentsToObject(['passphrase'], arguments);
    var params = { "passphrase": options.passphrase };
    return this._sendRequest("post", "/account/new", params);
};

/**
 * Method unlock account with provided passphrase.
 * After the default unlock time, the account will be locked.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#unlockaccount}
 *
 * @param {Object} options
 * @param {HexString} options.address
 * @param {Password} options.passphrase
 * @param {Number} options.duration
 *
 * @return [isUnLocked]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#unlockaccount}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.unlockAccount({
 *     address: "n1cYKNHTeVW9v1NQRWuhZZn9ETbqAYozckh",
 *     passphrase: "passphrase",
 *     duration: 1000000000
 * }).then(function(isUnLocked) {
 * //code
 * });
 */
Admin.prototype.unlockAccount = function (options) {
    options = utils.argumentsToObject(['address', 'passphrase', 'duration'], arguments);
    var params = {
        "address": options.address,
        "passphrase": options.passphrase,
        "duration": options.duration
    };
    return this._sendRequest("post", "/account/unlock", params);
};

/**
 * Method lock account.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#lockaccount}
 *
 * @param {Object} options
 * @param {HexString} options.address
 *
 * @return [isLocked]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#lockaccount}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.lockAccount({address: "n1cYKNHTeVW9v1NQRWuhZZn9ETbqAYozckh"}).then(function(isLocked) {
 * //code
 * });
 */
Admin.prototype.lockAccount = function (options) {
    options = utils.argumentsToObject(['address'], arguments);
    var params = { "address": options.address };
    return this._sendRequest("post", "/account/lock", params);
};

/**
 * Method wrap transaction sending functionality.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#sendtransaction}
 *
 * @param {TransactionOptions} options
 *
 * @return [Transcation hash and contract address]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#sendtransaction}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.sendTransaction({
 *    from: "n1QZMXSZtW7BUerroSms4axNfyBGyFGkrh5",
 *    to: "n1SAeQRVn33bamxN4ehWUT7JGdxipwn8b17",
 *    value: 10,
 *    nonce: 12,
 *    gasPrice: 1000000,
 *    gasLimit: 2000000
 * }).then(function(tx) {
 * //code
 * });
 */
Admin.prototype.sendTransaction = function (options) {
    options = utils.argumentsToObject(['from', 'to', 'value', 'nonce', 'gasPrice', 'gasLimit', 'contract', 'binary'], arguments);
    var params = {
        "from": options.from,
        "to": options.to,
        "value": utils.toString(options.value),
        "nonce": options.nonce,
        "gasPrice": utils.toString(options.gasPrice),
        "gasLimit": utils.toString(options.gasLimit),
        "contract": options.contract,
        "binary": options.binary
    };
    return this._sendRequest("post", "/transaction", params);
};

/**
 * Method sign hash.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#signhash}
 *
 * @param {Object} options
 * @param {HexString} options.address
 * @param {Base64} options.hash of hash bytes with base64 encode.
 * @param {UInt32} options.alg
 *
 * @return [data]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#signhash}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.SignHash({
 *     address: "n1cYKNHTeVW9v1NQRWuhZZn9ETbqAYozckh",
 *     hash: "OGQ5NjllZWY2ZWNhZDNjMjlhM2E2MjkyODBlNjg2Y2YwYzNmNWQ1YTg2YWZmM2NhMTIwMjBjOTIzYWRjNmM5Mg==",
 *     alg: 1
 * }).then(function(data) {
 * //code
 * });
 */
Admin.prototype.signHash = function (options) {
    options = utils.argumentsToObject(['address', 'hash', 'alg'], arguments);
    var params = {
        "address": options.address,
        "hash": options.hash,
        "alg": options.alg
    };
    return this._sendRequest("post", "/sign/hash", params);
};

/**
 * Method sign transaction with passphrase.
 * The transaction's from addrees must be unlock before sign call.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#signtransactionwithpassphrase}
 *
 * @param {TransactionOptions} options
 * @param {Password} options.passphrase
 *
 * @return [Transcation hash and contract address]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#signtransactionwithpassphrase}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.signTransactionWithPassphrase({
 *    from: "n1QZMXSZtW7BUerroSms4axNfyBGyFGkrh5",
 *    to: "n1SAeQRVn33bamxN4ehWUT7JGdxipwn8b17",
 *    value: 10,
 *    nonce: 12,
 *    gasPrice: 1000000,
 *    gasLimit: 2000000,
 *    passphrase: "passphrase"
 * }).then(function(tx) {
 * //code
 * });
 */
Admin.prototype.signTransactionWithPassphrase = function (options) {
    options = utils.argumentsToObject(['from', 'to', 'value', 'nonce', 'gasPrice', 'gasLimit', 'contract', 'binary', 'passphrase'], arguments);
    var tx = {
        "from": options.from,
        "to": options.to,
        "value": utils.toString(options.value),
        "nonce": options.nonce,
        "gasPrice": utils.toString(options.gasPrice),
        "gasLimit": utils.toString(options.gasLimit),
        "contract": options.contract,
        "binary": options.binary
    };
    var params = {
        "transaction": tx,
        "passphrase": options.passphrase
    };
    return this._sendRequest("post", "/sign", params);
};

/**
 * Method send transaction with passphrase.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#sendtransactionwithpassphrase}
 *
 * @param {TransactionOptions} options
 * @param {Password} options.passphrase
 *
 * @return [data]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#sendtransactionwithpassphrase}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.sendTransactionWithPassphrase({
 *    from: "n1QZMXSZtW7BUerroSms4axNfyBGyFGkrh5",
 *    to: "n1SAeQRVn33bamxN4ehWUT7JGdxipwn8b17",
 *    value: 10,
 *    nonce: 12,
 *    gasPrice: 1000000,
 *    gasLimit: 2000000,
 *    passphrase: "passphrase"
 * }).then(function(tx) {
 * //code
 * });
 */
Admin.prototype.sendTransactionWithPassphrase = function (options) {
    options = utils.argumentsToObject(['from', 'to', 'value', 'nonce', 'gasPrice', 'gasLimit', 'contract', 'binary', 'passphrase'], arguments);
    var tx = {
        "from": options.from,
        "to": options.to,
        "value": utils.toString(options.value),
        "nonce": options.nonce,
        "gasPrice": utils.toString(options.gasPrice),
        "gasLimit": utils.toString(options.gasLimit),
        "contract": options.contract,
        "binary": options.binary
    };
    var params = {
        "transaction": tx,
        "passphrase": options.passphrase
    };
    return this._sendRequest("post", "/transactionWithPassphrase", params);
};

/**
 * Method start listen provided port.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#startpprof}
 *
 * @param {Object} options
 * @param {String} options.listen - Listen port.
 *
 * @return [isListenStrted]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#startpprof}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.startPprof({listen: '8080'}).then(function(isListenStrted) {
 * //code
 * });
 */
Admin.prototype.startPprof = function (options) {
    options = utils.argumentsToObject(['listen'], arguments);
    var params = { "listen": options.listen };
    return this._sendRequest("post", "/pprof", params);
};

/**
 * Method get config of node in Nebulas Network.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#getConfig}
 *
 * @return [config]{@link https://github.com/nebulasio/wiki/blob/master/rpc_admin.md#getConfig}
 *
 * @example
 * var admin = new Neb().admin;
 * admin.getConfig().then(function(info) {
 * //code
 * });
 */
Admin.prototype.getConfig = function () {
    return this._sendRequest("get", "/getConfig", null);
};

Admin.prototype._sendRequest = function (method, api, params, callback) {
    var action = this._path + api;
    if (typeof callback === "function") {
        return this._request.asyncRequest(method, action, params, callback);
    } else {
        return this._request.request(method, action, params);
    }
};

module.exports = Admin;

},{"./utils/utils.js":4}],2:[function(require,module,exports){

"use strict";

var utils = require('./utils/utils.js');

/**
 * User API constructor.
 * Class encapsulate methods for building distributed applications and services.
 *
 * @see [API documentation]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md}
 * @constructor
 *
 * @param {Neb} neb - Instance of Neb library.
 *
 * @example
 * var api = new API ( new Neb() );
 * // or just
 * var api = new Neb().api;
 */
var API = function (neb) {
    this._setRequest(neb._request);
};

/**
 * @private
 * @param {Request} request - transport wrapper.
 */
API.prototype._setRequest = function (request) {
    this._request = request;
    this._path = '/user';
};

/**
 * Method get state of Nebulas Network.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getnebstate}
 *
 * @return [NebStateObject]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getnebstate}
 *
 * @example
 * var api = new Neb().api;
 * api.getNebState().then(function(state) {
 * //code
 * });
 */
API.prototype.getNebState = function () {
    return this._sendRequest("get", "/nebstate", null);
};

/**
 * Method get latest irreversible block of Nebulas Network.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#latestirreversibleblock}
 *
 * @return [dataBlockInfo.]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#latestirreversibleblock}
 *
 * @example
 * var api = new Neb().api;
 * api.latestIrreversibleBlock().then(function(blockData) {
 * //code
 * });
 */
API.prototype.latestIrreversibleBlock = function () {
    return this._sendRequest("get", "/lib", null);
};

/**
 * Method return the state of the account. Balance and nonce.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getaccountstate}
 *
 * @param {Object} options
 * @param {HexString} options.address
 * @param {String} options.height
 *
 * @return [accaountStateObject]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getaccountstate}
 *
 * @example
 * var api = new Neb().api;
 * api.getAccountState({address: "n1QsosVXKxiV3B4iDWNmxfN4VqpHn2TeUcn"}).then(function(state) {
 * //code
 * });
 */
API.prototype.getAccountState = function (options) {
    options = utils.argumentsToObject(['address', 'height'], arguments);
    var params = { "address": options.address, "height": options.height };
    return this._sendRequest("post", "/accountstate", params);
};

/**
 * Method wrap smart contract call functionality.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#call}
 *
 * @param {TransactionOptions} options
 *
 * @return [Transcation hash]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#call}
 *
 * @example
 * var api = new Neb().api;
 * api.call({
 *    chainID: 1,
 *    from: "n1QZMXSZtW7BUerroSms4axNfyBGyFGkrh5",
 *    to: "n1SAeQRVn33bamxN4ehWUT7JGdxipwn8b17",
 *    value: 10,
 *    nonce: 12,
 *    gasPrice: 1000000,
 *    gasLimit: 2000000,
 *    contract: {
 *        function: "save",
 *        args: "[0]"
 *    }
 * }).then(function(tx) {
 *     //code
 * });
 */
API.prototype.call = function (options) {
    options = utils.argumentsToObject(['from', 'to', 'value', 'nonce', 'gasPrice', 'gasLimit', 'contract'], arguments);
    var params = {
        "from": options.from,
        "to": options.to,
        "value": utils.toString(options.value),
        "nonce": options.nonce,
        "gasPrice": utils.toString(options.gasPrice),
        "gasLimit": utils.toString(options.gasLimit),
        "contract": options.contract
    };
    return this._sendRequest("post", "/call", params);
};

/**
 * Method wrap submit the signed transaction.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#sendrawtransaction}
 *
 * @param {Object} options
 * @param {String} options.data
 *
 * @return [Transcation hash]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#sendrawtransaction}
 *
 * @example
 * var api = new Neb().api;
 * var tx = new Transaction({
 *    chainID: 1,
 *    from: acc1,
 *    to: acc2,
 *    value: 10,
 *    nonce: 12,
 *    gasPrice: 1000000,
 *    gasLimit: 2000000
 * });
 * tx.signTransaction();
 * api.sendRawTransaction( {data: tx.toProtoString()} ).then(function(hash) {
 * //code
 * });
 */
API.prototype.sendRawTransaction = function (options) {
    options = utils.argumentsToObject(['data'], arguments);
    var params = { "data": options.data };
    return this._sendRequest("post", "/rawtransaction", params);
};

/**
 * Get block header info by the block hash.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getblockbyhash}
 *
 * @param {Object} options
 * @param {HexString} options.hash
 * @param {Boolean} options.fullTransaction
 *
 * @return [Block]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getblockbyhash}
 *
 * @example
 * var api = new Neb().api;
 * api.getBlockByHash({
 *     hash: "00000658397a90df6459b8e7e63ad3f4ce8f0a40b8803ff2f29c611b2e0190b8",
 *     fullTransaction: true
 * }).then(function(block) {
 * //code
 * });
 */
API.prototype.getBlockByHash = function (options) {
    options = utils.argumentsToObject(['hash', 'fullTransaction'], arguments);
    var params = { "hash": options.hash, "full_fill_transaction": options.fullTransaction };
    return this._sendRequest("post", "/getBlockByHash", params);
};

/**
 * Get block header info by the block height.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getblockbyheight}
 *
 * @param {Object} options
 * @param {Number} options.height
 * @param {Boolean} options.fullTransaction
 *
 * @return [Block]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getblockbyheight}
 *
 * @example
 * var api = new Neb().api;
 * api.getBlockByHeight({height:2, fullTransaction:true}).then(function(block) {
 * //code
 * });
 */
API.prototype.getBlockByHeight = function (options) {
    options = utils.argumentsToObject(['height', 'fullTransaction'], arguments);
    var params = { "height": options.height, "full_fill_transaction": options.fullTransaction };
    return this._sendRequest("post", "/getBlockByHeight", params);
};

/**
 * Get transactionReceipt info by tansaction hash.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#gettransactionreceipt}
 *
 * @param {Object} options
 * @param {HexString} options.hash
 *
 * @return [TransactionReceipt]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#gettransactionreceipt}
 *
 * @example
 * var api = new Neb().api;
 * api.getTransactionReceipt({hash: "cc7133643a9ae90ec9fa222871b85349ccb6f04452b835851280285ed72b008c"}).then(function(receipt) {
 * //code
 * });
 */
API.prototype.getTransactionReceipt = function (options) {
    options = utils.argumentsToObject(['hash'], arguments);
    var params = { "hash": options.hash };
    return this._sendRequest("post", "/getTransactionReceipt", params);
};

/**
 * Get transactionReceipt info by contract address.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#gettransactionbycontract}
 * 
 * @param {Object} options
 * @param {HexString} options.address contract address
 * 
 * @returns the same as [TransactionReceipt]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#gettransactionreceipt}
 * 
 * @example
 * var api = new Neb().api;
 * api.getTransactionByContract({address: "n1sqDHGjYtX6rMqFoq5Tow3s3LqF4ZxBvE3"}).then(function(receipt) {
 *  //code
 * });
 */
API.prototype.getTransactionByContract = function (options) {
    options = utils.argumentsToObject(['address'], arguments);
    var params = { "address": options.address };
    return this._sendRequest("post", "/getTransactionByContract", params);
};

/**
 * Return the subscribed events of transaction & block.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#subscribe}
 *
 * @param {Object} options
 * @param {Array|String} options.topics
 * @param {Function} options.onDownloadProgress - On progress callback function. Recive chunk.
 *
 * @return [eventData]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#subscribe}
 *
 * @example
 * var api = new Neb().api;
 * api.subscribe({topics: ["chain.linkBlock", "chain.pendingTransaction"]}).then(function(eventData) {
 * //code
 * });
 */
API.prototype.subscribe = function (options) {
    options = utils.argumentsToObject(['topics', 'onDownloadProgress'], arguments);
    var params = { "topics": options.topics };
    var axiosOptions;
    if (typeof options.onDownloadProgress === 'function') {
        axiosOptions = {
            onDownloadProgress: function (e) {
                if (typeof e.target._readLength === 'undefined') {
                    e.target._readLength = 0;
                }
                var chunk = e.target.responseText.substr(e.target._readLength);
                // TODO check and split multi events
                if (chunk && chunk.trim().length > 0) {
                    e.target._readLength += chunk.length;
                    options.onDownloadProgress(chunk);
                }
            }
        };
    }
    return this._sendRequest("post", "/subscribe", params, null, axiosOptions);
};

/**
 * Return current gasPrice.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getgasprice}
 *
 * @return [Gas Price]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getgasprice}
 *
 * @example
 * var api = new Neb().api;
 * api.gasPrice().then(function(gasPrice) {
 * //code
 * });
 */
API.prototype.gasPrice = function () {
    return this._sendRequest("get", "/getGasPrice", null);
};

/**
 * Return the estimate gas of transaction.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#estimategas}
 *
 * @param {TransactionOptions} options
 *
 * @return [Gas]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#estimategas}
 *
 * @example
 * var api = new Neb().api;
 * api.estimateGas({
 *    chainID: 1,
 *    from: "n1QZMXSZtW7BUerroSms4axNfyBGyFGkrh5",
 *    to: "n1SAeQRVn33bamxN4ehWUT7JGdxipwn8b17",
 *    value: 10,
 *    nonce: 12,
 *    gasPrice: 1000000,
 *    gasLimit: 2000000
 * }).then(function(gas) {
 * //code
 * });
 */
API.prototype.estimateGas = function (options) {
    options = utils.argumentsToObject(['from', 'to', 'value', 'nonce', 'gasPrice', 'gasLimit', 'contract', 'binary'], arguments);
    var params = {
        "from": options.from,
        "to": options.to,
        "value": utils.toString(options.value),
        "nonce": options.nonce,
        "gasPrice": utils.toString(options.gasPrice),
        "gasLimit": utils.toString(options.gasLimit),
        "contract": options.contract,
        "binary": options.binary
    };
    return this._sendRequest("post", "/estimateGas", params);
};

/**
 * Return the events list of transaction.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#geteventsbyhash}
 *
 * @param {Object} options
 * @param {HexString} options.hash
 *
 * @return [Events]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#geteventsbyhash}
 *
 * @example
 * var api = new Neb().api;
 * api.getEventsByHash({hash: "ec239d532249f84f158ef8ec9262e1d3d439709ebf4dd5f7c1036b26c6fe8073"}).then(function(events) {
 * //code
 * });
 */
API.prototype.getEventsByHash = function (options) {
    options = utils.argumentsToObject(['hash'], arguments);
    var params = { "hash": options.hash };
    return this._sendRequest("post", "/getEventsByHash", params);
};

/**
 * Method getter for dpos dynasty.
 * @see {@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getdynasty}
 *
 * @param {Object} options
 * @param {Number} options.height
 *
 * @return [delegatees]{@link https://github.com/nebulasio/wiki/blob/master/rpc.md#getdynasty}
 *
 * @example
 * var api = new Neb().api;
 * api.getDynasty({height: 1}).then(function(delegatees) {
 * //code
 * });
 */
API.prototype.getDynasty = function (options) {
    var params = { "height": options.height };
    return this._sendRequest("post", "/dynasty", params);
};

API.prototype._sendRequest = function (method, api, params, callback, axiosOptions) {
    var action = this._path + api;
    if (typeof callback === "function") {
        return this._request.asyncRequest(method, action, params, callback);
    } else {
        return this._request.request(method, action, params, axiosOptions);
    }
};

module.exports = API;

},{"./utils/utils.js":4}],3:[function(require,module,exports){

"use strict";

var BigNumber = require('bignumber.js');
var utils = require('./utils.js');

var unitMap = {
  'none': '0',
  'None': '0',
  'wei': '1',
  'Wei': '1',
  'kwei': '1000',
  'Kwei': '1000',
  'mwei': '1000000',
  'Mwei': '1000000',
  'gwei': '1000000000',
  'Gwei': '1000000000',
  'nas': '1000000000000000000',
  'NAS': '1000000000000000000'
};

var unitValue = function (unit) {
  unit = unit ? unit.toLowerCase() : 'nas';
  var unitValue = unitMap[unit];
  if (unitValue === undefined) {
    throw new Error('The unit undefined, please use the following units:' + JSON.stringify(unitMap, null, 2));
  }
  return new BigNumber(unitValue, 10);
};

var toBasic = function (number, unit) {
  return utils.toBigNumber(number).times(unitValue(unit));
};

var fromBasic = function (number, unit) {
  return utils.toBigNumber(number).dividedBy(unitValue(unit));
};

var nasToBasic = function (number) {
  return utils.toBigNumber(number).times(unitValue("nas"));
};

module.exports = {
  toBasic: toBasic,
  fromBasic: fromBasic,
  nasToBasic: nasToBasic
};

},{"./utils.js":4,"bignumber.js":"bignumber.js"}],4:[function(require,module,exports){

"use strict";

var BigNumber = require('bignumber.js');

var isNull = function (v) {
	return v === null || typeof v === "undefined";
};

var isBrowser = function () {
	return typeof window !== "undefined";
};

var isBigNumber = function (obj) {
	return obj instanceof BigNumber || obj && obj.constructor && obj.constructor.name === 'BigNumber';
};

var isString = function (obj) {
	return typeof obj === 'string' && obj.constructor === String;
};

var isObject = function (obj) {
	return obj !== null && typeof obj === 'object';
};

var isFunction = function (object) {
	return typeof object === 'function';
};

var isNumber = function (object) {
	return typeof object === 'number';
};

var toBigNumber = function (number) {
	number = number || 0;
	if (isBigNumber(number)) {
		return number;
	}
	if (isString(number) && number.indexOf('0x') === 0) {
		return new BigNumber(number.replace('0x', ''), 16);
	}
	return new BigNumber(number.toString(10), 10);
};

var toString = function (obj) {
	if (isString(obj)) {
		return obj;
	} else if (isBigNumber(obj)) {
		return obj.toString(10);
	} else if (isObject(obj)) {
		return JSON.stringify(obj);
	} else {
		return obj + "";
	}
};

// Transform Array-like arguments object to common array.
var argumentsToArray = function (args) {
	var len = args.length,
	    resultArray = new Array(len);

	for (var i = 0; i < len; i += 1) {
		resultArray[i] = args[i];
	}
	return resultArray;
};

// Create object based on provided arrays
var zipArraysToObject = function (keysArr, valuesArr) {
	var resultObject = {};

	for (var i = 0; i < keysArr.length; i += 1) {
		resultObject[keysArr[i]] = valuesArr[i];
	}
	return resultObject;
};

// Function what make overall view for arguments.
// If arguments was provided separated by commas like "func(arg1 ,arg2)" we create
// ArgumentsObject and write keys from argsNames and value from args.
// in case wheare we provide args in object like "func({arg1: value})"
// we just return that object
var argumentsToObject = function (keys, args) {
	var ArgumentsObject = {};

	args = argumentsToArray(args);
	if (isObject(args[0])) {
		ArgumentsObject = args[0];
	} else {
		ArgumentsObject = zipArraysToObject(keys, args);
	}

	return ArgumentsObject;
};

module.exports = {
	isNull: isNull,
	isBrowser: isBrowser,
	isBigNumber: isBigNumber,
	isString: isString,
	isObject: isObject,
	isFunction: isFunction,
	isNumber: isNumber,
	toBigNumber: toBigNumber,
	toString: toString,
	argumentsToObject: argumentsToObject,
	zipArraysToObject: zipArraysToObject
};

},{"bignumber.js":"bignumber.js"}],5:[function(require,module,exports){

},{}],"bignumber.js":[function(require,module,exports){
'use strict';

module.exports = BigNumber; // jshint ignore:line

},{}],"neb":[function(require,module,exports){

"use strict";

var API = require("./api.js");
var Admin = require("./admin.js");

var Unit = require("./utils/unit.js");

/**
 * Neb API library constructor.
 * @constructor
 * @param {Request} request - transport wrapper.
 */
var Neb = function (request) {
	if (request) {
		this._request = request;
	}

	this.api = new API(this);
	this.admin = new Admin(this);
};

Neb.prototype.setRequest = function (request) {
	this._request = request;
	this.api._setRequest(request);
	this.admin._setRequest(request);
};

Neb.prototype.toBasic = Unit.toBasic;
Neb.prototype.fromBasic = Unit.fromBasic;
Neb.prototype.nasToBasic = Unit.nasToBasic;

module.exports = Neb;

},{"./admin.js":1,"./api.js":2,"./utils/unit.js":3}]},{},[])
//# sourceMappingURL=neb-light.js.map
