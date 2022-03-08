import { OwnershipState } from "./OwnershipState";

export interface Ownership {
    gameId: number;
    ownershipId: number;
    registeredDate: string;
    state: OwnershipState;
    userAccountId: string;
}
