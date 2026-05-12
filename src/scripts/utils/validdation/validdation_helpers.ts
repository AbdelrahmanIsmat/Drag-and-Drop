import { validation } from "./validation_types.js";

/**
 * @dsec assing validation in inputs
 * @param titleValue : string
 * @param decsValue : string
 * @return [titleInputRule , decsInputRule]
 */
export const assingValidateInputs = (titleValue: string, decsValue: string) => {
  const titleInputRule: validation = {
    type: "title",
    value: titleValue,
    required: true,
    minLength: 3,
    maxLength: 30,
  };
  const decsInputRule: validation = {
    type: "description",
    value: decsValue,
    required: true,
    minLength: 5,
    maxLength: 100,
  };
  return [titleInputRule, decsInputRule];
};
/**
 * @desc handle validation errors
 * @param input : input pattern validation
 * @returns error message : string
 * */
export const handleValidationErrors = (inputRule: validation): string => {
  let errorMessage = "";
  if (inputRule.required && inputRule.value.trim().length === 0) {
    errorMessage = `${inputRule.type} is required.`;
  } else if (
    inputRule.minLength &&
    inputRule.value.trim().length < inputRule.minLength
  ) {
    errorMessage = `${inputRule.type} must be at least ${inputRule.minLength} characters long.`;
  } else if (
    inputRule.maxLength &&
    inputRule.value.trim().length > inputRule.maxLength
  ) {
    errorMessage = `${inputRule.type} must be less than ${inputRule.maxLength} characters long.`;
  }
  return errorMessage;
};
