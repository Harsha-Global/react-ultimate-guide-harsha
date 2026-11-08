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
