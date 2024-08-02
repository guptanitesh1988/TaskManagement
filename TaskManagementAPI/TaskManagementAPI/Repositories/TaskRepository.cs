using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.Model;

namespace TaskManagementAPI.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Tasks> GetAllTasks()
        {
            return _context.Tasks.ToList();
        }

        public Tasks GetTaskById(int id)
        {
            return _context.Tasks.FirstOrDefault(t => t.Id == id);
        }

        public void AddTask(Tasks task)
        {
            if(task == null) throw new ArgumentNullException(nameof(task)); 
            _context.Tasks.Add(task);   
            _context.SaveChanges(); 
        }

        public void DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if(task == null) { throw new ArgumentNullException(nameof(task)); }

            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }

        public void UpdateTask(Tasks task)
        {
            if(task == null) throw new ArgumentNullException();

            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
