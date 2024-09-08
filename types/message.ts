export type IMessage = {
  id: string
  created_at?: Date
  sender_id: string
  message: string
  room_id: string
}
