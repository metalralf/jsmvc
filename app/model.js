var Model = (function () {
    var storage = null;

    function Init() {
        if (storage === null) {
            storage = window.localStorage.getItem('model');

            if (!storage) {
                storage = [];
                Sync();
            } else storage = JSON.parse(storage);
        }
    }

    function Sync() {
        window.localStorage.setItem('model',
            JSON.stringify(storage));
    }

    Init();

    var self =
        {
            AddNew: function (title, desc) {
                Init();
                storage.push({
                    title: title,
                    desc: desc
                });
                Sync();
            },
            Remove: function (index) {
                Init();
                if (index < storage.length) {
                    storage.splice(index, 1);
                }
                Sync();
            },
            GetAll: function () {
                Init();
                return storage;
            }
        };

    return self;

})();