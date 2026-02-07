// DAY - 24

/*Given coins [1, 2, 5] and amount n,
how many distinct ways can you make n? */
function countWays(n, coins) {
  if (n === 1 || n === 0) return 1;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;

  for (let amount = 1; amount <= n; amount++) {
    for (let coin of coins) {
      if (amount - coin >= 0) {
        dp[amount] += dp[amount - coin];
      }
    }
  }

  return dp[n];
}
console.log("count-ways:", countWays(5, [1, 2, 5]));

// DAY - 25

/* Given coins [1, 2, 5] and an amount n,
return the minimum number of coins needed to make n.
If it’s impossible, return -1.*/
function minCoins(n, coins) {
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let amount = 1; amount <= n; amount++) {
    for (let coin of coins) {
      if (amount - coin >= 0) {
        dp[amount] = Math.min(dp[amount], dp[amount - coin] + 1);
      }
    }
  }
  return dp[n] === Infinity ? -1 : dp[n];
}
