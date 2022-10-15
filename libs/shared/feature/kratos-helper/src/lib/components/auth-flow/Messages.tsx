import { Alert, AlertIcon } from '@chakra-ui/react';
import { UiText } from '@ory/kratos-client';

interface MessageProps {
  message: UiText;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <Alert
      data-testid={`ui/message/${message.id}`}
      status={message.type === 'error' ? 'error' : 'info'}
    >
      <AlertIcon />
      There was an error processing your request
    </Alert>
  );
};

interface MessagesProps {
  messages?: Array<UiText>;
}

export const Messages = ({ messages }: MessagesProps) => {
  console.log(messages);

  if (!messages) {
    // No messages? Do nothing.
    return null;
  }

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
