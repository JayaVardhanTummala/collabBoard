import { create } from 'zustand';

const useBoardStore = create((set) => ({
  boards: [],
  currentBoard: null,

  setBoards: (boards) => set({ boards }),
  setCurrentBoard: (board) => set({ currentBoard: board }),

  updateTaskStatusOptimistic: (taskId, newStatus) =>
    set((state) => {
      if (!state.currentBoard) return state;
      const updatedTasks = state.currentBoard.tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      return { currentBoard: { ...state.currentBoard, tasks: updatedTasks } };
    }),
}));

export default useBoardStore;
