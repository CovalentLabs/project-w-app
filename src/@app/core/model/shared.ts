
export interface Profile {
  Id: string
  FirstName: string
  Tagline: string
}

export enum FriendStatus {
  ONLINE,
  OFFLINE,
  SEARCHING,
  IN_GROUP,
  // JOINABLE,
}

export type Friend = {
  Id: string
  // TODO: FriendData may include contact link maybe for SMS,
  // or, it may not be needed at all.
  // Data: FriendData
  Profile: Profile
  Status: FriendStatus
}

// Single availability configuration from, to, times
export type Availability = {
  Id: string
  Start: Date
  End: Date
}

// One user's vehicle for discovering in
export type Pea = {
  Id: string
  Availability: Availability[]
  Profile: Profile
}

// As multiple users group together, we form Pods
// of multiple Peas.
export type Pod = {
  Id: string
  Peas: Pea[]
}

export enum PodMatchStatus {
  ACCEPTED,
  NOT_RESPONDED,
  REJECTED,
}

export type PodMatch = {
  Id: string
  Pod: Pod
  Status: PodMatchStatus
}

export type PodInvitation = {
  Id: string
  From: Pea
  Pod: Pod
  To: Friend
}

export enum GroupLockStatus {
  LOCKED,
  UNLOCKED,
}

// The reason Group is a shared model,
// as opposed to only being in Lobby is because
// the Group model will be used in the history screen as well!

// This is the final group which you are in to go to the event with,
// It is not formed until all pods have accepted each other and are
// paired together.
export type Group = {
  Id: string
  Name: string
  FormedAt: Date
  MeetingAt: Date
  LockStatus: GroupLockStatus
  GroupUsers: GroupUser[]
}

export enum GroupUserStatus {
  ACTIVE, AWAY, QUIT
}

export type GroupUserData = {
  // Describing what color this person is wearing
  // to make it easier to locate each other.
  WearingColor?: string,
}

export type GroupUser = {
  Id: string
  // Purely for tracking how people were podded
  PodId: string
  Profile: Profile

  // This is configurable, updatable, data for the user
  Data: GroupUserData

  // Is this user at the location?
  HasArrived: boolean

  Status: GroupUserStatus
}
