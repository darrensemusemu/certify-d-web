import { getNodeLabel } from '@ory/integrations/ui'
import { Button } from '@ory/themes'
import { FormEvent } from 'react'

import { NodeInputProps } from './helpers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NodeInputSubmit<T>({
  node,
  attributes,
  setValue,
  disabled,
  dispatchSubmit
}: NodeInputProps) {
  return (
    <Button
        name={attributes.name}
        onClick={(e: MouseEvent | FormEvent<Element>) => {
          // On click, we set this value, and once set, dispatch the submission!
          setValue(attributes.value).then(() => dispatchSubmit(e))
        }}
        value={attributes.value || ''}
        disabled={attributes.disabled || disabled}
      >
        {getNodeLabel(node as any)}
      </Button>
  )
}
