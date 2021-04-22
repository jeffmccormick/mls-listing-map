interface QueueEntry {
    resolve: () => void;
    reject: (reason: string | Error) => void;
}

export class DelayQueue {
    private readonly _delay: number;
    private readonly _queue: QueueEntry[];

    private _isTicking: boolean;

    constructor(delay: number) {
        this._delay = delay;
        this._queue = [];
        this._isTicking = false;
    }

    public waitNext(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => this._queue.push({ resolve, reject }));
        if (!this._isTicking) {
            this.startTick();
        }

        return promise;
    }

    private startTick(force = false): void {
        if (this._isTicking && !force) {
            return;
        }

        this._isTicking = true;
        setTimeout(this.pop.bind(this), this._delay);
    }

    private pop(): void {
        const nextItem = this._queue.shift();
        if (!nextItem) {
            return;
        }

        try {
            nextItem.resolve();
        } catch (err) {
            // The handler might throw an error, and if so, send it to the reject
            console.log(`DelayQueue callback threw error that was ignored: ${err}`);
        }

        if (!this._queue.length) {
            this._isTicking = false;
        } else {
            this.startTick(true);
        }
    }
}
