const learnCT = document.getElementById('learnCT')
const learnCT2 = document.getElementById('learnCT2')
const learn = document.getElementById('learnCTContent')
content_block.style.display = "none";
startBtn.onclick = function() {
    welcome_block.style.display = "none";
    content_block.style.display = "block";
};

backBtn.onclick = function() {
    welcome_block.style.display = "block";
    content_block.style.display = "none";
};

let learnCTcontent = "";
let learnContent = "";
let icon = "";
let source = "";
function contentLoad(contentTable){
    for (let m = 0; m < contentTable.length; m++) {
        learnCTcontent += '<div class="card card-body p-2 fw-medium mb-2">'+contentTable[m].title+'</div>'
        for (let i = 0; i < contentTable[m].lessons.length; i++) {
            learnCTcontent += "<button class=\"btn btn-primary w-100 text-start mb-2 lh-1 shadow\" data-bs-toggle=\"collapse\" href=\"#content"+i+"\" aria-expanded=\"false\" aria-controls=\"content"+i+"\">"+ contentTable[m].lessons[i].title +"<br><i class='small fw-medium'><i class=\"bi bi-person\"></i> "+contentTable[m].lessons[i].author+"</i></button>"
            + "<div class=\"collapse mb-2 shadow-sm\" id=\"content"+i+"\"><div class=\"btn-group-vertical w-100 border rounded\" role=\"group\" aria-label=\"Vertical button group\">";

            for (let j = 0; j < contentTable[m].lessons[i].content.length; j++) {
                switch (contentTable[m].lessons[i].content[j].type) {
                    case "video":
                        icon = '<i class="bi bi-youtube"></i>';
                        break;
                    case "presentation":
                        icon = '<i class="bi bi-easel"></i>';
                        break;
                    case "syllabus":
                        icon = '<i class="bi bi-card-text"></i>';
                        break;
                    case "game":
                        icon = '<i class="bi bi-controller"></i>';
                        break;
                    default:
                        icon = '<i class="bi bi-ui-radios"></i>';
                        break;
                };

                if (contentTable[m].lessons[i].content[j].source_type == "emded") {
                    source = '<iframe class="w-100 rounded" src="'+contentTable[m].lessons[i].content[j].link+'" allowfullscreen height="500px"></iframe>';
                } else {
                    source = '';
                }

                //learnCTcontent += '<div class="btn-group" role="group"><button type="button" class="btn btn-light pe-none">'+icon+'</button><button class="btn btn-light text-start lh-1 w-100" id="lc_'+i+'_'+j+'-tab" data-bs-toggle="pill" data-bs-target="#lc_'+i+'_'+j+'" type="button" role="tab" aria-controls="lc_'+i+'_'+j+'" aria-selected="true">'+contentTable[i].content[j].title+'<br><i class="small">'+contentTable[i].content[j].source+'</i></button></div>'
                learnCTcontent += '<div class="btn-group" role="group"><button type="button" class="btn btn-light pe-none">'+icon+'</button><button type="button" class="btn btn-light text-start lh-1 w-100" onclick="viewContent('+m+', '+i+','+j+')" data-bs-dismiss="offcanvas" data-bs-target="#LearnContent" aria-label="Close">'+contentTable[m].lessons[i].content[j].title+'<br><i class="small">'+contentTable[m].lessons[i].content[j].source+'</i></button></div>';
                //learnContent += '<div class="w-100 h-100 tab-pane fade" id="lc_'+i+'_'+j+'" role="tabpanel" aria-labelledby="lc_'+i+'_'+j+'-tab" tabindex="0">'+source+'</div>';
            }
                                                
            learnCTcontent+= "</div></div>"
        };  
    };
    learnCT.innerHTML = learnCTcontent;
    learnCT2.innerHTML = learnCTcontent;
    learn.innerHTML = learnContent;
}

function viewContent(mid, ctid, cid){
    vContent = contentTable[mid].lessons[ctid].content[cid]
    switch (vContent.type) {
        case "video":
            icon = '<i class="bi bi-youtube"></i>';
            break;
        case "presentation":
            icon = '<i class="bi bi-easel"></i>';
            break;
        case "syllabus":
            icon = '<i class="bi bi-card-text"></i>';
            break;
        case "game":
            icon = '<i class="bi bi-controller"></i>';
            break;
        default:
            icon = '<i class="bi bi-ui-radios"></i>';
            break;
    };

    source = '';

    switch (vContent.source_type) {
        case "emded":
            source = '<iframe class="w-100 rounded d-none" id="ci" src="'+vContent.link+'" allowfullscreen height="98%" onload="document.getElementById("loading").style.display="none";"></iframe>';
            break;
        case "text":
            fetch(vContent.link)
                .then(data => {
                    source = '<iframe class="w-100 rounded d-none" id="ci" onload="document.getElementById("loading").style.display="none";">'+data+'</iframe>';
                });
            break;
        default:
            break;
    }

    cTitle.textContent = contentTable[mid].lessons[ctid].title;
    learnContent = '<div class="w-100 h-100 zn-1"><div id="loading" class="text-center" style="height: 90%;"><div class="position-absolute top-50 start-50 translate-middle"><div class="spinner-border text-primary" role="status"></div><br><span class="small">Сәл күте тұрыңыз</span></div></div>'+source+'</div>';
    learn.innerHTML = learnContent;
    const ci = document.getElementById('ci')
    ci.addEventListener("load", function(){
        var preloader = document.querySelector("#loading");
        preloader.style.display = "none";
        ci.classList.remove("d-none")
    });
}