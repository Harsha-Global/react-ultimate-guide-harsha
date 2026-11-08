// Supplied simulator: keep this helper unchanged.
const simulateSave = (total, shouldFail = false, message = "Basket save failed") =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(message));
        return;
      }
      resolve({ total, status: "saved" });
    }, 20);
  });

const getSaveOutcome = async saveOperation => {
  // Call and await the supplied operation; return a success or failure record.
  return { ok: true, total: 0 };
};

const runExamples = async () => {
  const success = await getSaveOutcome(() => simulateSave(108));
  console.log(JSON.stringify(success));
  const failure = await getSaveOutcome(() => simulateSave(108, true));
  console.log(JSON.stringify(failure));
  const empty = await getSaveOutcome(() => simulateSave(0));
  console.log(JSON.stringify(empty));
};
runExamples().catch(error => console.log(`Unexpected rejection: ${error.message}`));
