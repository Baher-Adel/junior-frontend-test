import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash } from "lucide-react";

export const ItemActionsDialog = ({ onMarkAsComplete, onEdit, onDelete }) => {
  return (
    <div className="flex flex-row justify-end items-center gap-sm">
      <Button variant="icon" size="icon-sm" onClick={onMarkAsComplete}>
        <Check />
      </Button>
      <Button variant="icon" size="icon-sm" onClick={onEdit}>
        <Pencil />
      </Button>
      <Button variant="icon" className="text-destructive" size="icon-sm" onClick={onDelete}>
        <Trash />
      </Button>
    </div>
  );
};