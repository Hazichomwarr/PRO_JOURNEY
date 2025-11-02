# 👉 Rule: Code doesn’t care about what you meant — only what the data actually is.

“What is this variable exactly at runtime — a string, array, object, number, or undefined?”

# 👉 Rule: Look at the shape of data, not just the data itself.

When debugging, console.log() is good — but console.table() or structured logging is much better.

# 👉 Rule: Most bugs come from a mismatch between your mental model and the real data pipeline.

“How did this variable get to this form?” Trace the transformation Chain. Walk backward step-by-step until you find where the assumption started.
