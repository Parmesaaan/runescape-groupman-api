import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function GroupOrUserValidator(validationOptions?: ValidationOptions) {
    return function (target: Function) {
        registerDecorator({
            name: "createGroupOrUserValidator",
            target: target,
            propertyName: "",
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const { group, user } = value;
                    return (group && !user) || (!group && user);
                },
                defaultMessage(args: ValidationArguments) {
                    return "Exactly one of `group` or `user` must be defined.";
                },
            },
        });
    };
}