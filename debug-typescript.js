var TestTypescript = /** @class */ (function () {
    function TestTypescript() {
        this.orgs = [];
        this.orgs['habib'] = { name: 'habib' };
        this.orgs['ahsan'] = { name: 'ahsan' };
        this.orgs['umar'] = { name: 'umar' };
        console.log(this.orgs);
        console.log(this.orgs[1]);
        console.log(this.orgs['umar']);
    }
    return TestTypescript;
}());
var testTypescript = new TestTypescript();
