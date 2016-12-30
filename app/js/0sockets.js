var socket = io();
var heroTextOptions = ["James Miller","Design", "Creative","Technology","Electronics", "Node", "Experimental", "Arduino", "Javascript", "Interactive", "Gamification", "Innovation", "Installations", "Prototyping", "Experiential", "Products"];

socket.on('userSocket', function(msg){
    heroTextOptions = msg;
    console.log("heroText options = " + msg);
    activateHeroAnimation();
});
