import { basket } from "./products.js";
import { saveBasketReport } from "./save-flow.js";

const runSaveExamples = async () => {
    const success = await saveBasketReport(basket);
    console.log(`Success: ${success.ok}, total: ${success.total}`);

    const failure = await saveBasketReport(basket, true);
    console.log(`Success: ${failure.ok}, message: ${failure.message}`);
};

runSaveExamples().catch(error => {
    console.log(`Unexpected failure: ${error.message}`);
});