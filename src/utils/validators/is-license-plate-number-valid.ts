import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ name: "IsLicensePlateNumberValid", async: true })
export class IsLicensePlateNumberValid implements ValidatorConstraintInterface {
  async validate(value: string) {
    const regex = new RegExp("^[A-Z]{3}-\\d{3}$", "gm");
    if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}
