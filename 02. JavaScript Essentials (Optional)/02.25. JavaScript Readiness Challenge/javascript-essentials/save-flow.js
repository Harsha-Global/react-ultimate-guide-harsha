import { saveBasket } from "./save.js";

export const saveBasketReport = async (items, shouldFail = false) => {
    try {
        const result = await saveBasket(items, shouldFail);
        return { ok: true, total: result.total };
    } catch (error) {
        return { ok: false, message: error.message };
    } finally {
        console.log("Save attempt finished");
    }
};