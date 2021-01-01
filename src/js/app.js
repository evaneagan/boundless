import today from "./today"
import month from "./month"
import nav from "./nav"


today()
month()
nav()

 //variable font parameters
 var property2 = "'wght' "
 var property2valuemax = 900

 var property1 = "'wdth' "
 var property1valuemax = 200

 function remap(inMin, inMax, outMin, outMax) {
 return function remaper(x) {
     return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
 };
 }


 var remappedwidth = remap(0,window.innerWidth, 50,property1valuemax);
 var remappedheight = remap(0,window.innerHeight, 100,property2valuemax);


 var h1Selector = document.querySelectorAll('h1')
 var wght = document.querySelector('#wght')
 var wdth = document.querySelector('#wdth')

 let mouseX = 0
 let mouseY = 0

 let propertyX = 0
 let propertyY = 0

 let speed = 0.1


 // animate our css styles
 function animate() {



 let distX = mouseX - propertyX
 let distY = mouseY - propertyY

 propertyX = propertyX + (distX * speed)
 propertyY = propertyY + (distY * speed)


 var variableWidth = remappedwidth(propertyX)
 var variableHeight = remappedheight(propertyY)

 var variableWidthI = Math.floor(variableWidth)
 var variableHeightI = Math.floor(variableHeight)

 var variableWidthStyleGenerator = property1 + variableWidth
 var variableHeightStyleGenerator = property2 + variableHeight

 wght.innerHTML = "wght: " + variableHeightI
 wdth.innerHTML = "wdth: " + variableWidthI

 h1Selector.forEach((h1Item) => {
    h1Item.setAttribute("style", "font-variation-settings:" + variableWidthStyleGenerator + ", " + variableHeightStyleGenerator);

  })


 //run animate on every frame
 requestAnimationFrame(animate)
 }


 // run animate
 animate()

 // Listen to mouse movement in viewport



 document.addEventListener("mousemove", function(event) {

 mouseX = event.pageX
 mouseY = event.pageY

 })