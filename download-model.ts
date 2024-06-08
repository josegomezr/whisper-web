import { AutomaticSpeechRecognitionPipelineFactory } from "./src/model_factories.js";
import Constants from "./src/utils/Constants.ts";
import { pipeline, env } from "@xenova/transformers";
import { exec } from 'child_process'

// Ignore locals, accept remotes
env.allowLocalModels = false;
env.allowRemoteModels = true;

async function main(){
  const p = AutomaticSpeechRecognitionPipelineFactory;

  for (var model in Constants.SUPPORTED_MODELS) {
    p.model = model
    console.log('Downloading', model)
    let inst = await p.getInstance((data) => {});
    inst.dispose()
    p.instance = null;
    console.log("Copying", model)
    await exec(`cp -r ./node_modules/@xenova/transformers/.cache/${model} public/models/`);
  }
}

main();