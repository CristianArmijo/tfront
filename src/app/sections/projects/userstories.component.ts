import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MSGSERVERERROR } from 'src/app/components/messages';
import { ProjectsService } from 'src/app/models/services/projects.service';
import { UserStory } from 'src/app/models/entities/UserStory';
import { Project } from 'src/app/models/entities/Project';
import { AuthService } from 'src/app/models/services/auth.service';

@Component({
  selector: 'app-project-userstories',
  templateUrl: './userstories.component.html',
  styleUrls: ['./userstories.component.css']
})

export class ProjectUserStoriesComponent {
  title: string = 'Tecnoandina';
  public submitForm: boolean = false;
  public businessErrors: string[] = [];
  public serviceErrors: string[] = [];
  public projects: Project[] = [];
  public project: Project = new Project();
  public userStories: UserStory[] = [];

  constructor(public authService: AuthService
            , private projectsService: ProjectsService
            , private router: Router) {
  }

  ngOnInit() {
    this.tryGetUserProjects(+this.authService.payload.uid);
  }

  public cleanMessagesFormValidation(): void {
    this.submitForm = false;
    this.businessErrors = [];
    this.serviceErrors = [];
  }
  private errorControl(code: number) {
    let message = "";
    switch (code) {
      case 400: {
        message = "Credenciales no válidas";
        if (!this.businessErrors.includes(message)) {
          this.businessErrors.push(message);
        };
        break;
      }
      default: {
        if (!this.serviceErrors.includes(MSGSERVERERROR)) {
          this.serviceErrors.push(MSGSERVERERROR);
        };
        break;
      }
    };
  }

  public tryGetUserProjects(userId: number) {
    this.cleanMessagesFormValidation();

    let params = {
      userId
    };
    this.projectsService.getUserProjects(params)
      .subscribe(
        value => {
          value.forEach(proj => {
            let project = new Project();
            project.id = (proj.id) ? proj.id : project.id;
            project.name = (proj.name) ? proj.name : project.name;
            this.projects.push(project);
          });
          // Inicializa mostrando las historias del primer proyecto de la lista de proyectos
          if (this.projects.length > 0) {
            this.project.id = this.projects[0].id;
            this.project.name = this.projects[0].name;
            this.tryGetUserStories(this.project.id);
          };
        },
        error => {
          this.errorControl(error.status);
        }
      )

  }

  public tryGetUserStories(projectId: number) {
    this.cleanMessagesFormValidation();

    let params = {
      projectId
    };
    this.projectsService.getUserStories(params)
      .subscribe(
        value => {
          this.userStories = [];
          value.forEach(story => {
            let userStory = new UserStory();
            userStory.status.id = (story.status) ? story.status : userStory.status.id;
            if (userStory.status.id != 2183333) {
              userStory.subject = (story.subject) ? story.subject : userStory.subject;
              userStory.username = (story.assigned_to_extra_info && story.assigned_to_extra_info.username) ? story.assigned_to_extra_info.username : userStory.username;
              userStory.photo = (story.assigned_to_extra_info && story.assigned_to_extra_info.photo) ? story.assigned_to_extra_info.photo : userStory.photo;
              userStory.status.name = (story.status_extra_info.name) ? story.status_extra_info.name : userStory.status.name;
              this.userStories.push(userStory);
            };
          });
        },
        error => {
          this.errorControl(error.status);
        }
      )

  }

}
