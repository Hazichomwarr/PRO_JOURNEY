export const getSteps = (formState) => {
  const steps = [
    ["name", "email", "phone"], // Step 1

    // 👇 Only include newsletter step if opted in
    formState.fields.isSubscribe
      ? ["isSubscribe", "contactMethod"]
      : ["contactMethod"],
    ["message"],
  ];
  return steps;
};
export const stepLabels = ["Basic Info", "Preferences", "Message"];
