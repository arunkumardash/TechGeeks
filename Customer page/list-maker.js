
userData = {
    "userID": 203,
    "userName": "Bobby",
    "userThumbnailUrl": "https://s-media-cache-ak0.pinimg.com/236x/5d/ff/9b/5dff9b231abc664c147f413acacdd4e0.jpg"
}

const uid = userData["userID"]; 


defaultCollectionTitles = ["Imman Annachi", "Milk Shop", "Vegetable Mart"]

var savebtn = document.createElement('button');
savebtn.id = 'curaLoveBtn';
savebtn.className = 'cura-bt';
savebtn.addEventListener('click', openModal); 
savebtn.addEventListener('click', readUsersCollections);

savebtn.setAttribute('data-contentName', document.getElementById("sample-item").getAttribute("data-contentname"));  
savebtn.setAttribute('data-contentID', document.getElementById("sample-item").getAttribute("data-contentid"));  
savebtn.setAttribute('data-contentthumbnailurl', document.getElementById("sample-item").getAttribute("data-contentthumbnailurl"));  

document.getElementById("curabutton").appendChild(savebtn);

var btnimg = document.createElement('img');
btnimg.id = 'curaBtnImg';
btnimg.className = 'curaBtnImg';
btnimg.src = 'bt-heart.png';
document.getElementById("curaLoveBtn").appendChild(btnimg);

var btnText = document.createTextNode("Bills");
document.getElementById("curaLoveBtn").appendChild(btnText);

var curaSaveModal = document.createElement('div');
curaSaveModal.id = "curaSaveModal";
curaSaveModal.className = "cura-modal";
document.getElementsByTagName('body')[0].appendChild(curaSaveModal);

var curaModalContent = document.createElement('div');
curaModalContent.id = "cura-modal-content";
curaModalContent.className = "cura-modal-content";
document.getElementById("curaSaveModal").appendChild(curaModalContent);

readUsersCollections(uid); //Pass the User ID

function readUsersCollections(uid){
    document.getElementById("cura-modal-content").innerHTML = "";

    var curaCloseModalSpan = document.createElement('curaCloseModalSpan');
    curaCloseModalSpan.innerHTML = "x";
    curaCloseModalSpan.className = "curaModalClose";
    curaCloseModalSpan.addEventListener('click', closeModalWithFade);
    document.getElementsByClassName("cura-modal-content")[0].appendChild(curaCloseModalSpan);
    
    var curaCloseModalContentTitle = document.createElement('div');
    curaCloseModalContentTitle.innerHTML = "Pick a shop";
    curaCloseModalContentTitle.className = "curaCloseModalContentTitle";
    document.getElementsByClassName("cura-modal-content")[0].appendChild(curaCloseModalContentTitle);

    var curaCollectionListContainer = document.createElement('div');
    curaCollectionListContainer.id = "curaCollectionListContainer";
    curaCollectionListContainer.className = "curaCollectionListContainer";
    document.getElementsByClassName("cura-modal-content")[0].appendChild(curaCollectionListContainer);
    
    
    defaultCollectionTitles.forEach(function(value, i){ //forEach passes a value and index position
     
        var colRow = document.createElement("a");
        colRow.id = "curaColRow" + 99999999999 + i;
        colRow.className = "curaColRow";
        colRow.innerHTML = value;
        colRow.style.display = "block";
        colRow.href = "#";
        colRow.setAttribute('data-collectionname', value);
        colRow.setAttribute('data-collectionid', i); // The Curalytics API assigns collection IDs on the back-end. It's important to consider how you're generating your collectionID. A default entry is put here.
        colRow.addEventListener('click', curaPostContentDefaultCollection); // Triggers a function that will post this content to a database.
        colRow.addEventListener('click', curaConfirmSave); //Triggers a function that will confirm the content is "saved".
        document.getElementsByClassName("curaCollectionListContainer")[0].appendChild(colRow);
    });
    
    // "+ New List" Link
    var curaCreateCollection = document.createElement("a");
    curaCreateCollection.id = "curaCreateCollection";        
    curaCreateCollection.className = "curaCreateCollection";
    curaCreateCollection.innerHTML = "+ New List";
    curaCreateCollection.style.display = "block";
    curaCreateCollection.href = "#";
    //curaCreateCollection.setAttribute('data-collectionid', "1");
    document.getElementsByClassName("cura-modal-content")[0].appendChild(curaCreateCollection);

    var curaMakeBox = document.createElement('div');
    curaMakeBox.id = "curaMakeBox";
    curaMakeBox.className = "curaMakeBox";
    curaMakeBox.style.display = "none";
    document.getElementsByClassName("cura-modal-content")[0].appendChild(curaMakeBox);

    curaCreateCollection.addEventListener('click', showMakeBox);
    
    var curaMakeInputForm = document.createElement('form');
    curaMakeInputForm.id = "curaInputForm";
    curaMakeInputForm.addEventListener('submit', curaPostContentNewCollection, false); 
    document.getElementById("curaMakeBox").appendChild(curaMakeInputForm);
   
    var curaMakeInputBox = document.createElement('input');
    curaMakeInputBox.id = "makeInputBox";
    curaMakeInputBox.name = "collectionName";
    curaMakeInputBox.placeholder = "What is this list called?";
    document.getElementById("curaInputForm").appendChild(curaMakeInputBox);

    var savebtn = document.createElement('button');
    savebtn.id = 'curaSaveBtn';
    savebtn.className = 'cura-bt-disabled';
    savebtn.innerHTML = 'Save';
    savebtn.title = 'Please enter a title.';
    savebtn.disabled = true;
    savebtn.addEventListener('click', curaConfirmSave2);
    document.getElementById("curaInputForm").appendChild(savebtn);
}

