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
    console.log(_value);
    if(_value !== undefined && this._value !== _value){
      this._value = _value;
      this.onChange(_value);
      this.onTouched(_value);
      }
  }
  get value() {
    return this._value;
  }
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' = 'text';
 

  onChange: any = () => {};

  onTouched: any = () => {};

  disabled = false;

  writeValue(value: any) {
    console.log('-writeValue-');
    this.value = value;
  }

  registerOnChange(onChange: any) {
    console.log('-registerOnChange-');
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    console.log('-registerOnTouched-');
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    console.log('-OnsetDisabledStateBlur-');
    this.disabled = disabled;
  }
}
