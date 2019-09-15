import * as moment from 'moment';
import * as PouchDB from 'pouchdb';
import * as follow from 'follow';

class LogProcessor {
	dbfeed: any;
	dbadm: any;
	orgs: any[];
	dblist: Map<string, any>;
	macTable: Map<string, string> = new Map();
	devices: Map<string, any> = new Map();
    deviceWatchers: Map<string, any> = new Map();
	lastSensorLogs: Map<string, any> = new Map();

	constructor() {
		console.log('LogProcessor started');
		// Install upsert plugin for PouchDB
        PouchDB.plugin(require('pouchdb-upsert'));

		let admdbname = "dev-diapersens-adm";
        let remoteurl = 'http://admin:secret@127.0.0.1:5984/' + admdbname;
		this.dbadm = new PouchDB(remoteurl);
		
		this.dbadm.changes({
            since: 'now',
            include_docs: true
        }).on('change', (change: any) => {
            // received a change
            // TODO: Update org info table
            console.log("ADM DB change received: " + JSON.stringify(change));
        }).on('error', (err: any) => {
            // handle errors
            console.error("DB changes error: " + err);
        });


		let loadingDone = null;
        let loadingFailed = null;
        let loadingPromise = new Promise((resolve, reject) => {
            loadingDone = resolve;
            loadingFailed = reject;
        });
		loadingPromise
		.then(() => {
            console.log('=======================CHANGE FEED DONE====================');
        }).catch((err)=>{
            console.log('=======================CHANGE FEED ERROR====================');
            console.dir(err);
		});
		
		this.getOrgs().then((orgs: any) => {
			console.log("Orgs received: ");
			console.dir(orgs);
			loadingDone(true);
			loadingDone(true);
			loadingDone(true);
			loadingDone(true);
			console.log("Processed orgs");
		})
	}

	getOrgs() {
        let mapFunction = "orgs/all";
        let queryOptions: {};
        queryOptions = {
            include_docs: true
        };

        return new Promise((resolve) => {
            console.log("Querying for orgs");

            this.dbadm.query(mapFunction, queryOptions).then((result: any) => {
                this.orgs = [];

                console.log("Got or5gs:");
                console.dir(result);
                result.rows.map((row: any) => {
                    this.orgs[row.id] = row.doc;
                });

                resolve(this.orgs);
                // PubSub.publish('orgs-loaded', this.orgs);
            }).catch((error: any) => {
                console.log(error);
            });
        });
    }
}

let logProcessor = new LogProcessor();