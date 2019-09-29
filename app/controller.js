var Controller = (function () {
    function TaskList() {
        var tasks = Model.GetAll();

        if (tasks.length > 0) {
            View.List(tasks, function (x) {
                    Model.Remove(x);
                    TaskList();
                }
            );
        } else View.EmptyState();
    }

    function AddNew() {
        View.AddForm(function (data) {
            Model.AddNew(data.taskName, data.taskDesc);
        });
    }

    var self = {
        Run: function () {
            View.Clear();

            var cmd = document.querySelectorAll('footer a');

            cmd[0].onclick = function (e) {
                e.preventDefault();
                AddNew();
            };

            cmd[1].onclick = function (e) {
                e.preventDefault();
                TaskList();
            };

            TaskList();
        }
    };

    return self;
})();