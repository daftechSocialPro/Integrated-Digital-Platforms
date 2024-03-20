using Implementation.Helper;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Interfaces.Training;
using IntegratedImplementation.Interfaces.Vacancy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Training
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {

        ITrainingService _trainingService;

        public TrainingController(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(TrainingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTrainingList(Guid activityId)
        {
            return Ok(await _trainingService.GetTrainingList(activityId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(TrainingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSingleTraining(Guid trainingId)
        {
            return Ok(await _trainingService.GetSingleTraining(trainingId));
        }


        [HttpGet]
        [ProducesResponseType(typeof(TrainingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTrainingAllList()
        {
            return Ok(await _trainingService.GetTrainingList());
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTrainingList(TrainingPostDto trainingPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.AddTraining(trainingPost));
            }
            else
            {
                return BadRequest();


            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateTrainingList(TrainingPostDto trainingPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.UpdateTraining(trainingPost));
            }
            else
            {
                return BadRequest();


            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteTraining(Guid trainingId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.DeleteTraining(trainingId));
            }
            else
            {
                return BadRequest();


            }
        }


        //trainer

        [HttpGet]
        [ProducesResponseType(typeof(TrainingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTrainerList(Guid trainingId)
        {
            return Ok(await _trainingService.GetTrainerList(trainingId));
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTrainerList(TrainerPostDto trainerPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.AddTrainer(trainerPost));
            }
            else
            {
                return BadRequest();


            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateTrainerList(TrainerPostDto trainerPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.UpdateTrainer(trainerPost));
            }
            else
            {
                return BadRequest();


            }
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteTrainer(Guid trainerId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.DeleteTrainer(trainerId));
            }
            else
            {
                return BadRequest();


            }
        }
        //trainee
        [HttpGet]
        [ProducesResponseType(typeof(TrainingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTraineeList(Guid trainingId)
        {
            return Ok(await _trainingService.GetTraineeList(trainingId));
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTraineeList(TraineePostDto trainerPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.AddTrainee(trainerPost));
            }
            else
            {
                return BadRequest();


            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateTraineeList(TraineePostDto trainerPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.UpdateTrainee(trainerPost));
            }
            else
            {
                return BadRequest();


            }
        }


        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteTrainee(Guid traineeId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.DeleteTrainee(traineeId));
            }
            else
            {
                return BadRequest();


            }
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> SendEmailTrainer(TrainerEmailDto trainerPost,string type)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.SendEmailTrainer(trainerPost,type));
            }
            else
            {
                return BadRequest();


            }
        }

        //training report 
        [HttpGet]
        [ProducesResponseType(typeof(TrainingGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTrainingReport(Guid trainingId)
        {
            return Ok(await _trainingService.GetTrainingReport(trainingId));
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddTrainingReport([FromForm]TrainingReportPostDto trainerPost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.AddTrainingReport(trainerPost));
            }
            else
            {
                return BadRequest();

            }
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeTraineeReportStatus(Guid trainingId, string status )
        {
            if (ModelState.IsValid)
            {
                return Ok(await _trainingService.ChangeTraineesStatus(status,trainingId));
            }
            else
            {
                return BadRequest();

            }
        }

       

    }
}
