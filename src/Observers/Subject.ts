import Observer from "./Observer"

export default interface Subject {
    observers:Observer[]
    subscribe(o:Observer):void
    unsubscribe(o:Observer):void
}