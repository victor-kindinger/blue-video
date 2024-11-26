var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext('2d')

var video = document.getElementById('video')
video.pause()
var range = 6

var img = new Image()
img.crossOrigin = 'anonymous'
img.crossDomain = 'anonymous'

if (window.innerHeight / window.innerWidth < 9 / 16)
{
    img.height = canvas.height / range
    img.width = (canvas.height * 16 / 9) / range
}
else
{
    img.width = canvas.width / range
    img.height = (canvas.width * 9 / 16) / range
}

var initiated = false

drawLabel()

canvas.addEventListener("click", () =>
{
    console.log(video.src)
    if (video.src.includes("trailer1.mp4")) video.src = "trailer2.mp4"
    else video.src = "trailer1.mp4"
})

document.addEventListener("keydown", e =>
{
    if (e.key == "Enter" && !initiated)
    {
        video.play()
        draw()
    }
    
    if (e.key == " ")
    {
        if (video.currentTime > 0 && video.paused == false && video.ended == false) video.pause()
        else video.play()
    }
})

function draw()
{    
    c.drawImage(video, 0, 0, img.width, img.height)

    const imgData = c.getImageData(0, 0, img.width, img.height).data

     var gray = []
    for (var i = 0; i < img.width * img.height * 4; i += 4)
    {
        gray.push( Math.floor( (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3 ) )
    }

    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'blue'
    var division = 255 / range
    var y = 0;
    for (var i = 0; i < img.height; i++)
    {
        var x = 0;
        for (var j = 0; j < img.width; j++)
        {
            var color = range - Math.floor(gray[j + (i * img.width)] / division);
            c.fillRect(Math.floor(x + (range - color) / 2), Math.floor(y  + (range - color) / 2), color, color)
            x += range
        }
        y += range
    }

    drawLabel()

    setTimeout(draw, 1)    
}

function drawLabel()
{
    c.fillStyle = 'white'
    c.strokeStyle = 'black'
    c.lineWidth = 4
    c.font = '1em sans-serif'
    c.textAlign = 'center'
    const label = 'Pressione \"enter\" para começar, \"espaço\" para pausar/reproduzir e clique para alternar os vídeos.'
    c.strokeText(label, img.width / 2 * range, img.height * 0.95 * range, img.width * range)
    c.fillText(label, img.width / 2 * range, img.height * 0.95 * range, img.width * range)
}