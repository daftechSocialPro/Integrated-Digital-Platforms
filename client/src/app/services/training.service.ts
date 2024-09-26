import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ITrainingGetDto, ITrainingPostDto } from "../model/Training/TrainingDto";
import { ResponseMessage } from "../model/ResponseMessage.Model";
import { UserService } from "./user.service";
import { ITrainerGetDto, ITrainerPostDto } from "../model/Training/TrainerDto";
import { ITraineeGetDto, ITraineePostDto, ITrainerEmailDto } from "../model/Training/TraineeDto";
import { ITrainingReportGetDto, ITrainingReportPostDto } from "../model/Training/TrainingReportDto";
import { IAllTraineeReportDto } from "../pages/training/all-training-list/IAllTraineeReportDto";

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    constructor(private http: HttpClient, private userService: UserService) { }
    BaseURI: string = environment.baseUrl + "/Training/"


    createTraining(training: ITrainingPostDto) {
        training.CreatedById = this.userService.getCurrentUser().userId
        return this.http.post<ResponseMessage>(`${this.BaseURI}AddTrainingList`, training)
    }
    UpdateTrainingList(training: ITrainingPostDto) {
        training.CreatedById = this.userService.getCurrentUser().userId
        return this.http.put<ResponseMessage>(`${this.BaseURI}UpdateTrainingList`, training)
    }

    getSingleTraining(trainingId :string){

        return this.http.get<ITrainingGetDto>(this.BaseURI+"GetSingleTraining?trainingId="+trainingId)

    }

    importFromExcel(formData:FormData){
        return this.http.post<ResponseMessage>(this.BaseURI+"ImportTraineeFormExcel",formData)
      }

    getTrainings(activityId: String) {

        return this.http.get<ITrainingGetDto[]>(this.BaseURI + "GetTrainingList?activityId=" + activityId)
    }
    getTrainingLists() {

        return this.http.get<ITrainingGetDto[]>(this.BaseURI + "GetTrainingAllList")
    }

    createTrainer(trainer: ITrainerPostDto) {

        trainer.CreatedById = this.userService.getCurrentUser().userId
        return this.http.post<ResponseMessage>(`${this.BaseURI}AddTrainerList`, trainer)

    }


    getAllReportTrainees (){
        return this.http.get<IAllTraineeReportDto[]>(this.BaseURI + "GetAllTraineeReport")
    }


    UpdateTrainerList(trainer: ITrainerPostDto) {

        trainer.CreatedById = this.userService.getCurrentUser().userId
        return this.http.put<ResponseMessage>(`${this.BaseURI}UpdateTrainerList`, trainer)

    }

    DeleteTrainer(trainerId:string){

        return this.http.delete<ResponseMessage>(`${this.BaseURI}DeleteTrainer?trainerId=${trainerId}`)

    }

    DeleteTraining(trainingId:string){

        return this.http.delete<ResponseMessage>(`${this.BaseURI}DeleteTraining?trainingId=${trainingId}`)

    }

    getTrainerList(trainingId: string) {
        return this.http.get<ITrainerGetDto[]>(this.BaseURI + "GetTrainerList?trainingId=" + trainingId)
    }



    createTrainee(trainer: ITraineePostDto) {
        return this.http.post<ResponseMessage>(`${this.BaseURI}AddTraineeList`, trainer)
    }

    updateTrainee(trainer: ITraineePostDto) {
        return this.http.put<ResponseMessage>(`${this.BaseURI}UpdateTraineeList`, trainer)
    }

    
    getTraineeList(trainingId: string) {
        return this.http.get<ITraineeGetDto[]>(this.BaseURI + "GetTraineeList?trainingId=" + trainingId)
    }


    sendTrainerEmail(trainerEmail: ITrainerEmailDto,type:string) {
        return this.http.post<ResponseMessage>(`${this.BaseURI}SendEmailTrainer?type=${type}`, trainerEmail)
    }


    //add

    createTrainingReport(trainingReport: FormData) {
       return this.http.post<ResponseMessage>(`${this.BaseURI}AddTrainingReport`, trainingReport)
    }

    getTrainingReport(trainingId: string) {
        return this.http.get<ITrainingReportGetDto>(this.BaseURI + "GetTrainingReport?trainingId=" + trainingId)
    }


    changeTraineeReportStatus(trainingID:string,status : string ){

        return this.http.post<ResponseMessage>(this.BaseURI+`ChangeTraineeReportStatus?trainingId=${trainingID}&status=${status}`,{})
    }

    deleteTrainee (traineeId:string){

        return this.http.delete<ResponseMessage> (this.BaseURI+`DeleteTrainee?traineeId=${traineeId}`)
    }



}


