import { useEffect } from "react";

type FocusTitleProps = Readonly<{ taskTitle: string }>;

export default function FocusTitle({ taskTitle }: FocusTitleProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${taskTitle} | Focus Desk`;
    return () => {
      document.title = previousTitle;
    };
  }, [taskTitle]);

  return null;
}
