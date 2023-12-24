function copy(text) {
    navigator.clipboard.writeText(text);
    const msg = document.getElementById("copied").style;
    msg.display = "block";
    msg.opacity = ".5";
    msg.animation = "copied 5s forwards";
    setTimeout(() => {
        msg.display = "none";
        msg.animation = null;
    }, 5000);
}