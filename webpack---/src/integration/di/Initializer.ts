export type ILazyInitializer<T> = () => T;

export class Lazy<T> {
    private instance: T | null = null;

     constructor(
         private readonly initializer: ILazyInitializer<T>) {
     }

     public get value(): T {
         if (this.instance == null) {
             this.instance = this.initializer();
         }

         return this.instance;
     }
}
