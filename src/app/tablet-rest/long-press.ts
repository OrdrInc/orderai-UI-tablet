import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';


@Directive({
    selector: '[long-press]'
})
export class LongPressDirective {

    private timeoutId:any = null;
    private intervalId:any = null;

    private isLongPressing :any;
    private isPressing :any;

    @Output() onLongPress = new EventEmitter();
    @Output() onLongPressing = new EventEmitter();

    @Input() timeout: number = 300;

    @HostBinding('class.press')
    get press() {
        return this.isPressing;
    }

    @HostBinding('class.long-press')
    get longPress() {
        return this.isLongPressing;
    }

    @HostListener('touchstart', ['$event'])
    public onMouseDown(event:any) {
        this.isPressing = true;
        this.isLongPressing = false;

        this.timeoutId = (<any>window).setTimeout(() => {
            this.isLongPressing = true;
            this.onLongPress.emit(event);

            this.intervalId = (<any>window).setInterval(() => {
                this.onLongPressing.emit(event);
            }, 30);
        }, this.timeout);
    }

    @HostListener('touchend', ['$event'])
    public onMouseLeave() {
        this.endPress();
    }

    private endPress() {
        if (this.timeoutId !== null)
            clearTimeout(this.timeoutId);

        if (this.intervalId !== null)
            clearInterval(this.intervalId);

        this.isLongPressing = false;
        this.isPressing = false;
    }

}