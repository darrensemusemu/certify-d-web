import { Box, Input } from '@chakra-ui/react';
import { Text } from '@certify-d/shared-ui';
import { NodeInputProps } from './helpers';

export function NodeInputDefault<T>(props: NodeInputProps) {
  const { node, attributes, value = '', setValue, disabled } = props;

  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = () => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick);
      run();
    }
  };

  // Render a generic text input field.
  return (
    <Box py={4}>
      {node.meta.label?.text && <Text as="label">{node.meta.label?.text}</Text>}
      <Input
        title=""
        onClick={onClick}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={attributes.type}
        name={attributes.name}
        value={value}
        disabled={attributes.disabled || disabled}
        isInvalid={node.messages.some(({ type }) => type === 'error')}
      />
      {/* Help text */}
      {node.messages.map((msg) => (
        <Text key={msg.id}>{msg.text}</Text>
      ))}
    </Box>
  );
}
