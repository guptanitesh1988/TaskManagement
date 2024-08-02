using TaskManagementAPI.Model;

namespace TaskManagementAPI.Repositories
{
    public interface ITaskRepository
    {
        void AddTask(Tasks task);
        void DeleteTask(int id);
        List<Tasks> GetAllTasks();
        Tasks GetTaskById(int id);
        void UpdateTask(Tasks task);

    }
}
