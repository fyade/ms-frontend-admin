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