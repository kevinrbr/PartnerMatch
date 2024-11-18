export const messagesQueryKey = {
  all: ['messages'],
  latest: (roomId: string) => ['messages', 'latest', roomId]
}
