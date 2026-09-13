function cargarVideoGamer() {

    const video =
        document.getElementById("video-gamer");


    if (!video) {

        return;

    }

    const urlVideo =
        "https://www.youtube.com/embed/RkC0l4iekYo?si=Ukml4udvLUEvTK-2";



    video.src = 
        urlVideo;

    

}


cargarVideoGamer();