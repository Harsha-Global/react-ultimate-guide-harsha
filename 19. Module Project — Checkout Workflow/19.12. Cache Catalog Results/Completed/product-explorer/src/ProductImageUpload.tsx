import { useState } from "react";
import { uploadImage } from "./api";
type Props = {
  value: string;
  onChange: (url: string) => void;
  disabled: boolean;
  onBusyChange: (busy: boolean) => void;
};
export function ProductImageUpload({
  value,
  onChange,
  disabled,
  onBusyChange,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function upload() {
    if (!file) return;
    setPending(true);
    onBusyChange(true);
    setError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "The upload failed. Try again.",
      );
    } finally {
      setPending(false);
      onBusyChange(false);
    }
  }
  return (
    <fieldset>
      <legend>Product image</legend>
      <p className="muted">
        Choose PNG, JPEG or WebP, up to 2 MB. Upload the image, then save the
        product to attach it.
      </p>
      {value && (
        <img className="preview-image" src={value} alt="Current product image" />
      )}
      <div className="field">
        <label htmlFor="product-file">Choose an image</label>
        <input id="product-file" type="file" accept="image/png,image/jpeg,image/webp" disabled={disabled || pending} aria-describedby={error ? "upload-error" : undefined} onChange={(event) => {
          setFile(event.target.files?.[0] ?? null);
          setError("");
        }} />
      </div>
      <p className="muted">
        {file ? `Selected: ${file.name}` : "No new file selected."}
      </p>
      <button className="secondary" type="button" disabled={!file || pending || disabled} onClick={() => void upload()}>
        {pending ? "Uploading…" : "Upload image"}
      </button>
      {error && (
        <p id="upload-error" className="error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
