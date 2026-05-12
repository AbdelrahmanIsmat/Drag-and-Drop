import { projectStatus } from "../utils/project-status.js";
import { ListnerType } from "./ListnerType.js";
import { ProjectRules } from "./ProjectRules.js";

class ProjectState {
  private static _instance: ProjectState;
  private _projects: ProjectRules[] = [];
  private _listners: ListnerType[] = [];
  private _localStorageProject: ProjectRules[] = localStorage.getItem(
    "Projects",
  )
    ? JSON.parse(localStorage.getItem("Projects")!)
    : [];

  constructor() {
    this._projects = this._localStorageProject;
  }
  /**
   * @dsec create singleton instance
   */
  public static getInstance() {
    if (!this._instance) {
      this._instance = new ProjectState();
      return new ProjectState();
    }
    return this._instance;
  }
  /**
   * @desc creat new project
   * @param projectTitle : string
   * @param projectDesc : string
   */
  public createProject(title: string, desc: string) {
    const newProject = new ProjectRules(
      Math.random().toString(),
      title,
      desc,
      projectStatus.Inital,
    );
    this._projects.push(newProject);
    this._runListners();
    localStorage.setItem("Projects", JSON.stringify(this._projects));
  }
  /**
   * @desc delete project from state and local storage into project id
   * @param projectId : string
   */
  public deleteProject(projectId: string): void {
    const projectAfterDelete = this._projects.filter(
      (project: ProjectRules) => {
        return project.id !== projectId;
      },
    );
    this._projects = projectAfterDelete;
    this._runListners();
    localStorage.setItem("Projects", JSON.stringify(this._projects));
  }
  /**
   *@desc run listners after add new project
   */
  private _runListners(): void {
    for (const listner of this._listners) {
      listner([...this._projects]);
    }
  }
  public changeProjectStatus(
    projectId: string,
    newStatus: projectStatus | false,
  ): void {
    const project = this._projects.find((p) => p.id === projectId);
    if (project && project.status !== newStatus) {
      project!.status = newStatus ? newStatus : project!.status;
      this._runListners();
      localStorage.setItem("projects", JSON.stringify(this._projects)); // * add all projects in local storage
    }
  }
  /**
   * @desc pushhing Listners in array
   * @param Listner : function
   */
  public pushListner(Listner: ListnerType) {
    this._listners.push(Listner);
  }
}

export const projectState = ProjectState.getInstance();
