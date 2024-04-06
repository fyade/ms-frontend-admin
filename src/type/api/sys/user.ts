export interface userDto {
  id: string
  username: string
  nickname?: string
  avatar?: string
  sex?: string
  email?: string
  tel?: string
}

export interface loginDto {
  username: string
  password: string
}

export interface registDto extends loginDto {
}

export interface resetPsdDto {
  id: string
  password: string
}