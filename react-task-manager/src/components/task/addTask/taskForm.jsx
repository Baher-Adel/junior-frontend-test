import { Field, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export const TaskForm = ({
  title,
  priority,
  onTitleChange,
  onPriorityChange,
  idPrefix = "task",
  description,
  onDescriptionChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-name`}>
          Task Name <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id={`${idPrefix}-name`}
          name="title"
          type="text"
          placeholder="Task Name"
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-priority`}>
          Priority <span className="text-destructive">*</span>
        </FieldLabel>
        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger id={`${idPrefix}-priority`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="important">Important</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-description`}>Task Description</FieldLabel>
        <Input
          id={`${idPrefix}-description`}
          name="description"
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </Field>
    </div>
  );
};
