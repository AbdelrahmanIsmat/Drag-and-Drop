import {
  assingValidateInputs,
  handleValidationErrors,
} from "../utils/validdation/validdation_helpers";
import { Base } from "./Base";
import { projectState } from "../store/ProjectState";
import { autoBind } from "../decorators/autoBind";

export class Fields extends Base<HTMLFormElement> {
  constructor() {
    super("fields", "app", "form", true);
    this._addProject();
  }
  private _addProject(): void {
    this.element.addEventListener("submit", this._handleAddProduct);
  }

  /**
   * @decs handle add product
   */
  @autoBind
  private _handleAddProduct(e: Event): void {
    e.preventDefault();
    const [titleInput, decsInput] = this._getInputs();
    const [titleValue, decsValue] = this._getInputsValue(titleInput, decsInput);
    if (this._validateInputsValues(titleValue, decsValue)) {
      projectState.createProject(titleValue, decsValue);
      this._clearInputsValues(titleInput, decsInput);
    }
  }

  /**
   * @decs get product inputs
   *
   * @return inputs [title, decs] after get : HTMLInputElement[]
   */
  private _getInputs(): HTMLInputElement[] {
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const decsInput = document.getElementById("desc") as HTMLInputElement;
    return [titleInput, decsInput];
  }
  /**
   * @decs get inputs values
   *@param titleInput : HTMLInputElement
   *@param decsInput : HTMLInputElement
   * @return values [title, decs] : string[]
   */
  private _getInputsValue(
    titleInput: HTMLInputElement,
    decsInput: HTMLInputElement,
  ): string[] {
    const titleValue = titleInput.value;
    const decsValue = decsInput.value;
    return [titleValue, decsValue];
  }
  /**
   * @decs maka validation
   * @param titleValue : string
   * @param decsValue : string
   */
  private _validateInputsValues(titleValue: string, decsValue: string) {
    const [titleInputRule, decsInputRule] = assingValidateInputs(
      titleValue,
      decsValue,
    );
    const titleErrorMassage = handleValidationErrors(titleInputRule);
    const decsErrorMassage = handleValidationErrors(decsInputRule);
    const PopupContainer = document.getElementById(
      "popup_container",
    ) as HTMLDivElement;
    const descPopup = document.getElementById(
      "desc_popup",
    ) as HTMLParagraphElement;
    if (titleErrorMassage) {
      PopupContainer.classList.add("visible_popup");
      descPopup.textContent = titleErrorMassage;
      return false;
    } else if (decsErrorMassage) {
      PopupContainer.classList.add("visible_popup");
      descPopup.textContent = decsErrorMassage;
      return false;
    }
    return true;
  }
  /**
   * @decs clear inputs values after add project
   * @param titleInput : HTMLInputElement
   * @param decsInput : HTMLInputElement
   */
  private _clearInputsValues(
    titleInput: HTMLInputElement,
    decsInput: HTMLInputElement,
  ): void {
    titleInput.value = "";
    decsInput.value = "";
  }
}
