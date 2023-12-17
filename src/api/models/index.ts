export interface FileMetadata {
  entityId: string;
  height?: number;
  width?: number;
  id: string;
  mime: string;
  size: number;
  type: string;
  url: string;
  version?: string;
  downloadUrl?: string;
}

export interface EntityMetadata {
  id: string;
  public: boolean;
  entityType: string;
  createdAt: string;
  updatedAt: string;
  totalLikes?: number;
  totalDislikes?: number;
  views?: number;
  files: FileMetadata[];
}

export interface PersonaMetadata extends EntityMetadata {
  configuration?: string;
  files: FileMetadata[];
  name: string;
  type: string;
}

export interface UserMetadata extends EntityMetadata {
  address?: string;
  defaultPersona?: PersonaMetadata;
  description: string;
  ethAddress?: string;
  files: FileMetadata[];
  isActive: boolean;
  isAdmin: boolean;
  isBanned: boolean;
  isMuted: boolean;
  level: number;
  name: string;
  rank: string;
}

export interface EventMetadata extends EntityMetadata {
  active?: boolean;
  owner: UserMetadata;
  name: string;
  title: string;
  summary: string;
  description: string;
  startsAt?: string;
  endsAt?: string;
}

export interface EventPayload {
  entities: EventMetadata[];
  offset: number;
  limit: number;
  total: number;
}

export interface EventCreateMetadata {
  name?: string; // created from the title when sending to the server
  previewUrl?: string; // sent to the server as a separate request
  title: string;
  summary: string;
  description: string;
  public: boolean;
  startsAt: Date | string;
  endsAt: Date | string;
  type: string;
}

// Worlds
export interface WorldMetadata {
  id: string;
  name: string;
  title: string;
  description: string;
  map: string;
  gameMode: string;
  owner: UserMetadata;
}

export interface DestinationMetadata {
  id: string;
  name: string;
  files: FileMetadata[];
}

export interface PortalMetadata {
  id: string;
  name: string;
  world: WorldMetadata;
  destination: DestinationMetadata;
}

export interface PortalPayload {
  entities: PortalMetadata[];
  offset: number;
  limit: number;
}

export interface PortalEditMetadata {
  world: WorldMetadata;
  destination: DestinationMetadata;
}

export interface WorldEntity {
  id: string;
  map: string;
  name: string;
  owner?: WorldOwnerEntity;
  public: boolean;
  description: string;
  files?: FileMetadata[];
}

export interface WorldPayload {
  entities: WorldEntity[];
  offset: number;
  limit: number;
}

export interface WorldOwnerEntity {
  id: string;
  name: string;
}

export interface BuildJobEntity {
  id: string;
  userId: string;
  packageName: string;
  appName: string;
  appDescription: string;
  releaseVersion: string;
  workerId: string;
  packageId: string;
  configuration: string;
  status: string;
  map: string;
  platform: string;
  server: boolean;
  releaseName: string;
  version: number;
  createdAt: Date;
}

export interface FileEntity {
  id: string;
  type: string;
  url: string;
  mime: string;
  size: number;
  version: number;
  deploymentType: string;
  platform: string;
  createdAt: string;
  originalPath: string;
}

export interface AppEntity {
  id: string;
  name: string;
  description: string;
}

export interface AppReleaseEntity {
  id: string;
  public: boolean;
  files: FileEntity[];
  appId: string;
  appName: string;
  version: string;
  name: string;
  description: string;
  appDescription: string;
}

export interface NFTAssetEntity {
  id: string;
  assetId: string;
  name: string;
  description: string;
  contractAddress: string;
  owner: string;
  schemaName: string;
  permalink: string;
  imageUrl: string;
  imagePreviewUrl: string;
  imageThumbnailUrl: string;
  imageOriginalUrl: string;
  animationUrl: string;
  animationOriginalUrl: string;
  objectName: string;
  objectType: string;
  objectDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  email: string;
  name: string;
  description: string;
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  views: number;
  level: number;
  rank: string;
  experience: number;
  apiKey: string;
  isActive: boolean;
  isAdmin: boolean;
  isMuted: boolean;
  isBanned: boolean;
  ethAddress: boolean;
}

export interface PatchPortalMetadata {
  id: string;
  name: string;
  destinationId: string;
  worldId: string;
}

export interface PatchWorldMetadata {
  id: string;
  name?: string;
  map?: string;
  public?: string;
  description?: string;
}

export interface PaginationRequestMetadata {
  offset: number;
  limit: number;
}

export interface RestoreTokenInput {
  token: string;
}

export interface RestorePasswordInput {
  email: string;
}

export interface RestoreTokenValidation {
  isValid: boolean;
}

export interface RestorePasswordInput {
  token: string;
  password: string;
  repeatPassword: string;
}

export interface MsgMetadata {
  errMsg: string;
  successMsg: string;
}
