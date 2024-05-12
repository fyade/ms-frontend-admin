export interface chooseTableTableIntre {
  row_index: number
  table_name_en: string
  table_name_cn: string
  table_name_en_initial: string
  table_name_cn_initial: string
  cols: chooseTableTableColIntre[]
}

export interface chooseTableTableColIntre {
  col_info: string
  col_name: string
  col_remark: string
  col_type: string
  if_must: boolean
}