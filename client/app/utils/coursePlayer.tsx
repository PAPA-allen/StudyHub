import React, { FC } from 'react'

type Props = {
    videoUrl: string;
    title: string;
}

const coursePlayer:FC<Props> = ({videoUrl, title}) => {
  return (
    <div>coursePlayer</div>
  )
}

export default coursePlayer