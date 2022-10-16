import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ name: "isUUID", async: true })
export class isUUID implements ValidatorConstraintInterface {
  async validate(value: string) {
    const regex = new RegExp(
      "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$",
      "gm"
    );
    if (regex.test(value)) {
      // console.log("valid uuid");
      return true;
    } else {
      // console.log("not valid uuid");
      return false;
    }
  }
}
