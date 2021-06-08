function toStageInfo() { //集团
    document.getElementById("li_stage").className="li current";
    document.getElementById("li_class").className="li";
    document.getElementById("li_photo").className="li";
    document.getElementById("li_Introduction").className="article";
    document.getElementById("li_catalogue").className="article show";
    document.getElementById("li_leadership").className="article show";
}

function toClaRecordDetail() { //事迹
    document.getElementById("li_stage").className="li";
    document.getElementById("li_class").className="li current";
    document.getElementById("li_photo").className="li";
    document.getElementById("li_catalogue").className="catalogue";
    document.getElementById("li_Introduction").className="article show";
    document.getElementById("li_leadership").className="article show";

}
function toTrainPhoto() { //领导
    document.getElementById("li_stage").className="li";
    document.getElementById("li_class").className="li";
    document.getElementById("li_photo").className="li current";
    document.getElementById("li_leadership").className="leadership";
    document.getElementById("li_catalogue").className="article show";
    document.getElementById("li_Introduction").className="article show";
}