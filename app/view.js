var View = (function () {
    function Update(html) {
        document.querySelector('main > div').innerHTML = html;
    }

    var self = {
        Clear: function () {
            Update('');
        },
        EmptyState: function (interaction) {
            Update('<section class="empty"><h2>Nincsenek teendők</h2><p>A teendőid listája jelenleg üres.</p><p>Hozd létre az első tételt!</p><i class="fas fa-plus-circle"></i></section>');//sima tickek köze írva ez a szar csak az enterek nélkül veszi be
            document.querySelector('section.empty').onclick = interaction;
        },
        AddForm: function (submit) {
            Update(`<form>
				
					<label for="taskName">Megnevezés</label>
					<input type="text" id="taskName" maxlength="50" required>
				
					<label for="taskDesc">Leírás</label>
					<textarea id="taskDesc" maxlength="256"></textarea>
					
					<button> <i class="fas fa-check"></i> Hozzáad</button>
					
				</form>`);
            document.querySelector('button').onclick = function (e) {
                e.preventDefault();

                var data = {
                    taskName: document.querySelector('#taskName').value,
                    taskDesc: document.querySelector('#taskDesc').value
                };

                submit(data);
            };
        },
        List: function (model, interaction) {
            var html = '';

            for (var i in model) {
                /*itt a data-tx-szel meg tudjuk majd őket különböztetni*/
                html += ('<section data-tx="' + i + '"><h2>' + model[i].title + '</h2><p>' + model[i].title + '</p></section>');
            }

            Update(html);

            var items = document.querySelectorAll('main section');

            function TaskClick() {
                var confrm = confirm("Valóban törölni szeretnéd?");
                if (confrm == true) {
                    var x = this.getAttribute('data-tx');
                    interaction(x);
                }
            }

            for (var i = 0; i < items.length; i++) {
                items[i].onclick = TaskClick;
            }
        }
    };

    return self;
})();