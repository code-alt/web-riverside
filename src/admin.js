addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var c = document.getElementById("uid").value
        console.log(c)
        window.location = "https://riverside.rocks/dashboard/admin/action/" . c
    }
})