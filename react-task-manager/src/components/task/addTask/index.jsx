import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { ResponsiveDialog } from "../../ui/responsiveDialog";
import { TaskForm } from "./taskForm";
import { addTask } from "@/redux/tasksSlice";

const ADD_TASK_FORM_ID = "add-task-form";

export const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addTask({ title: trimmed, priority, description }));
    setTitle("");
    setPriority("normal");
    setDescription("");
    setOpen(false);
  };

  return (
    <div className="bg-secondary rounded-lg p-lg flex flex-col sm:flex-row justify-between sm:items-center gap-md border shadow-ambient">
      <p className="text-secondary-foreground text-lg font-semibold leading-none">
        Ready to start?
      </p>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        openDialogTrigger={
          <Button>
            <span className="inline-flex items-center gap-2">
              <Plus className="size-5 shrink-0 text-primary-foreground" />
              Add Task
            </span>
          </Button>
        }
        closeButtonText={<Button variant="outline">Close</Button>}
        title="Add Task"
        submitButton={
          <Button type="submit" form={ADD_TASK_FORM_ID}>
            Add Task
          </Button>
        }
      >
        <form id={ADD_TASK_FORM_ID} onSubmit={handleSubmit}>
          <TaskForm
            title={title}
            priority={priority}
            onTitleChange={setTitle}
            onPriorityChange={setPriority}
            idPrefix="add-task"
            description={description}
            onDescriptionChange={setDescription}
          />
        </form>
      </ResponsiveDialog>
    </div>
  );
};
