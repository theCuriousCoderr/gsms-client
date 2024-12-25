function getUserEmail() {
  let keycountEmail = localStorage.getItem("KeyCountEmail");
  return keycountEmail ? keycountEmail : "";
}

export default getUserEmail;
