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
  try {
    const result = await saveOperation();
    return { ok: true, total: result.total };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};
