const addTask_ = (state, action) => {
  state.items.push({
    id: crypto.randomUUID(),
    title: action.payload.title,
    priority: action.payload.priority,
    description: action.payload.description,
    completed: false,
  });
};

const updateTask_ = (state, action) => {
  const { id, title, priority, description, completed } = action.payload;
  const task = state.items.find((task) => task.id === id);
  if (task) {
    task.title = title;
    task.priority = priority;
    task.description = description;
    task.completed = completed;
    task.updatedAt = Date.now();
  } else {
    throw new Error("Task not found");
  }
};

const deleteTask_ = (state, action) => {
  const id = action.payload;
  const task = state.items.find((task) => task.id === id);
  if (task) {
    state.items = state.items.filter((task) => task.id !== id);
  } else {
    throw new Error("Task not found");
  }
};

const toggleTask_ = (state, action) => {
  const id = action.payload;
  const task = state.items.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    task.updatedAt = Date.now();
  } else {
    throw new Error("Task not found");
  }
};

export { addTask_, updateTask_, deleteTask_, toggleTask_ };
