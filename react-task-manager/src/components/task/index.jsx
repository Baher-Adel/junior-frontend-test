import { TaskItem } from "@/components/task/taskItem";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";

export const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const [currentActiveButton, setCurrentActiveButton] = useState("all");

  const taskToView = useMemo(() => {
    if (currentActiveButton === "pending") {
      return pendingTasks;
    } else if (currentActiveButton === "completed") {
      return completedTasks;
    } else {
      return tasks;
    }
  }, [currentActiveButton, pendingTasks, completedTasks, tasks]);

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-row justify-between items-center gap-md">
        <p className="text-foreground text-md font-medium leading-none">
          Your Tasks
        </p>
        <div className="flex flex-row justify-end items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs sm:text-sm ${currentActiveButton === "pending" ? "bg-primary text-primary-foreground translate-y-[1px] shadow-ambient-sm" : ""}`}
            onClick={() =>
              setCurrentActiveButton(
                currentActiveButton === "pending" ? "all" : "pending",
              )
            }
          >
            Pending ({pendingTasks.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`text-xs sm:text-sm ${currentActiveButton === "completed" ? "bg-primary text-primary-foreground active:translate-y-[3px] shadow-ambient-sm" : ""}`}
            onClick={() =>
              setCurrentActiveButton(
                currentActiveButton === "completed" ? "all" : "completed",
              )
            }
          >
            Completed ({completedTasks.length})
          </Button>
        </div>
      </div>

      {taskToView.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
