const alertMessage = document.querySelector('.toast-body');
const toastbox = document.getElementById('liveToast');
const toastTrigger = document.getElementById('liveToastBtn')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastbox)
if (toastTrigger) {
    toastTrigger.addEventListener('submit', () => {
        toastBootstrap.show();
    })
}
function getData() {
    const url = 'http://localhost:3000/fetch';
    let bodyTable = document.getElementById("body-table");
    fetch(url).then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.map((e) => {
                bodyTable.innerHTML +=
                    `<tr>
                        <td>${e.id}</td>
                        <td>${e.name}</td>
                        <td>${e.nationality}</td>
                        <td>${e.adress}</td>
                        <td>${e.qualification}</td>
                        <td id="social-media">
                            ${e.linkedin != '' ? `<a target="_blank" href="${e.linkedin}"><i class="fa-brands fa-linkedin"></i></a>` : ''}
                            ${e.facebook != '' ? `<a target="_blank" href="${e.facebook}"><i class="fa-brands fa-square-facebook"></i></a>` : ''}
                            ${e.twitter != '' ? `<a target="_blank" href="${e.twitter}"><i class="fa-brands fa-square-x-twitter"></i></a>` : ''}
                            ${e.instgram != '' ? `<a target="_blank" href="${e.instgram}"><i class="fa-brands fa-square-instagram"></i></a>` : ''}
                            ${e.tiktok != '' ? `<a target="_blank" href="${e.tiktok}"><i class="fa-brands fa-tiktok"></i></a>` : ''}
                            ${e.snapchat != '' ? `<a target="_blank" href="${e.snapchat}"><i class="fa-brands fa-square-snapchat"></i></a>` : ''}
                        </td>
                        <td><a href="${e.linkvid}">الفيديو التدريبي</a></td>
                        <td>${e.resjoin}</td>
                        <td>${e.points}</td>
                    </tr>
            `
            });
        });
}
getData();
postData();
function postData() {
    let form = document.getElementById("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        console.log(formData);
        let objData = {};
        formData.forEach((value, key) => {
            objData[key] = value;
        });
        const urlP = 'http://localhost:3000/post';
        fetch(urlP, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objData)
        }).then((res) => {
            if (res.status === 200) {
                toastBootstrap.show();
                alertMessage.innerHTML= "تم الإرسال بنجاح";
                setTimeout(() => {location.reload()}, 5000)
            } else {
                toastBootstrap.show();
                alertMessage.innerHTML= "فشل الأرسال";
            }
        });
    }
}
