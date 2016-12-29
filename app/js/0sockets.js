var socket = io();
// 0
var heroTextOptions = ["James Miller","Design", "Creative","Technology","Electronics", "Node", "Experimental", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];
// 1
var isabelHeroText = ["Isabel Robson","Design", "Creative","Technology","Electronics", "Node", "Experimental", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];
// 2
var trevorHeroText = ["Trevor Atterton","Design", "Creative","Technology","Electronics", "Node", "Experimental", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];
// array to contain all other hero text arrays
var totalHeroTexts = [heroTextOptions,isabelHeroText,trevorHeroText];
socket.emit('userSocket', totalHeroTexts.length);

socket.on('userSocket', function(msg){
    for(var x = 0;x<totalHeroTexts.length;x++) if(msg == x) heroTextOptions = totalHeroTexts[x];    
    if(msg>0) activateHeroAnimation();
});
