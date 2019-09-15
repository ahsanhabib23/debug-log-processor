"use strict";
exports.__esModule = true;
var PouchDB = require("pouchdb");
var LogProcessor = /** @class */ (function () {
    function LogProcessor() {
        this.macTable = new Map();
        this.devices = new Map();
        this.deviceWatchers = new Map();
        this.lastSensorLogs = new Map();
        console.log('LogProcessor started');
        // Install upsert plugin for PouchDB
        PouchDB.plugin(require('pouchdb-upsert'));
        var admdbname = "dev-diapersens-adm";
        var remoteurl = 'http://admin:secret@127.0.0.1:5984/' + admdbname;
        this.dbadm = new PouchDB(remoteurl);
        this.dbadm.changes({
            since: 'now',
            include_docs: true
        }).on('change', function (change) {
            // received a change
            // TODO: Update org info table
            console.log("ADM DB change received: " + JSON.stringify(change));
        }).on('error', function (err) {
            // handle errors
            console.error("DB changes error: " + err);
        });
        var loadingDone = null;
        var loadingFailed = null;
        var loadingPromise = new Promise(function (resolve, reject) {
            loadingDone = resolve;
            loadingFailed = reject;
        });
        loadingPromise
            .then(function () {
            console.log('=======================CHANGE FEED DONE====================');
        })["catch"](function (err) {
            console.log('=======================CHANGE FEED ERROR====================');
            console.dir(err);
        });
        this.getOrgs().then(function (orgs) {
            console.log("Orgs received: ");
            console.dir(orgs);
            loadingDone(true);
            console.log("Processed orgs");
        });
    }
    LogProcessor.prototype.getOrgs = function () {
        var _this = this;
        var mapFunction = "orgs/all";
        var queryOptions;
        queryOptions = {
            include_docs: true
        };
        return new Promise(function (resolve) {
            console.log("Querying for orgs");
            _this.dbadm.query(mapFunction, queryOptions).then(function (result) {
                _this.orgs = [];
                console.log("Got or5gs:");
                console.dir(result);
                result.rows.map(function (row) {
                    _this.orgs[row.id] = row.doc;
                });
                resolve(_this.orgs);
                // PubSub.publish('orgs-loaded', this.orgs);
            })["catch"](function (error) {
                console.log(error);
            });
        });
    };
    return LogProcessor;
}());
var logProcessor = new LogProcessor();
