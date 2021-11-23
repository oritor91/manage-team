import { Payments } from "src/types/payments.type";
import { Settings } from "src/types/settings.type";
import { SmsTimePeriod } from "src/types/smsTimePeriod.type";
import { Time } from "src/types/time.type";

type mockTeamPlayer = {
    player: string,
    teamId: string,
    regularMember: boolean,
    smsTimePeriod: SmsTimePeriod
}

class TeamDto {
    name: string;
    managers: string[];
    location: string;
    settings: Settings;
    payments: Payments;
    time: Time[];
    players: mockTeamPlayer[]
}

export {
    mockTeamPlayer,
    TeamDto
}
