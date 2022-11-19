const imgCount = -1;
let images = ["20221117_105152.jpg", "20221117_105222.jpg", "20221117_105239.jpg"];
function change() {
  if (imgCount !== images.length - 1)
    imgCount++;
  else 
    imgCount = 0;
  let image = document.getElementById('image');
  image.src = images[imgCount];
}

