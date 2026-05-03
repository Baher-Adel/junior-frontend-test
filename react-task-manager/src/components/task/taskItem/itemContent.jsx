import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveDialog } from "@/components/ui/responsiveDialog";
import { Bookmark, BookmarkCheck, CircleChevronRight } from "lucide-react";
import { ItemPopupContent } from "./itemPopupContent";
import { ItemActionsDialog } from "./itemActionDialog";
import { useDispatch } from "react-redux";
import { toggleTask, updateTask, deleteTask } from "@/redux/tasksSlice";
import { useState } from "react";
import { EditTask } from "./editTask";

export const ItemContent = ({ isDesktop, task }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between items-center bg-input rounded-md p-sm sm:p-md gap-sm sm:gap-md border shadow-ambient active:bg-primary/30 sm:active:bg-input has-[button:active]:bg-input transition-all duration-300">
      <div className="flex flex-row justify-start items-center gap-sm sm:gap-md overflow-hidden">
        <Button
          variant="icon"
          size="icon-lg"
          className="block"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleTask(task.id));
          }}
        >
          {task.completed ? (
            <BookmarkCheck className="size-full shrink-0 text-foreground" />
          ) : (
            <Bookmark className="size-full shrink-0 text-foreground" />
          )}
        </Button>
        <div className="flex flex-col justify-start items-start gap-sm text-[1rem] overflow-hidden">
          <Badge variant="normal" className="text-[0.7em] py-px">
            {task.priority}
          </Badge>
          <h3 className="font-heading text-foreground text-md sm:text-lg leading-none line-clamp-1">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-foreground text-xs sm:text-sm leading-none line-clamp-1">
              {task.description}
            </p>
          )}
        </div>
      </div>
      {isDesktop && (
        <ResponsiveDialog
          open={open}
          onOpenChange={setOpen}
          openDialogTrigger={
            <Button variant="icon" size="icon-sm">
              <CircleChevronRight className="size-full shrink-0 text-foreground" />
            </Button>
          }
        >
          <ItemPopupContent title={task.title} description={task.description}>
            <ItemActionsDialog
              onMarkAsComplete={() => {
                dispatch(toggleTask(task.id));
                setOpen(false);
              }}
              onEdit={() => {
                setIsEditing(true);
                setOpen(false);
              }}
              onDelete={() => {
                dispatch(deleteTask(task.id));
                setOpen(false);
              }}
            />
          </ItemPopupContent>
        </ResponsiveDialog>
      )}
      {isEditing && <EditTask task={task} open={isEditing} onOpenChange={setIsEditing} />}
    </div>
  );
};
