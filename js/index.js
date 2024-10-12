// *Functions for navbar hamburger menue icon
document.getElementById("hamburger").addEventListener("click", function () {
  document.getElementById("sidebar").classList.remove("hidden");
  console.log("clicked");
});
document.getElementById("cross").addEventListener("click", function () {
  document.getElementById("sidebar").classList.add("hidden");
});
