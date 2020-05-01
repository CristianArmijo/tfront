import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStory } from '../entities/UserStory';

@Injectable()
export class ProjectsService {

  constructor(private http: HttpClient) {
  }

  // PROJECTS --------------------------------------------------------------------------------------------------------

  public getUserProjects(params): Observable<any> {
    return this.http.get<any>(environment.PATH_tecnoandinaapi + '/api/v1/projects?member=' + params.userId);
  }

  public getUserStories(params): Observable<any> {
    return this.http.get<any>(environment.PATH_tecnoandinaapi + '/api/v1/userstories?project=' + params.projectId);
  }


}
