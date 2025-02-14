# Weather Dashboard 🌤️

A modern React-based Weather Dashboard with real-time weather data, interactive 3D cloud animations, and a beautiful glass-morphism UI design.

## 🚀 Features

- Real-time weather data visualization with beautiful UI
- Interactive 3D cloud animations using Three.js
- Advanced filtering system for weather conditions
- Responsive glass-morphism design
- Smooth animations with Framer Motion
- Temperature-based filtering
- Search functionality for weather conditions

## 📂 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   └── WeatherDashboard/
│   │       ├── CloudAnimation.jsx     # 3D cloud animation component
│   │       ├── Header.jsx            # Dashboard header component
│   │       ├── SearchFilters.jsx     # Search and filter controls
│   │       ├── WeatherList.jsx       # Weather data display component
│   │       |
│   │       |── useWeatherData.js # Custom data fetching hook
│   ├── App.jsx                       # Main application component
│   └── index.js
    |__ utils
          |___ fecthData.js
# Application entry point
```

## 🛠️ Technical Stack

- **React** - UI Framework
- **Three.js** - 3D Cloud Animations
- **Framer Motion** - Smooth Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 💻 Component Details

### App.jsx
- Main container component
- Manages global state
- Implements glass-morphism layout

### CloudAnimation.jsx
- Creates realistic 3D cloud formations
- Implements animation loops
- Handles Three.js scene management

### SearchFilters.jsx
- Implements search functionality
- Temperature range filters
- Animated input fields
- Interactive filter button

### WeatherList.jsx
- Displays weather data cards
- Implements smooth animations
- Shows weather icons
- Temperature displays

### useWeatherData.js
- Custom hook for data fetching
- Implements data filtering logic
- Handles error states
- Manages API interactions

## 🎨 UI Features

- Glass-morphism effects
- Gradient backgrounds
- Animated interactions
- Responsive design
- Dynamic weather icons
- Interactive hover states

## 🔧 Installation & Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```env
REACT_APP_API_URL=your_weather_api_url
```
4. Start the development server:
```bash
npm start
```

## 🌟 Usage

1. **Search Weather**: Enter weather conditions in the search field
2. **Filter Temperature**: Set minimum and maximum temperature ranges
3. **View Results**: See filtered weather data with animated transitions
4. **Interact**: Hover over cards for interactive animations

## 🔄 Data Flow

1. Data fetching through useWeatherData hook
2. State management in App component
3. Filtering logic in SearchFilters
4. Display rendering in WeatherList
5. Background animations in CloudAnimation

## 🎯 Future Enhancements

- Add more weather animations
- Implement dark mode
- Add weather alerts
- Expand filtering options
- Add location-based weather
- Implement weather forecasts

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Adaptive layouts
- Touch-friendly interactions
