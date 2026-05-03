import { Header } from "@/components/ui/header";
import { AddTask } from "@/components/task/addTask";
import { Tasks } from "@/components/task";

export default function App() {
  return (
    <div className="relative flex gap-lg-2 min-h-screen flex-col bg-background text-foreground lg:w-container-max md:w-container-md w-container-sm mx-auto">
      <Header />
      <AddTask />
      <Tasks />
    </div>
  );
}
