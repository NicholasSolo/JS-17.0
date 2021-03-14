const switchPhoto = () => {
    const team = document.querySelector(".command");

    const togglePhoto = (event) => {
        let elem = event.target;

        if (!elem.matches(".command__photo")) {
            return;
        }
        let defaultPhoto = elem.src;
        elem.src = elem.dataset.img;
        elem.dataset.img = defaultPhoto;
    }
    
    team.addEventListener("mouseover", (event) => {
        togglePhoto(event)
    });
    team.addEventListener("mouseout", (event) => {
        togglePhoto(event)
    });
};

export default switchPhoto;