function openModal() {
    var curaModalElement = document.getElementById('curaSaveModal');
    curaModalElement.style.display = "block";
    curaFadeIn(curaModalElement); 
    contentData = {};
    contentData["contentID"] = this.getAttribute("data-contentid"); 
    contentData["contentName"] = this.getAttribute("data-contentname");
    contentData["contentThumbnailUrl"] = this.getAttribute("data-contentthumbnailurl");
}

function closeModalWithFade() {
    var curaModalElement = document.getElementById('curaSaveModal');
    curaFadeOut(curaModalElement); 
    document.getElementById("curaCreateCollection").style.display = "block"; 
    closeMakeBox(); 
}

window.onclick = function(event) {
    var curaModalElement = document.getElementById('curaSaveModal');
    if (event.target == curaModalElement) {
        //curaModalElement.style.display = "none";
        curaFadeOut(curaModalElement); 
        document.getElementById("curaCreateCollection").style.display = "block"; 
        closeMakeBox(); 
    }
}


function disableSaveButtonUnlessTextPresent(){
    
    var inputBox = document.getElementById("makeInputBox");
    var saveButton = document.getElementById("curaSaveBtn");

    inputBox.oninput = function(){
        if(this.value != ''){
            saveButton.disabled = false;
            inputBox.style.background = '#c9ffc6';
            saveButton.className = 'cura-bt2';
            saveButton.title = 'Ready to save!';

        }else{
            saveButton.disabled = true;
            inputBox.style.background = 'white';
            saveButton.className = 'cura-bt-disabled';
            saveButton.title = 'Please enter a title.';
        }
    };
};

function curaConfirmSave() {

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    var curaSaveConfirm = document.createElement('div');
    curaSaveConfirm.id = "curaSaveConfirm";
    curaSaveConfirm.className = "curaSaveConfirm";
    curaSaveConfirm.innerHTML = "Saved!";
    curaSaveConfirm.style.display = "block";

    insertAfter(this, curaSaveConfirm);
    this.style.display = "none"; 
    var hiddenCollectionElement = this 
    setTimeout(function() {
        curaSaveModalSaved = document.getElementById("curaSaveModal");
        curaFadeOut(curaSaveModalSaved);
    }, 800); 
    setTimeout(function() {
        hiddenCollectionElement.style.display = "block";
        document.getElementById("curaSaveConfirm").remove();
        
        document.getElementById("curaCreateCollection").style.display = "block"; 
        closeMakeBox(); 
        
    }, 1000); 
    
}

function curaConfirmSave2() {

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    makeBox = document.getElementById("curaMakeBox");
    

    var curaSaveConfirm = document.createElement('div');
    curaSaveConfirm.id = "curaSaveConfirm2";
    curaSaveConfirm.className = "curaSaveConfirm2";
    curaSaveConfirm.innerHTML = "Saved!";
    curaSaveConfirm.style.display = "block";

    insertAfter(makeBox, curaSaveConfirm);
    makeBox.style.display = "none"; 
    setTimeout(function() {
        curaSaveModalSaved = document.getElementById("curaSaveModal");
        curaFadeOut(curaSaveModalSaved);
    }, 800); 

    setTimeout(function() {
        makeBox.style.display = "block";
        document.getElementById("curaSaveConfirm2").remove();
        
        document.getElementById("curaCreateCollection").style.display = "block"; 
        closeMakeBox(); 
        document.getElementById("curaInputForm").reset(); 
    }, 1000); 
    
}

function showMakeBox(e) {
    e.preventDefault(); 

    document.getElementById("curaMakeBox").style.display = "block";
    document.getElementById("curaCreateCollection").style.display = "none";
    
    var collectionNameBox = document.getElementById("makeInputBox");
    collectionNameBox.focus();
    collectionNameBox.select();
    
    disableSaveButtonUnlessTextPresent();
}

function closeMakeBox() {
    var box = document.getElementById("curaMakeBox");
    box.style.display = "none";
}

function curaFadeOut(element){
    var op = 1;  
    var timer = setInterval(function () {
        if (op <= 0.05){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 7); 
}

function curaFadeIn(el){
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 75; //Adjust Fade-In Time
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}



function curaPostContentDefaultCollection(e) {
    e.preventDefault(); 
    curaFinalContent = {};
    curaFinalContent["contentID"] = parseInt(contentData["contentID"]);
    curaFinalContent["contentName"] = contentData["contentName"];
    curaFinalContent["contentThumbnailUrl"] = contentData["contentThumbnailUrl"];
    curaFinalContent["collectionName"] =  this.getAttribute("data-collectionname");
    curaFinalContent["userID"] = uid;
    curaFinalContent["userName"] = userData["userName"];
    curaFinalContent["userThumbnailUrl"] = userData["userThumbnailUrl"];
    console.log(curaFinalContent);
}

function curaPostContentNewCollection(e) {
    e.preventDefault(); 
    curaFinalContent = {};
    curaFinalContent["contentID"] = parseInt(contentData["contentID"]);
    curaFinalContent["contentName"] = contentData["contentName"];
    curaFinalContent["contentThumbnailUrl"] = contentData["contentThumbnailUrl"];
    curaFinalContent["collectionName"] = this.collectionName.value; 
    curaFinalContent["userID"] = uid;
    curaFinalContent["userName"] = userData["userName"];
    curaFinalContent["userThumbnailUrl"] = userData["userThumbnailUrl"];
    console.log(curaFinalContent);
    
    defaultCollectionTitles.push(this.collectionName.value); 
}