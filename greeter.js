function Greeter () {

}

Greeter.prototype.greet = function(name) {
  return `Hello ${name}`
}

Greeter.prototype.greet = function(string) {
  return string.trim();
}

Greeter.prototype.greet = function(string) {

  string.charAt(0)= string.charAt(0).upperCase();
  string.substring(1) = string.substring(1).lowerCase();
  return string;
}

Greeter.prototype.greet = function(name) {
let hours = new Date().getHours;
 
  if (hours>5 && hours<13){
    return `Good morning ${name}`
  } 
  
}

module.exports = Greeter;