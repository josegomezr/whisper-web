/* eslint-disable camelcase */
import { transcribe } from "./transcriber.js";

self.addEventListener("message", async (event) => {
    const message = event.data;

    // Do some work...
    // TODO use message data
    let transcript = await transcribe(
        self,
        message.audio,
        message.model,
        message.multilingual,
        message.quantized,
        message.subtask,
        message.language,
    );
    if (transcript === null) return;

    // Send the result back to the main thread
    self.postMessage({
        status: "complete",
        task: "automatic-speech-recognition",
        data: transcript,
    });
});
