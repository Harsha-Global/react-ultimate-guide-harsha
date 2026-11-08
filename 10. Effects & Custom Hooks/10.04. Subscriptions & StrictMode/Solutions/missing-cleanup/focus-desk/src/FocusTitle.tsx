import { useEffect } from "react";

import type { FocusMode } from "./mode";

type FocusTitleProps = Readonly<{ taskTitle: string; mode: FocusMode }>;

export default function FocusTitle({ taskTitle, mode }: FocusTitleProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = mode === "focus"
      ? `${taskTitle} | Focus Desk`
      : `Short break | Focus Desk`;
    return () => {
      document.title = previousTitle;
    };
  }, [taskTitle, mode]);

  return null;
}
