# Upload Product Images

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the inventory editor saves its main fields and feature rows; the product image can't be changed yet).
- Completed/product-explorer: src/api.ts adds uploadImage(file). It rejects a file that isn't PNG, JPEG or WebP, is larger than 2 MB, or is empty before sending anything, sends the file as the FormData field "image" with POST /api/uploads (the browser sets the multipart header), checks the url in the 201 response and returns it. src/ProductImageUpload.tsx is the file control: it keeps the selected file, a pending flag and an error message, uploads with its Upload image button (labelled "Uploading…" while pending), reports the returned path through onChange and its activity through onBusyChange, and shows the current image, the selected file name and any upload error (linked to the input). src/ProductEditor.tsx renders it with the watched image path, stores the returned path with setValue (marked dirty and validated, like a typed edit), includes the upload in its busy flag (so saving and leaving wait for it), shows any image-field error, and changes the control's key after an accepted save or a reset to clear the file selection; the preview caption now says to upload the image, then save the product. vite.config.ts proxies /uploads to the local service, beside /api.
- Sample Uploads: backpack.jpg for the upload check.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

Open Inventory and edit the Trail Backpack. Choose Sample Uploads/backpack.jpg and choose Upload image: the service returns a new /uploads/… path (201) and the preview uses it, but the product isn't changed yet. Choose Save changes: the product is saved with that path (200) and the file selection clears. Open the product page: its image loads from the /uploads/… path. Back in the editor, upload the image again, change the name to "Reserved product" and save: the service rejects the name (409) and the uploaded path stays in the draft. Correct the name to Trail Backpack and save again. Run `npm run api:reset` afterwards to restore the sample catalog; it also removes the uploaded files.
