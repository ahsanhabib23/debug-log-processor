class TestTypescript {
	orgs: any;
	deviceWatchers: Map<string, any>;
	constructor() {
		this.orgs = [];
		this.deviceWatchers = new Map();

		this.orgs[0] = {name: 'asdf'};
		this.orgs['habib'] = {name: 'habib'};
		this.orgs['ahsan'] = {name: 'ahsan'};
		this.orgs['umar'] = {name: 'umar'};
		// for (let key in this.orgs) {
		// 	console.log(key, this.orgs[key]);
		// }
		let sensor = {
			_id: 1,
			ref: 'Atea Sensor',
			type: 'sensor'
		};
		this.createDeviceWatcher(sensor);
		sensor = {
			_id: 2,
			ref: 'Gture Sensor',
			type: 'sensor'
		};
		this.createDeviceWatcher(sensor);
		setInterval(() => console.log(this.deviceWatchers), 3000);
	}

	protected createDeviceWatcher(device) {
        this.deviceWatchers.set(device._id, {
                ref: device.ref,
                type: device.type,
                handle: setInterval(() =>
                        console.log('createDeviceWatcher called', device.ref),
                    1000 // 3 second check interval
                )
            }
        );
    }
}

let testTypescript = new TestTypescript();