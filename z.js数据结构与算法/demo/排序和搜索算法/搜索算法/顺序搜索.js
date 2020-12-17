function test() {
    this.sequentialSearch = function (item) {
        for (var i = 0; i < array.length; i++) { //{1}
            if (item === array[i])//{2}
                returni;//{3}
        }
    };
    return -1; //{4}
};


