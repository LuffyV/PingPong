 var pictureSource;
var destinationType;

        function initCamara() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;

        }

        function onPhotoDataSuccess(imageData){
           var element=$('#imagePlayer');
            element.attr("src",imageData);
        }

        function onPhotoURISuccess(imageURI){

            var largeImage=document.getElementById("imagePlayer");
            largeImage.src=imageURI;

        }

        function onFail(message){
            alert("Fail on the uso of the Camera."+message);
        }


        function capturePhoto(){
            navigator.camera.getPicture(onPhotoDataSuccess, onFail,{quality:50, destinationType:destinationType.FILE_URI,
                saveToPhotoAlbum:true});
        }




        function getPhoto(source){
            navigator.camera.getPicture(onPhotoURISuccess,onFail,{quality:50,destinationType:destinationType.FILE_URI,sourceType:source});


        }