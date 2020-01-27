import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineTypeComponent } from './line-type.component';



@NgModule({
    declarations: [LineTypeComponent],
    exports: [
        LineTypeComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LineTypeModule { }
