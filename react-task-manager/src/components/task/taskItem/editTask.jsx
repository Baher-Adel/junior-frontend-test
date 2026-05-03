import { useDispatch } from "react-redux";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ui/responsiveDialog";
import { Button } from "@/components/ui/button";
import { TaskForm } from "../addTask/taskForm";
import { updateTask } from "@/redux/tasksSlice";

export const EditTask = ({ task, open, onOpenChange }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    dispatch(
      updateTask({
        id: task.id,
        title: trimmed,
        priority,
        description,
      }),
    );
    onOpenChange(false);
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Task"
      submitButton={
        <Button type="submit" form={`edit-task-form-${task.id}`}>
          Save
        </Button>
      }
      closeButtonText={<Button variant="outline">Cancel</Button>}
    >
      <form id={`edit-task-form-${task.id}`} onSubmit={handleSubmit}>
        <TaskForm
          title={title}
          priority={priority}
          description={description}
          onTitleChange={setTitle}
          onPriorityChange={setPriority}
          onDescriptionChange={setDescription}
          idPrefix="edit-task"
        />
      </form>
    </ResponsiveDialog>
  );
};
