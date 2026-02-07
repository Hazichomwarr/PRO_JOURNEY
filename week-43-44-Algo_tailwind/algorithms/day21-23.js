/* 
Problem
Given n stairs, you can climb 1 or 2 steps at a time.
How many distinct ways can you reach the top?

Solution
Subproblem: from where am I, how to get to the next step-> Num of ways to reach a given step k
Repetition(task not loop): ways(k) is recomputed many times for the same k
State (where I am now): current step index k
Memo (store answer to the subProblem) → memo[k] = number of ways to reach step k

*/

/* 
Top-Down DP (Memoization)
Think: “Ask the big question → break it → remember answers.”

Mental model
1. Start at n
2. Recurse downward
3. Cache results so each k is computed once
*/

//Code: Top-Down DP
function climbStairsMemo(n, memo = {}) {
  if (n === 0 || n === 1) return 1;
  if (n in memo) return memo[n];

  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);

  return memo[n];
}
console.log("Clim form Down:", climbStairsMemo(5));

/* 
Bottom-Up DP (Tabulation)
Think: “Build answers from the ground up.”

Mental model
1. Start from known bases
2. Fill a table forward
3. Never recurse
*/

//Code: Bottom-Up DP (Tabulation)
function climbStairsTab(n) {
  if (n === 0 || n === 1) return 1;
  const dp = Array(n + 1).fill(0);
  //   console.log("dp:", dp);

  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    // console.log("dp[i] =", dp[i]);
  }

  return dp[n];
}
console.log("Climb from up:", climbStairsTab(5)); // 8

/* 
Mini Exercise (Day 23) solution:
1. In the stairs problem, why is `n` the perfect state?
    -> Because it uniquely and completely represents the subproblem: the number of ways to reach step n, independent of how you got there.

2. What would break if we tried to memoize by “last step taken (1 or 2)” instead?
    -> Because it collapses multiple distinct subproblems into the same key, violating DP’s requirement that each memo entry corresponds to exactly one state.

3. Recursive → bottom-up conversion example?
    → Fibonacci, where the same recurrence is evaluated iteratively from base cases upward.
*/
