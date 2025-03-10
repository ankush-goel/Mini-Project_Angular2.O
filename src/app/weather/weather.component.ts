import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';  
import { NgIf, NgFor } from '@angular/common';  
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],  
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';  
  weatherData: any = null;  
  errorMessage: string = '';  

  constructor(private weatherService: WeatherService) { }

  getWeather(): void {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe({
        next: (data) => {
          console.log('API Response:', data);
          this.weatherData = data;  
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'City not found. Please try again.';
          this.weatherData = null;
        }
      });
    } else {
      this.errorMessage = 'Please enter a city name.';
      this.weatherData = null;
    }
  }
  
}
