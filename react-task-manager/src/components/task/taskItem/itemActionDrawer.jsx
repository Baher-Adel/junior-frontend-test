import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsiveDialog";
import { Check, Pencil, Trash, EllipsisVertical } from "lucide-react";

export const ItemActionsDrawer = ({ onMarkAsComplete, onEdit, onDelete }) => {
  return (
    <ResponsiveDialog
      openDialogTrigger={
        <Button variant="icon" size="icon">
          <EllipsisVertical className="size-full shrink-0 text-foreground" />
        </Button>
      }
      closeButtonText={<Button variant="outline">Close</Button>}
    >
      <div className="flex flex-col gap-md w-full [&>button]:justify-start [&>button]:gap-md">
        <Button variant="icon" onClick={onMarkAsComplete}>
          <Check /> Mark as Complete
        </Button>
        <Button variant="icon" onClick={onEdit}>
          <Pencil /> Edit
        </Button>
        <Button variant="icon" className="text-destructive" onClick={onDelete}>
          <Trash /> Delete
        </Button>
      </div>
    </ResponsiveDialog>
  );
};