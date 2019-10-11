function handleLoad() {

    //Display vehicle list
    var form = document.querySelector('form');

    function refreshList() {
        fetch('/api/vehicle').then((raw) => {
            return raw.json();
        })
        .then((info) => {
            var container = document.querySelector('.listContainer');
            container.innerHTML = "";
            console.log(info);
            info.forEach((item) => {
                var vehicle = document.createElement('ul');
                vehicle.innerHTML = '<li>'+item.brand+'</li><li>'+item.wheels+'</li><li>'+item.color+'</li><li><button class="delete">X</button></li>';
                container.appendChild(vehicle);
                vehicle.classList.add('container__item');
                vehicle.style.backgroundColor = item.color;
                console.log('Item agregado');
            });

            //Delete info from list
            var btns = document.querySelectorAll('.delete');

            btns.forEach((btn, index) => {
                btn.addEventListener('click', () => {

                    var data = new URLSearchParams();
                    
                    data.append('index', index);

                    fetch('/api/vehicle', {
                        method: 'DELETE',
                        body: data
                    })
                    .then(raw => {
                        return raw.json();
                    })
                    .then(itemToDelete => {
                        refreshList();
                        console.log(itemToDelete);
                    });
                });
            });
        });
    }

    refreshList();

    //Send form info
    form.addEventListener('submit', () => {
        event.preventDefault();

        var formInfo = new FormData(form);

        var data = new URLSearchParams(formInfo);

        var promise = fetch('/api/vehicle', {
            method: 'POST',
            body: data
        });

        promise.then((raw) => {
            return raw.json();
        })
        .then((info) => {
            form.reset();
            refreshList();
            console.log(info);
        })
    });

    
    
}

window.addEventListener('load',  handleLoad);