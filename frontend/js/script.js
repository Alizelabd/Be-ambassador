
const alertMessage = document.querySelector('.toast-body');
const countData = document.getElementById("count-data");
const toastbox = document.getElementById('liveToast');
const toastTrigger = document.getElementById('liveToastBtn')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastbox);
if (toastTrigger) {
    toastTrigger.addEventListener('submit', () => {
        toastBootstrap.show();
    })
}
async function getData() {
    const url = 'http://localhost:3000/fetch';
    let bodyTable = document.getElementById("body-table");
    if (bodyTable) {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                data.map((e) => {
                    bodyTable.innerHTML +=
                        `
                        <tr>
                            <td>${e.id}</td>
                            <td>${e.name}</td>
                            <td>${e.nationality}</td>
                            <td>${e.adress}</td>
                            <td>${e.qualification}</td>
                            <td>${e.dialcode}</td>
                            <td>${e.phone}</td>
                            <td id="social-media">
                                ${e.linkedin != '' ? `<a target="_blank" href="${e.linkedin}"><i class="fa-brands fa-linkedin"></i></a>` : ''}
                                ${e.facebook != '' ? `<a target="_blank" href="${e.facebook}"><i class="fa-brands fa-square-facebook"></i></a>` : ''}
                                ${e.twitter != '' ? `<a target="_blank" href="${e.twitter}"><i class="fa-brands fa-square-x-twitter"></i></a>` : ''}
                                ${e.instgram != '' ? `<a target="_blank" href="${e.instgram}"><i class="fa-brands fa-square-instagram"></i></a>` : ''}
                                ${e.tiktok != '' ? `<a target="_blank" href="${e.tiktok}"><i class="fa-brands fa-tiktok"></i></a>` : ''}
                                ${e.snapchat != '' ? `<a target="_blank" href="${e.snapchat}"><i class="fa-brands fa-square-snapchat"></i></a>` : ''}
                            </td>
                            <td><a href="${e.linkvid}">الفيديو التدريبي</a></td>
                            <td>${e.date}</td>
                        </tr>
                `
                });
                countData.innerHTML = `عدد المتقدمين: ${data.length}`
            });
    }
}
console.log(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate( )}`);
getData();
postData();
function postData() {
    let form = document.getElementById("form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            let objData = {};
            formData.forEach((value, key) => {
                objData[key] = value;
            });
            let getDialCode = intlTelInputGlobals.getInstance(phone).selectedCountryData.dialCode;
            objData.dialCode = getDialCode;
            objData.date = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate( )}`;
            // social media link roles check
            const arraySocial = [];
            objData.linkedin == "" ? arraySocial.push(objData.linkedin) : "";
            objData.twitter == "" ? arraySocial.push(objData.linkedin) : "";
            objData.facebook == "" ? arraySocial.push(objData.linkedin) : "";
            objData.instgram == "" ? arraySocial.push(objData.linkedin) : "";
            objData.tiktok == "" ? arraySocial.push(objData.linkedin) : "";
            objData.snapchat == "" ? arraySocial.push(objData.linkedin) : "";
            if (arraySocial.length > 4) {
                alertMessage.innerHTML = "من فضلك أدخل أثنين من حساباتك على الأقل";
                toastBootstrap.show();
            } else {
                const regex = /^[0-9]+$/;
                if (regex.test(objData.phone)) {
                    if (grecaptcha.getResponse()) {
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
                                alertMessage.innerHTML = "تم الإرسال بنجاح";
                                toastBootstrap.show();
                                setTimeout(() => { location.reload() }, 3000)
                            } else {
                                alertMessage.innerHTML = "فشل الأرسال";
                                toastBootstrap.show();
                            }
                        });
                    } else {
                        alertMessage.innerHTML = "أكمل تحقق انا لست روبوت";
                        toastBootstrap.show();
                    }
                } else {
                    alertMessage.innerHTML = "أدخل رقم صحيح";
                    toastBootstrap.show();
                }
            }
        }
    }
}
