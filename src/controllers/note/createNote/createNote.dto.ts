import {NoteType} from "../../../models";
import {Expose} from "class-transformer";
import {
    IsDefined,
    IsEnum,
    IsString,
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from "class-validator";

function CreateNoteDTOValidator(validationOptions?: ValidationOptions) {
    return function (target: Function) {
        registerDecorator({
            name: 'createNoteDTOValidator',
            target: target,
            propertyName: '',
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const { group, user } = value;
                    return (group && !user) || (!group && user);
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Exactly one of `group` or `user` must be defined.';
                },
            },
        });
    };
}

@CreateNoteDTOValidator()
export class CreateNoteDTO {
    @Expose()
    @IsEnum(NoteType)
    @IsDefined()
    noteType!: NoteType

    @Expose()
    @IsString()
    @IsDefined()
    title!: string

    @Expose()
    @IsString()
    @IsDefined()
    content!: string

    @Expose()
    @IsString()
    @IsDefined()
    group?: string

    @Expose()
    @IsString()
    @IsDefined()
    user?: string
}