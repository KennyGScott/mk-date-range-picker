import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public searchType = 'relative';
	public minutes: number;
	public startDate: string;
	public endDate: string;

	relativeSelected(minutes){
		this.searchType = 'relative';
		this.minutes = minutes;
		console.log("num minutes " + minutes);
	}
	absoluteSelected(range){
		this.searchType = 'absolute';
		this.startDate = range.startDate;
		this.endDate = range.endDate;
		console.log(range);
	}
}
