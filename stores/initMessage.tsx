import { useEffect, useRef } from 'react'

import { useMessage } from './messages'

import { IMessage } from '@/types/message'

export default function InitMessage({ messages }: { messages: IMessage[] }) {
  const initState = useRef(false)
  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages })
    }
    initState.current = true
  }, [])

  return <></>
}
