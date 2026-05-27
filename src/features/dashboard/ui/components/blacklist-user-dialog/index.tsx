import type { ReactNode } from "react";
import AlertDialog from "@/shared/ui/alert-dialog";

type BlacklistUserDialogProps = {
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  open?: boolean;
  trigger?: ReactNode;
  userName?: string;
};

export default function BlacklistUserDialog({
  onConfirm,
  onOpenChange,
  open,
  trigger,
  userName = "this user",
}: BlacklistUserDialogProps) {
  return (
    <AlertDialog
      cancelLabel="Cancel"
      confirmLabel="Blacklist"
      description={(
        <>
          This action will blacklist
          {" "}
          <strong>{userName}</strong>
          {" "}
          and restrict their access to lending services.
        </>
      )}
      onConfirm={onConfirm}
      onOpenChange={onOpenChange}
      open={open}
      title="Blacklist user?"
      trigger={trigger}
      variant="danger"
    />
  );
}
