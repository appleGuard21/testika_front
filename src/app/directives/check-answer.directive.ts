import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCheckAnswer]'
})
export class CheckAnswerDirective {

  check: boolean = false;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.check = !this.check;
    if(this.check){
      this.el.nativeElement.style.background = 'linear-gradient(180deg, #26AFE9 0%, #93E9F3 100%)';
      this.el.nativeElement.style.border = '2px solid white';
      this.el.nativeElement.style.color = 'white'
    }else {
      this.el.nativeElement.style.background = 'none'
      this.el.nativeElement.style.border = '2px solid #1CB0E9'
      this.el.nativeElement.style.color = 'black'
    }
  }

}
