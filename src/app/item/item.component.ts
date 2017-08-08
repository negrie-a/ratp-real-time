import {Component, Input} from '@angular/core';


@Component({
  selector: 'item-travel',
  templateUrl: './item.component.html'
})

export class ItemComponent {
    @Input() station: any;
    @Input() index: any;

    isPair = 0;

    constructor() {
      this.isPair = this.index % 2
    }
}
