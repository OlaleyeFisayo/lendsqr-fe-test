import type { ReactNode } from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import Button from "@/shared/ui/button";
import "./alert-dialog.scss";

type AlertDialogProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  description: ReactNode;
  onConfirm?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: ReactNode;
  trigger?: ReactNode;
  variant?: "danger" | "primary";
};

export default function AlertDialog({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  description,
  onConfirm,
  onOpenChange,
  open,
  title,
  trigger,
  variant = "primary",
}: AlertDialogProps) {
  return (
    <RadixAlertDialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      {trigger !== undefined && (
        <RadixAlertDialog.Trigger asChild>
          {trigger}
        </RadixAlertDialog.Trigger>
      )}
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="app-alert-dialog-overlay" />
        <RadixAlertDialog.Content className="app-alert-dialog-content">
          <RadixAlertDialog.Title className="app-alert-dialog-title">
            {title}
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="app-alert-dialog-description">
            {description}
          </RadixAlertDialog.Description>
          <div className="app-alert-dialog-actions">
            <RadixAlertDialog.Cancel asChild>
              <Button variant="outline">
                {cancelLabel}
              </Button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <Button
                className={variant === "danger" ? "app-alert-dialog-danger-action" : undefined}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
}
