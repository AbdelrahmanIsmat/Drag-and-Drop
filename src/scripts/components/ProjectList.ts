import { autoBind } from "../decorators/autoBind";
import { ProjectRules } from "../store/ProjectRules";
import { projectState } from "../store/ProjectState";
import { projectStatus } from "../utils/project-status";
import { Base } from "./Base";
import { Project } from "./Project";

export class ProjectList extends Base<HTMLDivElement> {
  constructor(private _status: "Initial" | "Active" | "Finished") {
    super("project-list", "app", `${_status}-projects`, false);
    this.renderProjectList();

    if (localStorage.getItem("Projects")!) {
      const localStorageProjects = JSON.parse(
        localStorage.getItem("Projects")!,
      );
      this._showProjectInDom(localStorageProjects);
    }

    projectState.pushListner((projects: ProjectRules[]) => {
      this._showProjectInDom(projects);
    });

    this._runDragging();
  }
  /**
   * @desc render project list title and add class to list
   */
  private renderProjectList(): void {
    const title = this.element.querySelector(".title")! as HTMLHeadingElement;
    const list = this.element.querySelector(
      ".projects-list",
    )! as HTMLUListElement;

    list.id = `${this._status}-list`;
    title.textContent = `${this._status} Project`;
  }
  /**
   * @desc show all Projects in dom after filtering
   * @param projects : ProjectRules
   */
  private _showProjectInDom(projects: ProjectRules[]) {
    const filterProjects = this._flterProjectsStatus(projects);
    this._renderProjects(filterProjects);
  }

  /**
   * @desc render projects in the list
   * @param projects : ProjectRules[]
   */
  private _renderProjects(projects: ProjectRules[]): void {
    const ProjectList = document.getElementById(
      `${this._status}-list`,
    )! as HTMLDivElement;
    ProjectList.innerHTML = "";
    for (const project of projects) {
      new Project(`${this._status}-list`, project);
    }
  }

  /**
   * @desc filter projects by status and return project after filter
   * @param projects : ProjectRules[]
   * @returns project after filter by status
   */
  private _flterProjectsStatus(projects: ProjectRules[]) {
    const filterProjects = projects.filter((project: ProjectRules) => {
      if (this._status === "Initial") {
        return project.status === projectStatus.Inital;
      } else if (this._status === "Active") {
        return project.status === projectStatus.Active;
      } else if (this._status === "Finished") {
        return project.status === projectStatus.Finished;
      }
    });
    return filterProjects;
  }
  /**
   * @desc run dragging on the projects list : dragOver , drop
   */
  private _runDragging(): void {
    this.element.addEventListener("dragover", this._handleDragOver);
    this.element.addEventListener("drop", this._handleDrop);
  }

  /**
   * @desc  prevent default behavior beacuase i want to drop project
   */
  @autoBind
  private _handleDragOver(e: DragEvent): void {
    e.preventDefault();
  }
  /**
   * @desc when drop get project id from dataTransfer and change project status by project id and new status
   * @param e
   */
  @autoBind
  private _handleDrop(e: DragEvent): void {
    const projectId = e.dataTransfer!.getData("text/plain");
    const newStatus =
      (this.element.id === "Initial-projects" && projectStatus.Inital) ||
      (this.element.id === "Active-projects" && projectStatus.Active) ||
      (this.element.id === "Finished-projects" && projectStatus.Finished);

    projectState.changeProjectStatus(projectId, newStatus);
  }
}
