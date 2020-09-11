let memeCanvas = document.getElementById("memeCanvas");
let ctx = memeCanvas.getContext('2d');
let image = new Image;
image.src = "Attributes/images/memeStarter.jpeg"
let original =new Image;
original.src = "Attributes/images/memeStarter.jpeg"
let imageInput = document.getElementById('imageInput');
let reader = new FileReader();
let topText=document.getElementById('topText')
let generator=document.getElementById('generator');
let gallary=document.getElementById("gallary");

function postToCanvas(){
    ctx.drawImage(image,0,0,memeCanvas.width,memeCanvas.height)
}
image.addEventListener('load',postToCanvas);

function reset(){
    ctx.drawImage(image,0,0,memeCanvas.width,memeCanvas.height)
    image.src = original.src;
    topText.value ='';
    bottomText.value='';
}


function handleEvent(event) {
    if (event.type === "load") {
        image.src = reader.result;
    }
}

function addListeners(reader) {
    reader.addEventListener('load', handleEvent);
    
}

function handleSelected(e) {
    const selectedFile = imageInput.files[0];
    if (selectedFile) {
        addListeners(reader);
        reader.readAsDataURL(selectedFile);
    }
}

imageInput.addEventListener('change', handleSelected);



//Top Text



topText.addEventListener('input', updateValue);

function updateValue(e) {
    memeCanvas.width = memeCanvas.width;
    postToCanvas();
    
  
    let fontSize = memeCanvas.width /15
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = "white";
    ctx.strokeStyle = "5px 5px black";
    ctx.shadowColor= "black";
    ctx.shadowOffsetX= 5;
    ctx.shadowOffsetY= 5;
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign= 'center';
    
    ctx.textBaseline = 'top';
    ctx.textContent=e.target.value;  
    ctx.fillText(topText.value,memeCanvas.width/(2), 0, memeCanvas.width);
    
}

//Bottom Text



bottomText.addEventListener('input', updateValueB);

function updateValueB(e) {
    
    memeCanvas.width = memeCanvas.width;
    postToCanvas();
    updateValue(e);
  
    let fontSize = memeCanvas.width /15
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = "white";
    ctx.strokeStyle = "5px 5px black";
    ctx.shadowColor= "black";
    ctx.shadowOffsetX= 5;
    ctx.shadowOffsetY= 5;
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign= 'center';
    
    ctx.textBaseline = 'bottom';
    ctx.textContent=e.target.value;  
    ctx.fillText(bottomText.value,memeCanvas.width/(2), memeCanvas.height, memeCanvas.width);
}

//Generating a Meme


function addToGallery(e){
    

    const dataURL = memeCanvas.toDataURL();
    const newImage = document.createElement('img');
    newImage.src=dataURL;
    newImage.classList="savedMeme"
    const newDiv= document.createElement('div');
    newDiv.classList="imageContainer"
    newDiv.appendChild(newImage);
    gallary.appendChild(newDiv);
    const btn = document.createElement('button');
   
    newDiv.appendChild(btn);
    btn.innerHTML="remove"
    
    btn.classList='removeButton'

    btn.addEventListener('click',removeButton);
    
    reset();
}
generator.addEventListener('click',addToGallery);

function removeButton(e){
    e.currentTarget.parentNode.remove();    
    }
    



