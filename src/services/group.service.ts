import { CreateGroupDTO, JoinGroupDTO, LeaveGroupDTO } from "../controllers";
import { OperationResult } from "../types";
import { GroupRepository, UserRepository } from "../config";
import { opFailure, opSuccess } from "../utils";
import { HttpStatusCode } from "axios";
import { Group } from "../models";
import { In } from "typeorm";

export class GroupService {
  public static async createGroup(
    request: CreateGroupDTO,
  ): Promise<OperationResult> {
    if (await GroupRepository.exists({ where: { name: request.name } })) {
      return opFailure(
        HttpStatusCode.Conflict,
        `Group with name ${request.name} already exists`,
      );
    }

    const users = await UserRepository.findBy({
      username: In(request.members),
    });
    if (!users || !users.length) {
      return opFailure(HttpStatusCode.NotFound, `No users provided exist`);
    }

    const newGroup = new Group();
    newGroup.name = request.name;
    newGroup.users = users;

    const savedGroup = await GroupRepository.save(newGroup);
    if (!savedGroup) return opFailure();

    return opSuccess(savedGroup);
  }

  public static async joinGroup(
    request: JoinGroupDTO,
  ): Promise<OperationResult> {
    const group = await GroupRepository.findOne({
      where: { name: request.group },
      relations: ["members"],
    });
    if (!group) {
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find group with name ${request.group}`,
      );
    }

    const user = await UserRepository.findOne({
      where: { username: request.user },
    });
    if (!user) {
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find user with username ${request.user}`,
      );
    }

    if (group.users.map((user) => user.id).includes(user.id)) {
      return opFailure(
        HttpStatusCode.AlreadyReported,
        `User ${user.username} is already in group ${group.name}`,
      );
    }

    group.users = [...group.users, user];

    const savedGroup = await GroupRepository.save(group);
    if (!savedGroup) return opFailure();

    return opSuccess(savedGroup);
  }

  public static async leaveGroup(
    request: LeaveGroupDTO,
  ): Promise<OperationResult> {
    const group = await GroupRepository.findOne({
      where: { name: request.group },
      relations: ["members"],
    });
    if (!group) {
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find group with name ${request.group}`,
      );
    }

    const user = await UserRepository.findOne({
      where: { username: request.user },
    });
    if (!user) {
      return opFailure(
        HttpStatusCode.NotFound,
        `Cannot find user with username ${request.user}`,
      );
    }

    if (!group.users.map((user) => user.id).includes(user.id)) {
      return opFailure(
        HttpStatusCode.BadRequest,
        `User ${user.username} is not in group ${group.name}`,
      );
    }

    group.users = group.users.filter((member) => member.id !== user.id);

    const savedGroup = await GroupRepository.save(group);
    if (!savedGroup) return opFailure();

    return opSuccess(savedGroup);
  }
}