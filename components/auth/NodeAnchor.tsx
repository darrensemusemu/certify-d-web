import { UiNode, UiNodeAnchorAttributes } from '@ory/kratos-client'
import { Button } from '@ory/themes'

interface Props {
  node: UiNode
  attributes: UiNodeAnchorAttributes
}

export const NodeAnchor = ({ node, attributes }: Props) => {
  return (
    <Button
      data-testid={`node/anchor/${attributes.id}`}
      onClick={(e: Event) => {
        e.stopPropagation()
        e.preventDefault()
        window.location.href = attributes.href
      }}
    >
      {attributes.title.text}
    </Button>
  )
}
