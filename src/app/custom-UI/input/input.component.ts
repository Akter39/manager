import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const _VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [_VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor {

  _value: string = "";
  set value(_value: string) {
    if(_value !== undefined && this._value !== _value){
      this._value = _value;
      this.onChange(_value);
      //this.onTouched(_value);
      }
  }
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() isStar: boolean = false;
 

  onChange: any = () => {};

  onTouched: any = () => {};

  disabled = false;

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onBlur(){
    this.onTouched(this.value);
  }
}
