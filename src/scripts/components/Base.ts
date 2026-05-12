export class Base<T extends HTMLElement> {
  private _templet!: HTMLTemplateElement;
  private _hostElement!: HTMLDivElement;
  public element: T;
  constructor(
    private _templetId: string,
    private _hostId: string,
    private _elementId: string,
    private _postionElementStart: boolean,
  ) {
    const [templet, host] = this._targetElement(this._templetId, this._hostId);

    this._templet = templet;
    this._hostElement = host;
    const templetContent = document.importNode(templet.content, true);

    this.element = templetContent.firstElementChild! as T;

    if (this._elementId) {
      this.element.id = this._elementId;
      this._insertElement(this._postionElementStart);
    }
  }

  /**
   * @desc target element : templet , host
   * @param templetId : string
   * @param hostId : string
   * @returns templet : HTMLTemplateElement , host : HTMLDivElement
   */
  private _targetElement(
    templetId: string,
    hostId: string,
  ): [HTMLTemplateElement, HTMLDivElement] {
    const templet = document.getElementById(templetId)! as HTMLTemplateElement;
    const host = document.getElementById(hostId)! as HTMLDivElement;
    return [templet, host];
  }

  private _insertElement(postionStart: boolean) {
    const isInsertStart = postionStart ? "afterbegin" : "beforeend";
    this._hostElement.insertAdjacentElement(isInsertStart, this.element);
  }
}
