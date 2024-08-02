using TaskManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Model;

namespace TaskManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = _taskRepository.GetAllTasks();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public IActionResult GetTaskById(int id)
        {
            var tasks = _taskRepository.GetTaskById(id);
           return Ok(tasks);
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] Tasks task)
        {
            if (task == null)
            {
                return BadRequest();
            }
            _taskRepository.AddTask(task);  
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] Tasks tasks)
        {
            if (tasks == null && id != tasks.Id)
            {
                return BadRequest();
            }
             
            var task = _taskRepository.GetTaskById(id);
            if (task == null)
                return NotFound();

            _taskRepository.UpdateTask(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task= _taskRepository.GetTaskById(id);
            if(task == null) { return NotFound(); }
            _taskRepository.DeleteTask(id);
            return NoContent();
        }
    }
}
