const switchPhoto = () => {
    const team = document.querySelector(".command");
    let source = "";
    let dataAttr = "";
    team.addEventListener("mouseover", (event) => {
        if (!event.target.matches(".command__photo")) {
            return;
        }
        source = event.target.src;
        dataAttr = event.target.dataset.img;
        event.target.src = event.target.dataset.img;
    });
    team.addEventListener("mouseout", (event) => {
        if (!event.target.matches(".command__photo")) {
            return;
        }
        event.target.src = source;
        event.target.dataset.img = dataAttr;
    });
};

export default switchPhoto;