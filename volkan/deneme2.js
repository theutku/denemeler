function test() {
    this.a = 1;
}

test.Statik1 = function () {
    this.prototype.a = 5;
}

var y = new test();

test.Statik1();