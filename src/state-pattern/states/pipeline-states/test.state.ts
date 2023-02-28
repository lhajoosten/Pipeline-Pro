import { Pipeline } from "../../../models/pipeline";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineAnalyzeState } from "./analyze.state";
import { PipelineCancelledState } from "./cancelled.state";

export class PipelineTestState extends IPipelineState {
  constructor(private pipeline: Pipeline) {
    super("Testing Stage", "Testing...");
  }
  
  onSource(): void {
    this.logMessage();
    throw new Error("Cannot change to Source State from Test State");
  }

  onPackage(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Test State");
  }

  onBuild(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Test State");
  }

  onTest(): void {
    this.logMessage();
    throw new Error("Cannot change to Package State from Test State");
  }

  onAnalyze(): void {
    try {
      console.log(
        "All tests have succeeded. Next job is analyzing code on coverage"
      );
      this.pipeline.setState(new PipelineAnalyzeState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onDeploy(): void {
    this.logMessage();
    throw new Error("Cannot change to Deploy State from Test State");
  }

  onCancel(): void {
    try {
      console.log("Scrum Master Cancelled Pipeline");
      this.pipeline.setState(new PipelineCancelledState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  private logMessage(): void {
    console.log("Pipeline is already testing project");
  }
}
