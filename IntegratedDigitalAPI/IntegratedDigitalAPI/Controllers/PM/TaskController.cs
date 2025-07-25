﻿using IntegratedDigitalAPI.DTOS.PM;
using IntegratedDigitalAPI.Services.PM;
using IntegratedImplementation.DTOS.Configuration;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Numerics;


namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]

        public IActionResult Create([FromBody] TaskDto task)
        {
            try
            {
                var response = _taskService.CreateTask(task);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpGet("ById")]
        public async Task<TaskVIewDto> GetSingleTask(Guid taskId,int? year)
        {

            return await _taskService.GetSingleTask(taskId,year);


        }
        [HttpPost("TaskMembers")]

        public IActionResult AddTaskMembers(TaskMembersDto taskMembers)
        {
            try
            {

                var response = _taskService.AddTaskMemebers(taskMembers);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpPost("TaskMemo")]
        public IActionResult AddTaskMemo(TaskMemoRequestDto taskMemo)
        {

            try
            {
                var response = _taskService.AddTaskMemo(taskMemo);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }


        }
        [HttpGet("selectlsitNoTask")]

        public async Task<List<SelectListDto>> GetEmployeesNoTaskMembers(Guid taskId)
        {

            return await _taskService.GetEmployeesNoTaskMembersSelectList(taskId);
        }


        [HttpGet("getByPlanIdIdSelectList")]

        public async Task<IActionResult> GetBYPlanIdSelectList(Guid taskId)
        {
            try
            {
                return Ok(await _taskService.GetTasksSelectList(taskId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }




        [HttpGet("getByTaskIdSelectList")]

        public async Task<IActionResult> GetBYTaskIdSelectList(Guid planId)
        {
            try
            {
                return Ok(await _taskService.GetTasksSelectList(planId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetActivitieParentsSelectList")]
        public async Task<IActionResult> GetActivitieParentsSelectList(Guid taskId)
        {
            try
            {
                return Ok(await _taskService.GetActivitieParentsSelectList(taskId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("GetActivitiesSelectList")]

        public async Task<IActionResult> GetActivitiesSelectList(Guid? planId, Guid? taskId, Guid? actParentId)
        {
            try
            {
                return Ok(await _taskService.GetActivitiesSelectList(planId, taskId, actParentId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTask(TaskDto task)
        {

            if (ModelState.IsValid)
            {
                return Ok(await _taskService.UpdateTask(task));
            }
            else
            {
                return BadRequest();
            }
           
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteTask(Guid taskId)
        {
            try
            {
                return Ok(await _taskService.DeleteTask(taskId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }




    }
}
