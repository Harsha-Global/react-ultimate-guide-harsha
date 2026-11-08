type HelpPanelProps = {
  id: string;
  anchorRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};
function HelpPanel({ id, anchorRef, onClose }: HelpPanelProps) {
  return createPortal(
    <div id={id} role="dialog" aria-labelledby={`${id}-title`} className="materials-help" onKeyDown={(event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    }}>
      <h3 id={`${id}-title`}>Your materials are included.</h3>
      <p>
        We provide clay, tools and glazing. Wear something you don't mind
        getting a little dusty.
      </p>
      <button type="button" onClick={onClose}>
        Close materials help
      </button>
    </div>,
    document.getElementById("overlays")!,
  );
}
export function MaterialsHelp() {
  const id = useId();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button ref={anchorRef} type="button" className="secondary" aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => setOpen((value) => !value)}>
        What should I bring?
      </button>
      {open && <HelpPanel id={id} anchorRef={anchorRef} onClose={close} />}
    </>
  );
}
