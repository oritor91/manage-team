import { TeamPlayer } from "src/schemas/team/teamPlayer.schema";
import { User } from "src/schemas/user/user.schema";
import { Payments } from "src/types/payments.type";
import { Settings } from "src/types/settings.type";
import { Time } from "src/types/time.type";

export class CreateTeamDto {
    name: string;
    managers: User[];
    location: string;
    settings: Settings;
    payments: Payments;
    time: Time[];
    players: TeamPlayer[]
}
