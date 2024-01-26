const detailsApp = document.getElementById('details-app');
function getId() {
    // detailsApp.innerHTML = `<div class="spinner-grow m-auto d-block" role="status"></div>`;
    const id = document.getElementById("id").value;
    if (!id == "") {
        fetch(`http://localhost:3000/data/${id}`)
            .then((res) => {
                if (!res.ok) {
                    detailsApp.innerHTML = `<div style="margin: 50px auto; display: block;" class="text-danger fw-bold font-sz3 text-center">حدث خطأ ما يرجى اعادة المحاولة</div>
                    `
                } else {
                    return res.json();
                }
            }).then((data) => {
                if (detailsApp) {
                    detailsApp.innerHTML =
                        `
                    <div id="details-app">
                        <div class="grid-system">
                            <div class="personal-box p-5 shadow font-sz3 rounded">
                                <h3 class="text-center mb-3 fw-bold text-success">المعلومات الشخصية</h3>
                                <div class="d-flex justify-content-around">
                                    <div><span class="fw-bold">الاسم:</span> ${data.name}</div>
                                    <div >
                                        <i class="fa-solid fa-location-dot"></i>
                                            <span>${data.adress}</span>
                                    </div>
                                </div>
                                        <div class="d-flex justify-content-around">
                                            <div><span class="fw-bold">المؤهل العلمي:</span> ${data.qualification}</div>
                                            <div><span class="fw-bold">الجنسية:</span> ${data.nationality}</div>
                                        </div>
                                        <div class="text-center mt-5"><span class="fw-bold">رقم الهاتف:</span> ${data.phone} <span dir="ltr">+${data.dialcode}</span></div>
                                        <div class="text-center fw-bold mt-5"><a target="_blank" href="${data.linkvid}">رابط الفيديو التدريبي</a></div>
                                    </div>
                                    <div class="social-media-box p-5 shadow font-sz3 rounded">
                                        <h3 class="text-center mb-3 fw-bold text-primary">حسابات التواصل الإجتماعي</h3>
                                        <div id="social-media" class="gap-5">
                                        ${data.linkedin != '' ? `<a target="_blank" href="${data.linkedin}"><i class="fa-brands fa-linkedin"></i></a>` : ''}
                                        ${data.facebook != '' ? `<a target="_blank" href="${data.facebook}"><i class="fa-brands fa-square-facebook"></i></a>` : ''}
                                        ${data.twitter != '' ? `<a target="_blank" href="${data.twitter}"><i class="fa-brands fa-square-x-twitter"></i></a>` : ''}
                                        ${data.instgram != '' ? `<a target="_blank" href="${data.instgram}"><i class="fa-brands fa-square-instagram"></i></a>` : ''}
                                        ${data.tiktok != '' ? `<a target="_blank" href="${data.tiktok}"><i class="fa-brands fa-tiktok"></i></a>` : ''}
                                        ${data.snapchat != '' ? `<a target="_blank" href="${data.snapchat}"><i class="fa-brands fa-square-snapchat"></i></a>` : ''}
                                        </div>
                                    </div>
                                    <div class="question-box p-5 shadow font-sz3 rounded">
                                        <h3 class="text-center fw-bold mb-3 text-info">السبب الرئيسي للإنضمام للمبادرة</h3>
                                        <p class="text-center">${data.resjoin}</p>
                                    </div>
                                    <div class="question-box p-5 shadow font-sz3 rounded">
                                        <h3 class="text-center fw-bold mb-3 text-info">نقاط التعاون يمكن أن تكون بيننا في المستقبل</h3>
                                        <p class="text-center">${data.points}</p>
                                    </div>
                                </div>
                            </div>
                                `;
                }
            });
    }
}
