import { Pipeline } from "../../../models/pipeline/pipeline";
import { IObserver } from "../../../observer-pattern/interfaces/IObserver";
import { IPipelineVisitor } from "../../../visitor-pattern/visitors/IPipelineVisitor";
import { IPipelineState } from "../../interface/IPipelineState";
import { PipelineBuildState } from "./build.state";

export class PipelinePackageState implements IPipelineState {
  constructor(
    private pipeline: Pipeline,
    private observers: IObserver[] = []
  ) {}
  public subscribe(observer: IObserver): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(message: string): void {
    this.observers.forEach((observer: IObserver) => {
      observer.update(this);
    });
  }

  getName(): string {
    return "Package Stage";
  }

  getAction(): string {
    return "Packaging...";
  }

  acceptVisitor(visitor: IPipelineVisitor): void {
    visitor.visit(this);
  }

  onSource(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Source State from Package State");
  }

  onPackage(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Package State from Package State");
  }

  onBuild(): void {
    try {
      console.log("Packages/Libraries installed, now building the pipeline");
      this.pipeline.setState(new PipelineBuildState(this.pipeline));
    } catch (error) {
      this.notify(JSON.stringify(error));
    }
  }

  onTest(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Test State from Package State");
  }

  onAnalyze(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Analyze State from Package State");
  }

  onDeploy(): void {
    console.log("Pipeline still installing 3rd party libraries / packages");
    throw new Error("Cannot change to Deploy State from Package State");
  }
}
