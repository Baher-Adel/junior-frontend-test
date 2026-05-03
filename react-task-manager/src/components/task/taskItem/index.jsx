import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ResponsiveDialog } from "@/components/ui/responsiveDialog";
import { ItemContent } from "./itemContent";
import { ItemActionsDrawer } from "./itemActionDrawer";
import { ItemPopupContent } from "./itemPopupContent";
import { toggleTask, deleteTask, updateTask } from "@/redux/tasksSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { EditTask } from "./editTask";

export const TaskItem = ({ task }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!isDesktop)
    return (
      <>
        <ResponsiveDialog
          open={open}
          onOpenChange={setOpen}
          openDialogTrigger={
            <div className="cursor-pointer">
              <ItemContent isDesktop={false} task={task} />
            </div>
          }
          closeButtonText={<Button variant="outline">Close</Button>}
        >
          <ItemPopupContent title={task.title} description={task.description}>
            <ItemActionsDrawer
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
        {isEditing && (
          <EditTask task={task} open={isEditing} onOpenChange={setIsEditing} />
        )}
      </>
    );

  return <ItemContent isDesktop={true} task={task} />;
};
