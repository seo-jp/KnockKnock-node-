let box_x = null
let box_y = null
let img_x = null
let img_y = null
let x = null
let y = null
let w = null
let h = null

const setProfilePosition = () => {
    
    box_x = parseFloat(document.querySelector(".profile").getBoundingClientRect().top)
    box_y = parseFloat(document.querySelector(".profile").getBoundingClientRect().left)
    img_x = parseFloat(document.querySelector(".profile img").getBoundingClientRect().top)
    img_y = parseFloat(document.querySelector(".profile img").getBoundingClientRect().left)

    if(box_x == img_x)
        x = 0 
    else if(box_x < img_x && box_x < 0)
        x = img_x + Math.abs(box_x)
    else if (box_x < img_x && box_x >= 0)
        x = img_x - box_x
    else if(img_x < box_x && img_x < 0)
        x = box_x + Math.abs(img_x)
    else if(img_x < box_x && img_x >= 0)
        x = box_x - img_x

    if(box_y == img_y)
        y = 0
    else if(box_y < img_y && box_y < 0)
        y = img_y + Math.abs(box_y)
    else if (box_y < img_y && box_y >= 0)
        y = img_y - box_y
    else if(img_y < box_y && img_y < 0)
        y = box_y + Math.abs(img_y)
    else if(img_y < box_y && img_y >= 0)
        y = box_y - img_y

    if(x < 0 ) x = 0
    if(y < 0 ) y = 0
    
    w = parseFloat(document.querySelector(".profile img").getBoundingClientRect().width.toFixed(2))
    h = parseFloat(document.querySelector(".profile img").getBoundingClientRect().height.toFixed(2))

    return [x,y,h,w]
}

const setFeedPosition = (i) => {

    box_x = parseFloat(document.getElementById(i).getBoundingClientRect().top)
    box_y = parseFloat(document.getElementById(i).getBoundingClientRect().left)
    img_x = parseFloat(document.querySelectorAll(".feedImg")[i].getBoundingClientRect().top)
    img_y = parseFloat(document.querySelectorAll(".feedImg")[i].getBoundingClientRect().left)

    if(box_x == img_x)
        x = 0 
    else if(box_x < img_x && box_x < 0)
        x = img_x + Math.abs(box_x)
    else if (box_x < img_x && box_x >= 0)
        x = img_x - box_x
    else if(img_x < box_x && img_x < 0)
        x = box_x + Math.abs(img_x)
    else if(img_x < box_x && img_x >= 0)
        x = box_x - img_x

    if(box_y == img_y)
        y = 0
    else if(box_y < img_y && box_y < 0)
        y = img_y + Math.abs(box_y)
    else if (box_y < img_y && box_y >= 0)
        y = img_y - box_y
    else if(img_y < box_y && img_y < 0)
        y = box_y + Math.abs(img_y)
    else if(img_y < box_y && img_y >= 0)
        y = box_y - img_y

    if(x < 0 ) x = 0
    if(y < 0 ) y = 0
    
    w = parseFloat(document.querySelectorAll(".feedImg")[i].getBoundingClientRect().width.toFixed(2))
    h = parseFloat(document.querySelectorAll(".feedImg")[i].getBoundingClientRect().height.toFixed(2))

    return [x,y,h,w]

}


export { setProfilePosition, setFeedPosition }