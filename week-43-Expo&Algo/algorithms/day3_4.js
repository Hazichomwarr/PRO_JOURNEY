function fizzBuzz(numb) {
  if (numb % 3 === 0 && numb % 5 === 0) return "FizzBuzz";
  else if (numb % 3 === 0) return "Fizz";
  else if (numb % 5 === 0) return "Buzz";

  return numb;
}

console.log(fizzBuzz(15));

function getAccess(user) {
  if (user === "isBanned") return "NO_ACCESS";

  if (user === "isLoggedIn") return "BASIC_ACCESS";
  if (user === "isModerator") return "LIMITED_ACCESS";
  if (user === "isAdmin") return "FULL_ACCESS";

  return "NO_ACCESS";
}

// The 5 planning questions here:
// 1. I(Input): string(accessprivilege status)
// 2. O(Output): string(access decision word)
// 3. DATS(Decision? Acc? Transformation? Search?): Decision
// 4. OC(overlaping conditions?) from higher: suspended -> testers -> paid/free

function getBetaAccess(userAccessPrivilege) {
  if (userAccessPrivilege === "suspended") return "NO_ACCESS";
  if (userAccessPrivilege === "internal tester") return "ACCESS";
  if (userAccessPrivilege === "paid") return "ACCESS";
  if (userAccessPrivilege === "free") return "WAITLIST";
}

// 5. code
function getBetaAccess2(userAccessPrivilege) {
  switch (userAccessPrivilege) {
    case "suspended":
      return "NO_ACCESS";
    case "internal tester":
    case "paid":
      return "ACCESS";
    case "free":
      return "WAITLIST";
    default:
      return "WAILIST";
  }
}
