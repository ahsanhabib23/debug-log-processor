class Logprocessor {
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
			_id: '1',
			ref: 'Atea Sensor',
			type: 'sensor'
		};
		this.createDeviceWatcher(sensor);
		sensor = {
			_id: '2',
			ref: 'Gture Sensor',
			type: 'sensor'
		};
		this.createDeviceWatcher(sensor);
		setInterval(() => console.log(this.deviceWatchers), 3000);
		setTimeout(() => {
			clearInterval(this.deviceWatchers.get('2').handle);
			this.deviceWatchers.set('2', "Habib")
		}, 5000);
	}

	protected createDeviceWatcher(device) {
		console.log('device._id', device._id);
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

// let testTypescript = new Logprocessor();

class Typescript {
	constructor() {
		let a1 = {
			name: 'Umar'
		}
		let a2 = a1;
		let a3 = a1.name;
		a1.name = 'asdf';
		console.log(a1);
		console.log(a2);
		console.log(a3);
	}
}

let typescript = new Typescript();
