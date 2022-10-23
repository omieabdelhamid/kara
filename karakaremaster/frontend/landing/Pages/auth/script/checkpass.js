const userPass = document.getElementById('password')

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(userPass.value)
    if (userPass.value === "9f6019") {
        window.location.replace("storeManagerMain.html");
    } else {
        console.log("wrong password");
        document.getElementById('sign').style.color = "red";
        document.getElementById('sign').innerHTML = "Wrong Key";
    }
})