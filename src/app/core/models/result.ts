import {Violation} from "./violation";
import {DOMElement} from "./DOMElement";

export interface Result {
  _id: string;
  url: string;
  date: string;
  violations: ViolationResult;
}

type ViolationResult = {
  [violationKey in Violation]: {
    description: string;
    help: string;
    helpUrl: string;
    elements: DOMElement[];
  };
};
