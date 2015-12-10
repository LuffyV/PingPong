 var pictureSource;
var destinationType;

        function initCamara() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;

        }

        function onPhotoDataSuccess(imageData){

            /*

             var smallImage = document.getElementById("principal-img");
             window.localStorage.setItem("photo", mediaFiles[0].fullPath);
             smallImage.src = mediaFiles[0].fullPath;

             */
            var smallImage=document.getElementById("imagePlayer");
            smallImage.src="data:image/jpeg;base64,"+imageData;

        }

        function onPhotoURISuccess(imageURI){
            /*
             var smallImage = document.getElementById("principal-img");
             var path_image = decodeURIComponent(imageData);
             if (path_image.indexOf("providers") > -1) {
             path_image = "content://media/external/images/media/" + path_image.split(":")[2];
             }
             window.localStorage.setItem("photo", path_image);
             smallImage.src = imageData;
             */
            var largeImage=document.getElementById("imagePlayer");
            largeImage.src=imageURI;

        }

        function onFail(message){
            alert("Fallo al iniciar la camara"+message);
        }


        function capturePhoto(){
            navigator.camera.getPicture(onPhotoDataSuccess, onFail,{quality:50, destinationType:destinationType.DATA_URL});
        }




        function getPhoto(source){
            navigator.camera.getPicture(onPhotoURISuccess,onFail,{quality:50,destinationType:destinationType.FILE_URI,sourceType:source});


        }