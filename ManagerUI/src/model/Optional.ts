export class Optional<T> {
    private readonly value: T | undefined;

    private constructor(value: T | undefined) {
        this.value = value;
    }

    public static of<T>(value: T): Optional<T> {
        if (value) {
            return new Optional<T>(value);
        }
        return Optional.empty<T>();
    }

    public static empty<T>(): Optional<T> {
        return new Optional<T>(undefined);
    }

    public get(): T {
        if (this.value === undefined) {
            throw new Error('value is undefined');
        }
        return this.value;
    }

    public isPresent(): boolean {
        return this.value !== undefined;
    }

    public ifPresent(f: { (wrapped: T): void }): void {
        if (this.value !== undefined) {
            f(this.value);
        }
    }

    public map<U>(f: { (wrapped: T): U }): Optional<U> {
        if (this.value !== undefined) {
            return Optional.of(f(this.value));
        }
        return Optional.empty<U>();
    }

    public flatMap<U>(f: { (wrapped: T): Optional<U> }): Optional<U> {
        if (this.value !== undefined) {
            return f(this.value);
        }
        return Optional.empty<U>();
    }

    public filter(p: { (wrapped: T): boolean }): Optional<T> {
        if (this.value !== undefined) {
            if (p(this.value)) {
                return this;
            }
        }
        return Optional.empty<T>();
    }

    public orElse(other: T): T {
        if (this.value !== undefined) {
            return this.value;
        }
        return other;
    }

    public orElseGet(f: { (): T }): T {
        if (this.value !== undefined) {
            return this.value;
        }
        return f();
    }

    public orElseThrow(f: { (): Error }): T {
        if (this.value !== undefined) {
            return this.value;
        }
        throw f();
    }
}
