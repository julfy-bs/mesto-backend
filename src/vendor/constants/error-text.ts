export enum ErrorText {
  Length = '{#label} - параметр должен состоять из {#limit} символов',
  DataUri = '{#label} - параметр должен быть валидным URL адресом',
  Required = '{#label} - параметр должен быть передан',
  Min = '{#label} - параметр должен быть длиной не менее {#limit} символов',
  Max = '{#label} - параметр должен быть длиной не более {#limit} символов',
  Empty = '{#label} - параметр не должен быть пустым',
  String = '#{label} - параметр должен быть строкой',
  Trim = '{#label} - параметр не должен начинаться или заканчиваться пробелом',
  Hex = '{#label} - параметр должен быть шестнадцатеричным строковым значением',
  HexAlign = '{#label} - параметр должен быть шестнадцатеричным декодированным значением, выровненным по байтам'
}