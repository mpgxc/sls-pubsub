import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({
  region: process.env.REGION,
});

export const producer = async () => {
  try {
    console.info("Enviando mensagem para a fila...");

    console.info({
      queue: process.env.QUEUE_URL,
    });

    const command = new SendMessageCommand({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify({ objectKey: "test_0.jpg" }),
    });

    await sqs.send(command);

    console.info("Sucesso!");
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Mensagem enviada com sucesso!",
    }),
  };
};

export const consumer = async (event) => {
  console.info("Recebendo mensagem da fila...");

  for (const record of event.Records) {
    console.info(`Mensagem recebida: ${record.body}`);
  }
};
