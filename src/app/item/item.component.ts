import {Component, Input} from '@angular/core';


@Component({
  selector: 'item-travel',
  templateUrl: './item.component.html'
})

export class ItemComponent {
    @Input() station: any;
    @Input() index: any;
}
