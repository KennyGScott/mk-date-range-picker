import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

export interface IcalDate {
	dayOfMonth: string;
	isInMonth: boolean;
	fullDate: string;
}
@Component({
  selector: 'mk-date-range-picker',
  templateUrl: './mk-date-range-picker.component.html',
  styleUrls: ['./mk-date-range-picker.component.scss']
})
export class MkDateRangePickerComponent implements OnInit {
	@Output() relativeSelected = new EventEmitter();
	@Output() absoluteSelected = new EventEmitter();

	public leftCalDates: Array<IcalDate>;
	public rightCalDates: Array<IcalDate>;

	public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	public minutes:number;

	public startDate: IcalDate;
	public endDate: IcalDate;
	public startTime: string;
	public endTime: string;

	public pickerType: string;
	public showCustomDropdown:boolean;

	private rangeSelected:boolean;
	private hoverDate:IcalDate;
	private monthOffset:number;

  constructor() { 
		this.leftCalDates = new Array<IcalDate>();
		this.rightCalDates = new Array<IcalDate>();

		this.monthOffset = 0;
		this.minutes = 1440;
			
		this.showCustomDropdown = false;
		this.rangeSelected = true;
		this.pickerType = 'relative';
		this.startTime = '00:00:00';
		this.endTime = '23:59:59';

		let sd = moment();
		let ed = moment().subtract(7, 'days');
		this.endDate = {dayOfMonth: sd.format('DD'), isInMonth: true, fullDate: sd.format('YYYY-MM-DD')};
		this.startDate = {dayOfMonth: ed.format('DD'), isInMonth: true, fullDate: ed.format('YYYY-MM-DD')};
	}

  ngOnInit() {
		this.relativeSelected.emit(this.minutes);
		this.generateCalendar();
  }

	// emitting functions
	applyDateRange(){
		if(this.validDates()){
			this.minutes = null;
			this.showCustomDropdown = false;
			this.absoluteSelected.emit({startDate:this.startDate.fullDate + ' ' + this.startTime, endDate:this.endDate.fullDate + ' ' + this.endTime});
		}
	}
	selectMinutes(minutes){
		this.showCustomDropdown = false;
		this.startDate = null;
		this.endDate = null;

		this.minutes = minutes;
		this.relativeSelected.emit(this.minutes);
	}

	// next/prev button clicked
	shiftCal(offset){
		this.monthOffset += offset;
		this.generateCalendar()
	}

	dateSelected(date:IcalDate){
		if(this.rangeSelected){
			this.startDate = date;
			this.endDate = null;
			this.rangeSelected = false;
		}else{
			this.endDate = date;
			this.rangeSelected = true;
			if(this.startDate.fullDate > this.endDate.fullDate){
				let temp = this.endDate;
				this.endDate = this.startDate;
				this.startDate = temp;
			}
		}
	}

	// Coloring functions
	isSelected(date){
		if(this.startDate && date.fullDate == this.startDate.fullDate)
			return true;
		
		if(this.endDate && date.fullDate == this.endDate.fullDate)
			return true;
		
		return false;
	}
	isBetween(date){
		// case where one date is selected, used to highlight potential dates in range
		if(!this.rangeSelected && this.startDate && this.hoverDate){
			if(this.hoverDate.fullDate < this.startDate.fullDate){
				if(this.hoverDate.fullDate < date.fullDate && this.startDate.fullDate > date.fullDate)
					return true;
			}else{
				if(this.hoverDate.fullDate > date.fullDate && this.startDate.fullDate < date.fullDate)
					return true;
			}
		}

		// nothing selected, shouldn't happen
		if(this.startDate == null || this.endDate == null)
			return false;
		
		if(date.fullDate > this.startDate.fullDate && date.fullDate < this.endDate.fullDate) 
			return true;
		
		return false;
	}

	validDates(){
		if(!this.startDate || !this.endDate)
			return false

		if(moment(this.startDate.fullDate, 'YYYY-MM-DD', true).isValid() && moment(this.endDate.fullDate, 'YYYY-MM-DD', true).isValid())
			return true;

		return false;
	}

	dateHover(date){
		this.hoverDate = date;
	}

	getMonthName(offset){
		return moment().subtract(offset + this.monthOffset, 'month').format('MMMM YYYY');
	}

	private generateCalendar(){
		this.rightCalDates = new Array<IcalDate>();
		let rightDate = moment().subtract(this.monthOffset, 'month');
		rightDate.date(1);
		rightDate.subtract(rightDate.day(), 'days');

		let isInMonth = false;
		for(let i = 0; i < 42; i++){
			let dayOfMonth = rightDate.format('DD');
			let fullDate = rightDate.format('YYYY-MM-DD')

			if(!isInMonth && +dayOfMonth == 1)
				isInMonth = true;
			else if(isInMonth && +dayOfMonth == 1)
				isInMonth = false;
			
			this.rightCalDates.push({dayOfMonth, isInMonth, fullDate});
			rightDate.add(1, 'day');
		}
		////
		this.leftCalDates = new Array<IcalDate>();
		let leftDate = moment().subtract(this.monthOffset+1, 'month');
		leftDate.date(1);
		leftDate.subtract(leftDate.day(), 'days');

		isInMonth = false;
		for(let i = 0; i < 42; i++){
			let dayOfMonth = leftDate.format('DD');
			let fullDate = leftDate.format('YYYY-MM-DD')

			if(!isInMonth && +dayOfMonth == 1)
				isInMonth = true;
			else if(isInMonth && +dayOfMonth == 1)
				isInMonth = false;
			
			this.leftCalDates.push({dayOfMonth, isInMonth, fullDate});
			leftDate.add(1, 'day');
		}
	}
}
